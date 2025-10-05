"use client";

import styles from './manager-header.module.css';

const ManagerHeader = ({ 
  title, 
  stats = [], 
  onRefresh, 
  onAdd, 
  addButtonText = "+ Add New Item",
  refreshTitle = "Force refresh data" 
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <h2>{title}</h2>
        {stats.length > 0 && (
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <span key={index} className={styles.stat}>
                <span className={styles.statLabel}>{stat.label}:</span>
                <span className={styles.statValue}>{stat.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.headerActions}>
        {onRefresh && (
          <button 
            className={styles.refreshButton}
            onClick={onRefresh}
            title={refreshTitle}
          >
            Refresh
          </button>
        )}
        {onAdd && (
          <button 
            className={styles.addButton}
            onClick={onAdd}
          >
            {addButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ManagerHeader;