// Comprehensive API Client for Website Data Management
// This utility provides clean interfaces to interact with all website data APIs

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }
  
  return data;
};

// Services API Client
export const servicesAPI = {
  // Get all services
  getAll: async () => {
    try {
      const response = await fetch('/api/services');
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching all services:', error);
      throw error;
    }
  },

  // Get single service by ID
  getById: async (id) => {
    try {
      const response = await fetch(`/api/services/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw error;
    }
  },

  // Search services
  search: async (query) => {
    try {
      const response = await fetch(`/api/services/search?q=${encodeURIComponent(query)}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error searching services:', error);
      throw error;
    }
  },

  // Get services statistics
  getStats: async () => {
    try {
      const response = await fetch('/api/services/stats');
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching service stats:', error);
      throw error;
    }
  },

  // Create new service
  create: async (serviceData) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  // Update existing service
  update: async (id, serviceData) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      throw error;
    }
  },

  // Delete service
  delete: async (id) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      throw error;
    }
  },
};

// Portfolio API Client
export const portfolioAPI = {
  // Get all portfolio items
  getAll: async () => {
    try {
      const response = await fetch('/api/portfolio');
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching all portfolio items:', error);
      throw error;
    }
  },

  // Get single portfolio item by ID
  getById: async (id) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching portfolio item ${id}:`, error);
      throw error;
    }
  },

  // Create new portfolio item
  create: async (portfolioData) => {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating portfolio item:', error);
      throw error;
    }
  },

  // Update existing portfolio item
  update: async (id, portfolioData) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error updating portfolio item ${id}:`, error);
      throw error;
    }
  },

  // Delete portfolio item
  delete: async (id) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error deleting portfolio item ${id}:`, error);
      throw error;
    }
  },
};

// Blog API Client
export const blogAPI = {
  // Get all blog posts
  getAll: async () => {
    try {
      const response = await fetch('/api/blog');
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching all blog posts:', error);
      throw error;
    }
  },

  // Get single blog post by ID
  getById: async (id) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching blog post ${id}:`, error);
      throw error;
    }
  },

  // Create new blog post
  create: async (blogData) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  // Update existing blog post
  update: async (id, blogData) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error updating blog post ${id}:`, error);
      throw error;
    }
  },

  // Delete blog post
  delete: async (id) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error deleting blog post ${id}:`, error);
      throw error;
    }
  },
};

// Clients API Client
export const clientsAPI = {
  // Get all clients
  getAll: async () => {
    try {
      const response = await fetch('/api/clients');
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching all clients:', error);
      throw error;
    }
  },

  // Get single client by ID
  getById: async (id) => {
    try {
      const response = await fetch(`/api/clients/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching client ${id}:`, error);
      throw error;
    }
  },

  // Create new client
  create: async (clientData) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },

  // Update existing client
  update: async (id, clientData) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error updating client ${id}:`, error);
      throw error;
    }
  },

  // Delete client
  delete: async (id) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error deleting client ${id}:`, error);
      throw error;
    }
  },
};

// Hook for React components to use all APIs
export const useWebsiteAPI = () => {
  return {
    services: servicesAPI,
    portfolio: portfolioAPI,
    blog: blogAPI,
    clients: clientsAPI,
  };
};

// Legacy hook for backward compatibility
export const useServicesAPI = () => {
  return servicesAPI;
};