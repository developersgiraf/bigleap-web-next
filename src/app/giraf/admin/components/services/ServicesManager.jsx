"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './services-manager.module.css';
import { servicesAPI } from '../../../../../lib/services-client';
import ImageUpload from '../shared/ImageUpload';
import ManagerHeader from '../shared/elements/ManagerHeader';
import ActionButtons from '../shared/elements/ActionButtons';
import ManagerCard from '../shared/elements/ManagerCard';
import ServiceEditor from '../subComponents/serviceEditor/ServiceEditor';

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

// Service card components replaced with shared ManagerCard component

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

  const handleEdit = useCallback(async (service) => {
    try {
      // Fetch the complete service data by ID
      const response = await servicesAPI.getById(service.id);
      
      if (response.success) {
        setSelectedService(response.data);
        setIsEditing(true);
      } else {
        console.error('Failed to fetch service data:', response.error);
        // Fallback to using the index data if full data fetch fails
        setSelectedService(service);
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching service for editing:', error);
      // Fallback to using the index data if full data fetch fails
      setSelectedService(service);
      setIsEditing(true);
    }
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

  // ServiceEditor is now rendered as a modal overlay instead of replacing the entire view

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

  const headerStats = [
    { label: 'Total', value: currentStats.total },
    { label: 'Active', value: currentStats.active },
    { label: 'Archived', value: currentStats.archived }
  ];

  const handleRefresh = () => {
    servicesAPI.invalidateCache();
    loadServices();
  };

  const handleAdd = () => {
    setIsEditing(true);
  };

  const filterOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'active', label: 'Active Only' },
    { value: 'archived', label: 'Archived Only' }
  ];

  return (
    <div className={styles.servicesManager}>
      <ManagerHeader
        title="Services Management"
        stats={headerStats}
        onRefresh={handleRefresh}
        onAdd={handleAdd}
        addButtonText="+ Add New Service"
        refreshTitle="Force refresh data"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search services..."
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={filterOptions}
      />

      <div className={styles.servicesList}>
        {filteredServices.map(service => (
          <ManagerCard
            key={service.id}
            item={service}
            title={service.title || service.bannerTitle}
            description={`${service.section01?.description?.substring(0, 150) || 'No description available'}...`}
            image={service.thumbnail || service.section01?.image}
            archived={service.archived}
            showIndexControls={true}
            currentIndex={service.index}
            totalItems={services.length}
            onIndexChange={handleIndexChange}
            draggable={true}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggedIndex={draggedIndex}
            actionButtons={[
              {
                type: 'edit',
                label: 'Edit',
                onClick: () => handleEdit(service)
              },
              {
                type: service.archived ? 'publish' : 'archive',
                label: service.archived ? 'Unarchive' : 'Archive',
                onClick: () => handleArchive(service.id, service.archived)
              },
              {
                type: 'delete',
                label: 'Delete',
                onClick: () => handleDelete(service.id)
              }
            ]}
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

      {/* Service Editor Modal */}
      <ServiceEditor
        isOpen={isEditing}
        service={selectedService}
        services={services}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

// ServiceEditor component moved to subComponents/serviceEditor/ServiceEditor.jsx

export default ServicesManager;