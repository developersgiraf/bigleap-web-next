import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';

export async function POST(request) {
  try {
    const requestData = await request.json();
    const backupData = { ...requestData };
    const selectedConflicts = requestData.selectedConflicts || {};

    // Get query parameters to determine restore type
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'auto'; // 'services', 'portfolios', 'blogs', 'all', 'auto'

    // Auto-detect backup type if not specified
    let restoreType = type;
    if (type === 'auto') {
      const hasServices = backupData.WebsiteDatas?.services;
      const hasPortfolios = backupData.WebsiteDatas?.portfolios;
      const hasBlogs = backupData.WebsiteDatas?.blogs;
      
      if (hasServices && hasPortfolios && hasBlogs) {
        restoreType = 'all';
      } else if (hasServices && !hasPortfolios && !hasBlogs) {
        restoreType = 'services';
      } else if (!hasServices && hasPortfolios && !hasBlogs) {
        restoreType = 'portfolios';
      } else if (!hasServices && !hasPortfolios && hasBlogs) {
        restoreType = 'blogs';
      } else {
        restoreType = 'all'; // Mixed data
      }
    }

    // Validate the backup data structure based on restore type
    if (!backupData.WebsiteDatas) {
      return NextResponse.json(
        { error: 'Invalid backup data: Missing WebsiteDatas' },
        { status: 400 }
      );
    }

    let totalUpdated = 0;
    let totalDeleted = 0;
    const restoredCollections = [];

    // Initialize APIs
    await servicesAPI.initialize();

    // Restore services
    if ((restoreType === 'services' || restoreType === 'all') && backupData.WebsiteDatas.services) {
      try {
        const servicesObject = backupData.WebsiteDatas.services;
        const backupServices = [];
        
        // Convert backup services object to array, filtering out the collection identifier
        // and only including selected items if conflicts are specified
        for (const [key, value] of Object.entries(servicesObject)) {
          if (key !== 'id' && typeof value === 'object' && value.id) {
            // If selectedConflicts is provided, only include selected items
            if (Object.keys(selectedConflicts).length > 0) {
              if (selectedConflicts[`services-${value.id}`]) {
                backupServices.push(value);
              }
            } else {
              // No conflict selection, include all
              backupServices.push(value);
            }
          }
        }

        if (backupServices.length > 0) {
          // Get current services and clear them
          const currentServicesResult = await servicesAPI.getAll();
          if (currentServicesResult.success && currentServicesResult.data.length > 0) {
            for (const service of currentServicesResult.data) {
              try {
                await servicesAPI.delete(service.id);
                totalDeleted++;
              } catch (deleteError) {
                console.warn(`Failed to delete service ${service.id}:`, deleteError);
              }
            }
          }

          // Add services from backup
          for (const serviceData of backupServices) {
            try {
              const serviceToRestore = {
                ...serviceData,
                createdAt: serviceData.createdAt || new Date().toISOString(),
                lastModified: new Date().toISOString()
              };

              await servicesAPI.create(serviceToRestore, true);
              totalUpdated++;
            } catch (createError) {
              console.error(`Failed to restore service ${serviceData.id}:`, createError);
            }
          }

          await servicesAPI.updateIndex();
          restoredCollections.push('services');
        }
      } catch (servicesError) {
        console.error('Error restoring services:', servicesError);
      }
    }

    // Restore portfolios (using direct file operations for now)
    if ((restoreType === 'portfolios' || restoreType === 'all') && backupData.WebsiteDatas.portfolios) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        const portfoliosDir = path.join(process.cwd(), 'data', 'portfolios');
        const portfoliosObject = backupData.WebsiteDatas.portfolios;
        const backupPortfolios = [];
        
        // Convert backup portfolios object to array
        for (const [key, value] of Object.entries(portfoliosObject)) {
          if (key !== 'id' && typeof value === 'object' && value.id) {
            if (Object.keys(selectedConflicts).length > 0) {
              if (selectedConflicts[`portfolios-${value.id}`]) {
                backupPortfolios.push(value);
              }
            } else {
              backupPortfolios.push(value);
            }
          }
        }

        if (backupPortfolios.length > 0) {
          // Clear existing portfolios
          const indexPath = path.join(portfoliosDir, 'index.json');
          if (fs.existsSync(indexPath)) {
            const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
            const portfolioRefs = Array.isArray(indexData) ? indexData : indexData.portfolios || [];
            
            for (const portfolioRef of portfolioRefs) {
              try {
                const portfolioPath = path.join(portfoliosDir, `${portfolioRef.id}.json`);
                if (fs.existsSync(portfolioPath)) {
                  fs.unlinkSync(portfolioPath);
                  totalDeleted++;
                }
              } catch (error) {
                console.warn(`Failed to delete portfolio ${portfolioRef.id}:`, error);
              }
            }
          }

          // Restore portfolios from backup
          const newIndex = [];
          for (const portfolioData of backupPortfolios) {
            try {
              const portfolioPath = path.join(portfoliosDir, `${portfolioData.id}.json`);
              fs.writeFileSync(portfolioPath, JSON.stringify(portfolioData, null, 2));
              
              newIndex.push({
                id: portfolioData.id,
                title: portfolioData.cardData?.title || portfolioData.title,
                description: portfolioData.cardData?.description || portfolioData.description || '',
                image: portfolioData.cardData?.image || '',
                readbtn: portfolioData.cardData?.readbtn || 'Explore More',
                background: portfolioData.cardData?.background || 'linear-gradient(to bottom, #000000, #000000)',
                link: portfolioData.cardData?.link || `/portfolio/${portfolioData.id}`,
                order: portfolioData.order || 1,
                status: portfolioData.status || 'active'
              });
              
              totalUpdated++;
            } catch (error) {
              console.error(`Failed to restore portfolio ${portfolioData.id}:`, error);
            }
          }

          // Update index
          newIndex.sort((a, b) => (a.order || 0) - (b.order || 0));
          fs.writeFileSync(indexPath, JSON.stringify(newIndex, null, 2));
          restoredCollections.push('portfolios');
        }
      } catch (portfoliosError) {
        console.error('Error restoring portfolios:', portfoliosError);
      }
    }

    // Restore blogs (using direct file operations for now)
    if ((restoreType === 'blogs' || restoreType === 'all') && backupData.WebsiteDatas.blogs) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        const blogsDir = path.join(process.cwd(), 'data', 'blogs');
        const blogsObject = backupData.WebsiteDatas.blogs;
        const backupBlogs = [];
        
        // Convert backup blogs object to array
        for (const [key, value] of Object.entries(blogsObject)) {
          if (key !== 'id' && typeof value === 'object' && value.id) {
            if (Object.keys(selectedConflicts).length > 0) {
              if (selectedConflicts[`blogs-${value.id}`]) {
                backupBlogs.push(value);
              }
            } else {
              backupBlogs.push(value);
            }
          }
        }

        if (backupBlogs.length > 0) {
          // Clear existing blogs
          const indexPath = path.join(blogsDir, 'index.json');
          if (fs.existsSync(indexPath)) {
            const blogsIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
            
            for (const blogRef of blogsIndex) {
              try {
                const blogPath = path.join(blogsDir, `${blogRef.id}.json`);
                if (fs.existsSync(blogPath)) {
                  fs.unlinkSync(blogPath);
                  totalDeleted++;
                }
              } catch (error) {
                console.warn(`Failed to delete blog ${blogRef.id}:`, error);
              }
            }
          }

          // Restore blogs from backup
          const newIndex = [];
          for (const blogData of backupBlogs) {
            try {
              const blogPath = path.join(blogsDir, `${blogData.id}.json`);
              const blogToRestore = {
                ...blogData,
                createdAt: blogData.createdAt || new Date().toISOString(),
                lastModified: new Date().toISOString().split('T')[0]
              };
              
              fs.writeFileSync(blogPath, JSON.stringify(blogToRestore, null, 2));
              
              newIndex.push({
                id: blogToRestore.id,
                slug: blogToRestore.slug,
                title: blogToRestore.title,
                caption: blogToRestore.caption || '',
                image: blogToRestore.image || '',
                category: blogToRestore.category || '',
                status: blogToRestore.status || 'draft',
                featured: Boolean(blogToRestore.featured),
                publishedDate: blogToRestore.publishedDate,
                lastModified: blogToRestore.lastModified
              });
              
              totalUpdated++;
            } catch (error) {
              console.error(`Failed to restore blog ${blogData.id}:`, error);
            }
          }

          // Update index
          newIndex.sort((a, b) => (a.index || 0) - (b.index || 0));
          fs.writeFileSync(indexPath, JSON.stringify(newIndex, null, 2));
          restoredCollections.push('blogs');
        }
      } catch (blogsError) {
        console.error('Error restoring blogs:', blogsError);
      }
    }

    if (restoredCollections.length === 0) {
      return NextResponse.json(
        { error: 'No valid data collections found in backup or failed to restore any collections' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Database restored successfully from backup`,
      updatedCount: totalUpdated,
      deletedCount: totalDeleted,
      restoredCollections,
      timestamp: new Date().toISOString(),
      source: 'JSON Files'
    });

  } catch (error) {
    console.error('Error restoring database:', error);
    return NextResponse.json(
      { 
        error: 'Failed to restore database',
        details: error.message 
      },
      { status: 500 }
    );
  }
}