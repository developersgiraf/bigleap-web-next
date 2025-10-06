// Unified Services API - Clean & Fast!
import { servicesAPI } from '../../../lib/services-simple.js';

// GET - Retrieve services with optional search and stats
export async function GET(request) {
  try {
    await servicesAPI.initialize();
    const { searchParams } = new URL(request.url);
    
    // Check for stats request
    if (searchParams.get('stats') === 'true') {
      const result = await servicesAPI.getStats();
      return Response.json(result);
    }
    
    // Check for search query
    const query = searchParams.get('q');
    if (query) {
      let services = await servicesAPI.getAll();
      
      // Filter by search query
      if (query.trim()) {
        const searchLower = query.toLowerCase();
        services = services.filter(service => 
          service.title?.toLowerCase().includes(searchLower) ||
          service.bannerTitle?.toLowerCase().includes(searchLower) ||
          service.section01?.heading?.toLowerCase().includes(searchLower) ||
          service.section01?.description?.toLowerCase().includes(searchLower)
        );
      }
      
      return Response.json({
        success: true,
        data: services,
        total: services.length,
        query: query
      });
    }
    
    // Default: get all services
    const result = await servicesAPI.getAll();
    
    if (result.success) {
      return Response.json(result);
    } else {
      return Response.json(result, { status: 500 });
    }
  } catch (error) {
    console.error('Error in services API:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new service
export async function POST(request) {
  try {
    const serviceData = await request.json();
    const result = await servicesAPI.create(serviceData);
    
    if (result.success) {
      return Response.json(result, { status: 201 });
    } else {
      return Response.json(result, { status: 400 });
    }
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Invalid request data' 
    }, { status: 400 });
  }
}