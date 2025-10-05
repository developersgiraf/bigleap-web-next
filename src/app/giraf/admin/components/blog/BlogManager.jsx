"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './blog-manager.module.css';
import { blogsAPI } from '../../../../../lib/blogs-client';
import ImageUpload from '../shared/ImageUpload';
import ManagerHeader from '../shared/elements/ManagerHeader';
import ActionButtons from '../shared/elements/ActionButtons';

// Mobile detection utility
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    window.innerWidth <= 768
  );
};

// Blog Image Component
const BlogImage = ({ src, alt, status }) => {
  const [imageSrc, setImageSrc] = useState(src || '/servicess/default-image.png');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (src && src !== imageSrc && !hasError) {
      setImageSrc(src);
    }
  }, [src, imageSrc, hasError]);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImageSrc('/servicess/default-image.png');
    }
  }, [hasError]);

  return (
    <div className={styles.blogImage}>
      <img 
        src={imageSrc}
        alt={alt}
        onError={handleError}
        loading="lazy"
        style={{ objectFit: 'cover' }}
      />
      {status === 'draft' && (
        <div className={styles.draftBadge}>Draft</div>
      )}
      {status === 'published' && (
        <div className={styles.publishedBadge}>Published</div>
      )}
    </div>
  );
};

// Blog Card Component (no index/drag)
const BlogCard = ({ blog, onEdit, onDelete, onToggleStatus, onToggleFeatured }) => (
  <div className={styles.blogCard}>
    <BlogImage 
      src={blog.image} 
      alt={blog.title}
      status={blog.status}
    />
    <div className={styles.blogContent}>
      <div className={styles.blogHeader}>
        <div className={styles.blogTitleGroup}>
          <h3>{blog.title}</h3>
        </div>
        <div className={styles.statusGroup}>
          <div className={styles.status}>
            {blog.status === 'published' ? (
              <span className={styles.statusPublished}>Published</span>
            ) : (
              <span className={styles.statusDraft}>Draft</span>
            )}
          </div>
          {blog.featured && (
            <div className={styles.featuredBadge}>Featured</div>
          )}
        </div>
      </div>
      <div className={styles.blogMeta}>
        <span className={styles.category}>{blog.category}</span>
        <span className={styles.publishDate}>
          {blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString() : 'No date'}
        </span>
      </div>
      <p className={styles.blogDescription}>
        {blog.description?.substring(0, 150) || 'No description available'}...
      </p>
      {blog.tags && blog.tags.length > 0 && (
        <div className={styles.tagsPreview}>
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className={styles.moreTagsIndicator}>+{blog.tags.length - 3} more</span>
          )}
        </div>
      )}
      <div className={styles.blogFooter}>
        <ActionButtons 
          buttons={[
            {
              type: 'edit',
              label: 'Edit',
              onClick: () => onEdit(blog)
            },
            {
              type: blog.status === 'published' ? 'archive' : 'publish',
              label: blog.status === 'published' ? 'Make Draft' : 'Publish',
              onClick: () => onToggleStatus(blog.id, blog.status === 'published' ? 'draft' : 'published')
            },
            {
              type: blog.featured ? 'archive' : 'publish',
              label: blog.featured ? 'Unfeature' : 'Feature',
              onClick: () => onToggleFeatured(blog.id, !blog.featured)
            },
            {
              type: 'delete',
              label: 'Delete',
              onClick: () => onDelete(blog.id)
            }
          ]}
        />
      </div>
    </div>
  </div>
);

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, featured: 0 });
  

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);


  // Load blogs data with caching
  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let response;
      if (debouncedSearchTerm.trim()) {
        response = await blogsAPI.searchAll(debouncedSearchTerm);
      } else {
        response = await blogsAPI.getAll();
      }
      if (!response.success) {
        throw new Error(response.error);
      }
      setBlogs(response.data);
      // Always load stats for header display (independent of search)
      try {
        const statsResponse = await blogsAPI.getStats();
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      } catch (statsError) {
        console.warn('Failed to load stats:', statsError);
      }
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm]);

  // Load blogs when debounced search term changes
  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  // Filter and sort blogs: featured first, then publishedDate desc, then lastModified desc
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        if (filter === 'published') return blog.status === 'published';
        if (filter === 'draft') return blog.status === 'draft';
        if (filter === 'featured') return blog.featured;
        return true; // 'all'
      })
      .sort((a, b) => {
        // Featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Newest publishedDate first
        const dateA = a.publishedDate ? new Date(a.publishedDate) : new Date(0);
        const dateB = b.publishedDate ? new Date(b.publishedDate) : new Date(0);
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        // Newest lastModified first
        const modA = a.lastModified ? new Date(a.lastModified) : new Date(0);
        const modB = b.lastModified ? new Date(b.lastModified) : new Date(0);
        if (modA > modB) return -1;
        if (modA < modB) return 1;
        return 0;
      });
  }, [blogs, filter]);

  // Calculate stats from current blogs (memoized for performance)
  const currentStats = useMemo(() => {
    // Always use API stats for header display (shows total counts, not search results)
    return stats;
  }, [stats]);

  const handleEdit = useCallback(async (blog) => {
    try {
      // Fetch the complete blog data by ID
      const response = await blogsAPI.getById(blog.id);
      
      if (response.success) {
        setSelectedBlog(response.data);
        setIsEditing(true);
      } else {
        console.error('Failed to fetch blog data:', response.error);
        // Fallback to using the index data if full data fetch fails
        setSelectedBlog(blog);
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching blog for editing:', error);
      // Fallback to using the index data if full data fetch fails
      setSelectedBlog(blog);
      setIsEditing(true);
    }
  }, []);

  const handleDelete = useCallback(async (blogId) => {
    console.log('DEBUG: Attempting to delete blog with ID:', blogId);
    if (confirm('Are you sure you want to permanently delete this blog post?')) {
      try {
        // Force cache clear before deletion
        blogsAPI.invalidateCache();
        const response = await blogsAPI.delete(blogId);
        if (response.success) {
          // Force cache clear after deletion and reload
          blogsAPI.invalidateCache();
          await loadBlogs(); // Refresh the list
        } else {
          throw new Error(response.error);
        }
      } catch (err) {
        console.error('Error deleting blog:', err);
        alert('Failed to delete blog post. Please try again.');
      }
    }
  }, [loadBlogs]);

  const handleToggleStatus = useCallback(async (blogId, newStatus) => {
    try {
      const response = await blogsAPI.toggleStatus(blogId, newStatus);
      if (response.success) {
        await loadBlogs(); // Refresh the list
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      console.error('Error toggling blog status:', err);
      alert('Failed to update blog status. Please try again.');
    }
  }, [loadBlogs]);

  const handleToggleFeatured = useCallback(async (blogId, featured) => {
    try {
      const response = await blogsAPI.toggleFeatured(blogId, featured);
      if (response.success) {
        await loadBlogs(); // Refresh the list
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      console.error('Error toggling blog featured status:', err);
      alert('Failed to update blog featured status. Please try again.');
    }
  }, [loadBlogs]);





  const handleSave = useCallback(async (blogData) => {
    try {
      let result;
      if (selectedBlog) {
        // Update existing blog
        result = await blogsAPI.update(selectedBlog.id, blogData);
        
        // If slug changed, the API returns the new ID
        if (result.slugChanged && result.data.id !== selectedBlog.id) {
          console.log(`Blog slug changed from ${selectedBlog.id} to ${result.data.id}`);
          // Force cache invalidation for the old blog ID
          blogsAPI.invalidateCache();
          // The blog now has a new ID/slug
          setSelectedBlog(null); // Clear selection since the ID changed
        }
      } else {
        // Create new blog
        result = await blogsAPI.create(blogData);
      }
      
      if (result.success) {
        // Force cache invalidation and reload
        blogsAPI.invalidateCache();
        setIsEditing(false);
        setSelectedBlog(null);
        await loadBlogs(); // Refresh the list
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Error saving blog:', err);
      alert('Failed to save blog post. Please try again.');
    }
  }, [selectedBlog, loadBlogs]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setSelectedBlog(null);
  }, []);

  if (isEditing) {
    return (
      <BlogEditor 
        blog={selectedBlog}
        blogs={blogs}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loader}></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={loadBlogs} className={styles.retryBtn}>
          Try Again
        </button>
      </div>
    );
  }

  const headerStats = [
    { label: 'Total', value: currentStats.total },
    { label: 'Published', value: currentStats.published },
    { label: 'Drafts', value: currentStats.draft },
    { label: 'Featured', value: currentStats.featured }
  ];

  const handleRefresh = () => {
    blogsAPI.invalidateCache();
    loadBlogs();
  };

  const handleAdd = () => {
    setIsEditing(true);
  };

  const filterOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'published', label: 'Published Only' },
    { value: 'draft', label: 'Drafts Only' },
    { value: 'featured', label: 'Featured Only' }
  ];

  return (
    <div className={styles.blogManager}>
      <ManagerHeader
        title="Blog Management"
        stats={headerStats}
        onRefresh={handleRefresh}
        onAdd={handleAdd}
        addButtonText="+ Add New Blog Post"
        refreshTitle="Force refresh data"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search blog posts..."
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={filterOptions}
      />

      <div className={styles.blogsList}>
        {filteredBlogs.map(blog => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onToggleFeatured={handleToggleFeatured}
          />
        ))}
      </div>

      {filteredBlogs.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <p>No blog posts found matching your criteria.</p>
          {(searchTerm || filter !== 'all') && (
            <div className={styles.emptyActions}>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className={styles.clearSearchBtn}
                >
                  Clear Search
                </button>
              )}
              {filter !== 'all' && (
                <button 
                  onClick={() => setFilter('all')}
                  className={styles.clearFilterBtn}
                >
                  Show All Posts
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BlogEditor = ({ blog, blogs, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    customSlug: '',
    image: '',
    caption: '',
    description: '',
    publishedDate: '',
    lastModified: '',
    category: '',
    tags: [],
    featured: false,
    status: 'draft',
    author: 'BigLeap Team',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  });

  const [useCustomSlug, setUseCustomSlug] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // Generate ID preview from title
  const generateSlugPreview = (title) => {
    if (!title) return '';
    
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    return slug;
  };

  // Validate custom slug format
  const validateSlug = (slug) => {
    if (!slug) return false;
    return /^[a-z0-9-]+$/.test(slug);
  };

  const currentSlug = blog 
    ? blog.slug 
    : useCustomSlug && formData.customSlug 
      ? formData.customSlug 
      : generateSlugPreview(formData.title);

  useEffect(() => {
    // Get current date in YYYY-MM-DD format
    const getCurrentDate = () => {
      return new Date().toISOString().split('T')[0];
    };

    if (blog) {
      // For existing blogs, preserve original publishedDate, only update lastModified
      const blogData = {
        title: blog.title || '',
        slug: blog.slug || '',
        customSlug: '',
        image: blog.image || '',
        caption: blog.caption || '',
        description: blog.description || '',
        publishedDate: blog.publishedDate || '', // Keep original date, don't auto-fill
        lastModified: getCurrentDate(), // Always update to current date on edit
        category: blog.category || '',
        tags: Array.isArray(blog.tags) ? blog.tags : [],
        featured: Boolean(blog.featured),
        status: blog.status || 'draft',
        author: blog.author || 'BigLeap Team',
        seo: {
          metaTitle: blog.seo?.metaTitle || '',
          metaDescription: blog.seo?.metaDescription || '',
          keywords: Array.isArray(blog.seo?.keywords) ? blog.seo.keywords : []
        }
      };
      setFormData(blogData);
      setUseCustomSlug(false); // For existing blogs, disable custom slug
    } else {
      // For new blogs, auto-fill with current date
      setFormData(prev => ({
        ...prev,
        publishedDate: getCurrentDate(),
        lastModified: getCurrentDate()
      }));
    }
  }, [blog]);

  // Extract available categories and tags from existing blogs
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const categories = [...new Set(blogs.map(b => b.category).filter(Boolean))];
      const tags = [...new Set(blogs.flatMap(b => b.tags || []).filter(Boolean))];
      
      setAvailableCategories(categories);
      setAvailableTags(tags);
    }
  }, [blogs]);


  const handleInputChange = (field, value, section = null) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section] || {}),
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAddTag = (tag = null) => {
    const tagToAdd = tag || tagInput.trim();
    if (tagToAdd && !formData.tags.includes(tagToAdd)) {
      const formattedTag = tagToAdd.toLowerCase().replace(/\s+/g, '-');
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, formattedTag]
      }));
      setTagInput('');
      setShowTagSuggestions(false);
    }
  };

  const handleTagInputChange = (value) => {
    setTagInput(value);
    setShowTagSuggestions(value.length > 0);
  };

  const getFilteredTagSuggestions = () => {
    if (!tagInput.trim()) return [];
    return availableTags.filter(tag => 
      tag.toLowerCase().includes(tagInput.toLowerCase()) && 
      !formData.tags.includes(tag)
    );
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !availableCategories.includes(newCategory.trim())) {
      const categoryToAdd = newCategory.trim();
      setAvailableCategories(prev => [...prev, categoryToAdd]);
      setFormData(prev => ({
        ...prev,
        category: categoryToAdd
      }));
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const handleKeywordAdd = () => {
    const keywordInput = document.getElementById('keywordInput');
    const keyword = keywordInput.value.trim();
    
    if (keyword && !formData.seo.keywords.includes(keyword)) {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, keyword]
        }
      }));
      keywordInput.value = '';
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter(keyword => keyword !== keywordToRemove)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate custom slug only for NEW blogs
    if (!blog && useCustomSlug && formData.customSlug && !validateSlug(formData.customSlug)) {
      alert('Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens.');
      return;
    }
    
    // Prepare data for submission
    const submitData = { 
      ...formData, 
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    // Add custom slug only for NEW blogs
    if (!blog && useCustomSlug && formData.customSlug) {
      submitData.customSlug = formData.customSlug;
    }
    
    onSave(submitData);
  };

  return (
    <div className={styles.blogEditor}>
      <div className={styles.editorHeader}>
        <h2>{blog ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
        <div className={styles.editorActions}>
          <button type="button" onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" form="blogForm" className={styles.saveBtn}>
            Save Blog Post
          </button>
        </div>
      </div>

      <form id="blogForm" onSubmit={handleSubmit} className={styles.editorForm}>
        <div className={styles.formSection}>
          <h3>Basic Information</h3>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Blog Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., The Art of 2D Animation"
                required
              />
            </div>
            <div className={styles.formField}>
              <label>Caption</label>
              <input
                type="text"
                value={formData.caption}
                onChange={(e) => handleInputChange('caption', e.target.value)}
                placeholder="Short display caption"
              />
            </div>
          </div>
          
          <div className={styles.formField}>
            <label>Blog Image</label>
            <ImageUpload
              value={formData.image}
              onChange={(url) => handleInputChange('image', url)}
              folder="blog"
              placeholder="Upload blog featured image or enter URL"
            />
          </div>
          
          <div className={styles.formField}>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed blog content description"
              rows={6}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Category</label>
              <div className={styles.categoryInputContainer}>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {availableCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                  <option value="Animation">Animation</option>
                  <option value="Design">Design</option>
                  <option value="Post Production">Post Production</option>
                  <option value="Technology">Technology</option>
                  <option value="Industry News">Industry News</option>
                  <option value="Tutorials">Tutorials</option>
                </select>
                <button 
                  type="button" 
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className={styles.addCategoryBtn}
                >
                  + Add New Category
                </button>
                {showAddCategory && (
                  <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter new category"
                      style={{ flex: 1 }}
                    />
                    <button 
                      type="button" 
                      onClick={handleAddCategory}
                      className={styles.addCategoryBtn}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.formField}>
              <label>Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Author name"
              />
            </div>
          </div>

          {/* Only show published date field for NEW blogs */}
          {!blog && (
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label>Published Date</label>
                <input
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => handleInputChange('publishedDate', e.target.value)}
                />
                <small className={styles.fieldNote}>
                  This date will be preserved once the blog is created
                </small>
              </div>
            </div>
          )}
        </div>

        <div className={styles.formSection}>
          <h3>URL & SEO</h3>
          <div className={styles.formField}>
            <label>Blog URL Slug</label>
            <div className={styles.slugSection}>
              <div className={styles.slugPreview}>
                <span className={styles.urlPrefix}>bigleap.ae/blog/</span>
                <span className={styles.slugDisplay}>{currentSlug || 'enter-title-or-custom-slug'}</span>
              </div>
              
              {/* Only show custom slug option for NEW blogs */}
              {!blog && (
                <div className={styles.slugControls}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={useCustomSlug}
                      onChange={(e) => setUseCustomSlug(e.target.checked)}
                    />
                    Use custom slug
                  </label>
                  
                  {useCustomSlug && (
                    <div className={styles.customSlugInputContainer}>
                      <input
                        type="text"
                        value={formData.customSlug}
                        onChange={(e) => handleInputChange('customSlug', e.target.value.replace(/[^a-z0-9-]/g, ''))}
                        placeholder="custom-blog-slug"
                        pattern="^[a-z0-9-]+$"
                        className={`${styles.customSlugInput} ${formData.customSlug && !validateSlug(formData.customSlug) ? styles.invalidInput : ''}`}
                      />
                      {formData.customSlug && !validateSlug(formData.customSlug) && (
                        <small className={styles.errorNote}>
                          Slug must contain only lowercase letters, numbers, and hyphens.
                        </small>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* For existing blogs, show slug as read-only */}
              {blog && (
                <div className={styles.slugInfo}>
                  <small className={styles.idNote}>
                    🔒 Blog URL is fixed once created to prevent broken links.
                  </small>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formField}>
            <label>SEO Meta Title</label>
            <input
              type="text"
              value={formData.seo.metaTitle}
              onChange={(e) => handleInputChange('metaTitle', e.target.value, 'seo')}
              placeholder="SEO optimized title for search engines"
              maxLength="60"
            />
            <small className={styles.fieldNote}>Recommended: 50-60 characters</small>
          </div>

          <div className={styles.formField}>
            <label>SEO Meta Description</label>
            <textarea
              value={formData.seo.metaDescription}
              onChange={(e) => handleInputChange('metaDescription', e.target.value, 'seo')}
              placeholder="Brief description for search engine results"
              rows={3}
              maxLength="160"
            />
            <small className={styles.fieldNote}>Recommended: 150-160 characters</small>
          </div>

          <div className={styles.formField}>
            <label>SEO Keywords</label>
            <div className={styles.keywordInput}>
              <input
                id="keywordInput"
                type="text"
                placeholder="Enter keyword and press Add"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleKeywordAdd())}
              />
              <button type="button" onClick={handleKeywordAdd} className={styles.addKeywordBtn}>
                Add
              </button>
            </div>
            <div className={styles.keywordsList}>
              {formData.seo.keywords.map((keyword, index) => (
                <span key={index} className={styles.keyword}>
                  {keyword}
                  <button type="button" onClick={() => handleRemoveKeyword(keyword)}>×</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Tags & Settings</h3>
          <div className={styles.formField}>
            <label>Tags</label>
            <div className={styles.tagSuggestions}>
              <div className={styles.tagInput}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => handleTagInputChange(e.target.value)}
                  placeholder="Enter tag and press Add"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
                  onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                />
                <button type="button" onClick={() => handleAddTag()} className={styles.addTagBtn}>
                  Add Tag
                </button>
              </div>
              {showTagSuggestions && getFilteredTagSuggestions().length > 0 && (
                <div className={styles.tagSuggestionsDropdown}>
                  {getFilteredTagSuggestions().map(tag => (
                    <div
                      key={tag}
                      className={styles.tagSuggestion}
                      onClick={() => handleAddTag(tag)}
                    >
                      {tag.replace(/-/g, ' ')}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.tagsList}>
              {formData.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag.replace(/-/g, ' ')}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                </span>
              ))}
            </div>
            <small className={styles.fieldNote}>
              Start typing to see suggestions from existing tags
            </small>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <div className={styles.statusSection}>
                <label>Publication Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            
            <div className={styles.formField}>
              <div className={styles.featuredSection}>
                <label className={styles.featuredToggle}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                  />
                  Featured blog post
                </label>
                <div className={styles.featuredNote}>
                  Featured posts are highlighted on the blog homepage.
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogManager;