"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../../[portfolios]/portfolioDetail.module.scss";

export default function VideoSwiper({ styles }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={3}
      loop={true}
      navigation={true}
      pagination={{ clickable: true }}
      className={styles.videoSwiperSlider}
    >
      
      
      <SwiperSlide>
        <div className={styles.videoSlide}>
          <Image
            src="/servicess/3danimation.png"
            alt="3D Animation Project"
            width={800}
            height={400}
            className={styles.slideImage}
          />
        </div>
      </SwiperSlide>
      
      <SwiperSlide>
        <div className={styles.videoSlide}>
          <Image
            src="/servicess/character.png"
            alt="Character Design Project"
            width={800}
            height={400}
            className={styles.slideImage}
          />
        </div>
      </SwiperSlide>
      
      <SwiperSlide>
        <div className={styles.videoSlide}>
          <Image
            src="/servicess/animation.png"
            alt="Animation Project"
            width={800}
            height={400}
            className={styles.slideImage}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.videoSlide}>
          <Image
            src="/servicess/character.png"
            alt="Character Design Project"
            width={800}
            height={400}
            className={styles.slideImage}
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
