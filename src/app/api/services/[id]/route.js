// Simple Individual Service API - Much cleaner!
import { servicesAPI } from '../../../../lib/services-simple.js';

// GET - Get single service
export async function GET(request, { params }) {
  const { id } = await params;
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