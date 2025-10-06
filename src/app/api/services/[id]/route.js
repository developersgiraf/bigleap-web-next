// Individual Service API with legacy route handling
import { servicesAPI } from '../../../../lib/services-simple.js';

// GET - Get single service (with legacy stats route handling)
export async function GET(request, { params }) {
  const { id } = await params;
  
  // Handle legacy /api/services/stats route
  if (id === 'stats') {
    await servicesAPI.initialize();
    const result = await servicesAPI.getStats();
    return Response.json(result);
  }
  
  // Handle legacy /api/services/search route  
  if (id === 'search') {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    let services = await servicesAPI.getAll();
    
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
  
  // Normal service by ID
  const result = await servicesAPI.getById(id);
  
  if (result.success) {
    return Response.json(result);
  } else {
    return Response.json(result, { status: 404 });
  }
}

// PUT - Update service
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const serviceData = await request.json();
    const result = await servicesAPI.update(id, serviceData);
    
    if (result.success) {
      return Response.json(result);
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

// DELETE - Delete service
export async function DELETE(request, { params }) {
  const { id } = await params;
  const result = await servicesAPI.delete(id);
  
  if (result.success) {
    return Response.json(result);
  } else {
    return Response.json(result, { status: 400 });
  }
}