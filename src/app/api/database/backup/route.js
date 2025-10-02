import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';

export async function GET() {
  try {
    // Get all services from JSON files
    const services = await servicesAPI.getAll();
    
    // Build the backup data structure (maintaining Firebase-like format for compatibility)
    const backupData = {
      WebsiteDatas: {
        services: {}
      },
      exportInfo: {
        timestamp: new Date().toISOString(),
        totalDocuments: services.length,
        collections: ['WebsiteDatas'],
        source: 'JSON Files'
      }
    };

    // Convert services array back to object format for backup compatibility
    services.forEach(service => {
      backupData.WebsiteDatas.services[service.id] = service;
    });

    return NextResponse.json(backupData);
  } catch (error) {
    console.error('Error creating database backup:', error);
    return NextResponse.json(
      { error: 'Failed to create database backup' },
      { status: 500 }
    );
  }
}