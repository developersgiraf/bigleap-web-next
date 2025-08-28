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
            <Image src="/feeds/camera.png" alt="Sticky Image" width={512} height={512} className={styles.stikyimg} />
        </div>
      {/* <div className="container"> */}
        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={3}
            navigation={false}
            // pagination={{ clickable: false }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1024: {
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
