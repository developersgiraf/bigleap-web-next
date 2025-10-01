import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Get single blog post by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const blogDoc = doc(db, WEBSITE_DATA_COLLECTION, 'blog');
    const docSnap = await getDoc(blogDoc);
    
    if (docSnap.exists()) {
      const blogData = docSnap.data();
      
      if (blogData[id]) {
        return NextResponse.json({
          success: true,
          data: {
            id,
            ...blogData[id]
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Blog post not found'
        }, { status: 404 });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: 'Blog collection not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// PUT - Update existing blog post
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const blogData = await request.json();
    
    const blogDoc = doc(db, WEBSITE_DATA_COLLECTION, 'blog');
    const docSnap = await getDoc(blogDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Blog collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    if (!currentData[id]) {
      return NextResponse.json({
        success: false,
        error: 'Blog post not found'
      }, { status: 404 });
    }
    
    // Update the blog post
    const updatedPost = {
      ...currentData[id],
      ...blogData,
      updatedAt: new Date().toISOString()
    };
    
    const updatedData = {
      ...currentData,
      [id]: updatedPost
    };
    
    await setDoc(blogDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id,
        ...updatedPost
      },
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete blog post
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const blogDoc = doc(db, WEBSITE_DATA_COLLECTION, 'blog');
    const docSnap = await getDoc(blogDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Blog collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    if (!currentData[id]) {
      return NextResponse.json({
        success: false,
        error: 'Blog post not found'
      }, { status: 404 });
    }
    
    // Remove the blog post from the object
    const { [id]: removedPost, ...remainingData } = currentData;
    
    await setDoc(blogDoc, remainingData);
    
    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}