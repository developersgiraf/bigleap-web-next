// Examples of how to use the responsive gradient component

import GradientLights from './gradient';
import { GRADIENT_PRESETS } from './gradientConfig';

// Example 1: Default responsive behavior
export const DefaultGradient = () => {
  return <GradientLights />;
};

// Example 2: Custom responsive counts
export const CustomResponsiveGradient = () => {
  const customCounts = {
    xl: 5, // 5 gradients on extra large screens
    lg: 4, // 4 gradients on large screens
    md: 3, // 3 gradients on medium screens
    sm: 2, // 2 gradients on small screens
    xs: 1  // 1 gradient on extra small screens
  };

  return <GradientLights customCounts={customCounts} />;
};

// Example 3: Using preset configurations
export const MinimalGradient = () => {
  return <GradientLights customCounts={GRADIENT_PRESETS.minimal} />;
};

export const RichGradient = () => {
  return <GradientLights customCounts={GRADIENT_PRESETS.rich} />;
};

export const PerformanceGradient = () => {
  return <GradientLights customCounts={GRADIENT_PRESETS.performance} />;
};

// Example 4: Static count (disables responsive behavior)
export const StaticGradient = () => {
  return <GradientLights count={3} />;
};

// Example 5: Disable responsive behavior with static fallback
export const DisabledResponsiveGradient = () => {
  return <GradientLights enableResponsive={false} />;
};

// Example 6: Custom counts for specific use case (e.g., homepage vs other pages)
export const HomepageGradient = () => {
  const homepageCounts = {
    xl: 6, // More gradients for impact on homepage
    lg: 5,
    md: 3,
    sm: 2,
    xs: 1
  };

  return <GradientLights customCounts={homepageCounts} />;
};

export const ContentPageGradient = () => {
  const contentPageCounts = {
    xl: 3, // Fewer gradients for better content readability
    lg: 2,
    md: 2,
    sm: 1,
    xs: 0 // No gradients on mobile for content pages
  };

  return <GradientLights customCounts={contentPageCounts} />;
};