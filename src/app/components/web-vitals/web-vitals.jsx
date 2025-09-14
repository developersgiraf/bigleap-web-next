"use client";
import { useEffect } from 'react';

const WebVitals = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Report Web Vitals
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      }).catch(() => {
        // Gracefully handle if web-vitals is not available
      });
    }
  }, []);

  return null;
};

export default WebVitals;