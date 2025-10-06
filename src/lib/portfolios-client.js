// Client-side utility for portfolio operations
class PortfoliosClient {
  constructor() {
    this.cache = new Map();
  }

  async getPortfolios() {
    if (this.cache.has('portfolios')) {
      return this.cache.get('portfolios');
    }

    try {
      const response = await fetch('/api/portfolios');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const portfolios = await response.json();
      
      // Sort portfolios by order, then by featured status
      const sortedPortfolios = portfolios.sort((a, b) => {
        // First sort by order
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        // Then by featured status (featured first)
        if (a.featured !== b.featured) {
          return b.featured - a.featured;
        }
        // Finally by title
        return a.title.localeCompare(b.title);
      });

      this.cache.set('portfolios', sortedPortfolios);
      return sortedPortfolios;
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      throw error;
    }
  }

  async getPortfolio(id) {
    const cacheKey = `portfolio-${id}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`/api/portfolios/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const portfolio = await response.json();
      this.cache.set(cacheKey, portfolio);
      return portfolio;
    } catch (error) {
      console.error(`Error fetching portfolio ${id}:`, error);
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
  }

  invalidatePortfolio(id) {
    this.cache.delete(`portfolio-${id}`);
    this.cache.delete('portfolios');
  }
}

// Export a singleton instance
export const portfoliosClient = new PortfoliosClient();
export default portfoliosClient;