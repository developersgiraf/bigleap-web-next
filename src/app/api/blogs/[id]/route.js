import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'data', 'blogs');

// Helper function to read individual blog file
function readBlogFile(id) {
  try {
    const blogFile = path.join(BLOGS_DIR, `${id}.json`);
    
    if (!fs.existsSync(blogFile)) {
      return null;
    }
    
    const data = fs.readFileSync(blogFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading blog file for ${id}:`, error);
    return null;
  }
}

// Helper function to read blogs index to validate ID
function readBlogsIndex() {
  try {
    const indexFile = path.join(BLOGS_DIR, 'index.json');
    if (!fs.existsSync(indexFile)) {
      return [];
    }
    
    const data = fs.readFileSync(indexFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blogs index:', error);
    return [];
  }
}

// GET /api/blogs/[id] - Get blog by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }
    
    // First check if blog exists in index
    const blogsIndex = readBlogsIndex();
    const blogExists = blogsIndex.find(blog => blog.id === id || blog.slug === id);
    
    if (!blogExists) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    // Read the full blog data
    let blogData = readBlogFile(id);
    
    // If not found by ID, try by slug
    if (!blogData && blogExists.slug !== id) {
      blogData = readBlogFile(blogExists.id);
    }
    
    if (!blogData) {
      return NextResponse.json(
        { success: false, error: 'Blog data not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: blogData
    });
  } catch (error) {
    console.error('Error in GET /api/blogs/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}