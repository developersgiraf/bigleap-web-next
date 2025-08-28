# SwiperSlider Component

A flexible and feature-rich Swiper.js slider component for Next.js applications.

## Features

- ✅ **Highly Customizable**: Configure all aspects of the slider
- ✅ **Multiple Effects**: Support for slide, fade, and coverflow effects
- ✅ **Responsive Design**: Built-in responsive breakpoints
- ✅ **Image & Video Support**: Handle both images and videos seamlessly
- ✅ **Custom Navigation**: Built-in navigation with customizable styling
- ✅ **Pagination**: Multiple pagination styles and configurations
- ✅ **Autoplay**: Configurable autoplay with pause on hover
- ✅ **Custom Render**: Custom slide rendering for complex layouts
- ✅ **TypeScript Ready**: Full TypeScript support (types can be added)
- ✅ **Accessibility**: ARIA labels and keyboard navigation
- ✅ **Performance Optimized**: Lazy loading and optimized rendering

## Installation

The component requires Swiper.js which is already installed in your project:

```bash
npm install swiper
```

## Basic Usage

```jsx
import SwiperSlider from "./components/swiper-slider/SwiperSlider";

const slides = [
  {
    id: 1,
    src: "/image1.jpg",
    alt: "Image 1",
    title: "Slide Title",
    description: "Slide description",
  },
  // ... more slides
];

function MyComponent() {
  return (
    <SwiperSlider
      slides={slides}
      height="400px"
      navigationConfig={{ enabled: true }}
      paginationConfig={{ enabled: true }}
      autoplayConfig={{ enabled: true, delay: 3000 }}
    />
  );
}
```

## Props

### `slides` (Array, required)

Array of slide objects. Each slide can have:

**For Image Slides:**

```jsx
{
  id: unique_id,           // Unique identifier
  src: '/path/to/image',   // Image source
  alt: 'Alt text',         // Alt text for accessibility
  title: 'Slide Title',    // Optional title overlay
  description: 'Description', // Optional description
  button: {                // Optional button
    text: 'Click Me',
    onClick: () => {}
  }
}
```

**For Video Slides:**

```jsx
{
  id: unique_id,
  type: 'video',
  src: '/path/to/video.mp4',  // For local videos
  iframe: 'https://youtube.com/embed/...', // For embedded videos
  overlay: {
    title: 'Video Title',
    description: 'Video description'
  }
}
```

### `swiperConfig` (Object, optional)

Swiper configuration options:

```jsx
{
  slidesPerView: 1,        // Number of slides per view
  spaceBetween: 30,        // Space between slides
  loop: true,              // Enable loop mode
  speed: 600,              // Transition speed
  showCounter: false,      // Show slide counter
  breakpoints: {           // Responsive breakpoints
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
}
```

### `navigationConfig` (Object, optional)

Navigation configuration:

```jsx
{
  enabled: true,           // Enable/disable navigation
  prevEl: '.custom-prev',  // Custom previous button selector
  nextEl: '.custom-next',  // Custom next button selector
}
```

### `paginationConfig` (Object, optional)

Pagination configuration:

```jsx
{
  enabled: true,           // Enable/disable pagination
  clickable: true,         // Make bullets clickable
  dynamicBullets: false,   // Dynamic bullets
  type: 'bullets',         // Type: 'bullets', 'fraction', 'progressbar'
  el: '.custom-pagination' // Custom pagination container
}
```

### `autoplayConfig` (Object, optional)

Autoplay configuration:

```jsx
{
  enabled: true,                    // Enable/disable autoplay
  delay: 3000,                     // Delay between slides (ms)
  disableOnInteraction: false,     // Stop on user interaction
  pauseOnMouseEnter: true,         // Pause on hover
}
```

### `effect` (String, optional)

Slider effect. Options: `'slide'`, `'fade'`, `'coverflow'`

### `height` (String, optional)

Container height. Default: `'auto'`

### `imageConfig` (Object, optional)

Image configuration:

```jsx
{
  width: 500,              // Image width
  height: 300,             // Image height
  objectFit: 'cover',      // CSS object-fit property
  priority: false,         // Next.js image priority
}
```

### `className` (String, optional)

Additional CSS class for the container.

### `onSlideChange` (Function, optional)

Callback function called when slide changes:

```jsx
onSlideChange={(slideIndex, swiperInstance) => {
  console.log('Current slide:', slideIndex);
}}
```

### `renderSlide` (Function, optional)

Custom slide render function:

```jsx
renderSlide={(slide, index) => (
  <div>
    <h2>{slide.title}</h2>
    <p>Custom slide content for slide {index}</p>
  </div>
)}
```

## Examples

### Basic Image Slider

```jsx
<SwiperSlider
  slides={imageSlides}
  height="400px"
  navigationConfig={{ enabled: true }}
  paginationConfig={{ enabled: true }}
/>
```

### Product Carousel

```jsx
<SwiperSlider
  slides={products}
  swiperConfig={{
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  }}
  height="350px"
/>
```

### Video Slider

```jsx
<SwiperSlider
  slides={videoSlides}
  swiperConfig={{ slidesPerView: 1 }}
  height="500px"
  autoplayConfig={{ enabled: false }}
/>
```

### Coverflow Effect

```jsx
<SwiperSlider
  slides={slides}
  effect="coverflow"
  swiperConfig={{
    slidesPerView: 3,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  }}
/>
```

### Instagram Feeds Style

```jsx
<SwiperSlider
  slides={instagramFeeds}
  swiperConfig={{
    slidesPerView: 6,
    spaceBetween: 0,
    loop: true,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 6 },
    },
  }}
  navigationConfig={{ enabled: false }}
  autoplayConfig={{ enabled: true, delay: 2000 }}
  height="300px"
/>
```

## Styling

The component uses SCSS modules for styling. You can override styles by:

1. **CSS Variables**: The component supports CSS custom properties
2. **CSS Classes**: Target specific classes in your global CSS
3. **Inline Styles**: Pass styles through props
4. **Custom Classes**: Use the `className` prop

### CSS Variables

```css
.swiperContainer {
  --swiper-navigation-color: #ed232a;
  --swiper-pagination-color: #ed232a;
}
```

## Accessibility

The component includes:

- ARIA labels for navigation buttons
- Proper alt text for images
- Keyboard navigation support
- Screen reader support

## Performance

- Uses Next.js Image component for optimized images
- Lazy loading by default
- Efficient re-rendering with React keys
- Optimized for large slide sets

## Browser Support

Supports all modern browsers that support:

- ES6+
- CSS Grid and Flexbox
- Intersection Observer API

## Contributing

When contributing:

1. Maintain TypeScript compatibility
2. Follow existing code style
3. Add appropriate comments
4. Test on multiple devices
5. Update documentation

## License

This component is part of the BigLeap Web project.
