// Simple Blogs API - Server-side operations
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'blogs');
const INDEX_FILE = path.join(DATA_DIR, 'index.json');

class BlogsAPI {
  // Get all blogs (lightweight index)
  async getAll() {
    try {
      const indexData = await fs.readFile(INDEX_FILE, 'utf8');
      const blogs = JSON.parse(indexData);
      // Handle both array and object format
      const blogsList = Array.isArray(blogs) ? blogs : blogs.blogs || [];
      return { success: true, data: blogsList };
    } catch (error) {
      console.error('Error reading blogs index:', error);
      return { success: false, error: 'Failed to load blogs' };
    }
  }

  // Get single blog (full data)
  async getById(id) {
    try {
      const blogFile = path.join(DATA_DIR, `${id}.json`);
      const blogData = await fs.readFile(blogFile, 'utf8');
      const blog = JSON.parse(blogData);
      return { success: true, data: blog };
    } catch (error) {
      console.error(`Error reading blog ${id}:`, error);
      return { success: false, error: 'Blog not found' };
    }
  }

  // Create new blog
  async create(blogData, preserveId = false) {
    try {
      // Use provided ID if preserveId is true, otherwise generate from title
      const id = preserveId && blogData.id 
        ? blogData.id 
        : this.generateId(blogData.title);
      
      blogData.id = id;
      
      // Set timestamps (preserve existing if provided, otherwise create new)
      if (!blogData.createdAt) {
        blogData.createdAt = new Date().toISOString();
      }
      blogData.lastModified = new Date().toISOString().split('T')[0];
      
      // Set default values
      if (!blogData.slug) {
        blogData.slug = id;
      }
      if (!blogData.status) {
        blogData.status = 'draft';
      }
      if (!blogData.author) {
        blogData.author = 'BigLeap Team';
      }
      if (!blogData.publishedDate) {
        blogData.publishedDate = new Date().toISOString().split('T')[0];
      }

      // Save blog file
      const blogFile = path.join(DATA_DIR, `${id}.json`);
      await fs.writeFile(blogFile, JSON.stringify(blogData, null, 2));

      // Update index
      await this.updateIndex();

      return { success: true, data: blogData };
    } catch (error) {
      console.error('Error creating blog:', error);
      return { success: false, error: 'Failed to create blog' };
    }
  }

