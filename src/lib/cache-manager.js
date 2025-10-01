// Enhanced Cache Manager for API Data
// Provides intelligent caching with TTL, invalidation, and change detection

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes default TTL
    this.subscribers = new Map(); // For real-time updates
  }

  // Generate cache key
  generateKey(type, params = {}) {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return paramString ? `${type}:${paramString}` : type;
  }

  // Set cache data with TTL
  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, {
      data: JSON.parse(JSON.stringify(data)), // Deep clone to prevent mutations
      ttl,
      lastModified: new Date().toISOString()
    });
    this.timestamps.set(key, Date.now());
    this.notifySubscribers(key, data);
  }

  // Get cached data
  get(key) {
    const cached = this.cache.get(key);
    const timestamp = this.timestamps.get(key);

    if (!cached || !timestamp) {
      return null;
    }

    // Check if cache has expired
    if (Date.now() - timestamp > cached.ttl) {
      this.delete(key);
      return null;
    }

    return JSON.parse(JSON.stringify(cached.data)); // Return deep clone
  }

  // Check if data is cached and valid
  has(key) {
    return this.get(key) !== null;
  }

  // Delete cache entry
  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
    this.notifySubscribers(key, null);
  }

  // Clear all cache
  clear() {
    console.log('Clearing all cache - before:', this.cache.size, 'entries');
    this.cache.clear();
    this.timestamps.clear();
    this.subscribers.clear();
    console.log('Clearing all cache - after:', this.cache.size, 'entries');
  }

  // Invalidate cache by pattern
  invalidatePattern(pattern) {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.delete(key);
      }
    }
  }

  // Subscribe to cache changes
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(key);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.subscribers.delete(key);
        }
      }
    };
  }

  // Notify subscribers of cache changes
  notifySubscribers(key, data) {
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Cache subscriber error:', error);
        }
      });
    }
  }

  // Get cache statistics
  getStats() {
    const stats = {
      totalEntries: this.cache.size,
      totalSubscribers: Array.from(this.subscribers.values()).reduce((sum, set) => sum + set.size, 0),
      entries: []
    };

    for (const [key, cached] of this.cache.entries()) {
      const timestamp = this.timestamps.get(key);
      const age = Date.now() - timestamp;
      const remainingTTL = Math.max(0, cached.ttl - age);

      stats.entries.push({
        key,
        size: JSON.stringify(cached.data).length,
        age: age,
        remainingTTL: remainingTTL,
        lastModified: cached.lastModified
      });
    }

    return stats;
  }
}

// Create singleton instance
const cacheManager = new CacheManager();

// Cache-aware API wrapper
export const createCachedAPI = (apiFunction, cacheKey, ttl) => {
  return async (...args) => {
    const key = cacheManager.generateKey(cacheKey, { args: JSON.stringify(args) });
    
    // Try to get from cache first
    const cached = cacheManager.get(key);
    if (cached) {
      return cached;
    }

    try {
      // Call the actual API
      const result = await apiFunction(...args);
      
      // Cache the result
      cacheManager.set(key, result, ttl);
      
      return result;
    } catch (error) {
      console.error(`API call failed for ${cacheKey}:`, error);
      throw error;
    }
  };
};

// Specialized cache functions for different data types
export const servicesCache = {
  // Cache services list
  getServices: createCachedAPI(
    async () => {
      const response = await fetch('/api/services');
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    'services:all',
    3 * 60 * 1000 // 3 minutes
  ),

  // Cache single service
  getService: createCachedAPI(
    async (id) => {
      const response = await fetch(`/api/services/${id}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    'services:single',
    5 * 60 * 1000 // 5 minutes
  ),

  // Cache service stats
  getStats: createCachedAPI(
    async () => {
      const response = await fetch('/api/services/stats');
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    'services:stats',
    2 * 60 * 1000 // 2 minutes
  ),

  // Cache search results
  search: createCachedAPI(
    async (query) => {
      const response = await fetch(`/api/services/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    'services:search',
    1 * 60 * 1000 // 1 minute (shorter for search)
  ),

  // Invalidate services cache (call after create/update/delete)
  invalidate: () => {
    console.log('Invalidating services cache...');
    cacheManager.clear(); // Clear ALL cache instead of just patterns
    console.log('All cache cleared');
  }
};

export default cacheManager;