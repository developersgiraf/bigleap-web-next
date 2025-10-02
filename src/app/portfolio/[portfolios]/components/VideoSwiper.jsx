"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./video.module.css";

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
      <SwiperSlide>
        <div className={styles.videoSlide}>
          <video
            src="/portfolio/biax.mp4"
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
            playsInline={true}
            preload="metadata"
            className={styles.videoElement}
            title="Animation Showreel"
          />
        </div>
      </SwiperSlide>
      
      <SwiperSlide>
        <div className={styles.videoSlide}>
          <video
            src="/portfolio/seek.mp4"
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
            playsInline={true}
            preload="metadata"
            className={styles.videoElement}
            title="Animation Showreel"
          />
        </div>
      </SwiperSlide>
      
      <SwiperSlide>
        <div className={styles.videoSlide}>
          <video
            src="/portfolio/biax.mp4"
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
            playsInline={true}
            preload="metadata"
            className={styles.videoElement}
            title="Animation Showreel"
          />
        </div>
      </SwiperSlide>
      
      <SwiperSlide>
        <div className={styles.videoSlide}>
          <video
            src="/portfolio/seek.mp4"
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
            playsInline={true}
            preload="metadata"
            className={styles.videoElement}
            title="Animation Showreel"
          />
        </div>
      </SwiperSlide>

      {/* Pagination for mobile */}
      <div className={styles.swiperPagination}></div>
    </Swiper>
  );
}
