import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './manager-card.module.css';
import ActionButtons from './ActionButtons';

// Generic Image Component
const ManagerCardImage = ({ src, alt, status, archived, defaultImage = '/servicess/default-image.png' }) => {
  const [imageSrc, setImageSrc] = useState(src || defaultImage);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (src && src !== imageSrc && !hasError) {
      setImageSrc(src);
    }
  }, [src, imageSrc, hasError]);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(defaultImage);
    }
  }, [hasError, defaultImage]);

  return (
    <div className={styles.cardImage}>
      <img 
        src={imageSrc}
        alt={alt}
        onError={handleError}
        loading="lazy"
        style={{ objectFit: 'cover' }}
      />
      {archived && (
        <div className={styles.archivedBadge}>Archived</div>
      )}
      {status === 'draft' && (
        <div className={styles.draftBadge}>Draft</div>
      )}
      {status === 'featured' && (
        <div className={styles.featuredBadge}>Featured</div>
      )}
    </div>
  );
};

// Generic Manager Card Component
const ManagerCard = ({
  // Data
  item,
  
  // Content props
  title,
  subtitle,
  description,
  image,
  
  // Status props
  status,
  archived,
  featured,
  
  // Metadata props
  metadata = [], // Array of {label, value} objects
  stats = [], // Array of {label, value} objects
  
  // Action props
  actionButtons = [],
  onCardClick,
  
  // Drag and drop props (for services)
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  draggedIndex,
  currentIndex,
  
  // Index controls (for services)
  showIndexControls = false,
  totalItems = 0,
  onIndexChange,
  
  // Additional props
  className = '',
  children
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  // Mobile detection utility
  const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);

  // Index control handlers
  const handleIndexSelect = async (newIndex) => {
    if (newIndex !== currentIndex && onIndexChange) {
      await onIndexChange(item.id, newIndex);
    }
    setShowDropdown(false);
  };

  const handleIncrement = async () => {
    const newIndex = Math.min((currentIndex || 1) + 1, totalItems);
    if (newIndex !== currentIndex && onIndexChange) {
      await onIndexChange(item.id, newIndex);
    }
  };

  const handleDecrement = async () => {
    const newIndex = Math.max((currentIndex || 1) - 1, 1);
    if (newIndex !== currentIndex && onIndexChange) {
      await onIndexChange(item.id, newIndex);
    }
  };

  // Drag handlers
  const handleDragStart = (e) => {
    if (isMobile || !onDragStart) {
      e.preventDefault();
      return;
    }
    onDragStart(currentIndex, item.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    if (isMobile || !onDragOver) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(currentIndex);
  };

  const handleDrop = (e) => {
    if (isMobile || !onDrop) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    onDrop(currentIndex);
  };

  const isDraggedOver = draggable && draggedIndex !== null && draggedIndex !== undefined && draggedIndex !== currentIndex;
  const isBeingDragged = draggable && draggedIndex !== null && draggedIndex !== undefined && draggedIndex === currentIndex;

  const cardClasses = [
    styles.managerCard,
    archived ? styles.archivedCard : '',
    isBeingDragged ? styles.dragging : '',
    isDraggedOver ? styles.dragOver : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      draggable={draggable && !isMobile}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={onCardClick}
    >
      {/* Drag Handle */}
      {draggable && !isMobile && (
        <div className={styles.dragHandle} title="Drag to reorder">
          <span>⋮⋮</span>
        </div>
      )}
      
      {/* Card Image */}
      <ManagerCardImage 
        src={image}
        alt={title}
        status={status}
        archived={archived}
      />
      
      {/* Card Content */}
      <div className={styles.cardContent}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.titleGroup}>
            {/* Index Controls */}
            {showIndexControls && (
              <div className={styles.indexControls}>
                <div className={styles.indexBadgeContainer} ref={dropdownRef}>
                  <span 
                    className={styles.itemIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(!showDropdown);
                    }}
                    title="Click to change order"
                  >
                    #{currentIndex || 0}
                  </span>
                  {showDropdown && (
                    <div className={styles.indexDropdown}>
                      {Array.from({ length: totalItems }, (_, i) => {
                        const orderValue = i + 1; // Start from 1 instead of 0
                        return (
                          <div
                            key={orderValue}
                            className={`${styles.dropdownItem} ${orderValue === (currentIndex || 1) ? styles.currentIndex : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIndexSelect(orderValue);
                            }}
                          >
                            #{orderValue}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className={styles.indexButtons}>
                  <button
                    className={styles.indexBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrement();
                    }}
                    disabled={(currentIndex || 1) <= 1}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    className={styles.indexBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrement();
                    }}
                    disabled={(currentIndex || 1) >= totalItems}
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>
              </div>
            )}
            
            {/* Title */}
            <h3 className={styles.cardTitle}>{title}</h3>
          </div>
          
          {/* Status and metadata */}
          <div className={styles.statusGroup}>
            {/* Status badges */}
            {archived ? (
              <span className={styles.statusArchived}>Archived</span>
            ) : status === 'published' ? (
              <span className={styles.statusPublished}>Published</span>
            ) : status === 'draft' ? (
              <span className={styles.statusDraft}>Draft</span>
            ) : (
              <span className={styles.statusActive}>Active</span>
            )}
            
            {featured && (
              <div className={styles.featuredBadge}>Featured</div>
            )}
            
            {/* Metadata */}
            {metadata.map((meta, index) => (
              <span key={index} className={styles.metadata}>
                {meta.label}: {meta.value}
              </span>
            ))}
          </div>
        </div>
        
        {/* Subtitle */}
        {subtitle && (
          <p className={styles.cardSubtitle}>{subtitle}</p>
        )}
        
        {/* Description */}
        {description && (
          <p className={styles.cardDescription}>{description}</p>
        )}
        
        {/* Stats */}
        {stats.length > 0 && (
          <div className={styles.cardStats}>
            {stats.map((stat, index) => (
              <span key={index}>{stat.label}: {stat.value}</span>
            ))}
          </div>
        )}
        
        {/* Custom children content */}
        {children}
        
        {/* Footer with action buttons */}
        {actionButtons.length > 0 && (
          <div className={styles.cardFooter}>
            <ActionButtons buttons={actionButtons} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerCard;