// Gradient configuration for different responsive breakpoints
// You can customize these values to change the number of gradient lights per screen size

export const GRADIENT_CONFIG = {
  // Responsive gradient counts
  responsive: {
    // Extra large screens (1400px and up) - Desktop large monitors
    xl: 4,
    
    // Large screens (1200px to 1399px) - Desktop
    lg: 3,
    
    // Medium screens (992px to 1199px) - Small desktop/Large tablet
    md: 2,
    
    // Small screens (768px to 991px) - Tablet
    sm: 2,
    
    // Extra small screens (below 768px) - Mobile
    xs: 1
  },

  // Animation settings per breakpoint (optional customization)
  animation: {
    xl: { delay: 1.5, duration: 6 },
    lg: { delay: 1.5, duration: 6 },
    md: { delay: 1.8, duration: 5 },
    sm: { delay: 2.0, duration: 4 },
    xs: { delay: 2.5, duration: 3 }
  },

  // Breakpoint values (matching your SCSS)
  breakpoints: {
    xl: 1400,
    lg: 1200,
    md: 992,
    sm: 768,
    xs: 0
  }
};

// Pre-defined gradient count configurations for different use cases
export const GRADIENT_PRESETS = {
  // Minimal - fewer gradients for better performance
  minimal: {
    xl: 2,
    lg: 2,
    md: 1,
    sm: 1,
    xs: 1
  },

  // Standard - balanced performance and visual appeal
  standard: {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1
  },

  // Rich - more gradients for visual richness
  rich: {
    xl: 5,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  },

  // Performance - optimized for mobile performance
  performance: {
    xl: 3,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 0 // No gradients on mobile for performance
  }
};

export default GRADIENT_CONFIG;