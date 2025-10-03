// Simple Services API - Clean & Fast!
import { servicesAPI } from '../../../lib/services-simple.js';

// GET - Retrieve all services (lightweight index)
export async function GET() {
  await servicesAPI.initialize();
  const result = await servicesAPI.getAll();
  
  if (result.success) {
    return Response.json(result);
  } else {
    return Response.json(result, { status: 500 });
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