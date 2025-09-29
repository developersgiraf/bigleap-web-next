'use client';

import { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Function to load the iframe
    const loadIframe = () => {
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
    };

    // Scroll listener for detecting user interaction
    if (loadOnScroll) {
      scrollListenerRef.current = () => {
        if (!userHasScrolled) {
          setUserHasScrolled(true);
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
              // Load immediately if user has scrolled, or if loadOnScroll is false
              if (userHasScrolled || !loadOnScroll) {
                loadIframe();
              }
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

    // If loadOnScroll is false, load when in view regardless of scroll state
    if (!loadOnScroll) {
      const checkVisibility = () => {
        const rect = container.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          loadIframe();
        }
      };

      // Check immediately and on scroll
      checkVisibility();
      const visibilityListener = () => checkVisibility();
      window.addEventListener('scroll', visibilityListener, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', visibilityListener);
      };
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
      }
    };
  }, [userHasScrolled, threshold, rootMargin, loadOnScroll]);

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