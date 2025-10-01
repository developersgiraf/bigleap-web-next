import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Get single portfolio item by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const portfolioDoc = doc(db, WEBSITE_DATA_COLLECTION, 'portfolio');
    const docSnap = await getDoc(portfolioDoc);
    
    if (docSnap.exists()) {
      const portfolioData = docSnap.data();
      
      if (portfolioData[id]) {
        return NextResponse.json({
          success: true,
          data: {
            id,
            ...portfolioData[id]
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Portfolio item not found'
        }, { status: 404 });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: 'Portfolio collection not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// PUT - Update existing portfolio item
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const portfolioData = await request.json();
    
    const portfolioDoc = doc(db, WEBSITE_DATA_COLLECTION, 'portfolio');
    const docSnap = await getDoc(portfolioDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Portfolio collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    if (!currentData[id]) {
      return NextResponse.json({
        success: false,
        error: 'Portfolio item not found'
      }, { status: 404 });
    }
    
    // Update the portfolio item
    const updatedItem = {
      ...currentData[id],
      ...portfolioData,
      updatedAt: new Date().toISOString()
    };
    
    const updatedData = {
      ...currentData,
      [id]: updatedItem
    };
    
    await setDoc(portfolioDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id,
        ...updatedItem
      },
      message: 'Portfolio item updated successfully'
    });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete portfolio item
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const portfolioDoc = doc(db, WEBSITE_DATA_COLLECTION, 'portfolio');
    const docSnap = await getDoc(portfolioDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Portfolio collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    if (!currentData[id]) {
      return NextResponse.json({
        success: false,
        error: 'Portfolio item not found'
      }, { status: 404 });
    }
    
    // Remove the portfolio item from the object
    const { [id]: removedItem, ...remainingData } = currentData;
    
    await setDoc(portfolioDoc, remainingData);
    
    return NextResponse.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}