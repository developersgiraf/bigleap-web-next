import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export async function fetchServiceData(serviceSlug) {
  try {
    const docRef = doc(db, 'WebsiteDatas', 'services');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const allServices = docSnap.data();
      
      // Find service by custom slug or regular slug
      const serviceData = Object.values(allServices).find(service => 
        service.customSlug === serviceSlug || 
        service.slug === serviceSlug || 
        service.id === serviceSlug
      );
      
      if (serviceData) {
        // Convert legacy subhead/subdes format to new subsections format for backward compatibility
        if (!serviceData.section02?.subsections && serviceData.section02) {
          const subsections = [];
          for (let i = 1; i <= 4; i++) {
            const heading = serviceData.section02[`subhead${i}`];
            const description = serviceData.section02[`subdes${i}`];
            if (heading && description) {
              subsections.push({ heading, description });
            }
          }
          serviceData.section02.subsections = subsections;
        }
        
        return serviceData;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching service data:', error);
    return null;
  }
}

export async function getAllServiceSlugs() {
  try {
    const docRef = doc(db, 'WebsiteDatas', 'services');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const allServices = docSnap.data();
      return Object.values(allServices)
        .filter(service => !service.archived)
        .map(service => ({
          params: { 
            service: service.customSlug || service.slug || service.id 
          }
        }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}