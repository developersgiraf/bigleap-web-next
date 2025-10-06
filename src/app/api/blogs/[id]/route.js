// Simple Individual Blog API - Much cleaner!
import { blogsAPI } from '../../../../lib/blogs-simple.js';

// GET - Get single blog
export async function GET(request, { params }) {
  const { id } = await params;
  const result = await blogsAPI.getById(id);
  
  if (result.success) {
    return Response.json(result);
  } else {
    return Response.json(result, { status: 404 });
  }
}

// PUT - Update blog
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const blogData = await request.json();
    const result = await blogsAPI.update(id, blogData);
    
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

// DELETE - Delete blog
export async function DELETE(request, { params }) {
  const { id } = await params;
  const result = await blogsAPI.delete(id);
  
  if (result.success) {
    return Response.json(result);
  } else {
    return Response.json(result, { status: 400 });
  }
}