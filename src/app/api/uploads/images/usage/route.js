import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';

const WEBSITE_DATA_COLLECTION = 'WebsiteDatas';

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
    const servicesDoc = doc(db, WEBSITE_DATA_COLLECTION, 'services');
    const servicesSnap = await getDoc(servicesDoc);
    
    const usedByServices = [];
    
    if (servicesSnap.exists()) {
      const servicesData = servicesSnap.data();
      
      Object.entries(servicesData).forEach(([serviceId, serviceData]) => {
        // Check all possible image fields in the service
        const imageFields = [
          serviceData.section01?.image,
          serviceData.section02?.image,
          serviceData.section03?.image,
          serviceData.section04?.image,
          serviceData.section05?.image,
          serviceData.bannerImage,
          serviceData.thumbnailImage
        ];
        
        if (imageFields.some(field => field === imageUrl)) {
          usedByServices.push({
            id: serviceId,
            title: serviceData.bannerTitle || serviceId,
            archived: serviceData.archived || false
          });
        }
      });
    }

    // Check portfolio usage
    const portfolioDoc = doc(db, WEBSITE_DATA_COLLECTION, 'portfolio');
    const portfolioSnap = await getDoc(portfolioDoc);
    
    const usedByPortfolio = [];
    
    if (portfolioSnap.exists()) {
      const portfolioData = portfolioSnap.data();
      
      Object.entries(portfolioData).forEach(([portfolioId, portfolio]) => {
        if (portfolio.image === imageUrl || portfolio.thumbnail === imageUrl) {
          usedByPortfolio.push({
            id: portfolioId,
            title: portfolio.title || portfolioId
          });
        }
      });
    }

    // Check blog usage
    const blogDoc = doc(db, WEBSITE_DATA_COLLECTION, 'blog');
    const blogSnap = await getDoc(blogDoc);
    
    const usedByBlog = [];
    
    if (blogSnap.exists()) {
      const blogData = blogSnap.data();
      
      Object.entries(blogData).forEach(([blogId, blog]) => {
        if (blog.image === imageUrl || blog.thumbnail === imageUrl) {
          usedByBlog.push({
            id: blogId,
            title: blog.title || blogId
          });
        }
      });
    }

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