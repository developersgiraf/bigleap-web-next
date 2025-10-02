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

// YouTube video configuration
const videoData = [
  {
    id: "biax-animation",
    // Replace these YouTube IDs with your actual video IDs
    youtubeId: "dQw4w9WgXcQ", // Replace with your actual Biax video YouTube ID
    title: "Biax Animation Showreel",
    thumbnail: "/portfolio/biax-thumbnail.jpg", // Optional: custom thumbnail
  },
  {
    id: "seek-animation", 
    youtubeId: "dQw4w9WgXcQ", // Replace with your actual Seek video YouTube ID
    title: "Seek Animation Showreel",
    thumbnail: "/portfolio/seek-thumbnail.jpg", // Optional: custom thumbnail
  }
];

export default function VideoSwiper({ styles: parentStyles }) {
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
      {/* Render each video twice to create 4 slides */}
      {[...videoData, ...videoData].map((video, index) => (
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
