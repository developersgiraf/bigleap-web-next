# IFrameLoader Component

A React component that implements lazy loading for iframes using the Intersection Observer API. This component improves page performance by deferring iframe loading until the user scrolls or the iframe comes into view.

## Features

- **Lazy Loading**: Iframes are only loaded when needed
- **Scroll Detection**: Can load content when user starts scrolling
- **Visibility Detection**: Uses Intersection Observer to detect when iframe comes into view
- **Customizable Threshold**: Control when the iframe should load based on visibility
- **Fallback Support**: Graceful fallback for browsers without Intersection Observer
- **Custom Placeholder**: Configurable loading placeholder
- **Responsive Design**: Mobile-friendly loading indicators

## Usage

### Basic Usage

```jsx
import IFrameLoader from './components/iframe-loader';

function MyComponent() {
  return (
    <IFrameLoader>
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="My Video"
        allowFullScreen
      />
    </IFrameLoader>
  );
}
```

### Advanced Usage with Custom Options

```jsx
<IFrameLoader
  threshold={0.2}           // Load when 20% visible
  rootMargin="50px"         // Start loading 50px before entering viewport
  loadOnScroll={true}       // Load when user starts scrolling
  fallback={<CustomLoader />}  // Custom loading component
  className="my-iframe-container"
>
  <iframe src="..." />
</IFrameLoader>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The iframe element(s) to lazy load |
| `fallback` | ReactNode | Default spinner | Custom loading placeholder component |
| `threshold` | number | 0.1 | Intersection Observer threshold (0.0 to 1.0) |
| `rootMargin` | string | '50px' | Margin around the root for early loading |
| `loadOnScroll` | boolean | true | Whether to load on first scroll interaction |
| `className` | string | '' | Additional CSS classes |

### Prop Details

#### `threshold`
Controls when the iframe loads based on how much of the container is visible:
- `0.0`: Load as soon as any part is visible
- `0.5`: Load when 50% is visible
- `1.0`: Load only when completely visible

#### `rootMargin`
Expands the intersection area:
- `'50px'`: Start loading 50px before entering viewport
- `'0px'`: Load exactly when entering viewport
- `'-50px'`: Load only after 50px inside viewport

#### `loadOnScroll`
- `true`: Load when user scrolls AND iframe is visible
- `false`: Load immediately when iframe becomes visible

## How It Works

1. **Initial State**: Component renders with a loading placeholder
2. **Scroll Detection**: Listens for user scroll events (if `loadOnScroll` is true)
3. **Visibility Check**: Uses Intersection Observer to detect when iframe enters viewport
4. **Loading Trigger**: Loads iframe when both conditions are met (or just visibility if `loadOnScroll` is false)
5. **Cleanup**: Removes observers and listeners after loading

## Performance Benefits

- **Reduced Initial Load Time**: Iframes don't load until needed
- **Bandwidth Savings**: Only loads content that users actually see
- **Better Core Web Vitals**: Improves Largest Contentful Paint (LCP) scores
- **Smooth Scrolling**: Prevents layout shifts during initial page load

## Browser Compatibility

- **Modern Browsers**: Full Intersection Observer support
- **Legacy Browsers**: Graceful fallback (loads iframe immediately)
- **Mobile**: Fully responsive with touch-friendly interactions

## Examples in Your Project

### YouTube Videos
```jsx
<IFrameLoader>
  <iframe
    src="https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1"
    title="YouTube video player"
    allowFullScreen
  />
</IFrameLoader>
```

### In Sliders
```jsx
<IFrameLoader
  threshold={0.2}
  rootMargin="100px"
  loadOnScroll={true}
>
  <iframe src={videoUrl} />
</IFrameLoader>
```

### Custom Loading State
```jsx
<IFrameLoader
  fallback={
    <div className="custom-loader">
      <img src="/loading.gif" alt="Loading..." />
      <p>Video is loading...</p>
    </div>
  }
>
  <iframe src={videoUrl} />
</IFrameLoader>
```

## Styling

The component includes default CSS modules for styling. You can:

1. **Use default styles**: No additional CSS needed
2. **Override with className**: Pass custom CSS classes
3. **Style the fallback**: Create custom loading components

### Default CSS Classes
- `.iframeContainer`: Main container
- `.placeholder`: Loading placeholder
- `.spinner`: Loading spinner animation
- `.loadingText`: Loading text

## Tips

1. **For Hero Videos**: Set `loadOnScroll={false}` to load immediately when visible
2. **For Below-Fold Content**: Keep `loadOnScroll={true}` for better performance
3. **Mobile Optimization**: Use smaller `threshold` values for mobile
4. **Accessibility**: Ensure fallback content is descriptive for screen readers

## Implementation Notes

- Component uses `'use client'` directive (Next.js App Router)
- Automatically cleans up observers and event listeners
- Handles edge cases like browser compatibility
- Optimized for performance with passive scroll listeners