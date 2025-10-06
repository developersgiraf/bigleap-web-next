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

// Helper function to write blogs index
function writeBlogsIndex(blogs) {
  try {
    // Ensure blogs directory exists
    if (!fs.existsSync(BLOGS_DIR)) {
      fs.mkdirSync(BLOGS_DIR, { recursive: true });
    }
    
    const sortedBlogs = blogs.sort((a, b) => (a.index || 0) - (b.index || 0));
    fs.writeFileSync(BLOGS_INDEX_FILE, JSON.stringify(sortedBlogs, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing blogs index:', error);
    return false;
  }
}

// Helper function to write individual blog file
function writeBlogFile(id, blogData) {
  try {
    // Ensure blogs directory exists
    if (!fs.existsSync(BLOGS_DIR)) {
      fs.mkdirSync(BLOGS_DIR, { recursive: true });
    }
    
    const blogFile = path.join(BLOGS_DIR, `${id}.json`);
    fs.writeFileSync(blogFile, JSON.stringify(blogData, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing blog file for ${id}:`, error);
    return false;
  }
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
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

// POST /api/blogs - Create new blog
export async function POST(request) {
  try {
    const blogData = await request.json();
    
    // Validate required fields
    if (!blogData.title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }
    
    // Generate ID/slug
    const slug = blogData.customSlug || generateSlug(blogData.title);
    const blogId = slug;
    
    // Check if blog with this ID already exists
    const blogs = readBlogsIndex();
    if (blogs.find(blog => blog.id === blogId)) {
      return NextResponse.json(
        { success: false, error: 'Blog with this title/slug already exists' },
        { status: 409 }
      );
    }
    
    // Prepare blog data
    const newBlog = {
      id: blogId,
      slug: blogId,
      title: blogData.title,
      caption: blogData.caption || '',
      image: blogData.image || '',
      description: blogData.description || '',
      category: blogData.category || '',
      tags: blogData.tags || [],
      author: blogData.author || 'BigLeap Team',
      status: blogData.status || 'draft',
      featured: Boolean(blogData.featured),
      publishedDate: blogData.publishedDate || new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      seo: blogData.seo || {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      }
    };
    
    // Write blog file
    if (!writeBlogFile(blogId, newBlog)) {
      throw new Error('Failed to write blog file');
    }
    
    // Update index
    const updatedBlogs = [...blogs, {
      id: newBlog.id,
      slug: newBlog.slug,
      title: newBlog.title,
      caption: newBlog.caption,
      image: newBlog.image,
      category: newBlog.category,
      status: newBlog.status,
      featured: newBlog.featured,
      publishedDate: newBlog.publishedDate,
      lastModified: newBlog.lastModified
    }];
    
    if (!writeBlogsIndex(updatedBlogs)) {
      throw new Error('Failed to update blogs index');
    }
    
    return NextResponse.json({
      success: true,
      data: newBlog
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}