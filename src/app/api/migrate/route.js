// Real Migration Script: Convert Firebase JSON to Split Files
import { servicesAPI } from '../../../lib/services-simple.js';
import fs from 'fs/promises';
import path from 'path';

// Import the existing data
async function loadExistingData() {
  try {
    const dataPath = path.join(process.cwd(), 'src/app/giraf/admin/components/temp/bigleap-database-restructured-2025-10-02.json');
    const rawData = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(rawData);
    return data.WebsiteDatas.services;
  } catch (error) {
    console.error('Error loading existing data:', error);
    return null;
  }
}

// Convert Firebase format to our new format
function convertService(key, serviceData, index) {
  // Handle different data structures
  const service = {
    id: key,
    title: serviceData.title || serviceData.bannerTitle || key,
    bannerTitle: serviceData.bannerTitle || serviceData.title || key,
    archived: serviceData.archived || false,
    index: serviceData.index || index,
    thumbnail: serviceData.thumbnail || serviceData.section01?.image || '',
    section01: {
      image: serviceData.section01?.image || '',
      heading: serviceData.section01?.heading || '',
      description: serviceData.section01?.description || ''
    },
    section02: {
      DescTitle: serviceData.section02?.DescTitle || '',
      Descpara: serviceData.section02?.Descpara || '',
      subsections: serviceData.section02?.subsections || []
    },
    listHead: serviceData.listHead || '',
    listPara: serviceData.listPara || '',
    list: serviceData.list || [],
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
  };

  return service;
}

// POST - Migrate data from Firebase JSON to split files
export async function POST() {
  try {
    console.log('🚀 Starting migration from Firebase JSON to split files...');
    
    // Load existing Firebase data
    const firebaseData = await loadExistingData();
    if (!firebaseData) {
      return Response.json({
        success: false,
        error: 'Could not load existing Firebase data'
      }, { status: 500 });
    }

    console.log('📂 Found Firebase data with keys:', Object.keys(firebaseData));

    // Convert and save each service
    const results = [];
    let index = 0;
    
    for (const [key, serviceData] of Object.entries(firebaseData)) {
      // Skip metadata fields
      if (key === 'id') continue;
      
      try {
        console.log(`📝 Converting service: ${key}`);
        
        const convertedService = convertService(key, serviceData, index);
        const result = await servicesAPI.create(convertedService);
        
        if (result.success) {
          results.push({
            id: key,
            status: 'success',
            newId: result.data.id
          });
          console.log(`✅ Successfully migrated: ${key} -> ${result.data.id}`);
        } else {
          results.push({
            id: key,
            status: 'error',
            error: result.error
          });
          console.log(`❌ Failed to migrate: ${key} - ${result.error}`);
        }
        
        index++;
      } catch (error) {
        console.error(`❌ Error converting service ${key}:`, error);
        results.push({
          id: key,
          status: 'error',
          error: error.message
        });
      }
    }

    const successful = results.filter(r => r.status === 'success');
    const failed = results.filter(r => r.status === 'error');

    console.log(`🎉 Migration complete! ${successful.length} successful, ${failed.length} failed`);

    return Response.json({
      success: true,
      message: `Migration completed! ${successful.length} services migrated successfully.`,
      results: {
        total: results.length,
        successful: successful.length,
        failed: failed.length,
        details: results
      }
    });

  } catch (error) {
    console.error('❌ Migration failed:', error);
    return Response.json({
      success: false,
      error: error.message,
      details: 'Check server logs for more information'
    }, { status: 500 });
  }
}

// GET - Check migration status and show current data
export async function GET() {
  try {
    const result = await servicesAPI.getAll();
    const stats = await servicesAPI.getStats();
    
    return Response.json({
      success: true,
      message: "Migration endpoint ready!",
      currentServices: result.data.length,
      stats: stats.data,
      availableActions: {
        migrate: "POST /api/migrate - Migrate Firebase JSON to split files",
        view: "GET /api/services - View current services",
        stats: "GET /api/services/stats - View statistics"
      },
      dataLocation: "/data/services/"
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}