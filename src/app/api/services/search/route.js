import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../lib/services-simple.js';

// GET - Search services
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    // Get all services from JSON
    let services = await servicesAPI.getAll();
    
    // Filter by search query if provided
    if (query.trim()) {
      const searchLower = query.toLowerCase();
      services = services.filter(service => 
        service.title?.toLowerCase().includes(searchLower) ||
        service.bannerTitle?.toLowerCase().includes(searchLower) ||
        service.section01?.heading?.toLowerCase().includes(searchLower) ||
        service.section01?.description?.toLowerCase().includes(searchLower)
      );
    }
    
    return NextResponse.json({
      success: true,
      data: services,
      total: services.length,
      query: query
    });
  } catch (error) {
    console.error('Error searching services:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}