"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './portfolio-manager.module.css';
import { portfolioAdminAPI } from '../../../../../lib/portfolio-admin-client';
import ImageUpload from '../shared/ImageUpload';
import GradientColorPicker from '../shared/GradientColorPicker';
import ManagerHeader from '../shared/elements/ManagerHeader';
import ActionButtons from '../shared/elements/ActionButtons';
import ManagerCard from '../shared/elements/ManagerCard';

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
// Portfolio card components replaced with shared ManagerCard component

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
  
  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedId, setDraggedId] = useState(null);

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

  // Function to ensure unique orders and fix duplicates with consecutive numbering
  const ensureUniqueOrders = useCallback(async (portfoliosList) => {
    const orderMap = new Map();
    const duplicates = [];
    let needsReordering = false;
    
    // Sort portfolios by order to maintain relative positions
    const sortedPortfolios = [...portfoliosList].sort((a, b) => (a.order || 0) - (b.order || 0));
    
    // Find duplicates and check for non-consecutive numbering
    sortedPortfolios.forEach((portfolio, index) => {
      const order = portfolio.order || 0;
      const expectedOrder = index + 1; // Orders should start from 1
      
      if (orderMap.has(order)) {
        duplicates.push(portfolio);
      } else {
        orderMap.set(order, portfolio);
      }
      
      // Check if order is not consecutive
      if (order !== expectedOrder) {
        needsReordering = true;
      }
    });

    // Fix duplicates and ensure consecutive numbering
    if (duplicates.length > 0 || needsReordering) {
      try {
        // Reassign consecutive orders starting from 1
        for (let i = 0; i < sortedPortfolios.length; i++) {
          const portfolio = sortedPortfolios[i];
          const newOrder = i + 1;
          
          if (portfolio.order !== newOrder) {
            await portfolioAdminAPI.updatePortfolio(portfolio.id, { ...portfolio, order: newOrder });
          }
        }
        
        // Reload after fixing
        await loadPortfolios();
      } catch (error) {
        console.error('Error fixing portfolio orders:', error);
      }
    }
  }, [loadPortfolios]);

  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  // Ensure unique orders when portfolios are loaded
  useEffect(() => {
    if (portfolios.length > 0) {
      ensureUniqueOrders(portfolios);
    }
  }, [portfolios, ensureUniqueOrders]);

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

  const headerStats = [
    { label: 'Total', value: stats.total },
    { label: 'Active', value: stats.active },
    { label: 'Draft', value: stats.draft },
    { label: 'Featured', value: stats.featured }
  ];

  const handleRefresh = () => {
    // Add refresh functionality if needed
    loadPortfolios();
  };

  // Drag and Drop Handlers
  const handleDragStart = (order, id) => {
    setDraggedIndex(order);
    setDraggedId(id);
  };

  const handleDragOver = (order) => {
    // Visual feedback during drag over
  };

  const handleDrop = async (targetOrder) => {
    if (draggedIndex !== null && draggedIndex !== targetOrder && draggedId) {
      try {
        // Get the portfolios at both positions
        const draggedPortfolio = portfolios.find(p => p.order === draggedIndex);
        const targetPortfolio = portfolios.find(p => p.order === targetOrder);
        
        if (draggedPortfolio) {
          if (targetPortfolio) {
            // Swap the orders
            await portfolioAdminAPI.updatePortfolio(draggedPortfolio.id, { ...draggedPortfolio, order: targetOrder });
            await portfolioAdminAPI.updatePortfolio(targetPortfolio.id, { ...targetPortfolio, order: draggedIndex });
          } else {
            // Just move to the empty position
            await portfolioAdminAPI.updatePortfolio(draggedPortfolio.id, { ...draggedPortfolio, order: targetOrder });
          }
          
          // Reload portfolios to reflect changes
          await loadPortfolios();
        }
      } catch (error) {
        console.error('Error updating portfolio order:', error);
        alert('Failed to reorder portfolios. Please try again.');
      }
    }
    
    setDraggedIndex(null);
    setDraggedId(null);
  };

  // Index Change Handler
  const handleIndexChange = async (portfolioId, newOrder) => {
    try {
      // Find the portfolio that currently has the target order
      const currentPortfolioAtOrder = portfolios.find(p => p.order === newOrder);
      const portfolioToMove = portfolios.find(p => p.id === portfolioId);
      
      if (!portfolioToMove) return;

      // If there's a portfolio at the target order, swap their positions
      if (currentPortfolioAtOrder && currentPortfolioAtOrder.id !== portfolioId) {
        // Swap orders
        await portfolioAdminAPI.updatePortfolio(currentPortfolioAtOrder.id, { ...currentPortfolioAtOrder, order: portfolioToMove.order || 0 });
      }
      
      // Update the moved portfolio's order
      await portfolioAdminAPI.updatePortfolio(portfolioId, { ...portfolioToMove, order: newOrder });
      
      // Reload portfolios to reflect changes
      await loadPortfolios();
    } catch (error) {
      console.error('Error updating portfolio order:', error);
      alert('Failed to update portfolio order. Please try again.');
    }
  };

  // Prepare filter options for portfolio
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(category => ({ value: category, label: category }))
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  const sortOptions = [
    { value: 'order', label: 'Sort by Order' },
    { value: 'title', label: 'Sort by Title' },
    { value: 'category', label: 'Sort by Category' },
    { value: 'lastModified', label: 'Sort by Last Modified' },
    { value: 'featured', label: 'Sort by Featured' }
  ];

  const additionalFilters = [
    {
      value: filterCategory,
      onChange: setFilterCategory,
      options: categoryOptions
    },
    {
      value: filterStatus,
      onChange: setFilterStatus,
      options: statusOptions
    },
    {
      value: sortBy,
      onChange: setSortBy,
      options: sortOptions
    }
  ];

  return (
    <div className={styles.portfolioManager}>
      <ManagerHeader
        title="Portfolio Management"
        stats={headerStats}
        onRefresh={handleRefresh}
        onAdd={handleAdd}
        addButtonText="+ Add New Portfolio"
        refreshTitle="Refresh portfolio data"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search portfolios..."
        additionalFilters={additionalFilters}
      />

      {/* Portfolio Grid */}
      <div className={styles.portfolioGrid}>
        {filteredAndSortedPortfolios.map(portfolio => (
          <ManagerCard
            key={portfolio.id}
            item={portfolio}
            title={portfolio.title}
            subtitle={portfolio.subtitle}
            image={portfolio.cardData?.image}
            status={portfolio.status}
            showIndexControls={true}
            currentIndex={portfolio.order}
            totalItems={portfolios.length}
            onIndexChange={handleIndexChange}
            draggable={true}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggedIndex={draggedIndex}
            metadata={[
              { label: 'Category', value: portfolio.category }
            ]}
            stats={[
              { label: 'Projects', value: portfolio.projectGallery?.projects?.length || 0 },
              { label: 'Tags', value: portfolio.tags?.length || 0 }
            ]}
            onCardClick={() => handleEdit(portfolio)}
            actionButtons={[
              {
                type: 'edit',
                label: 'Edit',
                onClick: () => handleEdit(portfolio)
              },
              {
                type: 'duplicate',
                label: 'Duplicate',
                onClick: () => handleDuplicate(portfolio)
              },
              {
                type: 'delete',
                label: 'Delete',
                onClick: () => handleDelete(portfolio.id)
              }
            ]}
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
                  <GradientColorPicker
                    label="Background Gradient"
                    value={formData.cardData.background}
                    onChange={(newGradient) => setFormData(prev => ({ 
                      ...prev, 
                      cardData: { ...prev.cardData, background: newGradient }
                    }))}
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