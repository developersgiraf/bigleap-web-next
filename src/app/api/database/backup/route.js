import { NextResponse } from 'next/server';
import { db } from '../../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    // Get all documents from WebsiteDatas collection
    const websiteDataRef = collection(db, 'WebsiteDatas');
    const snapshot = await getDocs(websiteDataRef);
    
    if (snapshot.empty) {
      return NextResponse.json({
        WebsiteDatas: {},
        exportInfo: {
          timestamp: new Date().toISOString(),
          totalDocuments: 0,
          collections: ['WebsiteDatas']
        }
      });
    }

    // Build the backup data structure
    const backupData = {
      WebsiteDatas: {},
      exportInfo: {
        timestamp: new Date().toISOString(),
        totalDocuments: snapshot.size,
        collections: ['WebsiteDatas']
      }
    };

    // Add each document to the backup
    snapshot.forEach((doc) => {
      backupData.WebsiteDatas[doc.id] = {
        id: doc.id,
        ...doc.data()
      };
    });

    return NextResponse.json(backupData);
  } catch (error) {
    console.error('Error creating database backup:', error);
    return NextResponse.json(
      { error: 'Failed to create database backup' },
      { status: 500 }
    );
  }
}