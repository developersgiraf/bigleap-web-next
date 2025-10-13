"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './blog-manager.module.css';
import { blogsAPI } from '../../../../../lib/blogs-client';
import ImageUpload from '../shared/ImageUpload';
import ManagerHeader from '../shared/elements/ManagerHeader';
import ActionButtons from '../shared/elements/ActionButtons';
import ManagerCard from '../shared/elements/ManagerCard';
import BlogEditor from '../subComponents/blogEditor/BlogEditor';

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
// Blog card components replaced with shared ManagerCard component

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
          <ManagerCard
            key={blog.id}
            item={blog}
            title={blog.title}
            description={blog.excerpt || `${blog.content?.substring(0, 150) || 'No content available'}...`}
            image={blog.image}
            status={blog.status}
            featured={blog.featured}
            metadata={[
              { label: 'Category', value: blog.category },
              { label: 'Published', value: blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString() : 'No date' }
            ]}
            onCardClick={() => handleEdit(blog)}
            actionButtons={[
              {
                type: 'edit',
                label: 'Edit',
                onClick: () => handleEdit(blog)
              },
              {
                type: blog.status === 'published' ? 'archive' : 'publish',
                label: blog.status === 'published' ? 'Make Draft' : 'Publish',
                onClick: () => handleToggleStatus(blog.id, blog.status === 'published' ? 'draft' : 'published')
              },
              {
                type: blog.featured ? 'archive' : 'publish',
                label: blog.featured ? 'Unfeature' : 'Feature',
                onClick: () => handleToggleFeatured(blog.id, !blog.featured)
              },
              {
                type: 'delete',
                label: 'Delete',
                onClick: () => handleDelete(blog.id)
              }
            ]}
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



export default BlogManager;