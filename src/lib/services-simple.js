// Simple Services API - No overcomplicated code!
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'services');
const INDEX_FILE = path.join(DATA_DIR, 'index.json');

class ServicesAPI {
  // Get all services (lightweight index)
  async getAll() {
    try {
      const indexData = await fs.readFile(INDEX_FILE, 'utf8');
      const index = JSON.parse(indexData);
      return { success: true, data: index.services };
    } catch (error) {
      console.error('Error reading services index:', error);
      return { success: false, error: 'Failed to load services' };
    }
  }

  // Get single service (full data)
  async getById(id) {
    try {
      const serviceFile = path.join(DATA_DIR, `${id}.json`);
      const serviceData = await fs.readFile(serviceFile, 'utf8');
      const service = JSON.parse(serviceData);
      return { success: true, data: service };
    } catch (error) {
      console.error(`Error reading service ${id}:`, error);
      return { success: false, error: 'Service not found' };
    }
  }

  // Create new service
  async create(serviceData) {
    try {
      // Generate ID from title
      const id = this.generateId(serviceData.bannerTitle || serviceData.title);
      serviceData.id = id;
      serviceData.createdAt = new Date().toISOString();
      serviceData.lastModified = new Date().toISOString();

      // Save service file
      const serviceFile = path.join(DATA_DIR, `${id}.json`);
      await fs.writeFile(serviceFile, JSON.stringify(serviceData, null, 2));

      // Update index
      await this.updateIndex();

      return { success: true, data: serviceData };
    } catch (error) {
      console.error('Error creating service:', error);
      return { success: false, error: 'Failed to create service' };
    }
  }

  // Update service
  async update(id, serviceData) {
    try {
      serviceData.id = id;
      serviceData.lastModified = new Date().toISOString();

      // Save service file
      const serviceFile = path.join(DATA_DIR, `${id}.json`);
      await fs.writeFile(serviceFile, JSON.stringify(serviceData, null, 2));

      // Update index
      await this.updateIndex();

      return { success: true, data: serviceData };
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      return { success: false, error: 'Failed to update service' };
    }
  }

  // Delete service
  async delete(id) {
    try {
      const serviceFile = path.join(DATA_DIR, `${id}.json`);
      await fs.unlink(serviceFile);

      // Update index
      await this.updateIndex();

      return { success: true };
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      return { success: false, error: 'Failed to delete service' };
    }
  }

  // Update the index file (rebuild from all service files)
  async updateIndex() {
    try {
      const files = await fs.readdir(DATA_DIR);
      const serviceFiles = files.filter(file => file.endsWith('.json') && file !== 'index.json');
      
      const services = [];
      for (const file of serviceFiles) {
        try {
          const filePath = path.join(DATA_DIR, file);
          const serviceData = await fs.readFile(filePath, 'utf8');
          const service = JSON.parse(serviceData);
          
          // Only include essential data in index
          services.push({
            id: service.id,
            title: service.title,
            bannerTitle: service.bannerTitle,
            archived: service.archived || false,
            index: service.index || 0,
            thumbnail: service.thumbnail,
            lastModified: service.lastModified
          });
        } catch (err) {
          console.warn(`Skipping invalid service file: ${file}`, err);
        }
      }

      // Sort by index
      services.sort((a, b) => (a.index || 0) - (b.index || 0));

      const indexData = {
        services,
        total: services.length,
        active: services.filter(s => !s.archived).length,
        archived: services.filter(s => s.archived).length,
        lastUpdated: new Date().toISOString()
      };

      await fs.writeFile(INDEX_FILE, JSON.stringify(indexData, null, 2));
    } catch (error) {
      console.error('Error updating index:', error);
      throw error;
    }
  }

  // Generate ID from title
  generateId(title) {
    if (!title) return `service-${Date.now()}`;
    
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim() || `service-${Date.now()}`;
  }

  // Get stats
  async getStats() {
    try {
      const indexData = await fs.readFile(INDEX_FILE, 'utf8');
      const index = JSON.parse(indexData);
      return {
        success: true,
        data: {
          total: index.total,
          active: index.active,
          archived: index.archived
        }
      };
    } catch (error) {
      return {
        success: true,
        data: { total: 0, active: 0, archived: 0 }
      };
    }
  }

  // Initialize - create index if it doesn't exist
  async initialize() {
    try {
      await fs.access(INDEX_FILE);
    } catch {
      // Index doesn't exist, create it
      await this.updateIndex();
    }
  }
}

export const servicesAPI = new ServicesAPI();