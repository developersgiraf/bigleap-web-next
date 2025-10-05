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
    const { id } = await params;
    
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

// Helper function to write blogs index
function writeBlogsIndex(blogs) {
  try {
    const indexFile = path.join(BLOGS_DIR, 'index.json');
    const sortedBlogs = blogs.sort((a, b) => (a.index || 0) - (b.index || 0));
    fs.writeFileSync(indexFile, JSON.stringify(sortedBlogs, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing blogs index:', error);
    return false;
  }
}

// Helper function to write individual blog file
function writeBlogFile(id, blogData) {
  try {
    const blogFile = path.join(BLOGS_DIR, `${id}.json`);
    fs.writeFileSync(blogFile, JSON.stringify(blogData, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing blog file for ${id}:`, error);
    return false;
  }
}

// PUT /api/blogs/[id] - Update blog by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }
    
    // Check if blog exists
    const blogsIndex = readBlogsIndex();
    const blogIndex = blogsIndex.findIndex(blog => blog.id === id || blog.slug === id);
    
    if (blogIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    const existingBlog = blogsIndex[blogIndex];
    const blogData = readBlogFile(existingBlog.id);
    
    if (!blogData) {
      return NextResponse.json(
        { success: false, error: 'Blog data not found' },
        { status: 404 }
      );
    }
    
    // Update blog data (preserve ID and slug)
    const updatedBlog = {
      ...blogData,
      ...updateData,
      id: existingBlog.id, // Preserve original ID
      slug: existingBlog.slug, // Preserve original slug
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    // Write updated blog file
    if (!writeBlogFile(existingBlog.id, updatedBlog)) {
      throw new Error('Failed to write blog file');
    }
    
    // Update index
    blogsIndex[blogIndex] = {
      id: updatedBlog.id,
      slug: updatedBlog.slug,
      title: updatedBlog.title,
      caption: updatedBlog.caption || '',
      image: updatedBlog.image || '',
      category: updatedBlog.category || '',
      status: updatedBlog.status || 'draft',
      featured: Boolean(updatedBlog.featured),
      publishedDate: updatedBlog.publishedDate,
      lastModified: updatedBlog.lastModified
    };
    
    if (!writeBlogsIndex(blogsIndex)) {
      throw new Error('Failed to update blogs index');
    }
    
    return NextResponse.json({
      success: true,
      data: updatedBlog
    });
    
  } catch (error) {
    console.error('Error in PUT /api/blogs/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete blog by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }
    
    // Check if blog exists
    const blogsIndex = readBlogsIndex();
    const blogIndex = blogsIndex.findIndex(blog => blog.id === id || blog.slug === id);
    
    if (blogIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    const blogToDelete = blogsIndex[blogIndex];
    
    // Delete blog file
    try {
      const blogFile = path.join(BLOGS_DIR, `${blogToDelete.id}.json`);
      if (fs.existsSync(blogFile)) {
        fs.unlinkSync(blogFile);
      }
    } catch (error) {
      console.error(`Error deleting blog file for ${blogToDelete.id}:`, error);
    }
    
    // Remove from index
    blogsIndex.splice(blogIndex, 1);
    
    if (!writeBlogsIndex(blogsIndex)) {
      throw new Error('Failed to update blogs index');
    }
    
    return NextResponse.json({
      success: true,
      message: `Blog '${blogToDelete.title}' deleted successfully`
    });
    
  } catch (error) {
    console.error('Error in DELETE /api/blogs/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}