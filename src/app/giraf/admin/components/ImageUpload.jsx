import React, { useState, useRef } from 'react';
import { uploadImage, deleteImage } from '../../../../lib/image-storage';
import styles from './image-upload.module.css';

const ImageUpload = ({ 
  value, 
  onChange, 
  folder = 'services', 
  placeholder = 'Upload an image',
  className = '',
  accept = 'image/*'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError('');
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress (Firebase doesn't provide real progress for small files)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 100);

      const downloadURL = await uploadImage(file, folder);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // If there was a previous image, delete it
      if (value && value.startsWith('/uploads/')) {
        await deleteImage(value);
      }
      
      onChange(downloadURL);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
      
    } catch (err) {
      setError(err.message);
      setIsUploading(false);
      setUploadProgress(0);
    }

    // Reset file input
    event.target.value = '';
  };

  const handleRemoveImage = async () => {
    if (value && value.startsWith('/uploads/')) {
      try {
        await deleteImage(value);
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }
    onChange('');
  };

  const handleUrlInput = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={`${styles.imageUpload} ${className}`}>
      <div className={styles.uploadSection}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={value || ''}
            onChange={handleUrlInput}
            placeholder={placeholder}
            className={styles.urlInput}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={styles.uploadButton}
          >
            {isUploading ? 'Uploading...' : 'Browse'}
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className={styles.hiddenInput}
        />

        {isUploading && (
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </div>

      {value && (
        <div className={styles.previewSection}>
          <div className={styles.imagePreview}>
            <img 
              src={value} 
              alt="Preview" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className={styles.fallback} style={{ display: 'none' }}>
              Image not found
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className={styles.removeButton}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;