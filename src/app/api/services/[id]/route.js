import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Get single service by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const docSnap = await getDoc(servicesDoc);
    
    if (docSnap.exists()) {
      const servicesData = docSnap.data();
      
      if (servicesData[id]) {
        return NextResponse.json({
          success: true,
          data: {
            id,
            title: servicesData[id].bannerTitle || id,
            ...servicesData[id]
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Service not found'
        }, { status: 404 });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: 'Services collection not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// PUT - Update existing service
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const serviceData = await request.json();
    
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const docSnap = await getDoc(servicesDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Services collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    if (!currentData[id]) {
      return NextResponse.json({
        success: false,
        error: 'Service not found'
      }, { status: 404 });
    }
    
    // Update the service
    const updatedService = {
      ...currentData[id],
      ...serviceData
    };
    
    const updatedData = {
      ...currentData,
      [id]: updatedService
    };
    
    await setDoc(servicesDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id,
        title: updatedService.bannerTitle || id,
        ...updatedService
      },
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete service
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const docSnap = await getDoc(servicesDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Services collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    if (!currentData[id]) {
      return NextResponse.json({
        success: false,
        error: 'Service not found'
      }, { status: 404 });
    }
    
    // Remove the service from the object
    const { [id]: removedService, ...remainingData } = currentData;
    
    await setDoc(servicesDoc, remainingData);
    
    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}