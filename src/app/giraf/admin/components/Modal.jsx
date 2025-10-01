import React from 'react';
import styles from './modal.module.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = 'default', // 'default', 'warning', 'danger', 'success'
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  showCancel = false
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles[type]}`}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>
        
        <div className={styles.modalBody}>
          {children}
        </div>
        
        <div className={styles.modalFooter}>
          {showCancel && (
            <button 
              className={styles.cancelButton}
              onClick={handleCancel}
              type="button"
            >
              {cancelText}
            </button>
          )}
          <button 
            className={`${styles.confirmButton} ${styles[`${type}Button`]}`}
            onClick={handleConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;