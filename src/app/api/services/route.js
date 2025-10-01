import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Retrieve services data
export async function GET() {
  try {
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const docSnap = await getDoc(servicesDoc);
    
    if (docSnap.exists()) {
      const servicesData = docSnap.data();
      
      // Convert object to array for easier handling
      const services = Object.keys(servicesData).map(key => ({
        id: key,
        title: servicesData[key].bannerTitle || key,
        ...servicesData[key]
      }));
      
      return NextResponse.json({
        success: true,
        data: services,
        total: services.length
      });
    } else {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0
      });
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new service
export async function POST(request) {
  try {
    const serviceData = await request.json();
    
    if (!serviceData.bannerTitle) {
      return NextResponse.json({
        success: false,
        error: 'bannerTitle is required'
      }, { status: 400 });
    }
    
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const docSnap = await getDoc(servicesDoc);
    
    let currentData = {};
    if (docSnap.exists()) {
      currentData = docSnap.data();
    }
    
    // Generate slug from title
    const slug = serviceData.bannerTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    // Check if service already exists
    if (currentData[slug]) {
      return NextResponse.json({
        success: false,
        error: 'Service with this title already exists'
      }, { status: 400 });
    }
    
    // Add new service
    const updatedData = {
      ...currentData,
      [slug]: serviceData
    };
    
    await setDoc(servicesDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id: slug,
        title: serviceData.bannerTitle,
        ...serviceData
      },
      message: 'Service created successfully'
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}