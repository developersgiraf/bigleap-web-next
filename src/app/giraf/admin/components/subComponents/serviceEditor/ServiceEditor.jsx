import React, { useState, useEffect } from 'react';
import FormModal from '../formModal/FormModal';
import ImageUpload from '../../shared/ImageUpload';
import styles from './ServiceEditor.module.css';

const ServiceEditor = ({ service, services, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    bannerTitle: '',
    customSlug: '',
    archived: false,
    index: 0,
    thumbnail: '',
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
    
    if (/^[0-9]/.test(slug)) {
      slug = 'service-' + slug;
    }
    
    return slug;
  };

  // Validate custom slug format
  const validateSlug = (slug) => {
    if (!slug) return false;
    return /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(slug);
  };

  const currentId = service 
    ? service.id 
    : useCustomSlug && formData.customSlug 
      ? formData.customSlug 
      : generateIdPreview(formData.bannerTitle);

  useEffect(() => {
    if (service) {
      const serviceData = { ...service };
      
      if (!serviceData.section01) {
        serviceData.section01 = { image: '', heading: '', description: '' };
      }
      
      if (!serviceData.section02) {
        serviceData.section02 = { DescTitle: '', Descpara: '', subsections: [] };
      }
      
      if (serviceData.section02 && !serviceData.section02.subsections) {
        const subsections = [];
        
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
        
        const { subhead1, subdes1, subhead2, subdes2, subhead3, subdes3, subhead4, subdes4, ...cleanSection02 } = serviceData.section02;
        serviceData.section02 = { ...cleanSection02, subsections };
      }
      
      if (!serviceData.section02.subsections) {
        serviceData.section02.subsections = [];
      }
      
      if (!Array.isArray(serviceData.list)) {
        serviceData.list = [];
      }
      
      // Set defaults for missing fields
      serviceData.title = serviceData.title || '';
      serviceData.bannerTitle = serviceData.bannerTitle || '';
      serviceData.thumbnail = serviceData.thumbnail || '';
      serviceData.listHead = serviceData.listHead || '';
      serviceData.listPara = serviceData.listPara || '';
      serviceData.archived = serviceData.archived || false;
      serviceData.index = serviceData.index || 0;
      
      setFormData(serviceData);
      setUseCustomSlug(false);
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

  const handleListItemChange = (index, field, value) => {
    const currentList = formData.list || [];
    const newList = [...currentList];
    newList[index] = { ...newList[index], [field]: value };
    setFormData(prev => ({ ...prev, list: newList }));
  };

  const addListItem = () => {
    setFormData(prev => ({
      ...prev,
      list: [...(prev.list || []), { title: '', description: '' }]
    }));
  };

  const removeListItem = (index) => {
    setFormData(prev => ({
      ...prev,
      list: (prev.list || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubsectionChange = (index, field, value) => {
    const currentSubsections = formData.section02?.subsections || [];
    const newSubsections = [...currentSubsections];
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
        subsections: [...(prev.section02?.subsections || []), { heading: '', description: '' }]
      }
    }));
  };

  const removeSubsection = (index) => {
    setFormData(prev => ({
      ...prev,
      section02: {
        ...prev.section02,
        subsections: (prev.section02?.subsections || []).filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!service && useCustomSlug && (formData.customSlug || '') && !validateSlug(formData.customSlug || '')) {
      alert('Invalid slug format. Slug must start with a letter and contain only letters, numbers, hyphens, and underscores.');
      return;
    }
    
    const submitData = { 
      ...formData, 
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    if (!service && useCustomSlug && (formData.customSlug || '')) {
      submitData.customSlug = formData.customSlug || '';
    }
    
    onSave(submitData);
  };

  return (
    <FormModal
      isOpen={isOpen}
      title={service ? 'Edit Service' : 'Add New Service'}
      onSave={handleSubmit}
      onCancel={onCancel}
      saveButtonText="Save Service"
      formId="serviceForm"
    >
      <form id="serviceForm" onSubmit={handleSubmit} className={styles.editorForm}>
        <div className={styles.formSection}>
          <h3>Basic Information</h3>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Service Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., 2D Animation"
                required
              />
            </div>
            <div className={styles.formField}>
              <label>Banner Title</label>
              <input
                type="text"
                value={formData.bannerTitle || ''}
                onChange={(e) => handleInputChange('bannerTitle', e.target.value)}
                placeholder="Title for banner section"
                required
              />
            </div>
            <div className={styles.formField}>
              <label>Display Order</label>
              <input
                type="number"
                value={formData.index || 0}
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
              value={formData.thumbnail || ''}
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
                
                {!service && (
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
                          value={formData.customSlug || ''}
                          onChange={(e) => handleInputChange('customSlug', e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                          placeholder="Custom_Service-Slug"
                          pattern="^[a-zA-Z][a-zA-Z0-9-_]*$"
                          className={`${styles.customSlugInput} ${(formData.customSlug || '') && !validateSlug(formData.customSlug || '') ? styles.invalidInput : ''}`}
                        />
                        {(formData.customSlug || '') && !validateSlug(formData.customSlug || '') && (
                          <small className={styles.errorNote}>
                            Slug must start with a letter and contain only letters, numbers, hyphens, and underscores.
                          </small>
                        )}
                        {(!(formData.customSlug || '') || validateSlug(formData.customSlug || '')) && (
                          <small className={styles.slugNote}>
                            Custom URL will be: /services/{(formData.customSlug || '') || 'Your_Custom-Slug'}
                          </small>
                        )}
                      </div>
                    )}
                    
                    {!useCustomSlug && (
                      <small className={styles.idNote}>
                        Automatically generated from banner title. Check "Use custom slug" to customize.
                      </small>
                    )}
                  </div>
                )}
                
                {service && (
                  <div className={styles.slugInfo}>
                    <small className={styles.idNote}>
                      🔒 Service URL is fixed once created to prevent broken links.
                    </small>
                  </div>
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
              value={formData.section01?.image || ''}
              onChange={(url) => handleInputChange('image', url, 'section01')}
              folder="services"
              placeholder="Upload service image or enter URL"
            />
          </div>
          <div className={styles.formField}>
            <label>Heading</label>
            <input
              type="text"
              value={formData.section01?.heading || ''}
              onChange={(e) => handleInputChange('heading', e.target.value, 'section01')}
              placeholder="Main heading for the service"
              required
            />
          </div>
          <div className={styles.formField}>
            <label>Description</label>
            <textarea
              value={formData.section01?.description || ''}
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
              value={formData.section02?.DescTitle || ''}
              onChange={(e) => handleInputChange('DescTitle', e.target.value, 'section02')}
              placeholder="Title for detailed section"
            />
            <small className={styles.fieldNote}>
              💡 <strong>Styling Tip:</strong> Use "||" to split text for alternating colors. 
              Example: "Our ||Creative||Process" will style "Our","Process" white and "Creative" red.
            </small>
            {formData.section02?.DescTitle && formData.section02.DescTitle.includes('||') && (
              <div className={styles.colorPreview}>
                <strong>Preview: </strong>
                {formData.section02.DescTitle.split('||').map((part, index) => (
                  <span 
                    key={index} 
                    style={{ 
                      color: index % 2 === 0 ? '#fdfdfd' : '#ed2428',
                    }}
                  >
                    {part}
                  </span>
                ))}
              </div>
            )}
            <br />
          </div>
          <div className={styles.formField}>
            <label>Description Paragraph</label>
            <textarea
              value={formData.section02?.Descpara || ''}
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

            {(formData.section02?.subsections || []).map((subsection, index) => (
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
                value={formData.listHead || ''}
                onChange={(e) => handleInputChange('listHead', e.target.value)}
                placeholder="Heading for services list"
              />
            </div>
            <div className={styles.formField}>
              <label>List Paragraph</label>
              <textarea
                value={formData.listPara || ''}
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

            {(formData.list || []).map((item, index) => (
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
    </FormModal>
  );
};

export default ServiceEditor;