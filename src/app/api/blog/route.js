import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Retrieve blog posts
export async function GET() {
  try {
    const blogDoc = doc(db, WEBSITE_DATA_COLLECTION, 'blog');
    const docSnap = await getDoc(blogDoc);
    
    if (docSnap.exists()) {
      const blogData = docSnap.data();
      
      // Convert object to array for easier handling
      const posts = Object.keys(blogData).map(key => ({
        id: key,
        title: blogData[key].title || key,
        ...blogData[key]
      }));
      
      return NextResponse.json({
        success: true,
        data: posts,
        total: posts.length
      });
    } else {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0
      });
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request) {
  try {
    const blogData = await request.json();
    
    if (!blogData.title) {
      return NextResponse.json({
        success: false,
        error: 'title is required'
      }, { status: 400 });
    }
    
    const blogDoc = doc(db, WEBSITE_DATA_COLLECTION, 'blog');
    const docSnap = await getDoc(blogDoc);
    
    let currentData = {};
    if (docSnap.exists()) {
      currentData = docSnap.data();
    }
    
    // Generate slug from title
    let slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    // Ensure slug doesn't start with a number (add prefix if needed)
    if (/^[0-9]/.test(slug)) {
      slug = 'post-' + slug;
    }
    
    // Check if blog post already exists
    if (currentData[slug]) {
      return NextResponse.json({
        success: false,
        error: 'Blog post with this title already exists'
      }, { status: 400 });
    }
    
    // Add creation date if not provided
    const postData = {
      ...blogData,
      createdAt: blogData.createdAt || new Date().toISOString(),
      publishedAt: blogData.publishedAt || new Date().toISOString()
    };
    
    // Add new blog post
    const updatedData = {
      ...currentData,
      [slug]: postData
    };
    
    await setDoc(blogDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id: slug,
        ...postData
      },
      message: 'Blog post created successfully'
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}