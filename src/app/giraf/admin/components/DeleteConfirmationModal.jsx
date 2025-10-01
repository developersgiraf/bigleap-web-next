import React from 'react';
import Modal from './Modal';
import styles from './modal.module.css';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  imageName, 
  usageData, 
  onConfirm 
}) => {
  const { services = [], portfolio = [], blog = [], totalUsage = 0 } = usageData || {};

  const renderUsageSection = (items, title, icon) => {
    if (items.length === 0) return null;
    
    return (
      <div className={styles.usageCategory}>
        <div className={styles.usageCategoryTitle}>
          {icon} {title} ({items.length})
        </div>
        <ul className={styles.usageList}>
          {items.map((item, index) => (
            <li key={index} className={styles.usageItem}>
              {item.title}
              {item.archived && <span className={styles.archivedTag}> (Archived)</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Image"
      type="danger"
      confirmText="Delete"
      cancelText="Cancel"
      showCancel={true}
      onConfirm={onConfirm}
    >
      <div>
        <p>Are you sure you want to delete <strong>"{imageName}"</strong>?</p>
        
        {totalUsage > 0 && (
          <>
            <div className={styles.warningMessage}>
              ⚠️ <strong>Warning:</strong> This image is currently being used by {totalUsage} item{totalUsage > 1 ? 's' : ''}.
            </div>
            
            <div className={styles.usageSection}>
              {renderUsageSection(services, 'Services', '📋')}
              {renderUsageSection(portfolio, 'Portfolio', '🎨')}
              {renderUsageSection(blog, 'Blog Posts', '📝')}
            </div>
            
            <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              🔄 These items will revert to default images if you proceed.
            </p>
          </>
        )}
        
        {totalUsage === 0 && (
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            This image is not currently being used and can be safely deleted.
          </p>
        )}
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;