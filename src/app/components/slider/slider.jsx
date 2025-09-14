"use client";

import React, { useRef, useState, useCallback, useMemo } from "react";
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
}) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Memoize computed values to prevent unnecessary recalculations
  const isVideoSlides = useMemo(() => datas.length > 0 && datas[0].iframe, [datas]);
  
  // Memoize breakpoints for video slides
  const videoBreakpoints = useMemo(() => ({
    320: { slidesPerView: 1 },
    640: { slidesPerView: 1 },
    1024: { slidesPerView: 1 },
    1366: { slidesPerView: 1 },
  }), []);

  // Use useCallback to prevent function recreation on each render
  const handleSlideChange = useCallback((swiper) => {
    // Use requestAnimationFrame to batch state updates
    requestAnimationFrame(() => {
      setActiveIndex(swiper.realIndex);
    });
  }, []);

  const handleSwiperInit = useCallback((swiper) => {
    swiperRef.current = swiper;
  }, []);

  // Memoize slide style objects to prevent recreation
  const containerStyle = useMemo(() => ({
    position: "relative",
  }), []);

  const swiperStyle = useMemo(() => 
    isVideoSlides 
      ? { padding: "10px 0px" } 
      : { padding: "30px 0px" }
  , [isVideoSlides]);

  const imageStyle = useMemo(() => ({
    maxWidth: `${imageSize}px`,
    maxHeight: `${imageSize}px`,
    height: "auto",
    objectFit: "contain",
  }), [imageSize]);

  return (
    <div style={containerStyle}>
      <Swiper
        onSwiper={handleSwiperInit}
        onSlideChange={handleSlideChange}
        style={swiperStyle}
        autoplay={autoplay}
        grabCursor={true}
        spaceBetween={spaceBetween}
        centeredSlides={false}
        slidesPerView={isVideoSlides ? 1 : slidesPerView}
        loop={loop}
        allowSlidePrev={true}
        allowSlideNext={true}
        breakpoints={isVideoSlides ? videoBreakpoints : breakpoints}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
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
                <div className={styles.videoSlideContainer}>
                  <iframe
                    src={item.iframe}
                    title={item.caption || `Video Slide ${idx + 1}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={styles.videoFrame}
                    loading="lazy"
                  />

                  {item.sub && (
                    <div className={styles.sub}>
                      {item.sub}
                    </div>
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
                <div className={styles.slideContainer}>
                  <div className={styles.imageContainer}>
                    <Image
                      className={styles.slideImage}
                      src={item.img}
                      alt={item.caption || "img"}
                      style={imageStyle}
                      width={imageSize}
                      height={imageSize}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.clientDate}>
                    {item.client && (
                      <div
                        style={{
                          marginTop: "8px",
                          color: "#fdfdfd",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "93%",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        {item.client}
                      </div>
                    )}

                    {item.date && (
                      <div
                        style={{
                          fontFamily:"Roboto, sans-serif",
                          marginTop: "8px",
                          color: "#fdfdfd",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "125%",
                        }}
                      >
                        {item.date}
                      </div>
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
