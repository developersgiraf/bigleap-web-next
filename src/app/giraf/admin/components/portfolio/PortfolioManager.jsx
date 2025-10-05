"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './portfolio-manager.module.css';
import { portfolioAdminAPI } from '../../../../../lib/portfolio-admin-client';
import ImageUpload from '../shared/ImageUpload';

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

// Portfolio Image Component
const PortfolioImage = ({ src, alt, status }) => {
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
    <div className={styles.portfolioImage}>
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
      {status === 'active' && (
        <div className={styles.activeBadge}>Active</div>
      )}
      {status === 'archived' && (
        <div className={styles.archivedBadge}>Archived</div>
      )}
    </div>
  );
};

// Portfolio Card Component
const PortfolioCard = ({ portfolio, onEdit, onDelete, onDuplicate }) => {
  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${portfolio.title}"?`)) {
      onDelete(portfolio.id);
    }
  }, [portfolio.id, portfolio.title, onDelete]);

  const handleDuplicateClick = useCallback((e) => {
    e.stopPropagation();
    onDuplicate(portfolio);
  }, [portfolio, onDuplicate]);

  return (
    <div className={styles.portfolioCard} onClick={() => onEdit(portfolio)}>
      <PortfolioImage 
        src={portfolio.cardData?.image} 
        alt={portfolio.title}
        status={portfolio.status}
      />
      <div className={styles.portfolioCardContent}>
        <div className={styles.portfolioHeader}>
          <h3>{portfolio.title}</h3>
          <div className={styles.portfolioMeta}>
            <span className={styles.category}>{portfolio.category}</span>
            <span className={styles.order}>#{portfolio.order}</span>
          </div>
        </div>
        <p className={styles.portfolioSubtitle}>{portfolio.subtitle}</p>
        <div className={styles.portfolioStats}>
          <span>{portfolio.projectGallery?.projects?.length || 0} Projects</span>
          <span>{portfolio.tags?.length || 0} Tags</span>
        </div>
        <div className={styles.portfolioActions}>
          <button 
            className={styles.editButton}
            onClick={(e) => { e.stopPropagation(); onEdit(portfolio); }}
          >
            Edit
          </button>
          <button 
            className={styles.duplicateButton}
            onClick={handleDuplicateClick}
          >
            Duplicate
          </button>
          <button 
            className={styles.deleteButton}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PortfolioManager() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('order');
  const [showForm, setShowForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    content: '',
    videoUrl: '',
    titleDescription: '',
    category: '',
    tags: [],
    status: 'active',
    featured: false,
    order: 1,
    cardData: {
      title: '',
      description: '',
      image: '',
      readbtn: 'Explore More',
      background: 'linear-gradient(to bottom, #000000, #000000)',
      link: ''
    },
    projectGallery: {
      title: '',
      subtitle: '',
      projects: []
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  });

  // Load portfolios
  const loadPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      const data = await portfolioAdminAPI.getPortfolios();
      setPortfolios(data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading portfolios:', err);
      setError('Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  // Filter and sort portfolios
  const filteredAndSortedPortfolios = useMemo(() => {
    let filtered = portfolios.filter(portfolio => {
      const matchesSearch = !searchTerm || 
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filterCategory || portfolio.category === filterCategory;
      const matchesStatus = !filterStatus || portfolio.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort portfolios
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'order':
          return a.order - b.order;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'lastModified':
          return new Date(b.lastModified) - new Date(a.lastModified);
        case 'featured':
          return b.featured - a.featured;
        default:
          return a.order - b.order;
      }
    });

    return filtered;
  }, [portfolios, searchTerm, filterCategory, filterStatus, sortBy]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(portfolios.map(p => p.category).filter(Boolean))];
  }, [portfolios]);

  // Statistics
  const stats = useMemo(() => ({
    total: portfolios.length,
    active: portfolios.filter(p => p.status === 'active').length,
    draft: portfolios.filter(p => p.status === 'draft').length,
    archived: portfolios.filter(p => p.status === 'archived').length,
    featured: portfolios.filter(p => p.featured).length
  }), [portfolios]);

  // Form handlers
  const handleEdit = useCallback((portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({
      ...portfolio,
      tags: portfolio.tags || [],
      cardData: portfolio.cardData || {
        title: '',
        description: '',
        image: '',
        readbtn: 'Explore More',
        background: 'linear-gradient(to bottom, #000000, #000000)',
        link: ''
      },
      projectGallery: portfolio.projectGallery || {
        title: '',
        subtitle: '',
        projects: []
      },
      seo: portfolio.seo || {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      }
    });
    setShowForm(true);
  }, []);

  const handleAdd = useCallback(() => {
    setEditingPortfolio(null);
    const nextOrder = Math.max(...portfolios.map(p => p.order || 0), 0) + 1;
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      content: '',
      videoUrl: '',
      titleDescription: '',
      category: '',
      tags: [],
      status: 'active',
      featured: false,
      order: nextOrder,
      cardData: {
        title: '',
        description: '',
        image: '',
        readbtn: 'Explore More',
        background: 'linear-gradient(to bottom, #000000, #000000)',
        link: ''
      },
      projectGallery: {
        title: '',
        subtitle: '',
        projects: []
      },
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      }
    });
    setShowForm(true);
  }, [portfolios]);

  const handleDuplicate = useCallback((portfolio) => {
    setEditingPortfolio(null);
    const nextOrder = Math.max(...portfolios.map(p => p.order || 0), 0) + 1;
    setFormData({
      ...portfolio,
      id: undefined,
      slug: undefined,
      title: `${portfolio.title} (Copy)`,
      order: nextOrder,
      createdDate: undefined,
      lastModified: undefined
    });
    setShowForm(true);
  }, [portfolios]);

  const handleDelete = useCallback(async (id) => {
    try {
      await portfolioAdminAPI.deletePortfolio(id);
      await loadPortfolios();
    } catch (err) {
      console.error('Error deleting portfolio:', err);
      alert('Failed to delete portfolio');
    }
  }, [loadPortfolios]);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Generate slug from title
      const slug = formData.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const portfolioData = {
        ...formData,
        slug,
        id: slug,
        cardData: {
          ...formData.cardData,
          title: formData.cardData.title || formData.title,
          link: `/portfolio/${slug}`
        },
        lastModified: new Date().toISOString().split('T')[0],
        ...(editingPortfolio ? {} : { createdDate: new Date().toISOString().split('T')[0] })
      };

      if (editingPortfolio) {
        await portfolioAdminAPI.updatePortfolio(editingPortfolio.id, portfolioData);
      } else {
        await portfolioAdminAPI.createPortfolio(portfolioData);
      }

      await loadPortfolios();
      setShowForm(false);
      setEditingPortfolio(null);
    } catch (err) {
      console.error('Error saving portfolio:', err);
      alert('Failed to save portfolio');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingPortfolio, isSubmitting, loadPortfolios]);

  if (loading) {
    return <div className={styles.loading}>Loading portfolios...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.portfolioManager}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>Portfolio Manager</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statIcon}>📊</span>
              <span>Total: {stats.total}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>✅</span>
              <span>Active: {stats.active}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>📝</span>
              <span>Draft: {stats.draft}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>⭐</span>
              <span>Featured: {stats.featured}</span>
            </div>
          </div>
        </div>
        
        <button 
          className={styles.addButton}
          onClick={handleAdd}
        >
          Add Portfolio
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search portfolios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="order">Sort by Order</option>
          <option value="title">Sort by Title</option>
          <option value="category">Sort by Category</option>
          <option value="lastModified">Sort by Last Modified</option>
          <option value="featured">Sort by Featured</option>
        </select>
      </div>

      {/* Portfolio Grid */}
      <div className={styles.portfolioGrid}>
        {filteredAndSortedPortfolios.map(portfolio => (
          <PortfolioCard
            key={portfolio.id}
            portfolio={portfolio}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        ))}
      </div>

      {filteredAndSortedPortfolios.length === 0 && (
        <div className={styles.emptyState}>
          <h3>No portfolios found</h3>
          <p>Try adjusting your search criteria or add a new portfolio.</p>
        </div>
      )}

      {/* Portfolio Form Modal */}
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingPortfolio ? 'Edit Portfolio' : 'Add Portfolio'}</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className={styles.form}>
              {/* Basic Info Section */}
              <div className={styles.formSection}>
                <h4>Basic Information</h4>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Subtitle</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g., Creative, Development, Design, Marketing"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                      min="1"
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows="4"
                  />
                </div>
              </div>

              {/* Media Section */}
              <div className={styles.formSection}>
                <h4>Media</h4>
                <div className={styles.formGroup}>
                  <label>Video URL (YouTube ID)</label>
                  <input
                    type="text"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="e.g., geMtgE6RmTQ"
                  />
                </div>
              </div>

              {/* Card Data Section */}
              <div className={styles.formSection}>
                <h4>Card Display</h4>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Card Title</label>
                    <input
                      type="text"
                      value={formData.cardData.title}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        cardData: { ...prev.cardData, title: e.target.value }
                      }))}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Card Image URL</label>
                    <input
                      type="text"
                      value={formData.cardData.image}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        cardData: { ...prev.cardData, image: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Card Description</label>
                  <textarea
                    value={formData.cardData.description}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      cardData: { ...prev.cardData, description: e.target.value }
                    }))}
                    rows="2"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Background Gradient</label>
                  <input
                    type="text"
                    value={formData.cardData.background}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      cardData: { ...prev.cardData, background: e.target.value }
                    }))}
                    placeholder="linear-gradient(to bottom, #000000, #000000)"
                  />
                </div>
              </div>

              {/* Settings Section */}
              <div className={styles.formSection}>
                <h4>Settings</h4>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      />
                      Featured Portfolio
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.saveButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : (editingPortfolio ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}