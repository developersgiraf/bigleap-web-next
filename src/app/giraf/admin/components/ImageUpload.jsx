import React, { useState, useRef, useEffect } from 'react';
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
  const [showGallery, setShowGallery] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch existing images for gallery
  const fetchExistingImages = async () => {
    setLoadingGallery(true);
    try {
      const response = await fetch(`/api/uploads/images?folder=${folder}`);
      const data = await response.json();
      
      if (data.success) {
        setExistingImages(data.data);
      } else {
        console.error('Failed to fetch images:', data.error);
      }
    } catch (err) {
      console.error('Error fetching images:', err);
    }
    setLoadingGallery(false);
  };

  // Load gallery when opened
  useEffect(() => {
    if (showGallery && existingImages.length === 0) {
      fetchExistingImages();
    }
  }, [showGallery, existingImages.length, folder]);

  const handleImageSelect = (imageUrl) => {
    onChange(imageUrl);
    setShowGallery(false);
  };

  const handleImageDelete = async (imageUrl, imageName) => {
    try {
      // Check which services/content are using this image
      const response = await fetch('/api/uploads/images/usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl })
      });
      
      const usageData = await response.json();
      
      if (!usageData.success) {
        alert('Failed to check image usage. Please try again.');
        return;
      }

      const { services, portfolio, blog, totalUsage } = usageData.data;
      
      let confirmMessage = `Are you sure you want to delete "${imageName}"?`;
      
      if (totalUsage > 0) {
        confirmMessage += `\n\n⚠️ WARNING: This image is currently being used by:`;
        
        if (services.length > 0) {
          confirmMessage += `\n\n📋 Services (${services.length}):`;
          services.forEach(service => {
            confirmMessage += `\n• ${service.title}${service.archived ? ' (Archived)' : ''}`;
          });
        }
        
        if (portfolio.length > 0) {
          confirmMessage += `\n\n🎨 Portfolio (${portfolio.length}):`;
          portfolio.forEach(item => {
            confirmMessage += `\n• ${item.title}`;
          });
        }
        
        if (blog.length > 0) {
          confirmMessage += `\n\n📝 Blog Posts (${blog.length}):`;
          blog.forEach(post => {
            confirmMessage += `\n• ${post.title}`;
          });
        }
        
        confirmMessage += `\n\n🔄 These items will revert to default images if you proceed.`;
      }
      
      if (confirm(confirmMessage)) {
        await deleteImage(imageUrl);
        // Refresh the gallery
        await fetchExistingImages();
        alert('Image deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Failed to delete image. Please try again.');
    }
  };

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
      
      // Note: We don't automatically delete the previous image anymore
      // as it might be used by other services
      
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

  const handleRemoveImage = () => {
    // Only clear the form, don't delete the actual file
    // as it might be used by other services
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
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => setShowGallery(!showGallery)}
              className={styles.galleryButton}
              title="Pick from uploaded images"
            >
              📁
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={styles.uploadButton}
            >
              {isUploading ? 'Uploading...' : 'Browse'}
            </button>
          </div>
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

        {/* Gallery Picker */}
        {showGallery && (
          <div className={styles.gallery}>
            <div className={styles.galleryHeader}>
              <h4>Pick from uploaded images</h4>
              <button 
                type="button"
                onClick={() => setShowGallery(false)}
                className={styles.closeButton}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.galleryContent}>
              {loadingGallery ? (
                <div className={styles.galleryLoading}>Loading images...</div>
              ) : existingImages.length === 0 ? (
                <div className={styles.galleryEmpty}>
                  No images found. Upload some images first!
                </div>
              ) : (
                <div className={styles.galleryGrid}>
                  {existingImages.map((image, index) => (
                    <div 
                      key={index}
                      className={styles.galleryItem}
                    >
                      <div className={styles.galleryImageContainer}>
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className={styles.galleryImage}
                          onClick={() => handleImageSelect(image.url)}
                        />
                        <button
                          type="button"
                          className={styles.galleryDeleteButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageDelete(image.url, image.name);
                          }}
                          title="Delete this image"
                        >
                          🗑️
                        </button>
                      </div>
                      <div 
                        className={styles.galleryImageInfo}
                        onClick={() => handleImageSelect(image.url)}
                      >
                        <div className={styles.galleryImageName}>{image.name}</div>
                        <div className={styles.galleryImageSize}>
                          {(image.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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