  // Update blog (merge update with existing data)
  async update(id, updateData) {
    try {
      const blogFile = path.join(DATA_DIR, `${id}.json`);
      // Read existing data
      let existingData = {};
      try {
        const fileContent = await fs.readFile(blogFile, 'utf8');
        existingData = JSON.parse(fileContent);
      } catch (readErr) {
        console.warn(`Blog file for update not found: ${id}`);
      }

      // Merge updateData into existingData
      const mergedData = {
        ...existingData,
        ...updateData,
        id: id,
        lastModified: new Date().toISOString().split('T')[0]
      };

      // Save merged data
      await fs.writeFile(blogFile, JSON.stringify(mergedData, null, 2));

      // Update index
      await this.updateIndex();

      return { success: true, data: mergedData };
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error);
      return { success: false, error: 'Failed to update blog' };
    }
  }

  // Delete blog
  async delete(id) {
    try {
      const blogFile = path.join(DATA_DIR, `${id}.json`);
      await fs.unlink(blogFile);

      // Update index
      await this.updateIndex();

      return { success: true };
    } catch (error) {
      console.error(`Error deleting blog ${id}:`, error);
      return { success: false, error: 'Failed to delete blog' };
    }
  }

  // Update the index file (rebuild from all blog files)
  async updateIndex() {
    try {
      const files = await fs.readdir(DATA_DIR);
      const blogFiles = files.filter(file => file.endsWith('.json') && file !== 'index.json');
      
      const blogs = [];
      for (const file of blogFiles) {
        try {
          const filePath = path.join(DATA_DIR, file);
          const blogData = await fs.readFile(filePath, 'utf8');
          const blog = JSON.parse(blogData);
          
          // Only include essential data in index
          blogs.push({
            id: blog.id,
            slug: blog.slug || blog.id,
            title: blog.title,
            caption: blog.caption || '',
            image: blog.image || '',
            category: blog.category || '',
            status: blog.status || 'draft',
            featured: Boolean(blog.featured),
            publishedDate: blog.publishedDate || '',
            lastModified: blog.lastModified || '',
            index: blog.index || 0
          });
        } catch (err) {
          console.warn(`Skipping invalid blog file: ${file}`, err);
        }
      }

      // Sort by index
      blogs.sort((a, b) => (a.index || 0) - (b.index || 0));

      await fs.writeFile(INDEX_FILE, JSON.stringify(blogs, null, 2));
    } catch (error) {
      console.error('Error updating blogs index:', error);
      throw error;
    }
  }

  // Generate ID from title
  generateId(title) {
    if (!title) return `blog-${Date.now()}`;
    
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim() || `blog-${Date.now()}`;
  }

  // Get tags
  async getTags() {
    try {
      const indexResult = await this.getAll();
      if (!indexResult.success) {
        return { success: false, error: 'Failed to load blogs' };
      }

      const publishedBlogs = indexResult.data.filter(blog => blog.status === 'published');
      const allTags = new Set();
      const tagCounts = {};
      
      // Read each blog file and collect all tags
      for (const blog of publishedBlogs) {
        try {
          const fullBlogResult = await this.getById(blog.id);
          if (fullBlogResult.success && fullBlogResult.data.tags) {
            fullBlogResult.data.tags.forEach(tag => {
              allTags.add(tag);
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        } catch (error) {
          console.warn(`Error reading blog ${blog.id} for tags:`, error);
        }
      }
      
      // Convert to array and add counts
      const tagsWithCounts = Array.from(allTags).map(tag => ({
        name: tag,
        count: tagCounts[tag],
        displayName: tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      })).sort((a, b) => b.count - a.count); // Sort by count descending
      
      return {
        success: true,
        data: tagsWithCounts,
        totalTags: tagsWithCounts.length
      };
    } catch (error) {
      console.error('Error getting blog tags:', error);
      return { success: false, error: 'Failed to get tags' };
    }
  }

  // Get blogs by tag
  async getByTag(tag) {
    try {
      const indexResult = await this.getAll();
      if (!indexResult.success) {
        return { success: false, error: 'Failed to load blogs' };
      }

      const publishedBlogs = indexResult.data.filter(blog => blog.status === 'published');
      const taggedBlogs = [];
      
      for (const blog of publishedBlogs) {
        try {
          const fullBlogResult = await this.getById(blog.id);
          if (fullBlogResult.success && fullBlogResult.data.tags && 
              fullBlogResult.data.tags.includes(tag)) {
            taggedBlogs.push({
              ...blog,
              tags: fullBlogResult.data.tags
            });
          }
        } catch (error) {
          console.warn(`Error reading blog ${blog.id} for tag filter:`, error);
        }
      }
      
      return {
        success: true,
        data: taggedBlogs,
        count: taggedBlogs.length,
        tag: tag
      };
    } catch (error) {
      console.error(`Error getting blogs by tag ${tag}:`, error);
      return { success: false, error: 'Failed to get blogs by tag' };
    }
  }

  // Get stats
  async getStats() {
    try {
      const result = await this.getAll();
      if (result.success) {
        const blogs = result.data;
        return {
          success: true,
          data: {
            total: blogs.length,
            published: blogs.filter(b => b.status === 'published').length,
            draft: blogs.filter(b => b.status === 'draft').length,
            featured: blogs.filter(b => b.featured).length
          }
        };
      }
      return {
        success: true,
        data: { total: 0, published: 0, draft: 0, featured: 0 }
      };
    } catch (error) {
      return {
        success: true,
        data: { total: 0, published: 0, draft: 0, featured: 0 }
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

export const blogsAPI = new BlogsAPI();