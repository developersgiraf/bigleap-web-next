"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";

import styles from "./SwiperSlider.module.scss";

/**
 * Flexible Swiper Slider Component
 *
 * @param {Array} slides - Array of slide objects
 * @param {Object} swiperConfig - Swiper configuration options
 * @param {Object} navigationConfig - Navigation configuration
 * @param {Object} paginationConfig - Pagination configuration
 * @param {Object} autoplayConfig - Autoplay configuration
 * @param {string} effect - Swiper effect ('slide', 'fade', 'coverflow')
 * @param {string} className - Additional CSS class
 * @param {Function} onSlideChange - Callback for slide change
 * @param {Function} renderSlide - Custom slide render function
 */
export default function SwiperSlider({
  slides = [],
  swiperConfig = {},
  navigationConfig = { enabled: true, prevEl: null, nextEl: null },
  paginationConfig = { enabled: false, clickable: true },
  autoplayConfig = { enabled: true, delay: 3000, disableOnInteraction: false },
  effect = "slide",
  className = "",
  onSlideChange = null,
  renderSlide = null,
  height = "auto",
  imageConfig = {
    width: 500,
    height: 300,
    objectFit: "cover",
    priority: false,
  },
}) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default Swiper configuration
  const defaultConfig = {
    spaceBetween: 30,
    slidesPerView: 1,
    loop: slides.length > 1,
    speed: 600,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };

  // Merge configurations
  const finalConfig = { ...defaultConfig, ...swiperConfig };

  // Configure modules
  const modules = [Navigation, Pagination];
  if (autoplayConfig.enabled) modules.push(Autoplay);
  if (effect === "fade") modules.push(EffectFade);
  if (effect === "coverflow") modules.push(EffectCoverflow);

  // Configure navigation
  const navigation = navigationConfig.enabled
    ? {
        prevEl: navigationConfig.prevEl || `.${styles.swiperNavPrev}`,
        nextEl: navigationConfig.nextEl || `.${styles.swiperNavNext}`,
      }
    : false;

  // Configure pagination
  const pagination = paginationConfig.enabled
    ? {
        clickable: paginationConfig.clickable,
        dynamicBullets: paginationConfig.dynamicBullets || false,
        type: paginationConfig.type || "bullets",
        el: paginationConfig.el || `.${styles.swiperPagination}`,
        ...paginationConfig,
      }
    : false;

  // Configure autoplay
  const autoplay = autoplayConfig.enabled
    ? {
        delay: autoplayConfig.delay,
        disableOnInteraction: autoplayConfig.disableOnInteraction,
        pauseOnMouseEnter: autoplayConfig.pauseOnMouseEnter || true,
        ...autoplayConfig,
      }
    : false;

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
    if (onSlideChange) {
      onSlideChange(swiper.realIndex, swiper);
    }
  };

  // Default slide render function
  const defaultRenderSlide = (slide, index) => {
    if (slide.type === "video") {
      return (
        <div className={styles.videoSlide} style={{ height }}>
          {slide.iframe ? (
            <iframe
              src={slide.iframe}
              title={slide.title || `Video ${index + 1}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className={styles.videoFrame}
            />
          ) : (
            <video
              src={slide.src}
              controls={slide.controls !== false}
              autoPlay={slide.autoPlay || true}
              muted={slide.muted || false}
              loop={slide.loop || false}
              className={styles.video}
            />
          )}
          {slide.overlay && (
            <div className={styles.overlay}>
              {slide.overlay.title && (
                <h3 className={styles.overlayTitle}>{slide.overlay.title}</h3>
              )}
              {slide.overlay.description && (
                <p className={styles.overlayDescription}>
                  {slide.overlay.description}
                </p>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={styles.imageSlide} style={{ height }}>
        {slide.src && (
          <Image
            src={slide.src}
            alt={slide.alt || slide.title || `Slide ${index + 1}`}
            width={imageConfig.width}
            height={imageConfig.height}
            className={styles.slideImage}
            style={{ objectFit: imageConfig.objectFit }}
            priority={imageConfig.priority && index === 0}
          />
        )}
        {(slide.title || slide.description || slide.button) && (
          <div className={styles.slideContent}>
            {slide.title && (
              <h3 className={styles.slideTitle}>{slide.title}</h3>
            )}
            {slide.description && (
              <p className={styles.slideDescription}>{slide.description}</p>
            )}
            {slide.button && (
              <button
                className={styles.slideButton}
                onClick={slide.button.onClick}
                type="button"
              >
                {slide.button.text}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Effect-specific configurations
  const effectConfig = {};
  if (effect === "coverflow") {
    effectConfig.coverflowEffect = {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
      ...swiperConfig.coverflowEffect,
    };
  }

  return (
    <div className={`${styles.swiperContainer} ${className}`}>
      <Swiper
        {...finalConfig}
        {...effectConfig}
        effect={effect}
        modules={modules}
        navigation={navigation}
        pagination={pagination}
        autoplay={autoplay}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className={styles.swiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index} className={styles.swiperSlide}>
            {renderSlide
              ? renderSlide(slide, index) || defaultRenderSlide(slide, index)
              : defaultRenderSlide(slide, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      {navigationConfig.enabled &&
        !navigationConfig.prevEl &&
        !navigationConfig.nextEl && (
          <>
            <button
              className={`${styles.swiperNavPrev} ${styles.swiperNavButton}`}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`${styles.swiperNavNext} ${styles.swiperNavButton}`}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

      {/* Custom Pagination */}
      {paginationConfig.enabled && !paginationConfig.el && (
        <div className={styles.swiperPagination}></div>
      )}

      {/* Slide Counter */}
      {swiperConfig.showCounter && (
        <div className={styles.slideCounter}>
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  );
}
