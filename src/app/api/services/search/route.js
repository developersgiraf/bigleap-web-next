import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

// GET - Search services
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const docSnap = await getDoc(servicesDoc);
    
    if (docSnap.exists()) {
      const servicesData = docSnap.data();
      
      // Convert to array
      let services = Object.keys(servicesData).map(key => ({
        id: key,
        title: servicesData[key].bannerTitle || key,
        ...servicesData[key]
      }));
      
      // Filter by search query if provided
      if (query.trim()) {
        const searchLower = query.toLowerCase();
        services = services.filter(service => 
          service.title?.toLowerCase().includes(searchLower) ||
          service.bannerTitle?.toLowerCase().includes(searchLower) ||
          service.section01?.heading?.toLowerCase().includes(searchLower) ||
          service.section01?.description?.toLowerCase().includes(searchLower)
        );
      }
      
      return NextResponse.json({
        success: true,
        data: services,
        total: services.length,
        query: query
      });
    } else {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        query: query
      });
    }
  } catch (error) {
    console.error('Error searching services:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}