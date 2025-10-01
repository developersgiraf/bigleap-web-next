import React, { useState, useRef, useEffect } from 'react';
import { uploadImage, deleteImage } from '../../../../lib/image-storage';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Toast from './Toast';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);
  const [toast, setToast] = useState(null);
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
        setToast({ message: 'Failed to check image usage. Please try again.', type: 'error' });
        return;
      }

      // Show the styled modal instead of native confirm
      setDeleteModalData({
        imageUrl,
        imageName,
        usageData: usageData.data
      });
      setShowDeleteModal(true);
    } catch (err) {
      console.error('Error checking image usage:', err);
      setToast({ message: 'Failed to check image usage. Please try again.', type: 'error' });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteImage(deleteModalData.imageUrl);
      // Refresh the gallery
      await fetchExistingImages();
      setToast({ message: 'Image deleted successfully!', type: 'success' });
    } catch (err) {
      console.error('Error deleting image:', err);
      setToast({ message: 'Failed to delete image. Please try again.', type: 'error' });
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        imageName={deleteModalData?.imageName}
        usageData={deleteModalData?.usageData}
        onConfirm={confirmDelete}
      />

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ImageUpload;