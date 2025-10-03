import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Get all clients
export async function GET() {
  try {
    const clientsDoc = doc(db, WEBSITE_DATA_COLLECTION, 'clients');
    const docSnap = await getDoc(clientsDoc);
    
    if (docSnap.exists()) {
      const clientsData = docSnap.data();
      
      // Convert object to array format for easier frontend handling
      const clientsArray = Object.entries(clientsData).map(([id, data]) => ({
        id,
        ...data
      }));
      
      return NextResponse.json({
        success: true,
        data: clientsArray
      });
    } else {
      return NextResponse.json({
        success: true,
        data: []
      });
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new client
export async function POST(request) {
  try {
    const clientData = await request.json();
    
    // Validate required fields
    if (!clientData.name) {
      return NextResponse.json({
        success: false,
        error: 'Client name is required'
      }, { status: 400 });
    }
    
    // Generate client ID from name
    let clientId = clientData.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    // Ensure ID doesn't start with a number (add prefix if needed)
    if (/^[0-9]/.test(clientId)) {
      clientId = 'client-' + clientId;
    }
    
    const clientsDoc = doc(db, WEBSITE_DATA_COLLECTION, 'clients');
    const docSnap = await getDoc(clientsDoc);
    
    let currentData = {};
    if (docSnap.exists()) {
      currentData = docSnap.data();
    }
    
    // Check if client with this ID already exists
    if (currentData[clientId]) {
      return NextResponse.json({
        success: false,
        error: 'Client with this name already exists'
      }, { status: 409 });
    }
    
    // Add timestamps
    const newClient = {
      ...clientData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedData = {
      ...currentData,
      [clientId]: newClient
    };
    
    await setDoc(clientsDoc, updatedData);
    
    return NextResponse.json({
      success: true,
      data: {
        id: clientId,
        ...newClient
      },
      message: 'Client created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}