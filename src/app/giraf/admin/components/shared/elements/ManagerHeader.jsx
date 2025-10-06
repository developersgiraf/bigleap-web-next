"use client";

import styles from './manager-header.module.css';

const ManagerHeader = ({ 
  title, 
  stats = [], 
  onRefresh, 
  onAdd, 
  addButtonText = "+ Add New Item",
  refreshTitle = "Force refresh data",
  // Search and Filter props
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  filterValue = "",
  onFilterChange,
  filterOptions = [],
  // Additional filters (for portfolio)
  additionalFilters = []
}) => {
  return (
    <div className={styles.headerContainer}>
      {/* Main Header */}
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

      {/* Search and Filter Controls */}
      {(onSearchChange || filterOptions.length > 0 || additionalFilters.length > 0) && (
        <div className={styles.controls}>
          {onSearchChange && (
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          )}
          
          {filterOptions.length > 0 && (
            <div className={styles.filterBox}>
              <select 
                value={filterValue} 
                onChange={(e) => onFilterChange(e.target.value)}
                className={styles.filterSelect}
              >
                {filterOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Additional filters for more complex cases like Portfolio */}
          {additionalFilters.map((filter, index) => (
            <div key={index} className={styles.filterBox}>
              <select 
                value={filter.value} 
                onChange={(e) => filter.onChange(e.target.value)}
                className={styles.filterSelect}
              >
                {filter.options.map((option, optIndex) => (
                  <option key={optIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerHeader;