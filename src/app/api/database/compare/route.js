import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';
import { portfoliosAPI } from '../../../../lib/portfolios-simple.js';
import { blogsAPI } from '../../../../lib/blogs-simple.js';

// Helper function to normalize strings for comparison (handles null, undefined, whitespace)
function normalizeString(str) {
  if (!str && str !== 0) return '';
  return String(str).trim().toLowerCase();
}

export async function POST(request) {
  try {
    const backupData = await request.json();

    // Initialize APIs
    await servicesAPI.initialize();
    await portfoliosAPI.initialize();
    await blogsAPI.initialize();

    const comparison = {
      services: { new: [], modified: [], unchanged: [], toBeDeleted: [] },
      portfolios: { new: [], modified: [], unchanged: [], toBeDeleted: [] },
      blogs: { new: [], modified: [], unchanged: [], toBeDeleted: [] },
      summary: {
        totalNew: 0,
        totalModified: 0,
        totalUnchanged: 0,
        totalToBeDeleted: 0,
        collections: []
      }
    };

    // Compare Services
    if (backupData.WebsiteDatas?.services) {
      const currentServicesResult = await servicesAPI.getAll();
      const currentServices = currentServicesResult.success ? currentServicesResult.data : [];
      const currentServicesMap = new Map(currentServices.map(s => [s.id, s]));

      const backupServicesObject = backupData.WebsiteDatas.services;
      const backupServices = [];
      
      for (const [key, value] of Object.entries(backupServicesObject)) {
        if (key !== 'id' && typeof value === 'object' && value.id) {
          backupServices.push(value);
        }
      }

      const backupServicesMap = new Map(backupServices.map(s => [s.id, s]));

      // Analyze each backup service
      for (const backupService of backupServices) {
        const currentService = currentServicesMap.get(backupService.id);
        
        if (!currentService) {
          comparison.services.new.push({
            id: backupService.id,
            title: backupService.title || backupService.bannerTitle,
            type: 'service'
          });
        } else {
          // Check if modified (compare only meaningful fields)
          const changes = compareServiceFields(currentService, backupService);
          const isModified = changes.length > 0;
            
          if (isModified) {
            comparison.services.modified.push({
              id: backupService.id,
              title: backupService.title || backupService.bannerTitle,
              type: 'service',
              currentLastModified: currentService.lastModified,
              backupLastModified: backupService.lastModified,
              changes: changes
            });
          } else {
            comparison.services.unchanged.push({
              id: backupService.id,
              title: backupService.title || backupService.bannerTitle,
              type: 'service'
            });
          }
        }
      }

      // Find services that will be deleted (exist in current but not in backup)
      for (const currentService of currentServices) {
        if (!backupServicesMap.has(currentService.id)) {
          comparison.services.toBeDeleted.push({
            id: currentService.id,
            title: currentService.title || currentService.bannerTitle,
            type: 'service'
          });
        }
      }

      comparison.summary.collections.push('services');
    }

    // Compare Portfolios
    if (backupData.WebsiteDatas?.portfolios) {
      const currentPortfoliosResult = await portfoliosAPI.getAll();
      const currentPortfoliosList = currentPortfoliosResult.success ? currentPortfoliosResult.data : [];
      
      // Get detailed data for each current portfolio
      const currentPortfolios = [];
      for (const portfolioIndex of currentPortfoliosList) {
        try {
          const detailedResult = await portfoliosAPI.getById(portfolioIndex.id);
          if (detailedResult.success) {
            currentPortfolios.push(detailedResult.data);
          } else {
            // Fallback to index data if detailed data not available
            currentPortfolios.push(portfolioIndex);
          }
        } catch (error) {
          console.error(`Error getting detailed portfolio ${portfolioIndex.id}:`, error);
          currentPortfolios.push(portfolioIndex);
        }
      }
      
      const currentPortfoliosMap = new Map(currentPortfolios.map(p => [p.id, p]));

      const backupPortfoliosObject = backupData.WebsiteDatas.portfolios;
      const backupPortfolios = [];
      
      for (const [key, value] of Object.entries(backupPortfoliosObject)) {
        if (key !== 'id' && typeof value === 'object' && value.id) {
          backupPortfolios.push(value);
        }
      }

      const backupPortfoliosMap = new Map(backupPortfolios.map(p => [p.id, p]));

      // Analyze each backup portfolio
      for (const backupPortfolio of backupPortfolios) {
        const currentPortfolio = currentPortfoliosMap.get(backupPortfolio.id);
        
        if (!currentPortfolio) {
          comparison.portfolios.new.push({
            id: backupPortfolio.id,
            title: backupPortfolio.title,
            type: 'portfolio'
          });
        } else {
          const changes = comparePortfolioFields(currentPortfolio, backupPortfolio);
          const isModified = changes.length > 0;
            
          if (isModified) {
            comparison.portfolios.modified.push({
              id: backupPortfolio.id,
              title: backupPortfolio.title,
              type: 'portfolio',
              currentLastModified: currentPortfolio.lastModified,
              backupLastModified: backupPortfolio.lastModified,
              changes: changes
            });
          } else {
            comparison.portfolios.unchanged.push({
              id: backupPortfolio.id,
              title: backupPortfolio.title,
              type: 'portfolio'
            });
          }
        }
      }

      // Find portfolios that will be deleted
      for (const currentPortfolio of currentPortfolios) {
        if (!backupPortfoliosMap.has(currentPortfolio.id)) {
          comparison.portfolios.toBeDeleted.push({
            id: currentPortfolio.id,
            title: currentPortfolio.title,
            type: 'portfolio'
          });
        }
      }

      comparison.summary.collections.push('portfolios');
    }

    // Compare Blogs
    if (backupData.WebsiteDatas?.blogs) {
      const currentBlogsResult = await blogsAPI.getAll();
      const currentBlogsList = currentBlogsResult.success ? currentBlogsResult.data : [];
      
      // Get detailed data for each current blog
      const currentBlogs = [];
      for (const blogIndex of currentBlogsList) {
        try {
          const detailedResult = await blogsAPI.getById(blogIndex.id);
          if (detailedResult.success) {
            currentBlogs.push(detailedResult.data);
          } else {
            // Fallback to index data if detailed data not available
            currentBlogs.push(blogIndex);
          }
        } catch (error) {
          console.error(`Error getting detailed blog ${blogIndex.id}:`, error);
          currentBlogs.push(blogIndex);
        }
      }
      
      const currentBlogsMap = new Map(currentBlogs.map(b => [b.id, b]));

      const backupBlogsObject = backupData.WebsiteDatas.blogs;
      const backupBlogs = [];
      
      for (const [key, value] of Object.entries(backupBlogsObject)) {
        if (key !== 'id' && typeof value === 'object' && value.id) {
          backupBlogs.push(value);
        }
      }

      const backupBlogsMap = new Map(backupBlogs.map(b => [b.id, b]));

      // Analyze each backup blog
      for (const backupBlog of backupBlogs) {
        const currentBlog = currentBlogsMap.get(backupBlog.id);
        
        if (!currentBlog) {
          comparison.blogs.new.push({
            id: backupBlog.id,
            title: backupBlog.title,
            type: 'blog'
          });
        } else {
          const changes = compareBlogFields(currentBlog, backupBlog);
          const isModified = changes.length > 0;
            
          if (isModified) {
            comparison.blogs.modified.push({
              id: backupBlog.id,
              title: backupBlog.title,
              type: 'blog',
              currentLastModified: currentBlog.lastModified,
              backupLastModified: backupBlog.lastModified,
              changes: changes
            });
          } else {
            comparison.blogs.unchanged.push({
              id: backupBlog.id,
              title: backupBlog.title,
              type: 'blog'
            });
          }
        }
      }

      // Find blogs that will be deleted
      for (const currentBlog of currentBlogs) {
        if (!backupBlogsMap.has(currentBlog.id)) {
          comparison.blogs.toBeDeleted.push({
            id: currentBlog.id,
            title: currentBlog.title,
            type: 'blog'
          });
        }
      }

      comparison.summary.collections.push('blogs');
    }

    // Calculate totals
    comparison.summary.totalNew = 
      comparison.services.new.length + 
      comparison.portfolios.new.length + 
      comparison.blogs.new.length;

    comparison.summary.totalModified = 
      comparison.services.modified.length + 
      comparison.portfolios.modified.length + 
      comparison.blogs.modified.length;

    comparison.summary.totalUnchanged = 
      comparison.services.unchanged.length + 
      comparison.portfolios.unchanged.length + 
      comparison.blogs.unchanged.length;

    comparison.summary.totalToBeDeleted = 
      comparison.services.toBeDeleted.length + 
      comparison.portfolios.toBeDeleted.length + 
      comparison.blogs.toBeDeleted.length;

    return NextResponse.json({
      success: true,
      comparison
    });

  } catch (error) {
    console.error('Error comparing backup data:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to compare backup data',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Helper function to compare service fields
function compareServiceFields(current, backup) {
  const changes = [];
  
  // Core content fields
  if (normalizeString(current.title) !== normalizeString(backup.title)) {
    changes.push({ field: 'title', current: current.title, backup: backup.title });
  }
  if (normalizeString(current.bannerTitle) !== normalizeString(backup.bannerTitle)) {
    changes.push({ field: 'bannerTitle', current: current.bannerTitle, backup: backup.bannerTitle });
  }
  if (normalizeString(current.description) !== normalizeString(backup.description)) {
    changes.push({ field: 'description', current: 'Content Modified', backup: 'Content Modified' });
  }
  
  // Status fields
  if (current.archived !== backup.archived) {
    changes.push({ field: 'archived', current: current.archived, backup: backup.archived });
  }
  
  // Compare specific service fields that matter
  if (current.thumbnail !== backup.thumbnail) {
    changes.push({ field: 'thumbnail', current: 'Image Changed', backup: 'Image Changed' });
  }
  
  // Compare index/order if significantly different
  if (Math.abs((current.index || 0) - (backup.index || 0)) > 0) {
    changes.push({ field: 'index', current: current.index, backup: backup.index });
  }
  
  // Compare complex objects by stringifying and checking length difference
  const currentDetailsStr = JSON.stringify(current.details || {});
  const backupDetailsStr = JSON.stringify(backup.details || {});
  if (Math.abs(currentDetailsStr.length - backupDetailsStr.length) > 50) { // Only if significant change
    changes.push({ field: 'details', current: 'Structure Modified', backup: 'Structure Modified' });
  }
  
  return changes;
}

// Helper function to compare portfolio fields
function comparePortfolioFields(current, backup) {
  const changes = [];
  
  // Now both current and backup should be detailed structures
  // Compare main content fields
  if (normalizeString(current.title || '') !== normalizeString(backup.title || '')) {
    changes.push({ field: 'title', current: current.title, backup: backup.title });
  }
  
  if (normalizeString(current.subtitle || '') !== normalizeString(backup.subtitle || '')) {
    changes.push({ field: 'subtitle', current: current.subtitle, backup: backup.subtitle });
  }
  
  if (normalizeString(current.description || '') !== normalizeString(backup.description || '')) {
    changes.push({ field: 'description', current: current.description, backup: backup.description });
  }
  
  // Compare status and metadata
  if (current.status !== backup.status) {
    changes.push({ field: 'status', current: current.status, backup: backup.status });
  }
  
  if (current.featured !== backup.featured) {
    changes.push({ field: 'featured', current: current.featured, backup: backup.featured });
  }
  
  if (Math.abs((current.order || 0) - (backup.order || 0)) > 0) {
    changes.push({ field: 'order', current: current.order, backup: backup.order });
  }
  
  // Compare cardData if it exists in both
  if (current.cardData && backup.cardData) {
    if (normalizeString(current.cardData.title || '') !== normalizeString(backup.cardData.title || '')) {
      changes.push({ field: 'cardData.title', current: current.cardData.title, backup: backup.cardData.title });
    }
    if (normalizeString(current.cardData.description || '') !== normalizeString(backup.cardData.description || '')) {
      changes.push({ field: 'cardData.description', current: current.cardData.description, backup: backup.cardData.description });
    }
    if (current.cardData.image !== backup.cardData.image) {
      changes.push({ field: 'cardData.image', current: current.cardData.image, backup: backup.cardData.image });
    }
  } else if ((current.cardData && !backup.cardData) || (!current.cardData && backup.cardData)) {
    changes.push({ field: 'cardData', current: current.cardData ? 'exists' : 'missing', backup: backup.cardData ? 'exists' : 'missing' });
  }
  
  // Compare other significant fields
  if (current.videoUrl !== backup.videoUrl) {
    changes.push({ field: 'videoUrl', current: current.videoUrl, backup: backup.videoUrl });
  }
  
  if (current.lastModified !== backup.lastModified) {
    changes.push({ field: 'lastModified', current: current.lastModified, backup: backup.lastModified });
  }
  
  return changes;
}

// Helper function to compare blog fields
function compareBlogFields(current, backup) {
  const changes = [];
  
  // Now both current and backup should be detailed structures
  // Core content fields
  if (normalizeString(current.title || '') !== normalizeString(backup.title || '')) {
    changes.push({ field: 'title', current: current.title, backup: backup.title });
  }
  
  if (normalizeString(current.caption || '') !== normalizeString(backup.caption || '')) {
    changes.push({ field: 'caption', current: current.caption, backup: backup.caption });
  }
  
  if (current.slug !== backup.slug) {
    changes.push({ field: 'slug', current: current.slug, backup: backup.slug });
  }
  
  if (normalizeString(current.description || '') !== normalizeString(backup.description || '')) {
    changes.push({ field: 'description', current: current.description, backup: backup.description });
  }
  
  // Metadata fields
  if (current.status !== backup.status) {
    changes.push({ field: 'status', current: current.status, backup: backup.status });
  }
  
  if (current.featured !== backup.featured) {
    changes.push({ field: 'featured', current: current.featured, backup: backup.featured });
  }
  
  if (normalizeString(current.category || '') !== normalizeString(backup.category || '')) {
    changes.push({ field: 'category', current: current.category, backup: backup.category });
  }
  
  if (normalizeString(current.author || '') !== normalizeString(backup.author || '')) {
    changes.push({ field: 'author', current: current.author, backup: backup.author });
  }
  
  // Image comparison
  if (current.image !== backup.image) {
    changes.push({ field: 'image', current: current.image, backup: backup.image });
  }
  
  // Date comparisons
  if (current.publishedDate !== backup.publishedDate) {
    changes.push({ field: 'publishedDate', current: current.publishedDate, backup: backup.publishedDate });
  }
  
  if (current.lastModified !== backup.lastModified) {
    changes.push({ field: 'lastModified', current: current.lastModified, backup: backup.lastModified });
  }
  
  // Index comparison (if it exists in both)
  if (current.index !== undefined && backup.index !== undefined && current.index !== backup.index) {
    changes.push({ field: 'index', current: current.index, backup: backup.index });
  }
  
  // Tags comparison (if both have tags)
  if (current.tags || backup.tags) {
    const currentTags = (current.tags || []).sort().join(',');
    const backupTags = (backup.tags || []).sort().join(',');
    if (currentTags !== backupTags) {
      changes.push({ field: 'tags', current: current.tags, backup: backup.tags });
    }
  }
  
  return changes;
}