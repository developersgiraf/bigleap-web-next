'use client';

import styles from "./gradient.module.scss";
import { useEffect, useState } from "react";

export default function GradientLights({ count = 0 }) {
  const [dynamicCount, setDynamicCount] = useState(count);
  const [pageHeight, setPageHeight] = useState('100vh');

  useEffect(() => {
    const updateDimensions = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      // Set page height for halftone dots
      setPageHeight(`${scrollHeight}px`);
      
      if (count <= 0) {
        const calculatedCount = Math.ceil(scrollHeight / viewportHeight);
        setDynamicCount(Math.max(calculatedCount, 2)); // Minimum 2 lights
      } else {
        setDynamicCount(count);
      }
    };

    // Initial calculation
    updateDimensions();

    // Listen for various events that might change page height
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("load", updateDimensions);
    
    // Use MutationObserver to detect DOM changes (page navigation, content changes)
    const observer = new MutationObserver(() => {
      // Debounce the updates to avoid excessive recalculation
      setTimeout(updateDimensions, 100);
    });

    // Observe changes in the document body and its subtree
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Also check periodically for dynamic content changes
    const interval = setInterval(updateDimensions, 2000);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("load", updateDimensions);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [count]);

  return (
    <>
    <div className={styles["gradient-lights"]}>
      {Array.from({ length: dynamicCount }).map((_, index) => {
        let position = index % 2 === 0 ? "left" : "right";
        return (
          <div
            key={index}
            className={`${styles.light} ${styles[position]}`}
            style={{
              top: `${index * 100}vh`, // Increment Y position by 100vh for each light
              animationDelay: `${index * 1.5}s`, // Stagger animation delays
            }}
          ></div>

        );
      })}
    </div>
    <div 
      className={styles.halftoneDots}
      style={{ height: pageHeight }}
    ></div>
    
    </>
  );
}
