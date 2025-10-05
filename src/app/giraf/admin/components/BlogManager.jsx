"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './blog-manager.module.css';
import { blogsAPI } from '../../../../lib/blogs-client';
import ImageUpload from './ImageUpload';

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

// Blog Card Component
const BlogCard = ({ blog, onEdit, onDelete, onToggleStatus, onToggleFeatured, onIndexChange, totalBlogs, onDragStart, onDragOver, onDrop, draggedIndex }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  
  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);
  
  const handleIndexSelect = async (newIndex) => {
    if (newIndex !== blog.index) {
      await onIndexChange(blog.id, newIndex);
    }
    setShowDropdown(false);
  };

  const handleIncrement = async () => {
    const newIndex = Math.min((blog.index || 0) + 1, totalBlogs);
    if (newIndex !== blog.index) {
      await onIndexChange(blog.id, newIndex);
    }
  };

  const handleDecrement = async () => {
    const newIndex = Math.max((blog.index || 0) - 1, 0);
    if (newIndex !== blog.index) {
      await onIndexChange(blog.id, newIndex);
    }
  };

  const handleDragStart = (e) => {
    // Prevent drag on mobile devices
    if (isMobile) {
      e.preventDefault();
      return;
    }
    onDragStart(blog.index, blog.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    // Prevent drag over on mobile devices
    if (isMobile) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(blog.index);
  };

  const handleDrop = (e) => {
    // Prevent drop on mobile devices
    if (isMobile) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    onDrop(blog.index);
  };

  const isDraggedOver = draggedIndex !== null && draggedIndex !== blog.index;
  const isBeingDragged = draggedIndex === blog.index;

  return (
    <div 
      key={blog.id} 
      className={`${styles.blogCard} ${blog.status === 'draft' ? styles.draftCard : ''} ${isBeingDragged ? styles.dragging : ''} ${isDraggedOver ? styles.dragOver : ''}`}
      draggable={!isMobile}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!isMobile && (
        <div className={styles.dragHandle} title="Drag to reorder">
          <span>⋮⋮</span>
        </div>
      )}
      
      <BlogImage 
        src={blog.image} 
        alt={blog.title}
        status={blog.status}
      />
      
      <div className={styles.blogContent}>
        <div className={styles.blogHeader}>
          <div className={styles.blogTitleGroup}>
            <div className={styles.indexControls}>
              <div className={styles.indexBadgeContainer} ref={dropdownRef}>
                <span 
                  className={styles.blogIndex}
                  onClick={() => setShowDropdown(!showDropdown)}
                  title="Click to change order"
                >
                  #{blog.index || 0}
                </span>
                {showDropdown && (
                  <div className={styles.indexDropdown}>
                    {Array.from({ length: totalBlogs + 1 }, (_, i) => (
                      <div
                        key={i}
                        className={`${styles.dropdownItem} ${i === (blog.index || 0) ? styles.currentIndex : ''}`}
                        onClick={() => handleIndexSelect(i)}
                      >
                        #{i}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.indexButtons}>
                <button
                  className={styles.indexBtn}
                  onClick={handleDecrement}
                  disabled={(blog.index || 0) <= 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  className={styles.indexBtn}
                  onClick={handleIncrement}
                  disabled={(blog.index || 0) >= totalBlogs}
                  title="Move down"
                >
                  ↓
                </button>
              </div>
            </div>
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
          <div className={styles.actions}>
            <button 
              className={styles.editBtn}
              onClick={() => onEdit(blog)}
            >
              Edit
            </button>
            <button 
              className={blog.status === 'published' ? styles.draftBtn : styles.publishBtn}
              onClick={() => onToggleStatus(blog.id, blog.status === 'published' ? 'draft' : 'published')}
            >
              {blog.status === 'published' ? 'Make Draft' : 'Publish'}
            </button>
            <button 
              className={blog.featured ? styles.unfeaturedBtn : styles.featuredBtn}
              onClick={() => onToggleFeatured(blog.id, !blog.featured)}
            >
              {blog.featured ? 'Unfeature' : 'Feature'}
            </button>
            <button 
              className={styles.deleteBtn}
              onClick={() => onDelete(blog.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  
  // Drag and drop state
  const [draggedBlog, setDraggedBlog] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Function to ensure unique indexes and fix duplicates
  const ensureUniqueIndexes = useCallback(async (blogsList) => {
    const indexMap = new Map();
    const duplicates = [];
    
    // Find duplicates
    blogsList.forEach(blog => {
      const index = blog.index || 0;
      if (indexMap.has(index)) {
        duplicates.push(blog);
      } else {
        indexMap.set(index, blog);
      }
    });
    
    // Fix duplicates by assigning new indexes
    if (duplicates.length > 0) {
      console.log('Found duplicate indexes, fixing...', duplicates);
      
      for (const blog of duplicates) {
        let newIndex = 0;
        while (indexMap.has(newIndex)) {
          newIndex++;
        }
        
        try {
          await blogsAPI.update(blog.id, { index: newIndex });
          indexMap.set(newIndex, blog);
          console.log(`Fixed duplicate index for blog ${blog.id}: assigned index ${newIndex}`);
        } catch (err) {
          console.error(`Failed to fix index for blog ${blog.id}:`, err);
        }
      }
      
      // Reload blogs after fixing duplicates
      return true;
    }
    
    return false;
  }, []);

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
      
      console.log('DEBUG: Blogs loaded from API:', response.data);
      
      // Check for duplicate indexes and fix them
      const needsReload = await ensureUniqueIndexes(response.data);
      
      if (needsReload) {
        // Reload data after fixing duplicates
        response = await blogsAPI.getAll();
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
        // Don't fail the whole load just for stats
      }
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, ensureUniqueIndexes]);

  // Load blogs when debounced search term changes
  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  // Filter blogs based on current filter (memoized for performance)
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        if (filter === 'published') return blog.status === 'published';
        if (filter === 'draft') return blog.status === 'draft';
        if (filter === 'featured') return blog.featured;
        return true; // 'all'
      })
      .sort((a, b) => (a.index || 0) - (b.index || 0)); // Sort by index
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

  const handleIndexChange = useCallback(async (blogId, newIndex) => {
    try {
      // Find the blog that currently has the target index
      const currentBlogAtIndex = blogs.find(s => s.index === newIndex);
      const blogToMove = blogs.find(s => s.id === blogId);
      
      if (!blogToMove) return;

      // If there's a blog at the target index, swap their positions
      if (currentBlogAtIndex && currentBlogAtIndex.id !== blogId) {
        // Swap indexes
        await blogsAPI.update(currentBlogAtIndex.id, { index: blogToMove.index || 0 });
      }
      
      // Update the moved blog's index
      await blogsAPI.update(blogId, { index: newIndex });
      
      // Force cache invalidation and reload
      blogsAPI.invalidateCache();
      await loadBlogs();
    } catch (err) {
      console.error('Error changing blog index:', err);
      alert('Failed to update blog order. Please try again.');
    }
  }, [blogs, loadBlogs]);

  // Drag and drop handlers
  const handleDragStart = useCallback((index, blogId) => {
    setDraggedIndex(index);
    setDraggedBlog(blogId);
  }, []);

  const handleDragOver = useCallback((index) => {
    // Visual feedback could be added here if needed
  }, []);

  const handleDrop = useCallback(async (targetIndex) => {
    if (draggedIndex !== null && draggedIndex !== targetIndex && draggedBlog) {
      try {
        // Get the blogs at both positions
        const draggedBlogObj = blogs.find(s => s.index === draggedIndex);
        const targetBlogObj = blogs.find(s => s.index === targetIndex);
        
        if (draggedBlogObj) {
          if (targetBlogObj) {
            // Swap the indexes
            await blogsAPI.update(draggedBlogObj.id, { index: targetIndex });
            await blogsAPI.update(targetBlogObj.id, { index: draggedIndex });
          } else {
            // Just move to the empty position
            await blogsAPI.update(draggedBlogObj.id, { index: targetIndex });
          }
          
          // Force cache invalidation and reload
          blogsAPI.invalidateCache();
          await loadBlogs();
        }
      } catch (err) {
        console.error('Error during drag and drop:', err);
        alert('Failed to reorder blogs. Please try again.');
      }
    }
    
    // Reset drag state
    setDraggedIndex(null);
    setDraggedBlog(null);
  }, [draggedIndex, draggedBlog, blogs, loadBlogs]);

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

  return (
    <div className={styles.blogManager}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>Blog Management</h2>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Total:</span>
              <span className={styles.statValue}>{currentStats.total}</span>
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Published:</span>
              <span className={styles.statValue}>{currentStats.published}</span>
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Drafts:</span>
              <span className={styles.statValue}>{currentStats.draft}</span>
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Featured:</span>
              <span className={styles.statValue}>{currentStats.featured}</span>
            </span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button 
            className={styles.refreshButton}
            onClick={() => {
              blogsAPI.invalidateCache();
              loadBlogs();
            }}
            title="Force refresh data"
          >
            Refresh
          </button>
          <button 
            className={styles.addButton}
            onClick={() => setIsEditing(true)}
          >
            + Add New Blog Post
          </button>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterBox}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Posts</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
            <option value="featured">Featured Only</option>
          </select>
        </div>
      </div>

      <div className={styles.blogsList}>
        {filteredBlogs.map(blog => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onToggleFeatured={handleToggleFeatured}
            onIndexChange={handleIndexChange}
            totalBlogs={blogs.length}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggedIndex={draggedIndex}
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
    index: 0,
    author: 'BigLeap Team',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  });

  const [useCustomSlug, setUseCustomSlug] = useState(false);
  const [tagInput, setTagInput] = useState('');

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
    if (blog) {
      // Ensure all fields exist with defaults
      const blogData = {
        title: blog.title || '',
        slug: blog.slug || '',
        customSlug: '',
        image: blog.image || '',
        caption: blog.caption || '',
        description: blog.description || '',
        publishedDate: blog.publishedDate || '',
        lastModified: blog.lastModified || '',
        category: blog.category || '',
        tags: Array.isArray(blog.tags) ? blog.tags : [],
        featured: Boolean(blog.featured),
        status: blog.status || 'draft',
        index: blog.index || 0,
        author: blog.author || 'BigLeap Team',
        seo: {
          metaTitle: blog.seo?.metaTitle || '',
          metaDescription: blog.seo?.metaDescription || '',
          keywords: Array.isArray(blog.seo?.keywords) ? blog.seo.keywords : []
        }
      };
      
      setFormData(blogData);
      setUseCustomSlug(false); // For existing blogs, disable custom slug
    }
  }, [blog]);

  // Auto-assign next available index for new blogs
  useEffect(() => {
    if (!blog && blogs && blogs.length > 0) {
      const maxIndex = Math.max(...blogs.map(s => s.index || 0));
      const nextIndex = maxIndex + 1;
      setFormData(prev => ({ ...prev, index: nextIndex }));
    }
  }, [blog, blogs]);

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

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase().replace(/\s+/g, '-')]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
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
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Animation">Animation</option>
                <option value="Design">Design</option>
                <option value="Post Production">Post Production</option>
                <option value="Technology">Technology</option>
                <option value="Industry News">Industry News</option>
                <option value="Tutorials">Tutorials</option>
              </select>
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

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Published Date</label>
              <input
                type="date"
                value={formData.publishedDate}
                onChange={(e) => handleInputChange('publishedDate', e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label>Display Order</label>
              <input
                type="number"
                value={formData.index}
                onChange={(e) => handleInputChange('index', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
                max="999"
                className={styles.indexInput}
              />
              <small className={styles.fieldNote}>
                Blog posts will be displayed in ascending order (0, 1, 2, etc.). Lower numbers appear first.
              </small>
            </div>
          </div>
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
            <div className={styles.tagInput}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tag and press Add"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button type="button" onClick={handleAddTag} className={styles.addTagBtn}>
                Add Tag
              </button>
            </div>
            <div className={styles.tagsList}>
              {formData.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag.replace(/-/g, ' ')}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.formRow}>
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
      </form>
    </div>
  );
};

export default BlogManager;