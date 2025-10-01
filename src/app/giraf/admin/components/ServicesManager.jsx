"use client";

import { useState, useEffect } from 'react';
import styles from './services-manager.module.css';
import { servicesAPI } from '../../../../lib/services-api';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, active: 0, archived: 0, draft: 0 });

  // Load services data
  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (searchTerm.trim()) {
        response = await servicesAPI.search(searchTerm);
      } else {
        response = await servicesAPI.getAll();
      }
      
      setServices(response.data);
      
      // Load stats
      const statsResponse = await servicesAPI.getStats();
      setStats(statsResponse.data);
    } catch (err) {
      console.error('Error loading services:', err);
      setError('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [searchTerm]);

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsEditing(true);
  };

  const handleDelete = async (serviceId) => {
    if (confirm('Are you sure you want to permanently delete this service?')) {
      try {
        await servicesAPI.delete(serviceId);
        await loadServices(); // Refresh the list
      } catch (err) {
        console.error('Error deleting service:', err);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const handleSave = async (serviceData) => {
    try {
      if (selectedService) {
        // Update existing service
        await servicesAPI.update(selectedService.id, serviceData);
      } else {
        // Create new service
        await servicesAPI.create(serviceData);
      }
      
      setIsEditing(false);
      setSelectedService(null);
      await loadServices(); // Refresh the list
    } catch (err) {
      console.error('Error saving service:', err);
      alert('Failed to save service. Please try again.');
    }
  };

  if (isEditing) {
    return (
      <ServiceEditor 
        service={selectedService}
        onSave={handleSave}
        onCancel={() => {
          setIsEditing(false);
          setSelectedService(null);
        }}
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
            <span className={styles.stat}>Total: {stats.total}</span>
          </div>
        </div>
        <button 
          className={styles.addButton}
          onClick={() => setIsEditing(true)}
        >
          + Add New Service
        </button>
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
      </div>

      <div className={styles.servicesList}>
        {services.map(service => (
          <div key={service.id} className={styles.serviceCard}>
            <div className={styles.serviceImage}>
              <img 
                src={service.section01?.image || '/servicess/default-image.png'} 
                alt={service.title || service.bannerTitle}
                onError={(e) => {
                  e.target.src = '/servicess/default-image.png';
                }}
              />
            </div>
            
            <div className={styles.serviceContent}>
              <div className={styles.serviceHeader}>
                <h3>{service.title || service.bannerTitle}</h3>
              </div>
              
              <p className={styles.serviceDescription}>
                {service.section01?.description?.substring(0, 150) || 'No description available'}...
              </p>
              
              <div className={styles.serviceFooter}>
                <div className={styles.actions}>
                  <button 
                    className={styles.editBtn}
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>
                  <button 
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <p>No services found matching your criteria.</p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className={styles.clearSearchBtn}
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ServiceEditor = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    bannerTitle: '',
    section01: {
      image: '',
      heading: '',
      description: ''
    },
    section02: {
      DescTitle: '',
      Descpara: '',
      subhead1: '',
      subdes1: '',
      subhead2: '',
      subdes2: '',
      subhead3: '',
      subdes3: '',
      subhead4: '',
      subdes4: ''
    },
    listHead: '',
    listPara: '',
    list: []
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, lastModified: new Date().toISOString().split('T')[0] });
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
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Section 1 - Main Content</h3>
          <div className={styles.formField}>
            <label>Image URL</label>
            <input
              type="text"
              value={formData.section01.image}
              onChange={(e) => handleInputChange('image', e.target.value, 'section01')}
              placeholder="/servicess/image.png"
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
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={styles.subSection}>
                <h4>Sub-section {num}</h4>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Sub Heading {num}</label>
                    <input
                      type="text"
                      value={formData.section02[`subhead${num}`]}
                      onChange={(e) => handleInputChange(`subhead${num}`, e.target.value, 'section02')}
                      placeholder={`Sub heading ${num}`}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Sub Description {num}</label>
                    <textarea
                      value={formData.section02[`subdes${num}`]}
                      onChange={(e) => handleInputChange(`subdes${num}`, e.target.value, 'section02')}
                      placeholder={`Sub description ${num}`}
                      rows={2}
                    />
                  </div>
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