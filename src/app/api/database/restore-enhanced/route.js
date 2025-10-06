import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';
import { portfoliosAPI } from '../../../../lib/portfolios-simple.js';
import { blogsAPI } from '../../../../lib/blogs-simple.js';

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
    await portfoliosAPI.initialize();
    await blogsAPI.initialize();

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

    // Restore portfolios
    if ((restoreType === 'portfolios' || restoreType === 'all') && backupData.WebsiteDatas.portfolios) {
      try {
        const portfoliosObject = backupData.WebsiteDatas.portfolios;
        const backupPortfolios = [];
        
        // Convert backup portfolios object to array, filtering out the collection identifier
        // and only including selected items if conflicts are specified
        for (const [key, value] of Object.entries(portfoliosObject)) {
          if (key !== 'id' && typeof value === 'object' && value.id) {
            // If selectedConflicts is provided, only include selected items
            if (Object.keys(selectedConflicts).length > 0) {
              if (selectedConflicts[`portfolios-${value.id}`]) {
                backupPortfolios.push(value);
              }
            } else {
              // No conflict selection, include all
              backupPortfolios.push(value);
            }
          }
        }

        if (backupPortfolios.length > 0) {
          // Get current portfolios and clear them
          const currentPortfoliosResult = await portfoliosAPI.getAll();
          if (currentPortfoliosResult.success && currentPortfoliosResult.data.length > 0) {
            for (const portfolio of currentPortfoliosResult.data) {
              try {
                await portfoliosAPI.delete(portfolio.id);
                totalDeleted++;
              } catch (deleteError) {
                console.warn(`Failed to delete portfolio ${portfolio.id}:`, deleteError);
              }
            }
          }

          // Add portfolios from backup
          for (const portfolioData of backupPortfolios) {
            try {
              const portfolioToRestore = {
                ...portfolioData,
                createdAt: portfolioData.createdAt || new Date().toISOString(),
                lastModified: new Date().toISOString()
              };

              await portfoliosAPI.create(portfolioToRestore, true);
              totalUpdated++;
            } catch (createError) {
              console.error(`Failed to restore portfolio ${portfolioData.id}:`, createError);
            }
          }

          await portfoliosAPI.updateIndex();
          restoredCollections.push('portfolios');
        }
      } catch (portfoliosError) {
        console.error('Error restoring portfolios:', portfoliosError);
      }
    }

    // Restore blogs
    if ((restoreType === 'blogs' || restoreType === 'all') && backupData.WebsiteDatas.blogs) {
      try {
        const blogsObject = backupData.WebsiteDatas.blogs;
        const backupBlogs = [];
        
        // Convert backup blogs object to array, filtering out the collection identifier
        // and only including selected items if conflicts are specified
        for (const [key, value] of Object.entries(blogsObject)) {
          if (key !== 'id' && typeof value === 'object' && value.id) {
            // If selectedConflicts is provided, only include selected items
            if (Object.keys(selectedConflicts).length > 0) {
              if (selectedConflicts[`blogs-${value.id}`]) {
                backupBlogs.push(value);
              }
            } else {
              // No conflict selection, include all
              backupBlogs.push(value);
            }
          }
        }

        if (backupBlogs.length > 0) {
          // Get current blogs and clear them
          const currentBlogsResult = await blogsAPI.getAll();
          if (currentBlogsResult.success && currentBlogsResult.data.length > 0) {
            for (const blog of currentBlogsResult.data) {
              try {
                await blogsAPI.delete(blog.id);
                totalDeleted++;
              } catch (deleteError) {
                console.warn(`Failed to delete blog ${blog.id}:`, deleteError);
              }
            }
          }

          // Add blogs from backup
          for (const blogData of backupBlogs) {
            try {
              const blogToRestore = {
                ...blogData,
                createdAt: blogData.createdAt || new Date().toISOString(),
                lastModified: new Date().toISOString().split('T')[0]
              };

              await blogsAPI.create(blogToRestore, true);
              totalUpdated++;
            } catch (createError) {
              console.error(`Failed to restore blog ${blogData.id}:`, createError);
            }
          }

          await blogsAPI.updateIndex();
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