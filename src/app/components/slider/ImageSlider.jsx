"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNavigation from "./SwiperNavigation";
import styles from "./ImageSlider.module.css";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ImageSlider({
  images = [
    {
      idname: "a",
      img: "img2.jpg",
      caption: "2D motion graphics",
      readbtn: "Know More",
    },
    {
      idname: "a",
      img: "img3.jpg",
      caption: "Whiteboard Animations",
      readbtn: "Know More",
    },
  ],
  spaceBetween = 20,
  slidesPerView = 4,
  loop = true,
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 },
    640: { slidesPerView: 3, spaceBetween: 15 },
    1024: { slidesPerView: 3, spaceBetween: 1 },
    1366: { slidesPerView: 4, spaceBetween: 20 },
  },
  autoplay = { delay: 2500, disableOnInteraction: false },
  navButtons = true,
  imageSize = 100,
  navPos = 0,
  customSelector= "cstm"

}) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={autoplay}
        grabCursor={true}
        spaceBetween={spaceBetween}
        centeredSlides={false}
        slidesPerView={slidesPerView}
        loop={loop}
        allowSlidePrev={true}
        allowSlideNext={true}
        breakpoints={breakpoints}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {images.map((item, idx) => (
          <SwiperSlide
            key={item.idname ? `${item.idname}-${idx}` : `slide-${idx}`}
            className={
              activeIndex === idx ? styles.active : styles.inactive
            }
          >
            <div className={styles.slideContent}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.slideImage}
                  src={item.img}
                  alt={item.caption || "img"}
                  width={imageSize}
                  height={imageSize}
                />
              </div>
              <div className={styles.clientDate}>
                {item.client && (
                  <div className={styles.client}>{item.client}</div>
                )}
                {item.date && (
                  <div className={styles.date}>{item.date}</div>
                )}
              </div>
              {item.caption !== "" && (
                <div className={styles.caption}>{item.caption}</div>
              )}
              {item.readbtn !== "" && (
                <button className={styles.readbtn}>{item.readbtn}</button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {navButtons && (
        <SwiperNavigation
          onPrev={() => swiperRef.current && swiperRef.current.slidePrev()}
          onNext={() => swiperRef.current && swiperRef.current.slideNext()}
          movePos={navPos}
        />
      )}
    </div>
  );
}