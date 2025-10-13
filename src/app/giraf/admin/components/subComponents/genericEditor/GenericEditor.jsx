import React, { useState, useEffect } from 'react';
import FormModal from '../formModal/FormModal';
import ImageUpload from '../../shared/ImageUpload';
import styles from './GenericEditor.module.css';

const GenericEditor = ({ 
  isOpen, 
  item, 
  items = [], 
  onSave, 
  onCancel, 
  config
}) => {
  const [formData, setFormData] = useState({});
  const [additionalState, setAdditionalState] = useState({});

  // Initialize form data based on config
  useEffect(() => {
    if (item) {
      // Editing existing item - start with all original data to preserve fields not in config
      const initialData = { ...item };
      
      // Ensure all default data fields exist
      Object.keys(config.defaultData).forEach(key => {
        if (initialData[key] === undefined) {
          initialData[key] = config.defaultData[key];
        }
      });
      
      // Handle sectioned fields properly
      Object.keys(config.fields).forEach(fieldKey => {
        const field = config.fields[fieldKey];
        if (field.sections) {
          // Ensure sectioned field has proper structure
          if (!initialData[fieldKey] || typeof initialData[fieldKey] !== 'object') {
            initialData[fieldKey] = { ...field.defaultValue };
          } else {
            // Only add missing keys from defaultValue, don't override existing data
            const existingData = { ...initialData[fieldKey] };
            if (field.defaultValue) {
              Object.keys(field.defaultValue).forEach(key => {
                if (existingData[key] === undefined) {
                  existingData[key] = field.defaultValue[key];
                }
              });
            }
            initialData[fieldKey] = existingData;
          }
        }
      });
      
      setFormData(initialData);
    } else {
      // Creating new item
      const initialData = { ...config.defaultData };
      
      // Auto-assign next index/order if applicable
      if (config.autoIndex && items.length > 0) {
        const maxIndex = Math.max(...items.map(i => i[config.autoIndex.field] || 0));
        initialData[config.autoIndex.field] = maxIndex + 1;
      }
      
      setFormData(initialData);
    }
    
    // Initialize additional state
    const defaultState = config.defaultState || {};
    const initializedState = config.initializeState ? config.initializeState(items) : {};
    setAdditionalState({
      ...defaultState,
      ...initializedState
    });
  }, [item, items, config]);

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

  const handleStateChange = (key, value) => {
    setAdditionalState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Run validation if provided
    if (config.validation) {
      const validationResult = config.validation(formData, item, additionalState);
      if (!validationResult.isValid) {
        alert(validationResult.message);
        return;
      }
    }
    
    // Prepare submit data
    let submitData = { 
      ...formData, 
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    // Apply transform function if provided
    if (config.transformData) {
      submitData = config.transformData(submitData, item, additionalState);
    }
    
    onSave(submitData);
  };

  const renderField = (fieldKey, field) => {
    const fieldValue = field.sections 
      ? formData[fieldKey] || {}
      : formData[fieldKey] || '';

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={styles.textInput}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={fieldValue}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 4}
            className={styles.textareaInput}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={fieldValue}
            onChange={(e) => handleInputChange(fieldKey, parseInt(e.target.value) || 0)}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            max={field.max}
            className={styles.numberInput}
          />
        );

      case 'select':
        return (
          <select
            value={fieldValue}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            required={field.required}
            className={styles.selectInput}
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={fieldValue}
              onChange={(e) => handleInputChange(fieldKey, e.target.checked)}
              className={styles.checkboxInput}
            />
            {field.label}
          </label>
        );

      case 'image':
        return (
          <ImageUpload
            value={fieldValue}
            onChange={(url) => handleInputChange(fieldKey, url)}
            folder={field.folder}
            placeholder={field.placeholder}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={fieldValue}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            required={field.required}
            className={styles.dateInput}
          />
        );

      case 'section':
        return (
          <div className={styles.sectionFields}>
            {Object.keys(field.sections).map(sectionKey => {
              const sectionField = field.sections[sectionKey];
              const sectionValue = fieldValue[sectionKey] || '';
              
              return (
                <div key={sectionKey} className={styles.formField}>
                  <label>{sectionField.label}</label>
                  {sectionField.type === 'text' && (
                    <input
                      type="text"
                      value={sectionValue}
                      onChange={(e) => handleInputChange(sectionKey, e.target.value, fieldKey)}
                      placeholder={sectionField.placeholder}
                      required={sectionField.required}
                      className={styles.textInput}
                    />
                  )}
                  {sectionField.type === 'textarea' && (
                    <textarea
                      value={sectionValue}
                      onChange={(e) => handleInputChange(sectionKey, e.target.value, fieldKey)}
                      placeholder={sectionField.placeholder}
                      required={sectionField.required}
                      rows={sectionField.rows || 3}
                      className={styles.textareaInput}
                    />
                  )}
                  {sectionField.type === 'image' && (
                    <ImageUpload
                      value={sectionValue}
                      onChange={(url) => handleInputChange(sectionKey, url, fieldKey)}
                      folder={sectionField.folder}
                      placeholder={sectionField.placeholder}
                    />
                  )}
                  {sectionField.note && (
                    <small className={styles.fieldNote}>{sectionField.note}</small>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'custom':
        return field.render({
          value: fieldValue,
          onChange: (value) => handleInputChange(fieldKey, value),
          formData,
          additionalState,
          onStateChange: handleStateChange,
          item,
          items
        });

      default:
        return null;
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      title={item ? config.editTitle : config.addTitle}
      onSave={handleSubmit}
      onCancel={onCancel}
      saveButtonText={config.saveButtonText || 'Save'}
      formId="genericForm"
    >
      <form id="genericForm" onSubmit={handleSubmit} className={styles.editorForm}>
        {config.sections.map(section => (
          <div key={section.key} className={styles.formSection}>
            <h3>{section.title}</h3>
            {section.description && (
              <p className={styles.sectionDescription}>{section.description}</p>
            )}
            
            {section.layout === 'grid' ? (
              <div className={styles.formGrid}>
                {section.fields.map(fieldKey => {
                  const field = config.fields[fieldKey];
                  return (
                    <div key={fieldKey} className={styles.formField}>
                      <label>{field.label}</label>
                      {renderField(fieldKey, field)}
                      {field.note && (
                        <small className={styles.fieldNote}>{field.note}</small>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              section.fields.map(fieldKey => {
                const field = config.fields[fieldKey];
                return (
                  <div key={fieldKey} className={styles.formField}>
                    <label>{field.label}</label>
                    {renderField(fieldKey, field)}
                    {field.note && (
                      <small className={styles.fieldNote}>{field.note}</small>
                    )}
                  </div>
                );
              })
            )}
            
            {section.customContent && section.customContent({
              formData,
              additionalState,
              onInputChange: handleInputChange,
              onStateChange: handleStateChange,
              item,
              items
            })}
          </div>
        ))}
      </form>
    </FormModal>
  );
};

export default GenericEditor;