import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';

export async function GET() {
  try {
    await servicesAPI.initialize();
    
    // Get all services from index (lightweight data)
    const indexResult = await servicesAPI.getAll();
    
    if (!indexResult.success) {
      throw new Error('Failed to load services index');
    }
    
    // Get full data for each service
    const servicesWithFullData = {};
    
    for (const serviceIndex of indexResult.data) {
      try {
        const fullServiceResult = await servicesAPI.getById(serviceIndex.id);
        if (fullServiceResult.success) {
          // Add index data to full service data
          const fullService = {
            ...fullServiceResult.data,
            index: serviceIndex.index, // Ensure index is included
            archived: serviceIndex.archived // Ensure archived status is included
          };
          servicesWithFullData[serviceIndex.id] = fullService;
        } else {
          console.warn(`Failed to load full data for service: ${serviceIndex.id}`);
          // Fallback to index data only
          servicesWithFullData[serviceIndex.id] = serviceIndex;
        }
      } catch (serviceError) {
        console.warn(`Error loading service ${serviceIndex.id}:`, serviceError);
        // Fallback to index data only
        servicesWithFullData[serviceIndex.id] = serviceIndex;
      }
    }
    
    // Build the backup data structure (matching the provided sample format)
    const backupData = {
      WebsiteDatas: {
        services: {
          id: "services", // Add the services collection identifier
          ...servicesWithFullData
        }
      },
      exportInfo: {
        timestamp: new Date().toISOString(),
        totalDocuments: Object.keys(servicesWithFullData).length,
        collections: ['WebsiteDatas'],
        source: 'JSON Files'
      }
    };

    return NextResponse.json(backupData);
  } catch (error) {
    console.error('Error creating database backup:', error);
    return NextResponse.json(
      { error: 'Failed to create database backup' },
      { status: 500 }
    );
  }
}