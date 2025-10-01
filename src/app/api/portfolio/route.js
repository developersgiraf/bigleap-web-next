import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Retrieve portfolio data
export async function GET() {
  try {
    const portfolioDoc = doc(db, WEBSITE_DATA_COLLECTION, 'portfolio');
    const docSnap = await getDoc(portfolioDoc);
    
    if (docSnap.exists()) {
      const portfolioData = docSnap.data();
      
      // Convert object to array for easier handling
      const portfolio = Object.keys(portfolioData).map(key => ({
        id: key,
        title: portfolioData[key].title || key,
        ...portfolioData[key]
      }));
      
      return NextResponse.json({
        success: true,
        data: portfolio,
        total: portfolio.length
      });
    } else {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0
      });
    }
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new portfolio item
export async function POST(request) {
  try {
    const portfolioData = await request.json();
    
    if (!portfolioData.title) {
      return NextResponse.json({
        success: false,
        error: 'title is required'
      }, { status: 400 });
    }
    
    const portfolioDoc = doc(db, WEBSITE_DATA_COLLECTION, 'portfolio');
    const docSnap = await getDoc(portfolioDoc);
    
    let currentData = {};
    if (docSnap.exists()) {
      currentData = docSnap.data();
    }
    
    // Generate slug from title
    const slug = portfolioData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    // Check if portfolio item already exists
    if (currentData[slug]) {
      return NextResponse.json({
        success: false,
        error: 'Portfolio item with this title already exists'
      }, { status: 400 });
    }
    
    // Add new portfolio item
    const updatedData = {
      ...currentData,
      [slug]: portfolioData
    };
    
    await setDoc(portfolioDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id: slug,
        ...portfolioData
      },
      message: 'Portfolio item created successfully'
    });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}