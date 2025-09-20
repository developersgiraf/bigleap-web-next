
"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import styles from "./timeLineSlider.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

// import required modules
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";

export default function TimelineSlider() {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Timeline data matching the style from the image
    const timelineData = [
        {
            year: "2021",
            title: "Inauguration",
            img: "/about/3danim.jpg"
        },
        {
            year: "2022",
            title: "Global presence",
            img: "/about/event.jpg"
        },
        {
            year: "2023",
            title: "Dubai is just amazing",
            img: "/about/global.jpg"
        },
        {
            year: "2024",
            title: "3D product animation",
            img: "/about/meeting.jpg"
        },
        {
            year: "2025",
            title: "Global notability",
            img: "/about/office.jpg"
        },
    ];

    return (
        <div className={styles.timelineSlider}>
            <div className={styles.timelineWrapper}>
                <div className={styles.timelineLine}></div>
                
                <Swiper
                    ref={swiperRef}
                    spaceBetween={0}
                    slidesPerView={2}
                    centeredSlides={false}
                    loop={false}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    navigation={false}
                    modules={[Autoplay, Navigation]}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                        1400: {
                            slidesPerView: 4,
                            spaceBetween: 60,
                        },
                    }}
                >
                    {timelineData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIconContainer}>
                                    <div className={styles.timelineIcon}>
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            width={120}
                                            height={120}
                                        />
                                    </div>
                                </div>
                                <h3 className={styles.timelineTitle}>{item.title}</h3>
                                <div className={styles.timelineYear}>{item.year}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}