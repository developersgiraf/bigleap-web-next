"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CTAButton from "../../../components/ctaButton/ctabtn";
import styles from "./PortfolioSwiper.module.css";

const slides = [
  {
    image: "/portfolio/portfolio1.png",
    title: "Animation",
    description:
      "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "EXPLORE",
    link: "/services/animation",
  },
  {
    image: "/portfolio/portfolio1.png",
    title: "3D Design",
    description:
      "Creating stunning three-dimensional visuals that bring concepts to life with depth and realism. Our expert team crafts immersive experiences.",
    buttonText: "EXPLORE",
    link: "/services/3d-design",
  },
  {
    image: "/portfolio/portfolio1.png",
    title: "Character Design",
    description:
      "Developing unique and memorable characters that tell stories and connect with audiences through creative design and personality.",
    buttonText: "EXPLORE",
    link: "/services/character-design",
  },
];

export default function PortfolioSwiper() {
  return (
    <div className={styles.portfolioContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        className={styles.portfolioSwiper}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles.slideContent}>
              <div className={styles.textContent}>
                <h2 className={styles.slideTitle}>{slide.title}</h2>
                <p className={styles.slideDescription}>{slide.description}</p>
                <div className={styles.buttonWrapper}>
                  <CTAButton title={slide.buttonText} link={slide.link} />
                </div>
              </div>
              <div className={styles.imageContent}>
                <Image
                  width={600}
                  height={500}
                  src={slide.image}
                  alt={slide.title}
                  className={styles.slideImage}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
