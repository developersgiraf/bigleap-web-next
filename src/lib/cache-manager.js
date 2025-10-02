// Simplified Cache Manager - Removed complex caching to reduce function size
// Basic implementation without TTL, subscribers, and heavy operations

class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  // Simple cache operations
  set(key, data) {
    this.cache.set(key, data);
  }

  get(key) {
    return this.cache.get(key) || null;
  }

  clear() {
    this.cache.clear();
  }
}

// Create singleton instance
const cacheManager = new CacheManager();

export default cacheManager;