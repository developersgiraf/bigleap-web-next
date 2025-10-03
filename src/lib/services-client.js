// Simple Services API Client - Replacing the complex Firebase one
class SimpleServicesAPI {
  constructor() {
    this.baseURL = '/api/services';
  }

  // Get all services (fast index)
  async getAll() {
    try {
      const response = await fetch(this.baseURL);
      return await response.json();
    } catch (error) {
      console.error('Error fetching services:', error);
      return { success: false, error: 'Failed to fetch services' };
    }
  }

  // Get single service (full data)
  async getById(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      return { success: false, error: 'Failed to fetch service' };
    }
  }

  // Create new service
  async create(serviceData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating service:', error);
      return { success: false, error: 'Failed to create service' };
    }
  }

  // Update service
  async update(id, serviceData) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      return { success: false, error: 'Failed to update service' };
    }
  }

  // Delete service
  async delete(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      return { success: false, error: 'Failed to delete service' };
    }
  }

  // Get stats
  async getStats() {
    try {
      const response = await fetch(`${this.baseURL}/stats`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { success: false, error: 'Failed to fetch stats' };
    }
  }

  // Search services (for now, just filter on client side)
  async search(query) {
    const result = await this.getAll();
    if (result.success && query) {
      const filtered = result.data.filter(service => 
        service.title?.toLowerCase().includes(query.toLowerCase()) ||
        service.bannerTitle?.toLowerCase().includes(query.toLowerCase())
      );
      return { ...result, data: filtered };
    }
    return result;
  }

  // Cache management (simplified - no complex caching needed)
  invalidateCache() {
    // With our simple system, no caching to invalidate!
    console.log('Cache invalidated (not needed with simple JSON system)');
  }
}

// Export the simple API
export const servicesAPI = new SimpleServicesAPI();