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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [backupComparison, setBackupComparison] = useState(null);
  const [selectedConflicts, setSelectedConflicts] = useState({});
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownloadDatabase = async (backupType = selectedBackupType) => {
    try {
      setIsDownloading(true);
      
      const response = await fetch(`/api/database/backup?type=${backupType}`);
      
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

  const handleFileSelect = async (event) => {
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
      
      // Analyze backup file and compare with current data
      await analyzeBackupFile(file);
      
      setShowUploadModal(true);
    } else {
      showToast('Please select a valid JSON file', 'error');
    }
  };

  const analyzeBackupFile = async (file) => {
    try {
      setIsAnalyzing(true);
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate the data structure
      if (!data.WebsiteDatas) {
        throw new Error('Invalid backup file: Missing WebsiteDatas');
      }
      
      // Send data to comparison API
      const response = await fetch('/api/database/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze backup file');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setBackupComparison(result.comparison);
        // Initialize conflict selections (all conflicts selected by default)
        const conflicts = {};
        ['services', 'portfolios', 'blogs'].forEach(collection => {
          result.comparison[collection].modified.forEach(item => {
            conflicts[`${collection}-${item.id}`] = true;
          });
          result.comparison[collection].new.forEach(item => {
            conflicts[`${collection}-${item.id}`] = true;
          });
        });
        setSelectedConflicts(conflicts);
      } else {
        throw new Error(result.error || 'Failed to analyze backup');
      }
      
    } catch (error) {
      console.error('Error analyzing backup file:', error);
      showToast('Failed to analyze backup file: ' + error.message, 'error');
      setBackupComparison(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUploadDatabase = async () => {
    if (!selectedFile || !backupComparison) return;

    try {
      setIsUploading(true);
      
      const text = await selectedFile.text();
      const data = JSON.parse(text);
      
      // Filter data based on selected conflicts
      const filteredData = {
        ...data,
        selectedConflicts
      };
      
      const response = await fetch(`/api/database/restore?type=${selectedRestoreType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to restore database');
      }
      
      const result = await response.json();
      
      showToast(`Database restored successfully! Updated ${result.updatedCount} items across ${result.restoredCollections.join(', ')}.`);
      setShowUploadModal(false);
      setSelectedFile(null);
      setBackupFileType(null);
      setBackupComparison(null);
      setSelectedConflicts({});
      
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

  const handleConflictToggle = (conflictKey) => {
    setSelectedConflicts(prev => ({
      ...prev,
      [conflictKey]: !prev[conflictKey]
    }));
  };

  const handleSelectAllConflicts = (collection, type) => {
    const newSelections = { ...selectedConflicts };
    backupComparison[collection][type].forEach(item => {
      newSelections[`${collection}-${item.id}`] = true;
    });
    setSelectedConflicts(newSelections);
  };

  const handleDeselectAllConflicts = (collection, type) => {
    const newSelections = { ...selectedConflicts };
    backupComparison[collection][type].forEach(item => {
      newSelections[`${collection}-${item.id}`] = false;
    });
    setSelectedConflicts(newSelections);
  };

  const handleModalClose = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setBackupFileType(null);
    setBackupComparison(null);
    setSelectedConflicts({});
    setShowDetailedComparison(false);
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
          title="Restore Database - Data Analysis"
          type="danger"
        >
          <div className={styles.modalContent}>
            {isAnalyzing ? (
              <div className={styles.analyzeLoader}>
                <div className={styles.spinner}></div>
                <p>Analyzing backup file and comparing with current data...</p>
              </div>
            ) : backupComparison ? (
              <>
                <div className={styles.backupSummary}>
                  <h4>📁 Backup File Analysis</h4>
                  <div className={styles.fileInfo}>
                    <p>File: <strong>{selectedFile?.name}</strong></p>
                    <p>Size: <strong>{(selectedFile?.size / 1024).toFixed(2)} KB</strong></p>
                    <p>Type: <strong>{backupFileType ? capitalize(backupFileType === 'auto' ? 'Mixed/Unknown' : backupFileType) : 'Unknown'}</strong></p>
                    <p>Collections: <strong>{backupComparison.summary.collections.join(', ')}</strong></p>
                  </div>
                </div>

                <div className={styles.comparisonSummary}>
                  <h4>📊 Impact Summary</h4>
                  <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryNumber}>{backupComparison.summary.totalNew}</span>
                      <span className={styles.summaryLabel}>New Items</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryNumber}>{backupComparison.summary.totalModified}</span>
                      <span className={styles.summaryLabel}>Modified Items</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryNumber}>{backupComparison.summary.totalUnchanged}</span>
                      <span className={styles.summaryLabel}>Unchanged Items</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryNumber}>{backupComparison.summary.totalToBeDeleted}</span>
                      <span className={styles.summaryLabel}>Items to Delete</span>
                    </div>
                  </div>
                </div>

                {!showDetailedComparison ? (
                  <div className={styles.quickActions}>
                    <button 
                      className={styles.detailButton}
                      onClick={() => setShowDetailedComparison(true)}
                    >
                      🔍 View Detailed Comparison & Select Items
                    </button>
                  </div>
                ) : (
                  <div className={styles.detailedComparison}>
                    <div className={styles.comparisonHeader}>
                      <h4>📋 Detailed Comparison - Select Items to Restore</h4>
                      <button 
                        className={styles.collapseButton}
                        onClick={() => setShowDetailedComparison(false)}
                      >
                        ⬆️ Collapse
                      </button>
                    </div>

                    {['services', 'portfolios', 'blogs'].map(collection => {
                      const collectionData = backupComparison[collection];
                      const hasData = collectionData.new.length > 0 || collectionData.modified.length > 0 || collectionData.toBeDeleted.length > 0;
                      
                      if (!hasData) return null;

                      return (
                        <div key={collection} className={styles.collectionSection}>
                          <h5>📂 {capitalize(collection)}</h5>
                          
                          {collectionData.new.length > 0 && (
                            <div className={styles.changeGroup}>
                              <div className={styles.changeHeader}>
                                <span className={styles.changeIcon}>➕</span>
                                <span className={styles.changeTitle}>New {capitalize(collection)} ({collectionData.new.length})</span>
                                <div className={styles.batchActions}>
                                  <button onClick={() => handleSelectAllConflicts(collection, 'new')}>Select All</button>
                                  <button onClick={() => handleDeselectAllConflicts(collection, 'new')}>Deselect All</button>
                                </div>
                              </div>
                              <div className={styles.itemsList}>
                                {collectionData.new.map(item => (
                                  <div key={item.id} className={styles.itemRow}>
                                    <label className={styles.checkboxLabel}>
                                      <input 
                                        type="checkbox" 
                                        checked={selectedConflicts[`${collection}-${item.id}`] || false}
                                        onChange={() => handleConflictToggle(`${collection}-${item.id}`)}
                                      />
                                      <span className={styles.itemTitle}>{item.title}</span>
                                      <span className={styles.itemId}>({item.id})</span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {collectionData.modified.length > 0 && (
                            <div className={styles.changeGroup}>
                              <div className={styles.changeHeader}>
                                <span className={styles.changeIcon}>✏️</span>
                                <span className={styles.changeTitle}>Modified {capitalize(collection)} ({collectionData.modified.length})</span>
                                <div className={styles.batchActions}>
                                  <button onClick={() => handleSelectAllConflicts(collection, 'modified')}>Select All</button>
                                  <button onClick={() => handleDeselectAllConflicts(collection, 'modified')}>Deselect All</button>
                                </div>
                              </div>
                              <div className={styles.itemsList}>
                                {collectionData.modified.map(item => (
                                  <div key={item.id} className={styles.itemRow}>
                                    <label className={styles.checkboxLabel}>
                                      <input 
                                        type="checkbox" 
                                        checked={selectedConflicts[`${collection}-${item.id}`] || false}
                                        onChange={() => handleConflictToggle(`${collection}-${item.id}`)}
                                      />
                                      <div className={styles.itemDetails}>
                                        <span className={styles.itemTitle}>{item.title}</span>
                                        <span className={styles.itemId}>({item.id})</span>
                                        <div className={styles.changeDetails}>
                                          <span className={styles.dateInfo}>
                                            Current: {item.currentLastModified} → Backup: {item.backupLastModified}
                                          </span>
                                          {item.changes && item.changes.length > 0 && (
                                            <div className={styles.fieldChanges}>
                                              {item.changes.slice(0, 2).map((change, idx) => (
                                                <span key={idx} className={styles.fieldChange}>
                                                  {change.field} changed
                                                </span>
                                              ))}
                                              {item.changes.length > 2 && (
                                                <span className={styles.moreChanges}>
                                                  +{item.changes.length - 2} more changes
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {collectionData.toBeDeleted.length > 0 && (
                            <div className={styles.changeGroup}>
                              <div className={styles.changeHeader}>
                                <span className={styles.changeIcon}>❌</span>
                                <span className={styles.changeTitle}>Will be Deleted ({collectionData.toBeDeleted.length})</span>
                              </div>
                              <div className={styles.itemsList}>
                                {collectionData.toBeDeleted.map(item => (
                                  <div key={item.id} className={styles.itemRow}>
                                    <span className={styles.itemTitle}>{item.title}</span>
                                    <span className={styles.itemId}>({item.id})</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className={styles.finalWarning}>
                  <p><strong>⚠️ Final Warning:</strong> This will permanently modify your website data based on your selections above.</p>
                </div>
              </>
            ) : (
              <div className={styles.errorMessage}>
                <p>❌ Failed to analyze backup file. Please check the file format and try again.</p>
              </div>
            )}
            
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
                disabled={isUploading || isAnalyzing || !backupComparison}
              >
                {isUploading ? (
                  <span className={styles.loading}>
                    <span className={styles.spinner}></span>
                    Restoring Selected Items...
                  </span>
                ) : (
                  `Restore Selected Items (${Object.values(selectedConflicts).filter(Boolean).length})`
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