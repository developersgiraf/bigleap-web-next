export async function fetchServiceData(serviceSlug) {
  try {
    const response = await fetch('/api/services');
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const allServices = await response.json();
    
    // Find service by custom slug or regular slug
    const serviceData = allServices.find(service => 
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
    
    return null;
  } catch (error) {
    console.error('Error fetching service data:', error);
    return null;
  }
}

export async function getAllServiceSlugs() {
  try {
    const response = await fetch('/api/services');
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const allServices = await response.json();
    
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