import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Get single service by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
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
    const { id } = await params;
    const serviceData = await request.json();
    
    console.log('PUT request for service ID:', id);
    console.log('Service data received:', { bannerTitle: serviceData.bannerTitle, customSlug: serviceData.customSlug });
    
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const docSnap = await getDoc(servicesDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Services collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    console.log('Available services:', Object.keys(currentData || {}));
    
    if (!currentData[id]) {
      console.log(`Service '${id}' not found in database`);
      return NextResponse.json({
        success: false,
        error: 'Service not found'
      }, { status: 404 });
    }

    // Determine the final slug/id to use
    let finalSlug = id; // Default to current id
    let slugChanged = false;

    if (serviceData.customSlug) {
      // Validate custom slug format
      const slugPattern = /^[a-zA-Z][a-zA-Z0-9-_]*$/;
      if (!slugPattern.test(serviceData.customSlug)) {
        return NextResponse.json({
          success: false,
          error: 'Custom slug must start with a letter and contain only letters, numbers, hyphens, and underscores'
        }, { status: 400 });
      }

      finalSlug = serviceData.customSlug;
      slugChanged = finalSlug !== id;

      // Check if the new slug already exists (only if it's different from current)
      if (slugChanged && currentData[finalSlug]) {
        return NextResponse.json({
          success: false,
          error: 'A service with this slug already exists'
        }, { status: 409 });
      }
    } else {
      // Auto-generate slug from bannerTitle if no custom slug provided
      if (serviceData.bannerTitle) {
        const generatedSlug = generateServiceId(serviceData.bannerTitle);
        finalSlug = generatedSlug;
        slugChanged = finalSlug !== id;

        // Check if the new slug already exists (only if it's different from current)
        if (slugChanged && currentData[finalSlug]) {
          return NextResponse.json({
            success: false,
            error: 'A service with this auto-generated slug already exists'
          }, { status: 409 });
        }
      }
    }
    
    // Update the service with new data
    const updatedService = {
      ...currentData[id],
      ...serviceData,
      slug: finalSlug // Store the slug in the service data
    };

    let updatedData;

    if (slugChanged) {
      // Create new entry with new slug and remove old entry
      updatedData = { ...currentData };
      updatedData[finalSlug] = updatedService;
      delete updatedData[id];
    } else {
      // Just update the existing entry
      updatedData = {
        ...currentData,
        [id]: updatedService
      };
    }
    
    await setDoc(servicesDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id: finalSlug,
        oldId: slugChanged ? id : undefined,
        title: updatedService.bannerTitle || finalSlug,
        ...updatedService
      },
      message: 'Service updated successfully',
      slugChanged
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
    const { id } = await params;
    
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