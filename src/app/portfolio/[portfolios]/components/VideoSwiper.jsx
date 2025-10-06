"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import IFrameLoader from "../../../components/iframe-loader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./video.module.css";

export default function VideoSwiper({ styles: parentStyles, portfolio }) {
  // Create video data from portfolio information
  const videoData = portfolio?.videos ? 
    // Use the videos array if available
    portfolio.videos :
    // Fallback: create entries from the main video and project gallery
    portfolio?.projectGallery?.projects ? 
      portfolio.projectGallery.projects.slice(0, 4).map((project, index) => ({
        id: `${portfolio.slug}-project-${index}`,
        youtubeId: portfolio.videoUrl,
        title: project.caption || `${portfolio.title} Project ${index + 1}`,
        thumbnail: project.image,
      })) :
      // Final fallback: create multiple entries from the main video
      Array.from({ length: 4 }, (_, index) => ({
        id: `${portfolio?.slug || 'portfolio'}-${index}`,
        youtubeId: portfolio?.videoUrl || "dQw4w9WgXcQ",
        title: `${portfolio?.title || 'Portfolio'} Showreel ${index + 1}`,
        thumbnail: null,
      }));

  // If no portfolio data is provided, return null or a fallback
  if (!portfolio) {
    return <div>Loading portfolio content...</div>;
  }
  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={3}
      loop={true}
      autoplay={{
        delay: 6500,
        disableOnInteraction: false,
      }}
      navigation={false}
      pagination={{
        el: `.${styles.swiperPagination}`,
        clickable: true,
        type: 'bullets',
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
          navigation: false,
          pagination: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
          navigation: false,
          pagination: true,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 25,
          navigation: false,
          pagination: false,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: false,
          pagination: false,
        },
      }}
      className={`${parentStyles?.videoSwiperSlider || ''} ${styles.videoSwiperContainer}`}
    >
      {/* Render video slides using dynamic data */}
      {videoData.map((video, index) => (
        <SwiperSlide key={`${video.id}-${index}`}>
          <div className={styles.videoSlide}>
            <IFrameLoader
              threshold={0.1}
              rootMargin="50px"
              loadOnScroll={true}
              fallback={
                <div className={styles.videoPlaceholder}>
                  <div className={styles.placeholderContent}>
                    <div className={styles.spinner}></div>
                    <p>Loading {video.title}...</p>
                  </div>
                </div>
              }
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                className={styles.videoElement}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </IFrameLoader>
          </div>
        </SwiperSlide>
      ))}

      {/* Pagination for mobile */}
      <div className={styles.swiperPagination}></div>
    </Swiper>
  );
}
