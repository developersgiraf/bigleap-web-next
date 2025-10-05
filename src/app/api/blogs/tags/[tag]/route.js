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
    
    // Sort by index for consistent ordering and filter published only
    return blogs
      .filter(blog => blog.status === 'published')
      .sort((a, b) => (a.index || 0) - (b.index || 0));
  } catch (error) {
    console.error('Error reading blogs index:', error);
    return [];
  }
}

// Helper function to read individual blog file to get tags
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

// GET /api/blogs/tags/[tag] - Get blogs by tag
export async function GET(request, { params }) {
  try {
    const { tag } = params;
    
    if (!tag) {
      return NextResponse.json(
        { success: false, error: 'Tag is required' },
        { status: 400 }
      );
    }
    
    // Get all published blogs
    const blogsIndex = readBlogsIndex();
    const filteredBlogs = [];
    
    // Read each blog file and check if it has the requested tag
    for (const blog of blogsIndex) {
      const fullBlogData = readBlogFile(blog.id);
      if (fullBlogData && fullBlogData.tags && fullBlogData.tags.includes(tag)) {
        // Return the index data with tags info
        filteredBlogs.push({
          ...blog,
          tags: fullBlogData.tags
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      data: filteredBlogs,
      count: filteredBlogs.length,
      tag: tag
    });
  } catch (error) {
    console.error('Error in GET /api/blogs/tags/[tag]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}