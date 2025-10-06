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
          // Replace only the services that are in the backup data
          for (const serviceData of backupServices) {
            try {
              const serviceToRestore = {
                ...serviceData,
                createdAt: serviceData.createdAt || new Date().toISOString(),
                lastModified: new Date().toISOString()
              };

              // Force replace/create the service (overwrite if exists)
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
          // Merge portfolios from backup (no clearing of existing data)
          for (const portfolioData of backupPortfolios) {
            try {
              const portfolioPath = path.join(portfoliosDir, `${portfolioData.id}.json`);
              const portfolioToRestore = {
                ...portfolioData,
                lastModified: new Date().toISOString()
              };
              
              // Write/overwrite the portfolio file
              fs.writeFileSync(portfolioPath, JSON.stringify(portfolioToRestore, null, 2));
              totalUpdated++;
            } catch (error) {
              console.error(`Failed to restore portfolio ${portfolioData.id}:`, error);
            }
          }

          // Rebuild index from all portfolio files (preserves existing + new ones)
          try {
            const { portfoliosAPI } = await import('../../../../lib/portfolios-simple.js');
            await portfoliosAPI.initialize();
            await portfoliosAPI.updateIndex();
          } catch (indexError) {
            console.warn('Failed to update portfolio index:', indexError);
          }
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
          // Merge blogs from backup (no clearing of existing data)
          for (const blogData of backupBlogs) {
            try {
              const blogPath = path.join(blogsDir, `${blogData.id}.json`);
              const blogToRestore = {
                ...blogData,
                createdAt: blogData.createdAt || new Date().toISOString(),
                lastModified: new Date().toISOString().split('T')[0]
              };
              
              // Write/overwrite the blog file
              fs.writeFileSync(blogPath, JSON.stringify(blogToRestore, null, 2));
              totalUpdated++;
            } catch (error) {
              console.error(`Failed to restore blog ${blogData.id}:`, error);
            }
          }

          // Rebuild index from all blog files (preserves existing + new ones)
          try {
            const { blogsAPI } = await import('../../../../lib/blogs-simple.js');
            await blogsAPI.initialize();
            await blogsAPI.updateIndex();
          } catch (indexError) {
            console.warn('Failed to update blog index:', indexError);
          }
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
      message: `Database restored successfully - only changed files replaced (other data preserved)`,
      updatedCount: totalUpdated,
      deletedCount: 0,
      restoredCollections,
      timestamp: new Date().toISOString(),
      source: 'JSON Files',
      operation: 'selective-replace'
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