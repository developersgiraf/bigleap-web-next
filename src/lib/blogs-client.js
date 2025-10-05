// Blog API Client - Similar to services-client but for blogs
class BlogsAPI {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Helper method to check if cache is valid
  isCacheValid(key) {
    const expiry = this.cacheExpiry.get(key);
    return expiry && Date.now() < expiry;
  }

  // Helper method to set cache
  setCache(key, data) {
    this.cache.set(key, data);
    this.cacheExpiry.set(key, Date.now() + this.cacheTimeout);
  }

  // Helper method to get cache
  getCache(key) {
    if (this.isCacheValid(key)) {
      return this.cache.get(key);
    }
    return null;
  }

  // Clear cache
  invalidateCache() {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  // Get all blogs with caching
  async getAll() {
    const cacheKey = 'blogs_all';
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      console.log('Returning cached blogs data');
      return { success: true, data: cached };
    }

    try {
      const response = await fetch('/api/blogs');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        this.setCache(cacheKey, data.data);
        console.log('Blogs data loaded and cached');
        return data;
      } else {
        throw new Error(data.error || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      
      // Try to return stale cache if available
      const staleCache = this.cache.get(cacheKey);
      if (staleCache) {
        console.warn('Returning stale cache due to error');
        return { success: true, data: staleCache };
      }
      
      return { success: false, error: error.message };
    }
  }

  // Get blog by ID with caching
  async getById(id) {
    const cacheKey = `blog_${id}`;
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      console.log(`Returning cached blog data for ID: ${id}`);
      return { success: true, data: cached };
    }

    try {
      const response = await fetch(`/api/blogs/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return { success: false, error: 'Blog not found' };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        this.setCache(cacheKey, data.data);
        console.log(`Blog data loaded and cached for ID: ${id}`);
        return data;
      } else {
        throw new Error(data.error || 'Failed to fetch blog');
      }
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
      
      // Try to return stale cache if available
      const staleCache = this.cache.get(cacheKey);
      if (staleCache) {
        console.warn(`Returning stale cache for blog ${id} due to error`);
        return { success: true, data: staleCache };
      }
      
      return { success: false, error: error.message };
    }
  }

  // Get published blogs only
  async getPublished() {
    try {
      const result = await this.getAll();
      if (result.success) {
        const publishedBlogs = result.data.filter(blog => blog.status === 'published');
        return { success: true, data: publishedBlogs };
      }
      return result;
    } catch (error) {
      console.error('Error fetching published blogs:', error);
      return { success: false, error: error.message };
    }
  }

  // Get featured blogs
  async getFeatured() {
    try {
      const result = await this.getPublished();
      if (result.success) {
        const featuredBlogs = result.data.filter(blog => blog.featured);
        return { success: true, data: featuredBlogs };
      }
      return result;
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
      return { success: false, error: error.message };
    }
  }

  // Get blogs by category
  async getByCategory(category) {
    try {
      const result = await this.getPublished();
      if (result.success) {
        const categoryBlogs = result.data.filter(blog => 
          blog.category.toLowerCase() === category.toLowerCase()
        );
        return { success: true, data: categoryBlogs };
      }
      return result;
    } catch (error) {
      console.error(`Error fetching blogs for category ${category}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Search blogs
  async search(query) {
    try {
      const result = await this.getPublished();
      if (result.success) {
        const searchResults = result.data.filter(blog => {
          const searchText = query.toLowerCase();
          return (
            blog.title.toLowerCase().includes(searchText) ||
            blog.excerpt.toLowerCase().includes(searchText) ||
            blog.description.toLowerCase().includes(searchText) ||
            blog.category.toLowerCase().includes(searchText) ||
            (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchText)))
          );
        });
        return { success: true, data: searchResults };
      }
      return result;
    } catch (error) {
      console.error(`Error searching blogs with query "${query}":`, error);
      return { success: false, error: error.message };
    }
  }

  // Get blog stats
  async getStats() {
    try {
      const result = await this.getAll();
      if (result.success) {
        const total = result.data.length;
        const published = result.data.filter(blog => blog.status === 'published').length;
        const draft = result.data.filter(blog => blog.status === 'draft').length;
        const featured = result.data.filter(blog => blog.featured).length;
        
        return {
          success: true,
          data: { total, published, draft, featured }
        };
      }
      return result;
    } catch (error) {
      console.error('Error fetching blog stats:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all available tags
  async getTags() {
    const cacheKey = 'blog_tags';
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      console.log('Returning cached blog tags');
      return { success: true, data: cached };
    }

    try {
      const response = await fetch('/api/blogs/tags');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        this.setCache(cacheKey, data.data);
        console.log('Blog tags loaded and cached');
        return data;
      } else {
        throw new Error(data.error || 'Failed to fetch tags');
      }
    } catch (error) {
      console.error('Error fetching blog tags:', error);
      return { success: false, error: error.message };
    }
  }

  // Get blogs by tag
  async getByTag(tag) {
    const cacheKey = `blogs_tag_${tag}`;
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      console.log(`Returning cached blogs for tag: ${tag}`);
      return { success: true, data: cached };
    }

    try {
      const response = await fetch(`/api/blogs/tags/${encodeURIComponent(tag)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        this.setCache(cacheKey, data.data);
        console.log(`Blogs for tag "${tag}" loaded and cached`);
        return data;
      } else {
        throw new Error(data.error || 'Failed to fetch blogs by tag');
      }
    } catch (error) {
      console.error(`Error fetching blogs for tag "${tag}":`, error);
      return { success: false, error: error.message };
    }
  }

  // Admin Methods - Create, Update, Delete operations
  
  // Create new blog
  async create(blogData) {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Invalidate cache after creation
        this.invalidateCache();
        console.log('Blog created successfully');
        return data;
      } else {
        throw new Error(data.error || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      return { success: false, error: error.message };
    }
  }

  // Update existing blog
  async update(id, blogData) {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Invalidate cache after update
        this.invalidateCache();
        console.log(`Blog ${id} updated successfully`);
        return data;
      } else {
        throw new Error(data.error || 'Failed to update blog');
      }
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Delete blog
  async delete(id) {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Invalidate cache after deletion
        this.invalidateCache();
        console.log(`Blog ${id} deleted successfully`);
        return data;
      } else {
        throw new Error(data.error || 'Failed to delete blog');
      }
    } catch (error) {
      console.error(`Error deleting blog ${id}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Toggle blog status (publish/draft)
  async toggleStatus(id, status) {
    return this.update(id, { status });
  }

  // Toggle blog featured status
  async toggleFeatured(id, featured) {
    return this.update(id, { featured });
  }

  // Search all blogs (including drafts) - Admin only
  async searchAll(query) {
    try {
      const result = await this.getAll();
      if (result.success) {
        const searchResults = result.data.filter(blog => {
          const searchText = query.toLowerCase();
          return (
            blog.title.toLowerCase().includes(searchText) ||
            (blog.description && blog.description.toLowerCase().includes(searchText)) ||
            blog.category.toLowerCase().includes(searchText) ||
            (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchText)))
          );
        });
        return { success: true, data: searchResults };
      }
      return result;
    } catch (error) {
      console.error(`Error searching all blogs with query "${query}":`, error);
      return { success: false, error: error.message };
    }
  }
}

// Create and export singleton instance
export const blogsAPI = new BlogsAPI();

// Export the class as well for potential direct instantiation
export { BlogsAPI };