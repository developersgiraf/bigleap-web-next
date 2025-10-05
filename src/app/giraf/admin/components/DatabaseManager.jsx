"use client";

import { useState } from 'react';
import styles from './database.module.css';
import Modal from './Modal';
import Toast from './Toast';

const DatabaseManager = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownloadDatabase = async () => {
    try {
      setIsDownloading(true);
      
      const response = await fetch('/api/database/backup');
      
      if (!response.ok) {
        throw new Error('Failed to download database backup');
      }
      
      const data = await response.json();
      
      // Create and download the file
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bigleap-database-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast('Database backup downloaded successfully!');
    } catch (error) {
      console.error('Error downloading database:', error);
      showToast('Failed to download database backup', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
      setShowUploadModal(true);
    } else {
      showToast('Please select a valid JSON file', 'error');
    }
  };

  const handleUploadDatabase = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      
      const text = await selectedFile.text();
      const data = JSON.parse(text);
      
      // Validate the data structure
      if (!data.WebsiteDatas?.services) {
        throw new Error('Invalid backup file: Missing WebsiteDatas.services collection');
      }
      
      // Count services in backup (excluding the "id": "services" entry)
      const servicesObject = data.WebsiteDatas.services;
      const serviceCount = Object.keys(servicesObject).filter(key => 
        key !== 'id' && typeof servicesObject[key] === 'object' && servicesObject[key].id
      ).length;
      
      if (serviceCount === 0) {
        throw new Error('Invalid backup file: No services found in backup data');
      }
      
      const response = await fetch('/api/database/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to restore database');
      }
      
      const result = await response.json();
      
      showToast(`Database restored successfully! Updated ${result.updatedCount} records.`);
      setShowUploadModal(false);
      setSelectedFile(null);
      
    } catch (error) {
      console.error('Error uploading database:', error);
      showToast(error.message || 'Failed to restore database', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearCache = async () => {
    try {
      setIsClearingCache(true);
      
      const response = await fetch('/api/cache/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pattern: '*' }), // Clear all cache
      });
      
      if (!response.ok) {
        throw new Error('Failed to clear cache');
      }
      
      showToast('Cache cleared successfully! All cached data has been refreshed.');
    } catch (error) {
      console.error('Error clearing cache:', error);
      showToast('Failed to clear cache', 'error');
    } finally {
      setIsClearingCache(false);
    }
  };

  const handleModalClose = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Database Management</h2>
        <p>Backup and restore your website data securely</p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionCard}>
            <div className={styles.cardIcon}>⬇️</div>
            <div className={styles.cardContent}>
              <h3>Download Database Backup</h3>
              <p>Download your entire services database as a unified JSON file. This includes all service details, images, descriptions, and metadata in a single structured format.</p>
              <button 
                className={styles.downloadButton}
                onClick={handleDownloadDatabase}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <span className={styles.loading}>
                    <span className={styles.spinner}></span>
                    Downloading...
                  </span>
                ) : (
                  <>
                    <span>📥</span>
                    Download Backup
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionCard}>
            <div className={styles.cardIcon}>⬆️</div>
            <div className={styles.cardContent}>
              <h3>Upload Database Backup</h3>
              <p>Replace your current services database with a backup file. The system will automatically convert the unified format back to individual service files.</p>
              <label className={styles.uploadButton}>
                <span>📤</span>
                Select Backup File
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionCard}>
            <div className={styles.cardIcon}>🔄</div>
            <div className={styles.cardContent}>
              <h3>Clear Cache & Refresh</h3>
              <p>Force clear all cached data to ensure you're seeing the most up-to-date information. Use this if you're experiencing stale data issues.</p>
              <button 
                className={styles.cacheButton}
                onClick={handleClearCache}
                disabled={isClearingCache}
              >
                {isClearingCache ? (
                  <span className={styles.loading}>
                    <span className={styles.spinner}></span>
                    Clearing Cache...
                  </span>
                ) : (
                  <>
                    <span>🗑️</span>
                    Clear All Cache
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.warningSection}>
          <div className={styles.warningCard}>
            <div className={styles.warningIcon}>⚠️</div>
            <div className={styles.warningContent}>
              <h3>Important Notes</h3>
              <ul>
                <li>Always download a backup before uploading a new one</li>
                <li>Uploading will completely replace your current database</li>
                <li>This action cannot be undone without a backup</li>
                <li>Make sure your backup file is valid JSON format</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Confirmation Modal */}
      {showUploadModal && (
        <Modal
          isOpen={showUploadModal}
          onClose={handleModalClose}
          title="Restore Database"
          type="danger"
        >
          <div className={styles.modalContent}>
            <div className={styles.confirmationWarning}>
              <p><strong>⚠️ Warning: This action will completely replace your current database!</strong></p>
              <p>Selected file: <strong>{selectedFile?.name}</strong></p>
              <p>File size: <strong>{(selectedFile?.size / 1024).toFixed(2)} KB</strong></p>
              <p>Backup format: <strong>Unified JSON Structure</strong></p>
            </div>
            
            <div className={styles.confirmationText}>
              <p>Are you absolutely sure you want to proceed? This will:</p>
              <ul>
                <li>Delete all current website data</li>
                <li>Replace it with the backup file data</li>
                <li>This action cannot be undone</li>
              </ul>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                className={styles.cancelButton}
                onClick={handleModalClose}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton}
                onClick={handleUploadDatabase}
                disabled={isUploading}
              >
                {isUploading ? (
                  <span className={styles.loading}>
                    <span className={styles.spinner}></span>
                    Restoring...
                  </span>
                ) : (
                  'Yes, Restore Database'
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}

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

export default DatabaseManager;