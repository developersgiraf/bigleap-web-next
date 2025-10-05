"use client";

import styles from './action-buttons.module.css';

const ActionButtons = ({ 
  buttons = [],
  size = 'medium',
  gap = 'normal',
  onClick
}) => {
  if (!buttons || buttons.length === 0) return null;

  const handleClick = (action, originalHandler, e) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (originalHandler) {
      originalHandler(e);
    } else if (onClick) {
      onClick(action, e);
    }
  };

  return (
    <div className={`${styles.actionButtons} ${styles[`gap-${gap}`]} ${styles[`size-${size}`]}`}>
      {buttons.map((button, index) => {
        const {
          type = 'default',
          label,
          action,
          onClick: buttonOnClick,
          disabled = false,
          icon,
          className = '',
          title
        } = button;

        return (
          <button
            key={index}
            type="button"
            className={`${styles.actionButton} ${styles[`type-${type}`]} ${className}`}
            onClick={(e) => handleClick(action, buttonOnClick, e)}
            disabled={disabled}
            title={title || label}
          >
            {icon && <span className={styles.buttonIcon}>{icon}</span>}
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ActionButtons;