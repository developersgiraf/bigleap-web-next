"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from '../blog.module.css';

const CollapsibleTagCloud = ({ tags, activeTag = null }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show top 6 tags when collapsed
  const visibleTags = isExpanded ? tags : tags.slice(0, 6);
  const hasMoreTags = tags.length > 6;
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.tagCloudContainer}>
      <div className={`${styles.tagCloud} ${isExpanded ? styles.tagCloudExpanded : styles.tagCloudCollapsed}`}>
        {visibleTags.map((tag) => (
          <Link 
            key={tag}
            href={`/blog/tags/${tag}`}
            className={`${styles.tagLink} ${tag === activeTag ? styles.activeTag : ''}`}
          >
            {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
        ))}
      </div>
      

      
      {/* Toggle button */}
      {hasMoreTags && (
        <button 
          onClick={toggleExpanded}
          className={styles.tagToggleButton}
        >
          {isExpanded ? 'Show Less Tags' : `Show ${tags.length - 6} More Tags`}
        </button>
      )}
    </div>
  );
};

export default CollapsibleTagCloud;