import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';

export async function POST(request) {
  try {
    const backupData = await request.json();

    // Validate the backup data structure
    if (!backupData.WebsiteDatas?.services) {
      return NextResponse.json(
        { error: 'Invalid backup data: Missing WebsiteDatas.services collection' },
        { status: 400 }
      );
    }

    // Get current services count
    const currentServices = await servicesAPI.getAll();
    const currentCount = currentServices.length;

    // Convert backup services object to array format
    const backupServices = Object.values(backupData.WebsiteDatas.services);
    let updatedCount = 0;

    // Clear existing services and restore from backup
    try {
      // Clear all existing services
      for (const service of currentServices) {
        await servicesAPI.delete(service.id);
      }

      // Add services from backup
      for (const serviceData of backupServices) {
        await servicesAPI.create(serviceData);
        updatedCount++;
      }

      // Rebuild index
      await servicesAPI.rebuildIndex();

      return NextResponse.json({
        success: true,
        message: 'Database restored successfully from JSON backup',
        updatedCount,
        deletedCount: currentCount,
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