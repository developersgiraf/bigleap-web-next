// Cache monitoring and debugging utilities
import cacheManager from './cache-manager';

export const CacheMonitor = {
  // Get comprehensive cache statistics
  getStats() {
    const stats = cacheManager.getStats();
    console.group('🗄️ Cache Statistics');
    console.log('Total Entries:', stats.totalEntries);
    console.log('Total Subscribers:', stats.totalSubscribers);
    console.log('Memory Usage:', this.formatBytes(this.getMemoryUsage()));
    
    if (stats.entries.length > 0) {
      console.table(stats.entries.map(entry => ({
        Key: entry.key,
        'Size (KB)': Math.round(entry.size / 1024),
        'Age (s)': Math.round(entry.age / 1000),
        'TTL Remaining (s)': Math.round(entry.remainingTTL / 1000),
        'Last Modified': new Date(entry.lastModified).toLocaleTimeString()
      })));
    }
    
    console.groupEnd();
    return stats;
  },

  // Calculate memory usage of cache
  getMemoryUsage() {
    const stats = cacheManager.getStats();
    return stats.entries.reduce((total, entry) => total + entry.size, 0);
  },

  // Format bytes to human readable
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Monitor cache hit/miss ratio
  createHitRatioMonitor() {
    let hits = 0;
    let misses = 0;
    
    // Override cache get method to track hits/misses
    const originalGet = cacheManager.get.bind(cacheManager);
    cacheManager.get = function(key) {
      const result = originalGet(key);
      if (result !== null) {
        hits++;
      } else {
        misses++;
      }
      return result;
    };

    return {
      getStats() {
        const total = hits + misses;
        return {
          hits,
          misses,
          total,
          hitRatio: total > 0 ? (hits / total * 100).toFixed(2) + '%' : '0%'
        };
      },
      reset() {
        hits = 0;
        misses = 0;
      }
    };
  },

  // Auto-clear expired entries
  startCleanupScheduler(intervalMs = 60000) { // Default: 1 minute
    const cleanup = () => {
      const stats = cacheManager.getStats();
      let cleaned = 0;
      
      stats.entries.forEach(entry => {
        if (entry.remainingTTL <= 0) {
          cacheManager.delete(entry.key);
          cleaned++;
        }
      });
      
      if (cleaned > 0) {
        console.log(`🧹 Cache cleanup: Removed ${cleaned} expired entries`);
      }
    };

    const intervalId = setInterval(cleanup, intervalMs);
    
    // Return function to stop cleanup
    return () => clearInterval(intervalId);
  },

  // Log cache operations for debugging
  enableDebugLogging() {
    const originalSet = cacheManager.set.bind(cacheManager);
    const originalGet = cacheManager.get.bind(cacheManager);
    const originalDelete = cacheManager.delete.bind(cacheManager);

    cacheManager.set = function(key, data, ttl) {
      console.log(`📝 Cache SET: ${key} (TTL: ${ttl}ms)`);
      return originalSet(key, data, ttl);
    };

    cacheManager.get = function(key) {
      const result = originalGet(key);
      console.log(`📖 Cache ${result ? 'HIT' : 'MISS'}: ${key}`);
      return result;
    };

    cacheManager.delete = function(key) {
      console.log(`🗑️ Cache DELETE: ${key}`);
      return originalDelete(key);
    };

    console.log('🔍 Cache debug logging enabled');
  }
};

// Development helper - expose cache monitor globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.CacheMonitor = CacheMonitor;
  console.log('🛠️ CacheMonitor available globally: window.CacheMonitor');
}

export default CacheMonitor;