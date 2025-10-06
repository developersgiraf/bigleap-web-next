// Unified Blogs API - Clean & Fast!
import { blogsAPI } from '../../../lib/blogs-simple.js';

// GET - Retrieve blogs with optional tags functionality
export async function GET(request) {
  try {
    await blogsAPI.initialize();
    const { searchParams } = new URL(request.url);
    
    // Check for tags request
    if (searchParams.get('tags') === 'true') {
      const result = await blogsAPI.getTags();
      
      if (result.success) {
        return Response.json(result);
      } else {
        return Response.json(result, { status: 500 });
      }
    }
    
    // Check for specific tag filter
    const tag = searchParams.get('tag');
    if (tag) {
      const result = await blogsAPI.getByTag(tag);
      
      if (result.success) {
        return Response.json(result);
      } else {
        return Response.json(result, { status: 500 });
      }
    }
    
    // Default: get all blogs
    const result = await blogsAPI.getAll();
    
    if (result.success) {
      return Response.json({
        success: true,
        data: result.data,
        count: result.data.length
      });
    } else {
      return Response.json(result, { status: 500 });
    }
  } catch (error) {
    console.error('Error in blogs API:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new blog
export async function POST(request) {
  try {
    const blogData = await request.json();
    
    // Validate required fields
    if (!blogData.title) {
      return Response.json({ 
        success: false, 
        error: 'Title is required' 
      }, { status: 400 });
    }
    
    const result = await blogsAPI.create(blogData);
    
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