/**
 * Server Upload Utility
 * Handles image uploads to the server's public directory
 */

/**
 * Upload an image file to the server
 * @param {File} file - The image file to upload
 * @param {string} folder - The folder name (e.g., 'services', 'portfolio', 'blog')
 * @param {string} fileName - Optional custom filename (will use file.name if not provided)
 * @returns {Promise<string>} - The URL path of the uploaded image
 */
export const uploadImage = async (file, folder, fileName = null) => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select a valid image file');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new Error('Image size must be less than 10MB');
    }

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    if (fileName) {
      formData.append('fileName', fileName);
    }

    // Upload to server
    const response = await fetch('/api/upload/image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    console.log('Image uploaded successfully:', result.url);
    return result.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete an image from the server
 * @param {string} imageUrl - The URL path of the image to delete
 * @returns {Promise<void>}
 */
export const deleteImage = async (imageUrl) => {
  try {
    if (!imageUrl || imageUrl.startsWith('http') || !imageUrl.startsWith('/uploads/')) {
      return; // Not a server upload, skip deletion
    }

    const response = await fetch('/api/upload/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error deleting image:', errorData.error);
      return; // Don't throw error for deletion failures
    }

    console.log('Image deleted successfully:', imageUrl);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error for deletion failures, just log them
  }
};

/**
 * Upload multiple images
 * @param {FileList} files - List of image files to upload
 * @param {string} folder - The folder name
 * @returns {Promise<string[]>} - Array of URL paths
 */
export const uploadMultipleImages = async (files, folder) => {
  try {
    const uploadPromises = Array.from(files).map(file => 
      uploadImage(file, folder)
    );
    
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
};

/**
 * Compress image before upload (client-side utility)
 * @param {File} file - The image file to compress
 * @param {number} maxWidth - Maximum width (default: 1200)
 * @param {number} quality - Image quality 0-1 (default: 0.8)
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      // Draw and compress
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};