"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNavigation from "./SwiperNavigation";
import styles from "./VideoSlider.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function VideoSlider({
  videos = [],
  spaceBetween = 20,
  loop = true,
  autoplay = { delay: 2500, disableOnInteraction: true },
  navButtons = true,
  navPos = 0,
  videoAspect = '16/9',
  videoWidth = "100%",
  customSelector= "cstm"
}) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const videoBreakpoints = {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 1 },
    1024: { slidesPerView: 1 },
    1366: { slidesPerView: 1 },
  };

  return (
    <div className={`${styles.sliderWrapper} ${customSelector}`}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={autoplay}
        grabCursor={true}
        spaceBetween={spaceBetween}
        centeredSlides={false}
        slidesPerView={1}
        loop={loop}
        allowSlidePrev={true}
        allowSlideNext={true}
        breakpoints={videoBreakpoints}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mySwiper}
        
      >
        {videos.map((item, idx) => (
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
              <div className={styles.contentWrapper}>
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