"use client";

import styles from "./feeds.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function InstaFeeds() {
  const feeds = [
    {
      image: "/feeds/feed1.jpg",
      alt: "Feed 1",
    },
    {
      image: "/feeds/feed2.jpg",
      alt: "Feed 2",
    },
    {
      image: "/feeds/feed3.jpg",
      alt: "Feed 3",
    },
    {
      image: "/feeds/feed4.jpg",
      alt: "Feed 4",
    },
    {
      image: "/feeds/feed5.jpg",
      alt: "Feed 5",
    },
    {
      image: "/feeds/feed6.jpg",
      alt: "Feed 6",
    },
    {
      image: "/feeds/feed4.jpg",
      alt: "Feed 4",
    }
  ];

  return (
    <section className={styles.instaFeeds}>
        <div className={styles.stikyImage}>
            <Image src="/feeds/backgd.png" alt="Sticky Image" width={114} height={115} className={styles.stikyimg} />
        </div>
      {/* <div className="container"> */}
        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={3}
            navigation={false}
            pagination={{ clickable: false }}
            autoplay={false}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 0,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 0,
              },
            }}
            className={styles.feedSwiper}
          >
            {feeds.map((feed, index) => (
              <SwiperSlide key={index} className={styles.feedSlide}>
                <div className={styles.feedItem}>
                  <Image
                    src={feed.image}
                    alt={feed.alt}
                    width={500}
                    height={500}
                    className={styles.feedImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      {/* </div> */}
    </section>
  );
}
