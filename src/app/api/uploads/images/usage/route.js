import { NextResponse } from 'next/server';
import { servicesAPI } from '../../../../../lib/services-simple.js';

export async function POST(request) {
  try {
    const { imageUrl } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json({
        success: false,
        error: 'Image URL is required'
      }, { status: 400 });
    }

    // Check which services are using this image
    const allServices = await servicesAPI.getAll();
    const usedByServices = [];
    
    allServices.forEach(serviceData => {
      // Check all possible image fields in the service
      const imageFields = [
        serviceData.section01?.image,
        serviceData.section02?.image,
        serviceData.section03?.image,
        serviceData.section04?.image,
        serviceData.section05?.image,
        serviceData.bannerImage,
        serviceData.thumbnailImage,
        serviceData.thumbnail
      ];
      
      if (imageFields.some(field => field === imageUrl)) {
        usedByServices.push({
          id: serviceData.id,
          title: serviceData.bannerTitle || serviceData.title || serviceData.id,
          archived: serviceData.archived || false
        });
      }
    });

    // TODO: When portfolio and blog are migrated to JSON, add them here
    const usedByPortfolio = [];
    const usedByBlog = [];

    return NextResponse.json({
      success: true,
      data: {
        services: usedByServices,
        portfolio: usedByPortfolio,
        blog: usedByBlog,
        totalUsage: usedByServices.length + usedByPortfolio.length + usedByBlog.length
      }
    });
  } catch (error) {
    console.error('Error checking image usage:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check image usage'
    }, { status: 500 });
  }
}