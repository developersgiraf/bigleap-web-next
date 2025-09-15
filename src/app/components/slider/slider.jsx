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
  autoplay = { delay: 2500, disableOnInteraction: false },
  navButtons = true,
  imageSize = 100,
  navPos = 0,
}) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isVideoSlides = datas.length > 0 && datas[0].iframe;

  return (
    <div style={{ position: "relative" }}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={
          isVideoSlides ? { padding: "10px 0px" } : { padding: "30px 0px" }
        }
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
                <div
                  className={styles.video}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={item.iframe}
                    title={item.caption || `Video Slide ${idx + 1}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{
                      width: "60%",
                      height: "100vh",
                      paddingLeft: "80px",
                    }}
                  />

                  {item.sub && (
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        color: "#fff",
                        fontSize: "16px",
                        padding: "20px 24px",
                        zIndex: 1000,
                        lineHeight: "93%",
                        fontWeight: 400,
                        fontStyle: "regular",
                        fontFamily: "Montserrat, sans-serif !important",
                        borderRadius: 0,
                        maxWidth: "60%",
                        textAlign: "left",
                        background: "none",
                        boxShadow: "none",
                      }}
                    >
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
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                >
                  <div
                    className={styles.imageContainer}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      className={styles.slideImage}
                      src={item.img}
                      alt={item.caption || "img"}
                      style={{
                        maxWidth: `${imageSize}px`,
                        maxHeight: `${imageSize}px`,
                        height: "auto",
                        objectFit: "contain",
                      }}
                      width={imageSize}
                      height={imageSize}
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
                          fontFamily: "Montserrat, sans-serif !important",
                        }}
                      >
                        {item.client}
                      </div>
                    )}

                    {item.date && (
                      <div
                        style={{
                          fontFamily:"Roboto, sans-serif !important",
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
