# Responsive Gradient Lights Component

A responsive gradient component that automatically adjusts the number of gradient lights based on screen size, with full customization options.

## Features

- ✅ Responsive gradient counts for different screen sizes
- ✅ Customizable gradient counts per breakpoint
- ✅ Pre-defined presets for common use cases
- ✅ Static count option to override responsive behavior
- ✅ Easy configuration and customization

## Usage

### Basic Usage (Default Responsive)
```jsx
import GradientLights from './components/gradient-lights/gradient';

// Uses default responsive counts:
// - XL (≥1400px): 4 gradients
// - LG (1200-1399px): 3 gradients  
// - MD (992-1199px): 2 gradients
// - SM (768-991px): 2 gradients
// - XS (<768px): 1 gradient
<GradientLights />
```

### Custom Responsive Counts
```jsx
const customCounts = {
  xl: 5, // Extra large screens
  lg: 4, // Large screens
  md: 3, // Medium screens  
  sm: 2, // Small screens
  xs: 1  // Extra small screens
};

<GradientLights customCounts={customCounts} />
```

### Using Presets
```jsx
import { GRADIENT_PRESETS } from './components/gradient-lights/gradientConfig';

// Minimal preset (better performance)
<GradientLights customCounts={GRADIENT_PRESETS.minimal} />

// Rich preset (more visual impact)
<GradientLights customCounts={GRADIENT_PRESETS.rich} />

// Performance preset (optimized for mobile)
<GradientLights customCounts={GRADIENT_PRESETS.performance} />
```

### Static Count (Non-responsive)
```jsx
// Always shows 3 gradients regardless of screen size
<GradientLights count={3} />
```

### Disable Responsive Behavior
```jsx
// Uses default count of 2, no responsive behavior
<GradientLights enableResponsive={false} />
```

## Configuration

### Breakpoints
The component uses these breakpoints (matching your existing SCSS):

- **XL**: ≥1400px (Extra large screens)
- **LG**: 1200-1399px (Large screens) 
- **MD**: 992-1199px (Medium screens)
- **SM**: 768-991px (Small screens)
- **XS**: <768px (Extra small screens)

### Default Gradient Counts
```javascript
{
  xl: 4, // Extra large screens
  lg: 3, // Large screens
  md: 2, // Medium screens
  sm: 2, // Small screens  
  xs: 1  // Extra small screens
}
```

### Available Presets

#### Minimal (Better Performance)
```javascript
{
  xl: 2,
  lg: 2, 
  md: 1,
  sm: 1,
  xs: 1
}
```

#### Standard (Balanced)
```javascript
{
  xl: 3,
  lg: 3,
  md: 2, 
  sm: 2,
  xs: 1
}
```

#### Rich (Visual Impact)  
```javascript
{
  xl: 5,
  lg: 4,
  md: 3,
  sm: 2, 
  xs: 1
}
```

#### Performance (Mobile Optimized)
```javascript
{
  xl: 3,
  lg: 2,
  md: 2,
  sm: 1,
  xs: 0  // No gradients on mobile
}
```

## Customization

### Modifying Default Configuration
Edit `gradientConfig.js` to change default behavior:

```javascript
export const GRADIENT_CONFIG = {
  responsive: {
    xl: 4, // Change these values
    lg: 3,
    md: 2, 
    sm: 2,
    xs: 1
  }
};
```

### Creating Custom Presets
Add your own presets to `gradientConfig.js`:

```javascript
export const GRADIENT_PRESETS = {
  // ... existing presets
  
  custom: {
    xl: 6,
    lg: 4, 
    md: 2,
    sm: 1,
    xs: 0
  }
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `undefined` | Static gradient count. Overrides responsive behavior when provided |
| `customCounts` | `object` | `{}` | Custom gradient counts per breakpoint |
| `enableResponsive` | `boolean` | `true` | Enable/disable responsive behavior |

## Examples

See `examples.jsx` for comprehensive usage examples including:
- Default responsive behavior
- Custom responsive counts  
- Preset usage
- Static counts
- Use case specific implementations (homepage vs content pages)

## Performance Notes

- Use fewer gradients on mobile devices for better performance
- Consider the `performance` preset for mobile-heavy applications
- Set gradients to 0 for specific breakpoints to disable completely
- The component uses `window.innerWidth` and adds resize listeners efficiently