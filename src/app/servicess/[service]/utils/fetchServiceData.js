// Import the services API for server-side access
import { servicesAPI } from '../../../../lib/services-simple.js';

export async function fetchServiceData(serviceSlug) {
  try {
    // Check if we're in a server environment (build time or server-side)
    const isServer = typeof window === 'undefined';
    
    let allServices;
    
    if (isServer) {
      // During build time or server-side rendering, use direct API access
      await servicesAPI.initialize();
      const result = await servicesAPI.getAll();
      if (!result.success) {
        throw new Error('Failed to fetch services from API');
      }
      allServices = result.data;
    } else {
      // Client-side, use fetch
      const response = await fetch('/api/services');
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const result = await response.json();
      allServices = result.data || result; // Handle both formats
    }
    
    // Find service by custom slug or regular slug
    const serviceData = allServices.find(service => 
      service.customSlug === serviceSlug || 
      service.slug === serviceSlug || 
      service.id === serviceSlug
    );
    
    if (serviceData) {
      // If we found a service but need full data, fetch it
      if (isServer && serviceData.id) {
        const fullServiceResult = await servicesAPI.getById(serviceData.id);
        if (fullServiceResult.success) {
          const fullServiceData = fullServiceResult.data;
          
          // Convert legacy subhead/subdes format to new subsections format for backward compatibility
          if (!fullServiceData.section02?.subsections && fullServiceData.section02) {
            const subsections = [];
            for (let i = 1; i <= 4; i++) {
              const heading = fullServiceData.section02[`subhead${i}`];
              const description = fullServiceData.section02[`subdes${i}`];
              if (heading && description) {
                subsections.push({ heading, description });
              }
            }
            fullServiceData.section02.subsections = subsections;
          }
          
          return fullServiceData;
        }
      }
      
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
    
    return null;
  } catch (error) {
    console.error('Error fetching service data:', error);
    return null;
  }
}

export async function getAllServiceSlugs() {
  try {
    // Check if we're in a server environment (build time or server-side)
    const isServer = typeof window === 'undefined';
    
    let allServices;
    
    if (isServer) {
      // During build time or server-side rendering, use direct API access
      await servicesAPI.initialize();
      const result = await servicesAPI.getAll();
      if (!result.success) {
        throw new Error('Failed to fetch services from API');
      }
      allServices = result.data;
    } else {
      // Client-side, use fetch
      const response = await fetch('/api/services');
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const result = await response.json();
      allServices = result.data || result; // Handle both formats
    }
    
    return allServices
      .filter(service => !service.archived)
      .map(service => ({
        params: { 
          service: service.customSlug || service.slug || service.id 
        }
      }));
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}