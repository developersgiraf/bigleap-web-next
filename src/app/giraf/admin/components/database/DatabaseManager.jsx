"use client";

import { useState } from 'react';
import styles from './database.module.css';
import Modal from '../shared/Modal';
import Toast from '../shared/Toast';

const DatabaseManager = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBackupType, setSelectedBackupType] = useState('all');
  const [selectedRestoreType, setSelectedRestoreType] = useState('auto');
  const [backupFileType, setBackupFileType] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownloadDatabase = async (backupType = selectedBackupType) => {
    try {
      setIsDownloading(true);
      
      const response = await fetch(`/api/database/backup-enhanced?type=${backupType}`);
      
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
      const typeLabel = backupType === 'all' ? 'master' : backupType;
      link.download = `bigleap-${typeLabel}-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`${backupType === 'all' ? 'Master' : capitalize(backupType)} backup downloaded successfully!`);
    } catch (error) {
      console.error('Error downloading database:', error);
      showToast('Failed to download database backup', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
      
      // Try to detect backup type from filename
      const filename = file.name.toLowerCase();
      if (filename.includes('service')) {
        setBackupFileType('services');
      } else if (filename.includes('portfolio')) {
        setBackupFileType('portfolios');
      } else if (filename.includes('blog')) {
        setBackupFileType('blogs');
      } else if (filename.includes('master') || filename.includes('all')) {
        setBackupFileType('all');
      } else {
        setBackupFileType('auto');
      }
      
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
      if (!data.WebsiteDatas) {
        throw new Error('Invalid backup file: Missing WebsiteDatas');
      }
      
      // Count total items in backup
      const collections = [];
      let totalCount = 0;
      
      if (data.WebsiteDatas.services) {
        const servicesObject = data.WebsiteDatas.services;
        const serviceCount = Object.keys(servicesObject).filter(key => 
          key !== 'id' && typeof servicesObject[key] === 'object' && servicesObject[key].id
        ).length;
        if (serviceCount > 0) {
          collections.push(`${serviceCount} services`);
          totalCount += serviceCount;
        }
      }
      
      if (data.WebsiteDatas.portfolios) {
        const portfoliosObject = data.WebsiteDatas.portfolios;
        const portfolioCount = Object.keys(portfoliosObject).filter(key => 
          key !== 'id' && typeof portfoliosObject[key] === 'object' && portfoliosObject[key].id
        ).length;
        if (portfolioCount > 0) {
          collections.push(`${portfolioCount} portfolios`);
          totalCount += portfolioCount;
        }
      }
      
      if (data.WebsiteDatas.blogs) {
        const blogsObject = data.WebsiteDatas.blogs;
        const blogCount = Object.keys(blogsObject).filter(key => 
          key !== 'id' && typeof blogsObject[key] === 'object' && blogsObject[key].id
        ).length;
        if (blogCount > 0) {
          collections.push(`${blogCount} blogs`);
          totalCount += blogCount;
        }
      }
      
      if (totalCount === 0) {
        throw new Error('Invalid backup file: No valid data found in backup');
      }
      
      const response = await fetch(`/api/database/restore-enhanced?type=${selectedRestoreType}`, {
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
      
      showToast(`Database restored successfully! Updated ${result.updatedCount} items across ${result.restoredCollections.join(', ')}.`);
      setShowUploadModal(false);
      setSelectedFile(null);
      setBackupFileType(null);
      
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
    setBackupFileType(null);
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
              <p>Download your website data as structured JSON files. Choose what to backup:</p>
              
              <div className={styles.backupOptions}>
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="backupType" 
                      value="services" 
                      checked={selectedBackupType === 'services'}
                      onChange={(e) => setSelectedBackupType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    Services Only
                  </label>
                  <span className={styles.optionDesc}>All service details and metadata</span>
                </div>
                
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="backupType" 
                      value="portfolios" 
                      checked={selectedBackupType === 'portfolios'}
                      onChange={(e) => setSelectedBackupType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    Portfolios Only
                  </label>
                  <span className={styles.optionDesc}>All portfolio projects and details</span>
                </div>
                
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="backupType" 
                      value="blogs" 
                      checked={selectedBackupType === 'blogs'}
                      onChange={(e) => setSelectedBackupType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    Blogs Only
                  </label>
                  <span className={styles.optionDesc}>All blog posts and content</span>
                </div>
                
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="backupType" 
                      value="all" 
                      checked={selectedBackupType === 'all'}
                      onChange={(e) => setSelectedBackupType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    Master Backup
                  </label>
                  <span className={styles.optionDesc}>Complete website data backup</span>
                </div>
              </div>
              
              <button 
                className={styles.downloadButton}
                onClick={() => handleDownloadDatabase(selectedBackupType)}
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
                    Download {selectedBackupType === 'all' ? 'Master' : capitalize(selectedBackupType)} Backup
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
              <p>Replace your current website data with a backup file. The system will automatically detect the backup type and restore accordingly.</p>
              
              <div className={styles.restoreOptions}>
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="restoreType" 
                      value="auto" 
                      checked={selectedRestoreType === 'auto'}
                      onChange={(e) => setSelectedRestoreType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    Auto-Detect
                  </label>
                  <span className={styles.optionDesc}>Automatically detect and restore backup content</span>
                </div>
                
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="restoreType" 
                      value="services" 
                      checked={selectedRestoreType === 'services'}
                      onChange={(e) => setSelectedRestoreType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    Services Only
                  </label>
                  <span className={styles.optionDesc}>Restore only services data</span>
                </div>
                
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="restoreType" 
                      value="portfolios" 
                      checked={selectedRestoreType === 'portfolios'}
                      onChange={(e) => setSelectedRestoreType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    Portfolios Only
                  </label>
                  <span className={styles.optionDesc}>Restore only portfolios data</span>
                </div>
                
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="restoreType" 
                      value="blogs" 
                      checked={selectedRestoreType === 'blogs'}
                      onChange={(e) => setSelectedRestoreType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    Blogs Only
                  </label>
                  <span className={styles.optionDesc}>Restore only blogs data</span>
                </div>
                
                <div className={styles.optionRow}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="restoreType" 
                      value="all" 
                      checked={selectedRestoreType === 'all'}
                      onChange={(e) => setSelectedRestoreType(e.target.value)}
                    />
                    <span className={styles.radioCustom}></span>
                    All Data
                  </label>
                  <span className={styles.optionDesc}>Restore all available data from backup</span>
                </div>
              </div>
              
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
                <li>Always download a current backup before uploading a new one</li>
                <li>Uploading will replace data in the selected collections only</li>
                <li>Master backup includes services, portfolios, and blogs</li>
                <li>Auto-detect mode will restore all available data from the backup</li>
                <li>Specific restore modes will only restore the selected data type</li>
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
              <p><strong>⚠️ Warning: This action will replace your current website data!</strong></p>
              <p>Selected file: <strong>{selectedFile?.name}</strong></p>
              <p>File size: <strong>{(selectedFile?.size / 1024).toFixed(2)} KB</strong></p>
              <p>Detected type: <strong>{backupFileType ? capitalize(backupFileType === 'auto' ? 'Mixed/Unknown' : backupFileType) : 'Unknown'}</strong></p>
              <p>Restore mode: <strong>{capitalize(selectedRestoreType === 'auto' ? 'Auto-Detect' : selectedRestoreType)}</strong></p>
            </div>
            
            <div className={styles.confirmationText}>
              <p>Are you absolutely sure you want to proceed? This will:</p>
              <ul>
                <li>Delete current data in the selected collections</li>
                <li>Replace it with the backup file data</li>
                <li>Rebuild all indexes and references</li>
                <li>This action cannot be undone without another backup</li>
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