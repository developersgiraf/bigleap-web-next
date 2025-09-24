"use client";

import { useState, useEffect, useMemo } from 'react';
import { GRADIENT_CONFIG } from './gradientConfig';

export const useResponsiveGradientCount = (customCounts = {}) => {
  const [gradientCount, setGradientCount] = useState(2);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');

  // Use config defaults, then override with custom counts
  const gradientCounts = useMemo(() => ({
    ...GRADIENT_CONFIG.responsive,
    ...customCounts
  }), [customCounts]);

  const getBreakpoint = (width) => {
    if (width >= GRADIENT_CONFIG.breakpoints.xl) return 'xl';
    if (width >= GRADIENT_CONFIG.breakpoints.lg) return 'lg';
    if (width >= GRADIENT_CONFIG.breakpoints.md) return 'md';
    if (width >= GRADIENT_CONFIG.breakpoints.sm) return 'sm';
    return 'xs';
  };

  useEffect(() => {
    const updateGradientCount = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        const breakpoint = getBreakpoint(width);
        setCurrentBreakpoint(breakpoint);
        setGradientCount(gradientCounts[breakpoint]);
      }
    };

    // Set initial count
    updateGradientCount();

    // Add event listener for window resize
    const handleResize = () => {
      updateGradientCount();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gradientCounts]);

  return {
    gradientCount,
    currentBreakpoint,
    breakpoints: GRADIENT_CONFIG.breakpoints,
    gradientCounts, // Expose current counts
    updateCounts: (newCounts) => {
      // Function to update counts dynamically
      Object.assign(gradientCounts, newCounts);
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        const breakpoint = getBreakpoint(width);
        setCurrentBreakpoint(breakpoint);
        setGradientCount(gradientCounts[breakpoint]);
      }
    }
  };
};

export default useResponsiveGradientCount;