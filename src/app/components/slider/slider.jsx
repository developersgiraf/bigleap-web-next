"use client";

import React from "react";
import VideoSlider from "./VideoSlider";
import ImageSlider from "./ImageSlider";

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
    // 1024: { slidesPerView: 3, spaceBetween: 120 },
    // 1366: { slidesPerView: 4, spaceBetween: 20 },
  },
  autoplay = { delay: 2500, disableOnInteraction: true },
  navButtons = true,
  imageSize = 100,
  navPos = 0,
  videoAspect = '16/9',
  videoWidth = "100%",
}) {
  const isVideoSlides = datas.length > 0 && datas[0].iframe;

  if (isVideoSlides) {
    return (
      <VideoSlider
        videos={datas}
        spaceBetween={spaceBetween}
        loop={loop}
        autoplay={autoplay}
        navButtons={navButtons}
        navPos={navPos}
        videoAspect={videoAspect}
        videoWidth={videoWidth}
      />
    );
  }

  return (
    <ImageSlider
      images={datas}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      loop={loop}
      breakpoints={breakpoints}
      autoplay={autoplay}
      navButtons={navButtons}
      imageSize={imageSize}
      navPos={navPos}
    />
  );
}
