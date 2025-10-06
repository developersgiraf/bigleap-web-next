"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from '../blog.module.css';

const CollapsibleTagCloud = ({ tags, activeTag = null }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show top 6 tags when collapsed, but always include activeTag if it exists
  let visibleTags;
  if (isExpanded) {
    visibleTags = tags;
  } else {
    const firstSix = tags.slice(0, 6);
    if (activeTag && !firstSix.find(tag => tag.name === activeTag)) {
      // Find the active tag object and replace the 6th tag with it
      const activeTagObj = tags.find(tag => tag.name === activeTag);
      if (activeTagObj) {
        visibleTags = [...firstSix.slice(0, 5), activeTagObj];
      } else {
        visibleTags = firstSix;
      }
    } else {
      visibleTags = firstSix;
    }
  }
  const hasMoreTags = tags.length > 6;
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.tagCloudContainer}>
      <div className={`${styles.tagCloud} ${isExpanded ? styles.tagCloudExpanded : styles.tagCloudCollapsed}`}>
        {visibleTags.map((tag) => (
          <Link 
            key={tag.name}
            href={`/blog/tags/${tag.name}`}
            className={`${styles.tagLink} ${tag.name === activeTag ? styles.activeTag : ''}`}
          >
            {tag.displayName} ({tag.count})
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