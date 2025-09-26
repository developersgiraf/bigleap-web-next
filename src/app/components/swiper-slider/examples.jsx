import SwiperSlider from "./SwiperSlider";

// Example usage of the SwiperSlider component

// Example 1: Basic Image Slider
export function BasicImageSlider() {
  const slides = [
    {
      id: 1,
      src: "/img1.jpg",
      alt: "Image 1",
      title: "Beautiful Landscape",
      description: "A stunning view of nature",
    },
    {
      id: 2,
      src: "/img2.jpg",
      alt: "Image 2",
      title: "City Life",
      description: "Urban architecture and lights",
    },
    {
      id: 3,
      src: "/img3.jpg",
      alt: "Image 3",
      title: "Ocean Waves",
      description: "Peaceful ocean scenery",
    },
  ];

  return (
    <SwiperSlider
      slides={slides}
      swiperConfig={{
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      }}
      navigationConfig={{ enabled: true }}
      paginationConfig={{ enabled: true, clickable: true }}
      autoplayConfig={{ enabled: true, delay: 4000 }}
      height="400px"
    />
  );
}

// Example 2: Product Carousel
export function ProductCarousel() {
  const products = [
    {
      id: 1,
      src: "/servicess/2danimation.png",
      alt: "2D Animation",
      title: "2D Animation",
      description: "Professional 2D animation services",
      button: {
        text: "Learn More",
        onClick: () => console.log("Learn more clicked"),
      },
    },
    {
      id: 2,
      src: "/servicess/3danimation.png",
      alt: "3D Animation",
      title: "3D Animation",
      description: "Cutting-edge 3D animation",
      button: {
        text: "Learn More",
        onClick: () => console.log("Learn more clicked"),
      },
    },
    {
      id: 3,
      src: "/servicess/character.png",
      alt: "Character Design",
      title: "Character Design",
      description: "Custom character design and development",
      button: {
        text: "Learn More",
        onClick: () => console.log("Learn more clicked"),
      },
    },
  ];

  return (
    <SwiperSlider
      slides={products}
      swiperConfig={{
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        showCounter: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      }}
      navigationConfig={{ enabled: true }}
      autoplayConfig={{ enabled: true }}
      height="350px"
      imageConfig={{
        width: 400,
        height: 250,
        objectFit: "cover",
      }}
    />
  );
}

// Example 3: Video Slider
export function VideoSlider() {
  const videoSlides = [
    {
      id: 1,
      type: "video",
      iframe: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      overlay: {
        title: "Amazing Video Content",
        description: "Watch our latest video showcase",
      },
    },
    {
      id: 2,
      type: "video",
      src: "/videos/demo.mp4",
      controls: true,
      overlay: {
        title: "Product Demo",
        description: "See our product in action",
      },
    },
  ];

  return (
    <SwiperSlider
      slides={videoSlides}
      swiperConfig={{
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
      }}
      navigationConfig={{ enabled: true }}
      paginationConfig={{ enabled: true }}
      autoplayConfig={{ enabled: false }}
      height="500px"
    />
  );
}

// Example 4: Instagram Feeds Slider (similar to your current implementation)
export function InstagramFeeds() {
  const feeds = [
    {
      id: 1,
      src: "/feeds/feed1.jpg",
      alt: "Feed 1",
    },
    {
      id: 2,
      src: "/feeds/feed2.jpg",
      alt: "Feed 2",
    },
    {
      id: 3,
      src: "/feeds/feed3.jpg",
      alt: "Feed 3",
    },
    {
      id: 4,
      src: "/feeds/feed4.jpg",
      alt: "Feed 4",
    },
    {
      id: 5,
      src: "/feeds/feed5.jpg",
      alt: "Feed 5",
    },
    {
      id: 6,
      src: "/feeds/feed6.jpg",
      alt: "Feed 6",
    },
  ];

  return (
    <SwiperSlider
      slides={feeds}
      swiperConfig={{
        slidesPerView: 6,
        spaceBetween: 0,
        loop: true,
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 6,
          },
        },
      }}
      navigationConfig={{ enabled: false }}
      paginationConfig={{ enabled: false }}
      autoplayConfig={{
        enabled: true,
        delay: 2000,
        disableOnInteraction: false,
      }}
      height="300px"
      imageConfig={{
        width: 300,
        height: 300,
        objectFit: "cover",
      }}
    />
  );
}

// Example 5: Team Slider with Coverflow Effect
export function TeamSlider() {
  const teamMembers = [
    {
      id: 1,
      src: "/team/anu.jpg",
      alt: "Anu",
      title: "Anu",
      description: "Creative Director",
    },
    {
      id: 2,
      src: "/team/basil.jpg",
      alt: "Basil",
      title: "Basil",
      description: "Lead Developer",
    },
    {
      id: 3,
      src: "/team/gokul.jpg",
      alt: "Gokul",
      title: "Gokul",
      description: "UI/UX Designer",
    },
    {
      id: 4,
      src: "/team/hadi.jpg",
      alt: "Hadi",
      title: "Hadi",
      description: "Motion Graphics Artist",
    },
  ];

  return (
    <SwiperSlider
      slides={teamMembers}
      effect="coverflow"
      swiperConfig={{
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      }}
      navigationConfig={{ enabled: true }}
      autoplayConfig={{ enabled: true, delay: 3000 }}
      height="400px"
      imageConfig={{
        width: 300,
        height: 300,
        objectFit: "cover",
      }}
    />
  );
}

// Example 6: Custom Render Function
export function CustomSlider() {
  const slides = [
    {
      id: 1,
      title: "Custom Slide 1",
      content: "This is custom content",
      color: "#ff6b6b",
    },
    {
      id: 2,
      title: "Custom Slide 2",
      content: "Another custom slide",
      color: "#4ecdc4",
    },
  ];

  const customRenderSlide = (slide, index) => (
    <div
      style={{
        background: slide.color,
        color: "white",
        padding: "2rem",
        borderRadius: "8px",
        textAlign: "center",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>{slide.title}</h2>
      <p>{slide.content}</p>
      <p>Slide {index + 1}</p>
    </div>
  );

  return (
    <SwiperSlider
      slides={slides}
      renderSlide={customRenderSlide}
      swiperConfig={{
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
      }}
      navigationConfig={{ enabled: true }}
      autoplayConfig={{ enabled: true, delay: 3000 }}
    />
  );
}
