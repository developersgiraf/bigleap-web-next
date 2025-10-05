import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'data', 'blogs');
const BLOGS_INDEX_FILE = path.join(BLOGS_DIR, 'index.json');

// Helper function to read blogs index
function readBlogsIndex() {
  try {
    if (!fs.existsSync(BLOGS_INDEX_FILE)) {
      console.error('Blogs index file not found:', BLOGS_INDEX_FILE);
      return [];
    }
    
    const data = fs.readFileSync(BLOGS_INDEX_FILE, 'utf8');
    const blogs = JSON.parse(data);
    
    // Sort by index for consistent ordering
    return blogs.sort((a, b) => (a.index || 0) - (b.index || 0));
  } catch (error) {
    console.error('Error reading blogs index:', error);
    return [];
  }
}

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

// GET /api/blogs - Get all blogs
export async function GET() {
  try {
    const blogs = readBlogsIndex();
    
    return NextResponse.json({
      success: true,
      data: blogs,
      count: blogs.length
    });
  } catch (error) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}