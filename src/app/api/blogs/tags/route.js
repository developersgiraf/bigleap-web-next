import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'data', 'blogs');
const BLOGS_INDEX_FILE = path.join(BLOGS_DIR, 'index.json');

// Helper function to read blogs index
function readBlogsIndex() {
  try {
    if (!fs.existsSync(BLOGS_INDEX_FILE)) {
      return [];
    }
    
    const data = fs.readFileSync(BLOGS_INDEX_FILE, 'utf8');
    const blogs = JSON.parse(data);
    
    // Filter published only
    return blogs.filter(blog => blog.status === 'published');
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

// GET /api/blogs/tags - Get all available tags
export async function GET() {
  try {
    const blogsIndex = readBlogsIndex();
    const allTags = new Set();
    const tagCounts = {};
    
    // Read each blog file and collect all tags
    for (const blog of blogsIndex) {
      const fullBlogData = readBlogFile(blog.id);
      if (fullBlogData && fullBlogData.tags) {
        fullBlogData.tags.forEach(tag => {
          allTags.add(tag);
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    }
    
    // Convert to array and add counts
    const tagsWithCounts = Array.from(allTags).map(tag => ({
      name: tag,
      count: tagCounts[tag],
      displayName: tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    })).sort((a, b) => b.count - a.count); // Sort by count descending
    
    return NextResponse.json({
      success: true,
      data: tagsWithCounts,
      totalTags: tagsWithCounts.length
    });
  } catch (error) {
    console.error('Error in GET /api/blogs/tags:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}