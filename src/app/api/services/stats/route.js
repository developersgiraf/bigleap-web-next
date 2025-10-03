import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Get services statistics
export async function GET() {
  try {
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const docSnap = await getDoc(servicesDoc);
    
    if (docSnap.exists()) {
      const servicesData = docSnap.data();
      const services = Object.values(servicesData); // Get service objects, not just keys
      
      const stats = {
        total: services.length,
        active: services.filter(service => !service.archived).length,
        archived: services.filter(service => service.archived).length,
        draft: 0
      };
      
      return NextResponse.json({
        success: true,
        data: stats
      });
    } else {
      return NextResponse.json({
        success: true,
        data: {
          total: 0,
          active: 0,
          archived: 0,
          draft: 0
        }
      });
    }
  } catch (error) {
    console.error('Error getting service stats:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}