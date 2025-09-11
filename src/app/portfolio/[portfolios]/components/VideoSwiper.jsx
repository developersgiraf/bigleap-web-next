"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./video.module.scss";

export default function VideoSwiper({ styles }) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={30}
      slidesPerView={3}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      navigation={false}
      className={styles.videoSwiperSlider}
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
            width="100%"
            height="400"
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
            width="100%"
            height="400"
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
            width="100%"
            height="400"
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
            width="100%"
            height="400"
            title="Animation Showreel"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
