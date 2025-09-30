'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './IFrameLoader.module.css';

const IFrameLoader = ({ 
  children, 
  fallback = null, 
  threshold = 0.1, 
  rootMargin = '50px',
  loadOnScroll = true,
  className = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const scrollListenerRef = useRef(null);

  // Memoize the loadIframe function to ensure stable reference
  const loadIframe = useCallback(() => {
    setIsLoaded(true);
    
    // Clean up observers and listeners
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    
    if (scrollListenerRef.current) {
      window.removeEventListener('scroll', scrollListenerRef.current);
      scrollListenerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoaded) return;

    if (!container || isLoaded) return;

    // Scroll listener for detecting user interaction
    if (loadOnScroll) {
      scrollListenerRef.current = () => {
        if (!userHasScrolled) {
          setUserHasScrolled(true);
          // Load immediately when user scrolls (even if not visible)
          loadIframe();
        }
      };
      
      window.addEventListener('scroll', scrollListenerRef.current, { passive: true });
    }

    // Intersection Observer for visibility detection
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Load when visible (regardless of scroll state)
              loadIframe();
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      observerRef.current.observe(container);
    } else {
      // Fallback for browsers without IntersectionObserver support
      loadIframe();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
      }
    };
  }, [threshold, rootMargin, loadOnScroll, isLoaded, userHasScrolled, loadIframe]);

  return (
    <div 
      ref={containerRef} 
      className={`${styles.iframeContainer} ${className}`}
      {...props}
    >
      {isLoaded ? (
        children
      ) : (
        fallback || (
          <div className={styles.placeholder}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading content...</p>
          </div>
        )
      )}
    </div>
  );
};

export default IFrameLoader;