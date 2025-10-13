import React from 'react';
import styles from './FormModal.module.css';

const FormModal = ({ 
  isOpen, 
  title, 
  onSave, 
  onCancel, 
  children,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
  formId = "modalForm"
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <div className={styles.modalActions}>
            <button 
              type="button" 
              onClick={onCancel} 
              className={styles.cancelBtn}
            >
              {cancelButtonText}
            </button>
            <button 
              type="submit" 
              form={formId} 
              className={styles.saveBtn}
            >
              {saveButtonText}
            </button>
          </div>
        </div>
        
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormModal;