import { portfoliosClient } from './portfolios-client';

// Admin API wrapper for portfolio operations
class PortfolioAdminAPI {
  constructor() {
    this.client = portfoliosClient;
  }

  async getPortfolios() {
    try {
      return await this.client.getPortfolios();
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      throw error;
    }
  }

  async getPortfolio(id) {
    try {
      return await this.client.getPortfolio(id);
    } catch (error) {
      console.error(`Error fetching portfolio ${id}:`, error);
      throw error;
    }
  }

  async createPortfolio(portfolioData) {
    try {
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const portfolio = await response.json();
      this.client.clearCache();
      return portfolio;
    } catch (error) {
      console.error('Error creating portfolio:', error);
      throw error;
    }
  }

  async updatePortfolio(id, portfolioData) {
    try {
      const response = await fetch(`/api/portfolios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const portfolio = await response.json();
      this.client.invalidatePortfolio(id);
      return portfolio;
    } catch (error) {
      console.error(`Error updating portfolio ${id}:`, error);
      throw error;
    }
  }

  async deletePortfolio(id) {
    try {
      const response = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.client.invalidatePortfolio(id);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting portfolio ${id}:`, error);
      throw error;
    }
  }
}

// Export singleton instance
export const portfolioAdminAPI = new PortfolioAdminAPI();
export default portfolioAdminAPI;