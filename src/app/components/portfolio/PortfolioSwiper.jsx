"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./PortfolioSwiper.css";

const slides = [
  {
    image: "/portfolio/portfolio1.png",
    title: "Project 1",
    description: "Description for project 1.",
  },
  {
    image: "/portfolio/portfolio1.png",
    title: "Project 2",
    description: "Description for project 2.",
  },
  {
    image: "/portfolio/portfolio1.png",
    title: "Project 3",
    description: "Description for project 3.",
  },
];

export default function PortfolioSwiper() {
  return (
    <div className="portfolio-swiper">
      <Swiper spaceBetween={30} slidesPerView={1} loop={true}>
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="portfolio-slide">
              <img
                src={slide.image}
                alt={slide.title}
                className="portfolio-image"
              />
              <h3 className="portfolio-title">{slide.title}</h3>
              <p className="portfolio-description">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
