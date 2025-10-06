// Simple Portfolios API - Server-side operations
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'portfolios');
const INDEX_FILE = path.join(DATA_DIR, 'index.json');

class PortfoliosAPI {
  // Get all portfolios (lightweight index)
  async getAll() {
    try {
      const indexData = await fs.readFile(INDEX_FILE, 'utf8');
      const portfolios = JSON.parse(indexData);
      // Handle both array and object format
      const portfoliosList = Array.isArray(portfolios) ? portfolios : portfolios.portfolios || [];
      return { success: true, data: portfoliosList };
    } catch (error) {
      console.error('Error reading portfolios index:', error);
      return { success: false, error: 'Failed to load portfolios' };
    }
  }

  // Get all portfolios (full data)
  async getAllFull() {
    try {
      const files = await fs.readdir(DATA_DIR);
      const portfolioFiles = files.filter(file => file.endsWith('.json') && file !== 'index.json');
      
      const portfolios = [];
      for (const file of portfolioFiles) {
        try {
          const filePath = path.join(DATA_DIR, file);
          const portfolioData = await fs.readFile(filePath, 'utf8');
          const portfolio = JSON.parse(portfolioData);
          portfolios.push(portfolio);
        } catch (err) {
          console.warn(`Skipping invalid portfolio file: ${file}`, err);
        }
      }

      // Sort by order
      portfolios.sort((a, b) => (a.order || 0) - (b.order || 0));

      return { success: true, data: portfolios };
    } catch (error) {
      console.error('Error reading full portfolios:', error);
      return { success: false, error: 'Failed to load portfolios' };
    }
  }

  // Get single portfolio (full data)
  async getById(id) {
    try {
      const portfolioFile = path.join(DATA_DIR, `${id}.json`);
      const portfolioData = await fs.readFile(portfolioFile, 'utf8');
      const portfolio = JSON.parse(portfolioData);
      return { success: true, data: portfolio };
    } catch (error) {
      console.error(`Error reading portfolio ${id}:`, error);
      return { success: false, error: 'Portfolio not found' };
    }
  }

  // Create new portfolio
  async create(portfolioData, preserveId = false) {
    try {
      // Use provided ID if preserveId is true, otherwise generate from title
      const id = preserveId && portfolioData.id 
        ? portfolioData.id 
        : this.generateId(portfolioData.title);
      
      portfolioData.id = id;
      
      // Set timestamps (preserve existing if provided, otherwise create new)
      if (!portfolioData.createdAt) {
        portfolioData.createdAt = new Date().toISOString();
      }
      portfolioData.lastModified = new Date().toISOString();

      // Save portfolio file
      const portfolioFile = path.join(DATA_DIR, `${id}.json`);
      await fs.writeFile(portfolioFile, JSON.stringify(portfolioData, null, 2));

      // Update index
      await this.updateIndex();

      return { success: true, data: portfolioData };
    } catch (error) {
      console.error('Error creating portfolio:', error);
      return { success: false, error: 'Failed to create portfolio' };
    }
  }

  // Update portfolio (merge update with existing data)
  async update(id, updateData) {
    try {
      const portfolioFile = path.join(DATA_DIR, `${id}.json`);
      // Read existing data
      let existingData = {};
      try {
        const fileContent = await fs.readFile(portfolioFile, 'utf8');
        existingData = JSON.parse(fileContent);
      } catch (readErr) {
        console.warn(`Portfolio file for update not found: ${id}`);
      }

      // Merge updateData into existingData
      const mergedData = {
        ...existingData,
        ...updateData,
        id: id,
        lastModified: new Date().toISOString()
      };

      // Save merged data
      await fs.writeFile(portfolioFile, JSON.stringify(mergedData, null, 2));

      // Update index
      await this.updateIndex();

      return { success: true, data: mergedData };
    } catch (error) {
      console.error(`Error updating portfolio ${id}:`, error);
      return { success: false, error: 'Failed to update portfolio' };
    }
  }

  // Delete portfolio
  async delete(id) {
    try {
      const portfolioFile = path.join(DATA_DIR, `${id}.json`);
      await fs.unlink(portfolioFile);

      // Update index
      await this.updateIndex();

      return { success: true };
    } catch (error) {
      console.error(`Error deleting portfolio ${id}:`, error);
      return { success: false, error: 'Failed to delete portfolio' };
    }
  }

  // Update the index file (rebuild from all portfolio files)
  async updateIndex() {
    try {
      const files = await fs.readdir(DATA_DIR);
      const portfolioFiles = files.filter(file => file.endsWith('.json') && file !== 'index.json');
      
      const portfolios = [];
      for (const file of portfolioFiles) {
        try {
          const filePath = path.join(DATA_DIR, file);
          const portfolioData = await fs.readFile(filePath, 'utf8');
          const portfolio = JSON.parse(portfolioData);
          
          // Only include essential data in index
          portfolios.push({
            id: portfolio.id,
            title: portfolio.title,
            description: portfolio.description || portfolio.cardData?.description || '',
            image: portfolio.cardData?.image || '',
            readbtn: portfolio.cardData?.readbtn || 'Explore More',
            background: portfolio.cardData?.background || 'linear-gradient(to bottom, #000000, #000000)',
            link: portfolio.cardData?.link || `/portfolio/${portfolio.id}`,
            order: portfolio.order || 0,
            status: portfolio.status || 'active',
            lastModified: portfolio.lastModified
          });
        } catch (err) {
          console.warn(`Skipping invalid portfolio file: ${file}`, err);
        }
      }

      // Sort by order
      portfolios.sort((a, b) => (a.order || 0) - (b.order || 0));

      await fs.writeFile(INDEX_FILE, JSON.stringify(portfolios, null, 2));
    } catch (error) {
      console.error('Error updating portfolios index:', error);
      throw error;
    }
  }

  // Generate ID from title
  generateId(title) {
    if (!title) return `portfolio-${Date.now()}`;
    
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim() || `portfolio-${Date.now()}`;
  }

  // Get stats
  async getStats() {
    try {
      const result = await this.getAll();
      if (result.success) {
        const portfolios = result.data;
        return {
          success: true,
          data: {
            total: portfolios.length,
            active: portfolios.filter(p => p.status === 'active').length,
            inactive: portfolios.filter(p => p.status !== 'active').length
          }
        };
      }
      return {
        success: true,
        data: { total: 0, active: 0, inactive: 0 }
      };
    } catch (error) {
      return {
        success: true,
        data: { total: 0, active: 0, inactive: 0 }
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

export const portfoliosAPI = new PortfoliosAPI();