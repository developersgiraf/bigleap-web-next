"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './services-manager.module.css';
import { servicesAPI } from '../../../../lib/services-client';
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

// Optimized Image Component with proper error handling
const ServiceImage = ({ src, alt, archived }) => {
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
    <div className={styles.serviceImage}>
      <img 
        src={imageSrc}
        alt={alt}
        onError={handleError}
        loading="lazy"
        style={{ objectFit: 'cover' }}
      />
      {archived && (
        <div className={styles.archivedBadge}>Archived</div>
      )}
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, onEdit, onArchive, onDelete, onIndexChange, totalServices, onDragStart, onDragOver, onDrop, draggedIndex }) => {
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
    if (newIndex !== service.index) {
      await onIndexChange(service.id, newIndex);
    }
    setShowDropdown(false);
  };

  const handleIncrement = async () => {
    const newIndex = Math.min((service.index || 0) + 1, totalServices);
    if (newIndex !== service.index) {
      await onIndexChange(service.id, newIndex);
    }
  };

  const handleDecrement = async () => {
    const newIndex = Math.max((service.index || 0) - 1, 0);
    if (newIndex !== service.index) {
      await onIndexChange(service.id, newIndex);
    }
  };

  const handleDragStart = (e) => {
    // Prevent drag on mobile devices
    if (isMobile) {
      e.preventDefault();
      return;
    }
    onDragStart(service.index, service.id);
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
    onDragOver(service.index);
  };

  const handleDrop = (e) => {
    // Prevent drop on mobile devices
    if (isMobile) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    onDrop(service.index);
  };

  const isDraggedOver = draggedIndex !== null && draggedIndex !== service.index;
  const isBeingDragged = draggedIndex === service.index;

  return (
    <div 
      key={service.id} 
      className={`${styles.serviceCard} ${service.archived ? styles.archivedCard : ''} ${isBeingDragged ? styles.dragging : ''} ${isDraggedOver ? styles.dragOver : ''}`}
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
      
      <ServiceImage 
        src={service.thumbnail || service.section01?.image} 
        alt={service.title || service.bannerTitle}
        archived={service.archived}
      />
      
      <div className={styles.serviceContent}>
        <div className={styles.serviceHeader}>
          <div className={styles.serviceTitleGroup}>
            <div className={styles.indexControls}>
              <div className={styles.indexBadgeContainer} ref={dropdownRef}>
                <span 
                  className={styles.serviceIndex}
                  onClick={() => setShowDropdown(!showDropdown)}
                  title="Click to change order"
                >
                  #{service.index || 0}
                </span>
                {showDropdown && (
                  <div className={styles.indexDropdown}>
                    {Array.from({ length: totalServices + 1 }, (_, i) => (
                      <div
                        key={i}
                        className={`${styles.dropdownItem} ${i === (service.index || 0) ? styles.currentIndex : ''}`}
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
                  disabled={(service.index || 0) <= 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  className={styles.indexBtn}
                  onClick={handleIncrement}
                  disabled={(service.index || 0) >= totalServices}
                  title="Move down"
                >
                  ↓
                </button>
              </div>
            </div>
            <h3>{service.title || service.bannerTitle}</h3>
          </div>
          <div className={styles.status}>
            {service.archived ? (
              <span className={styles.statusArchived}>Archived</span>
            ) : (
              <span className={styles.statusActive}>Active</span>
            )}
          </div>
        </div>
        
        <p className={styles.serviceDescription}>
          {service.section01?.description?.substring(0, 150) || 'No description available'}...
        </p>
        
        <div className={styles.serviceFooter}>
          <div className={styles.actions}>
            <button 
              className={styles.editBtn}
              onClick={() => onEdit(service)}
            >
              Edit
            </button>
            <button 
              className={service.archived ? styles.unarchiveBtn : styles.archiveBtn}
              onClick={() => onArchive(service.id, service.archived)}
            >
              {service.archived ? 'Unarchive' : 'Archive'}
            </button>
            <button 
              className={styles.deleteBtn}
              onClick={() => onDelete(service.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, active: 0, archived: 0 });
  
  // Drag and drop state
  const [draggedService, setDraggedService] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Function to ensure unique indexes and fix duplicates
  const ensureUniqueIndexes = useCallback(async (servicesList) => {
    const indexMap = new Map();
    const duplicates = [];
    
    // Find duplicates
    servicesList.forEach(service => {
      const index = service.index || 0;
      if (indexMap.has(index)) {
        duplicates.push(service);
      } else {
        indexMap.set(index, service);
      }
    });
    
    // Fix duplicates by assigning new indexes
    if (duplicates.length > 0) {
      console.log('Found duplicate indexes, fixing...', duplicates);
      
      for (const service of duplicates) {
        let newIndex = 0;
        while (indexMap.has(newIndex)) {
          newIndex++;
        }
        
        try {
          await servicesAPI.update(service.id, { index: newIndex });
          indexMap.set(newIndex, service);
          console.log(`Fixed duplicate index for service ${service.id}: assigned index ${newIndex}`);
        } catch (err) {
          console.error(`Failed to fix index for service ${service.id}:`, err);
        }
      }
      
      // Reload services after fixing duplicates
      return true;
    }
    
    return false;
  }, []);

  // Load services data with caching
  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (debouncedSearchTerm.trim()) {
        response = await servicesAPI.search(debouncedSearchTerm);
      } else {
        response = await servicesAPI.getAll();
      }
      
      console.log('DEBUG: Services loaded from API:', response.data);
      
      // Check for duplicate indexes and fix them
      const needsReload = await ensureUniqueIndexes(response.data);
      
      if (needsReload) {
        // Reload data after fixing duplicates
        response = await servicesAPI.getAll();
        console.log('DEBUG: Services reloaded after fixing duplicates:', response.data);
      }
      
      setServices(response.data);
      
      // Always load stats for header display (independent of search)
      try {
        const statsResponse = await servicesAPI.getStats();
        setStats(statsResponse.data);
      } catch (statsError) {
        console.warn('Failed to load stats:', statsError);
        // Don't fail the whole load just for stats
      }
    } catch (err) {
      console.error('Error loading services:', err);
      setError('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, ensureUniqueIndexes]);

  // Load services when debounced search term changes
  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Filter services based on current filter (memoized for performance)
  const filteredServices = useMemo(() => {
    return services
      .filter(service => {
        if (filter === 'active') return !service.archived;
        if (filter === 'archived') return service.archived;
        return true; // 'all'
      })
      .sort((a, b) => (a.index || 0) - (b.index || 0)); // Sort by index
  }, [services, filter]);

  // Calculate stats from current services (memoized for performance)
  const currentStats = useMemo(() => {
    // Always use API stats for header display (shows total counts, not search results)
    return stats;
  }, [stats]);

  const handleEdit = useCallback((service) => {
    setSelectedService(service);
    setIsEditing(true);
  }, []);

  const handleArchive = useCallback(async (serviceId, currentArchiveState) => {
    try {
      await servicesAPI.update(serviceId, { archived: !currentArchiveState });
      await loadServices(); // Refresh the list
    } catch (err) {
      console.error('Error archiving/unarchiving service:', err);
      alert('Failed to update service status. Please try again.');
    }
  }, [loadServices]);

  const handleDelete = useCallback(async (serviceId) => {
    console.log('DEBUG: Attempting to delete service with ID:', serviceId);
    if (confirm('Are you sure you want to permanently delete this service?')) {
      try {
        // Force cache clear before deletion
        servicesAPI.invalidateCache();
        await servicesAPI.delete(serviceId);
        // Force cache clear after deletion and reload
        servicesAPI.invalidateCache();
        await loadServices(); // Refresh the list
      } catch (err) {
        console.error('Error deleting service:', err);
        alert('Failed to delete service. Please try again.');
      }
    }
  }, [loadServices]);

  const handleIndexChange = useCallback(async (serviceId, newIndex) => {
    try {
      // Find the service that currently has the target index
      const currentServiceAtIndex = services.find(s => s.index === newIndex);
      const serviceToMove = services.find(s => s.id === serviceId);
      
      if (!serviceToMove) return;

      // If there's a service at the target index, swap their positions
      if (currentServiceAtIndex && currentServiceAtIndex.id !== serviceId) {
        // Swap indexes
        await servicesAPI.update(currentServiceAtIndex.id, { index: serviceToMove.index || 0 });
      }
      
      // Update the moved service's index
      await servicesAPI.update(serviceId, { index: newIndex });
      
      // Force cache invalidation and reload
      servicesAPI.invalidateCache();
      await loadServices();
    } catch (err) {
      console.error('Error changing service index:', err);
      alert('Failed to update service order. Please try again.');
    }
  }, [services, loadServices]);

  // Drag and drop handlers
  const handleDragStart = useCallback((index, serviceId) => {
    setDraggedIndex(index);
    setDraggedService(serviceId);
  }, []);

  const handleDragOver = useCallback((index) => {
    // Visual feedback could be added here if needed
  }, []);

  const handleDrop = useCallback(async (targetIndex) => {
    if (draggedIndex !== null && draggedIndex !== targetIndex && draggedService) {
      try {
        // Get the services at both positions
        const draggedServiceObj = services.find(s => s.index === draggedIndex);
        const targetServiceObj = services.find(s => s.index === targetIndex);
        
        if (draggedServiceObj) {
          if (targetServiceObj) {
            // Swap the indexes
            await servicesAPI.update(draggedServiceObj.id, { index: targetIndex });
            await servicesAPI.update(targetServiceObj.id, { index: draggedIndex });
          } else {
            // Just move to the empty position
            await servicesAPI.update(draggedServiceObj.id, { index: targetIndex });
          }
          
          // Force cache invalidation and reload
          servicesAPI.invalidateCache();
          await loadServices();
        }
      } catch (err) {
        console.error('Error during drag and drop:', err);
        alert('Failed to reorder services. Please try again.');
      }
    }
    
    // Reset drag state
    setDraggedIndex(null);
    setDraggedService(null);
  }, [draggedIndex, draggedService, services, loadServices]);

  const handleSave = useCallback(async (serviceData) => {
    try {
      let result;
      if (selectedService) {
        // Update existing service
        result = await servicesAPI.update(selectedService.id, serviceData);
        
        // If slug changed, the API returns the new ID
        if (result.slugChanged && result.data.id !== selectedService.id) {
          console.log(`Service slug changed from ${selectedService.id} to ${result.data.id}`);
          // Force cache invalidation for the old service ID
          servicesAPI.invalidateCache();
          // The service now has a new ID/slug
          setSelectedService(null); // Clear selection since the ID changed
        }
      } else {
        // Create new service
        result = await servicesAPI.create(serviceData);
      }
      
      // Force cache invalidation and reload
      servicesAPI.invalidateCache();
      setIsEditing(false);
      setSelectedService(null);
      await loadServices(); // Refresh the list
    } catch (err) {
      console.error('Error saving service:', err);
      alert('Failed to save service. Please try again.');
    }
  }, [selectedService, loadServices]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setSelectedService(null);
  }, []);

  if (isEditing) {
    return (
      <ServiceEditor 
        service={selectedService}
        services={services}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loader}></div>
        <p>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={loadServices} className={styles.retryBtn}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.servicesManager}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>Services Management</h2>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Total:</span>
              <span className={styles.statValue}>{currentStats.total}</span>
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Active:</span>
              <span className={styles.statValue}>{currentStats.active}</span>
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Archived:</span>
              <span className={styles.statValue}>{currentStats.archived}</span>
            </span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button 
            className={styles.refreshButton}
            onClick={() => {
              servicesAPI.invalidateCache();
              loadServices();
            }}
            title="Force refresh data"
          >
            Refresh
          </button>
          <button 
            className={styles.addButton}
            onClick={() => setIsEditing(true)}
          >
            + Add New Service
          </button>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search services..."
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
            <option value="all">All Services</option>
            <option value="active">Active Only</option>
            <option value="archived">Archived Only</option>
          </select>
        </div>
      </div>

      <div className={styles.servicesList}>
        {filteredServices.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={handleEdit}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onIndexChange={handleIndexChange}
            totalServices={services.length}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggedIndex={draggedIndex}
          />
        ))}
      </div>

      {filteredServices.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <p>No services found matching your criteria.</p>
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
                  Show All Services
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ServiceEditor = ({ service, services, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    bannerTitle: '',
    customSlug: '', // For custom slug editing
    archived: false,
    index: 0, // Will be auto-assigned for new services
    thumbnail: '', // Separate thumbnail image for card display
    section01: {
      image: '',
      heading: '',
      description: ''
    },
    section02: {
      DescTitle: '',
      Descpara: '',
      subsections: []
    },
    listHead: '',
    listPara: '',
    list: []
  });

  const [useCustomSlug, setUseCustomSlug] = useState(false);

  // Generate ID preview from banner title
  const generateIdPreview = (bannerTitle) => {
    if (!bannerTitle) return '';
    
    let slug = bannerTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    // Ensure slug doesn't start with a number (add prefix if needed)
    if (/^[0-9]/.test(slug)) {
      slug = 'service-' + slug;
    }
    
    return slug;
  };

  // Validate custom slug format
  const validateSlug = (slug) => {
    if (!slug) return false;
    // Must start with letter, can contain letters (uppercase/lowercase), numbers, hyphens, underscores
    return /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(slug);
  };

  const currentId = service 
    ? service.id 
    : useCustomSlug && formData.customSlug 
      ? formData.customSlug 
      : generateIdPreview(formData.bannerTitle);

  useEffect(() => {
    if (service) {
      // Handle both old and new data formats
      const serviceData = { ...service };
      
      // Convert old subsection format to new format if needed
      if (serviceData.section02 && !serviceData.section02.subsections) {
        const subsections = [];
        
        // Convert old subhead/subdes pairs to new format
        for (let i = 1; i <= 4; i++) {
          const heading = serviceData.section02[`subhead${i}`];
          const description = serviceData.section02[`subdes${i}`];
          
          if (heading && heading.trim()) {
            subsections.push({
              heading: heading.trim(),
              description: description ? description.trim() : ''
            });
          }
        }
        
        // Remove old fields and add new subsections
        const { subhead1, subdes1, subhead2, subdes2, subhead3, subdes3, subhead4, subdes4, ...cleanSection02 } = serviceData.section02;
        serviceData.section02 = {
          ...cleanSection02,
          subsections
        };
      }
      
      // Ensure subsections array exists
      if (!serviceData.section02.subsections) {
        serviceData.section02.subsections = [];
      }
      
      // Ensure thumbnail field exists (backward compatibility)
      if (!serviceData.thumbnail) {
        serviceData.thumbnail = '';
      }
      
      // Ensure index field exists (backward compatibility)
      if (typeof serviceData.index === 'undefined') {
        serviceData.index = 0;
      }
      
      setFormData(serviceData);
      // If editing existing service, allow custom slug editing
      setUseCustomSlug(true);
      setFormData(prev => ({ ...prev, customSlug: service.id }));
    }
  }, [service]);

  // Auto-assign next available index for new services
  useEffect(() => {
    if (!service && services && services.length > 0) {
      const maxIndex = Math.max(...services.map(s => s.index || 0));
      const nextIndex = maxIndex + 1;
      setFormData(prev => ({ ...prev, index: nextIndex }));
    }
  }, [service, services]);

  const handleInputChange = (field, value, section = null) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
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

  const handleListItemChange = (index, field, value) => {
    const newList = [...formData.list];
    newList[index] = { ...newList[index], [field]: value };
    setFormData(prev => ({ ...prev, list: newList }));
  };

  const addListItem = () => {
    setFormData(prev => ({
      ...prev,
      list: [...prev.list, { title: '', description: '' }]
    }));
  };

  const removeListItem = (index) => {
    setFormData(prev => ({
      ...prev,
      list: prev.list.filter((_, i) => i !== index)
    }));
  };

  // Subsection management functions
  const handleSubsectionChange = (index, field, value) => {
    const newSubsections = [...formData.section02.subsections];
    newSubsections[index] = { ...newSubsections[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      section02: {
        ...prev.section02,
        subsections: newSubsections
      }
    }));
  };

  const addSubsection = () => {
    setFormData(prev => ({
      ...prev,
      section02: {
        ...prev.section02,
        subsections: [...prev.section02.subsections, { heading: '', description: '' }]
      }
    }));
  };

  const removeSubsection = (index) => {
    setFormData(prev => ({
      ...prev,
      section02: {
        ...prev.section02,
        subsections: prev.section02.subsections.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate custom slug if being used
    if (useCustomSlug && formData.customSlug && !validateSlug(formData.customSlug)) {
      alert('Invalid slug format. Slug must start with a letter and contain only letters, numbers, hyphens, and underscores.');
      return;
    }
    
    // Prepare data for submission
    const submitData = { 
      ...formData, 
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    // Add custom slug if specified
    if (useCustomSlug && formData.customSlug) {
      submitData.customSlug = formData.customSlug;
    }
    
    onSave(submitData);
  };

  return (
    <div className={styles.serviceEditor}>
      <div className={styles.editorHeader}>
        <h2>{service ? 'Edit Service' : 'Add New Service'}</h2>
        <div className={styles.editorActions}>
          <button type="button" onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" form="serviceForm" className={styles.saveBtn}>
            Save Service
          </button>
        </div>
      </div>

      <form id="serviceForm" onSubmit={handleSubmit} className={styles.editorForm}>
        <div className={styles.formSection}>
          <h3>Basic Information</h3>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Service Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., 2D Animation"
                required
              />
            </div>
            <div className={styles.formField}>
              <label>Banner Title</label>
              <input
                type="text"
                value={formData.bannerTitle}
                onChange={(e) => handleInputChange('bannerTitle', e.target.value)}
                placeholder="Title for banner section"
                required
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
                Services will be displayed in ascending order (0, 1, 2, etc.). Lower numbers appear first.
              </small>
            </div>
          </div>
          <div className={styles.formField}>
            <label>Thumbnail Image</label>
            <ImageUpload
              value={formData.thumbnail}
              onChange={(url) => handleInputChange('thumbnail', url)}
              folder="services"
              placeholder="Upload thumbnail image for card display"
            />
            <small className={styles.fieldNote}>
              This image will be used for the service card thumbnail. Recommended size: 400x300px.
            </small>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Service ID / URL Slug</label>
              <div className={styles.slugSection}>
                <div className={styles.slugPreview}>
                  <span className={styles.urlPrefix}>bigleap.ae/services/</span>
                  <span className={styles.idDisplay}>{currentId || 'enter-title-or-custom-slug'}</span>
                </div>
                
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
                        onChange={(e) => handleInputChange('customSlug', e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                        placeholder="Custom_Service-Slug"
                        pattern="^[a-zA-Z][a-zA-Z0-9-_]*$"
                        className={`${styles.customSlugInput} ${formData.customSlug && !validateSlug(formData.customSlug) ? styles.invalidInput : ''}`}
                      />
                      {formData.customSlug && !validateSlug(formData.customSlug) && (
                        <small className={styles.errorNote}>
                          Slug must start with a letter and contain only letters, numbers, hyphens, and underscores.
                        </small>
                      )}
                      {(!formData.customSlug || validateSlug(formData.customSlug)) && (
                        <small className={styles.slugNote}>
                          Custom URL will be: /servicess/{formData.customSlug || 'Your_Custom-Slug'}
                        </small>
                      )}
                    </div>
                  )}
                </div>
                
                {!useCustomSlug && !service && (
                  <small className={styles.idNote}>
                    Automatically generated from banner title. Check "Use custom slug" to customize.
                  </small>
                )}
                {service && (
                  <small className={styles.idNote}>
                    ⚠️ Changing the slug will update the service URL. Make sure to update any existing links.
                  </small>
                )}
              </div>
            </div>
            
            <div className={styles.archiveSection}>
              <label className={styles.archiveToggle}>
                <input
                  type="checkbox"
                  checked={formData.archived || false}
                  onChange={(e) => handleInputChange('archived', e.target.checked)}
                />
                Archive this service
              </label>
              <div className={styles.archiveNote}>
                Archived services are hidden from the public website but can be restored later.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Section 1 - Main Content</h3>
          <div className={styles.formField}>
            <label>Service Image</label>
            <ImageUpload
              value={formData.section01.image}
              onChange={(url) => handleInputChange('image', url, 'section01')}
              folder="services"
              placeholder="Upload service image or enter URL"
            />
          </div>
          <div className={styles.formField}>
            <label>Heading</label>
            <input
              type="text"
              value={formData.section01.heading}
              onChange={(e) => handleInputChange('heading', e.target.value, 'section01')}
              placeholder="Main heading for the service"
              required
            />
          </div>
          <div className={styles.formField}>
            <label>Description</label>
            <textarea
              value={formData.section01.description}
              onChange={(e) => handleInputChange('description', e.target.value, 'section01')}
              placeholder="Detailed description of the service"
              rows={4}
              required
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Section 2 - Detailed Information</h3>
          <div className={styles.formField}>
            <label>Description Title</label>
            <input
              type="text"
              value={formData.section02.DescTitle}
              onChange={(e) => handleInputChange('DescTitle', e.target.value, 'section02')}
              placeholder="Title for detailed section"
            />
          </div>
          <div className={styles.formField}>
            <label>Description Paragraph</label>
            <textarea
              value={formData.section02.Descpara}
              onChange={(e) => handleInputChange('Descpara', e.target.value, 'section02')}
              placeholder="Detailed explanation"
              rows={4}
            />
          </div>

          <div className={styles.subSections}>
            <div className={styles.listHeader}>
              <h4>Sub-sections</h4>
              <button type="button" onClick={addSubsection} className={styles.addItemBtn}>
                + Add Subsection
              </button>
            </div>

            {formData.section02.subsections.map((subsection, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemHeader}>
                  <h5>Subsection {index + 1}</h5>
                  <button 
                    type="button" 
                    onClick={() => removeSubsection(index)}
                    className={styles.removeItemBtn}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.formField}>
                  <label>Heading</label>
                  <input
                    type="text"
                    value={subsection.heading}
                    onChange={(e) => handleSubsectionChange(index, 'heading', e.target.value)}
                    placeholder="Subsection heading"
                  />
                </div>
                <div className={styles.formField}>
                  <label>Description</label>
                  <textarea
                    value={subsection.description}
                    onChange={(e) => handleSubsectionChange(index, 'description', e.target.value)}
                    placeholder="Subsection description"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Services List</h3>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>List Heading</label>
              <input
                type="text"
                value={formData.listHead}
                onChange={(e) => handleInputChange('listHead', e.target.value)}
                placeholder="Heading for services list"
              />
            </div>
            <div className={styles.formField}>
              <label>List Paragraph</label>
              <textarea
                value={formData.listPara}
                onChange={(e) => handleInputChange('listPara', e.target.value)}
                placeholder="Description for services list"
                rows={2}
              />
            </div>
          </div>

          <div className={styles.listItems}>
            <div className={styles.listHeader}>
              <h4>Service Items</h4>
              <button type="button" onClick={addListItem} className={styles.addItemBtn}>
                + Add Item
              </button>
            </div>

            {formData.list.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemHeader}>
                  <h5>Item {index + 1}</h5>
                  <button 
                    type="button" 
                    onClick={() => removeListItem(index)}
                    className={styles.removeItemBtn}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.formField}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleListItemChange(index, 'title', e.target.value)}
                    placeholder="Service item title"
                  />
                </div>
                <div className={styles.formField}>
                  <label>Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleListItemChange(index, 'description', e.target.value)}
                    placeholder="Service item description"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServicesManager;