import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Get single client by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const clientsDoc = doc(db, WEBSITE_DATA_COLLECTION, 'clients');
    const docSnap = await getDoc(clientsDoc);
    
    if (docSnap.exists()) {
      const clientsData = docSnap.data();
      
      if (clientsData[id]) {
        return NextResponse.json({
          success: true,
          data: {
            id,
            ...clientsData[id]
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Client not found'
        }, { status: 404 });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: 'Clients collection not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// PUT - Update existing client
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const clientData = await request.json();
    
    const clientsDoc = doc(db, WEBSITE_DATA_COLLECTION, 'clients');
    const docSnap = await getDoc(clientsDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Clients collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    if (!currentData[id]) {
      return NextResponse.json({
        success: false,
        error: 'Client not found'
      }, { status: 404 });
    }
    
    // Update the client
    const updatedClient = {
      ...currentData[id],
      ...clientData,
      updatedAt: new Date().toISOString()
    };
    
    const updatedData = {
      ...currentData,
      [id]: updatedClient
    };
    
    await setDoc(clientsDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id,
        ...updatedClient
      },
      message: 'Client updated successfully'
    });
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete client
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const clientsDoc = doc(db, WEBSITE_DATA_COLLECTION, 'clients');
    const docSnap = await getDoc(clientsDoc);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Clients collection not found'
      }, { status: 404 });
    }
    
    const currentData = docSnap.data();
    
    if (!currentData[id]) {
      return NextResponse.json({
        success: false,
        error: 'Client not found'
      }, { status: 404 });
    }
    
    // Remove the client from the object
    const { [id]: removedClient, ...remainingData } = currentData;
    
    await setDoc(clientsDoc, remainingData);
    
    return NextResponse.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}