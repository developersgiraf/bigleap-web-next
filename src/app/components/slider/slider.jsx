"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNavigation from "./SwiperNavigation";
import styles from "./slider.module.css";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Slider({
  datas = [
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
    640: { slidesPerView: 2, spaceBetween: 15 },
    1024: { slidesPerView: 3, spaceBetween: 120 },
    1366: { slidesPerView: 4, spaceBetween: 20 },
  },
  autoplay = { delay: 2500, disableOnInteraction: true },
  navButtons = true,
  imageSize = 100,
  navPos = 0,
  videoAspect = '16/9',
  videoWidth = "100%",
}) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isVideoSlides = datas.length > 0 && datas[0].iframe;

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
        slidesPerView={isVideoSlides ? 1 : slidesPerView}
        loop={loop}
        allowSlidePrev={true}
        allowSlideNext={true}
        breakpoints={
          isVideoSlides
            ? {
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
                1366: { slidesPerView: 1 },
              }
            : breakpoints
        }
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {isVideoSlides
          ? datas.map((item, idx) => (
              <SwiperSlide
                key={
                  item.idname
                    ? `video-${item.idname}-${idx}`
                    : `video-slide-${idx}`
                }
                className={
                  activeIndex === idx ? styles.active : styles.inactive
                }
              >
                <div className={styles.video}>
                  <iframe
                    src={`${item.iframe}&mute=1&showinfo=0&controls=0&disablekb=1&modestbranding=1&rel=0`}
                    title={item.caption || `Video Slide ${idx + 1}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={styles.videoIframe}
                    style={{ aspectRatio: videoAspect, width: videoWidth }}
                  />

                  {item.sub && (
                    <div className={styles.videoSub}>{item.sub}</div>
                  )}
                  {item.caption && (
                    <div className={styles.vdocaption}>{item.caption}</div>
                  )}
                  {item.paragraph && (
                    <div className={styles.paragraph}>{item.paragraph}</div>
                  )}
                </div>
              </SwiperSlide>
            ))
          : datas.map((item, idx) => (
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
                  {item.caption !== "" ? (
                    <div className={styles.caption}>{item.caption}</div>
                  ) : null}
                  {item.readbtn !== "" ? (
                    <button className={styles.readbtn}>{item.readbtn}</button>
                  ) : null}
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
