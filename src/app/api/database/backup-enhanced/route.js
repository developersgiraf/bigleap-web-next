import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';
import { portfoliosAPI } from '../../../../lib/portfolios-simple.js';
import { blogsAPI } from '../../../../lib/blogs-simple.js';

export async function GET(request) {
  try {
    // Get query parameters to determine backup type
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // 'services', 'portfolios', 'blogs', 'all'

    const backupData = {
      WebsiteDatas: {},
      exportInfo: {
        timestamp: new Date().toISOString(),
        totalDocuments: 0,
        collections: [],
        source: 'JSON Files',
        backupType: type
      }
    };

    // Initialize APIs
    await servicesAPI.initialize();
    await portfoliosAPI.initialize();
    await blogsAPI.initialize();

    // Backup services
    if (type === 'services' || type === 'all') {
      const indexResult = await servicesAPI.getAll();
      
      if (indexResult.success) {
        const servicesWithFullData = {};
        
        for (const serviceIndex of indexResult.data) {
          try {
            const fullServiceResult = await servicesAPI.getById(serviceIndex.id);
            if (fullServiceResult.success) {
              const fullService = {
                ...fullServiceResult.data,
                index: serviceIndex.index,
                archived: serviceIndex.archived
              };
              servicesWithFullData[serviceIndex.id] = fullService;
            } else {
              console.warn(`Failed to load full data for service: ${serviceIndex.id}`);
              servicesWithFullData[serviceIndex.id] = serviceIndex;
            }
          } catch (serviceError) {
            console.warn(`Error loading service ${serviceIndex.id}:`, serviceError);
            servicesWithFullData[serviceIndex.id] = serviceIndex;
          }
        }
        
        backupData.WebsiteDatas.services = {
          id: "services",
          ...servicesWithFullData
        };
        
        backupData.exportInfo.totalDocuments += Object.keys(servicesWithFullData).length;
        backupData.exportInfo.collections.push('services');
      }
    }

    // Backup portfolios
    if (type === 'portfolios' || type === 'all') {
      const indexResult = await portfoliosAPI.getAll();
      
      if (indexResult.success) {
        const portfoliosWithFullData = {};
        
        for (const portfolioIndex of indexResult.data) {
          try {
            const fullPortfolioResult = await portfoliosAPI.getById(portfolioIndex.id);
            if (fullPortfolioResult.success) {
              const fullPortfolio = {
                ...fullPortfolioResult.data,
                order: portfolioIndex.order,
                status: portfolioIndex.status
              };
              portfoliosWithFullData[portfolioIndex.id] = fullPortfolio;
            } else {
              console.warn(`Failed to load full data for portfolio: ${portfolioIndex.id}`);
              portfoliosWithFullData[portfolioIndex.id] = portfolioIndex;
            }
          } catch (portfolioError) {
            console.warn(`Error loading portfolio ${portfolioIndex.id}:`, portfolioError);
            portfoliosWithFullData[portfolioIndex.id] = portfolioIndex;
          }
        }
        
        backupData.WebsiteDatas.portfolios = {
          id: "portfolios",
          ...portfoliosWithFullData
        };
        
        backupData.exportInfo.totalDocuments += Object.keys(portfoliosWithFullData).length;
        backupData.exportInfo.collections.push('portfolios');
      }
    }

    // Backup blogs
    if (type === 'blogs' || type === 'all') {
      const indexResult = await blogsAPI.getAll();
      
      if (indexResult.success) {
        const blogsWithFullData = {};
        
        for (const blogIndex of indexResult.data) {
          try {
            const fullBlogResult = await blogsAPI.getById(blogIndex.id);
            if (fullBlogResult.success) {
              const fullBlog = {
                ...fullBlogResult.data,
                index: blogIndex.index,
                status: blogIndex.status,
                featured: blogIndex.featured
              };
              blogsWithFullData[blogIndex.id] = fullBlog;
            } else {
              console.warn(`Failed to load full data for blog: ${blogIndex.id}`);
              blogsWithFullData[blogIndex.id] = blogIndex;
            }
          } catch (blogError) {
            console.warn(`Error loading blog ${blogIndex.id}:`, blogError);
            blogsWithFullData[blogIndex.id] = blogIndex;
          }
        }
        
        backupData.WebsiteDatas.blogs = {
          id: "blogs",
          ...blogsWithFullData
        };
        
        backupData.exportInfo.totalDocuments += Object.keys(blogsWithFullData).length;
        backupData.exportInfo.collections.push('blogs');
      }
    }

    // Validate that at least one collection was backed up
    if (backupData.exportInfo.collections.length === 0) {
      return NextResponse.json(
        { error: `No valid data found for backup type: ${type}` },
        { status: 404 }
      );
    }

    return NextResponse.json(backupData);
  } catch (error) {
    console.error('Error creating database backup:', error);
    return NextResponse.json(
      { error: 'Failed to create database backup' },
      { status: 500 }
    );
  }
}