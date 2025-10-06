import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';

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
    
    // For now, we'll implement portfolios and blogs APIs as needed
    // Currently only services is fully implemented with the library pattern

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

    // Backup portfolios (using direct file operations for now)
    if (type === 'portfolios' || type === 'all') {
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        const portfoliosDir = path.join(process.cwd(), 'data', 'portfolios');
        const indexPath = path.join(portfoliosDir, 'index.json');
        
        if (fs.existsSync(indexPath)) {
          const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
          const portfolioRefs = Array.isArray(indexData) ? indexData : indexData.portfolios || [];
          const portfoliosWithFullData = {};
          
          for (const portfolioRef of portfolioRefs) {
            try {
              const portfolioPath = path.join(portfoliosDir, `${portfolioRef.id}.json`);
              if (fs.existsSync(portfolioPath)) {
                const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));
                portfoliosWithFullData[portfolioRef.id] = {
                  ...portfolioData,
                  order: portfolioRef.order,
                  status: portfolioRef.status
                };
              }
            } catch (error) {
              console.warn(`Error loading portfolio ${portfolioRef.id}:`, error);
              portfoliosWithFullData[portfolioRef.id] = portfolioRef;
            }
          }
          
          backupData.WebsiteDatas.portfolios = {
            id: "portfolios",
            ...portfoliosWithFullData
          };
          
          backupData.exportInfo.totalDocuments += Object.keys(portfoliosWithFullData).length;
          backupData.exportInfo.collections.push('portfolios');
        }
      } catch (error) {
        console.warn('Error backing up portfolios:', error);
      }
    }

    // Backup blogs (using direct file operations for now)
    if (type === 'blogs' || type === 'all') {
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        const blogsDir = path.join(process.cwd(), 'data', 'blogs');
        const indexPath = path.join(blogsDir, 'index.json');
        
        if (fs.existsSync(indexPath)) {
          const blogsIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
          const blogsWithFullData = {};
          
          for (const blogRef of blogsIndex) {
            try {
              const blogPath = path.join(blogsDir, `${blogRef.id}.json`);
              if (fs.existsSync(blogPath)) {
                const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
                blogsWithFullData[blogRef.id] = {
                  ...blogData,
                  status: blogRef.status,
                  featured: blogRef.featured
                };
              }
            } catch (error) {
              console.warn(`Error loading blog ${blogRef.id}:`, error);
              blogsWithFullData[blogRef.id] = blogRef;
            }
          }
          
          backupData.WebsiteDatas.blogs = {
            id: "blogs",
            ...blogsWithFullData
          };
          
          backupData.exportInfo.totalDocuments += Object.keys(blogsWithFullData).length;
          backupData.exportInfo.collections.push('blogs');
        }
      } catch (error) {
        console.warn('Error backing up blogs:', error);
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