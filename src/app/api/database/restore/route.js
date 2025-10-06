import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';

export async function POST(request) {
  try {
    await servicesAPI.initialize();
    const backupData = await request.json();

    // Validate the backup data structure
    if (!backupData.WebsiteDatas?.services) {
      return NextResponse.json(
        { error: 'Invalid backup data: Missing WebsiteDatas.services collection' },
        { status: 400 }
      );
    }

    // Get current services count
    const currentServicesResult = await servicesAPI.getAll();
    const currentCount = currentServicesResult.success ? currentServicesResult.data.length : 0;

    // Extract services from backup (exclude the "id": "services" entry)
    const servicesObject = backupData.WebsiteDatas.services;
    const backupServices = [];
    
    // Convert backup services object to array, filtering out the collection identifier
    for (const [key, value] of Object.entries(servicesObject)) {
      if (key !== 'id' && typeof value === 'object' && value.id) {
        backupServices.push(value);
      }
    }

    if (backupServices.length === 0) {
      return NextResponse.json(
        { error: 'No valid services found in backup data' },
        { status: 400 }
      );
    }

    let updatedCount = 0;
    let deletedCount = 0;

    // Clear existing services and restore from backup
    try {
      // Clear all existing services if we have current services
      if (currentServicesResult.success && currentServicesResult.data.length > 0) {
        for (const service of currentServicesResult.data) {
          try {
            await servicesAPI.delete(service.id);
            deletedCount++;
          } catch (deleteError) {
            console.warn(`Failed to delete service ${service.id}:`, deleteError);
          }
        }
      }

      // Add services from backup
      for (const serviceData of backupServices) {
        try {
          // Ensure the service has required fields
          const serviceToRestore = {
            ...serviceData,
            createdAt: serviceData.createdAt || new Date().toISOString(),
            lastModified: new Date().toISOString()
          };

          // Use preserveId = true to maintain original IDs from backup
          await servicesAPI.create(serviceToRestore, true);
          updatedCount++;
          console.log(`Restored service: ${serviceData.id}`);
        } catch (createError) {
          console.error(`Failed to restore service ${serviceData.id}:`, createError);
        }
      }

      // Rebuild index
      await servicesAPI.updateIndex();

      return NextResponse.json({
        success: true,
        message: 'Database restored successfully from backup',
        updatedCount,
        deletedCount,
        timestamp: new Date().toISOString(),
        source: 'JSON Files'
      });

    } catch (serviceError) {
      console.error('Error during service restoration:', serviceError);
      return NextResponse.json(
        { 
          error: 'Failed to restore services',
          details: serviceError.message 
        },
        { status: 500 }
      );
    }

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