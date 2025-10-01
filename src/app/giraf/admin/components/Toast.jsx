import React, { useState, useEffect } from 'react';
import styles from './toast.module.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${styles.toast} ${styles[type]} ${!isVisible ? styles.fadeOut : ''}`}>
      <div className={styles.toastContent}>
        <span className={styles.toastIcon}>
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </span>
        <span className={styles.toastMessage}>{message}</span>
        <button 
          className={styles.toastClose}
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;