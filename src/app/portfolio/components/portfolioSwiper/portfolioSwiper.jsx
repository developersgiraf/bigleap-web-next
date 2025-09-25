"use client";

import SwiperSlider from "@/app/components/swiper-slider/SwiperSlider";
import styles from "./portfolioSwiper.module.scss";

const portfolioSlides = [
    {
        id: 1,
        src: "/portfolio/portfolio1.png",
        alt: "Animation Portfolio",
        title: "Animation",
        description: "Creative animations that bring stories to life with stunning visual effects and motion graphics.",
        button: {
            text: "View Project",
            onClick: () => window.open("/portfolio/portfolio1", "_self")
        }
    },
    {
        id: 2,
        src: "/portfolio/blue.png",
        alt: "Web & App Portfolio",
        title: "Web & App",
        description: "Modern web applications and mobile apps designed with cutting-edge technology and user experience.",
        button: {
            text: "View Project",
            onClick: () => window.open("/portfolio/portfolio2", "_self")
        }
    },
    {
        id: 3,
        src: "/portfolio/black.png",
        alt: "Graphic Design Portfolio",
        title: "Graphic Design",
        description: "Bold and creative graphic designs that communicate your brand's message effectively.",
        button: {
            text: "View Project",
            onClick: () => window.open("/portfolio/portfolio3", "_self")
        }
    },
    {
        id: 4,
        src: "/portfolio/last.png",
        alt: "SEO/SEM Portfolio",
        title: "SEO/SEM",
        description: "Strategic digital marketing campaigns that drive traffic and boost your online presence.",
        button: {
            text: "View Project",
            onClick: () => window.open("/portfolio/portfolio4", "_self")
        }
    }
];

export default function PortfolioSwiper() {
    const swiperConfig = {
        spaceBetween: 20,
        slidesPerView: 1,
        loop: true,
        speed: 800,
        showCounter: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 25,
            }
        },
    };

    const navigationConfig = {
        enabled: true,
    };

    const paginationConfig = {
        enabled: true,
        clickable: true,
        dynamicBullets: true,
    };

    const autoplayConfig = {
        enabled: true,
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    };

    const imageConfig = {
        width: 400,
        height: 300,
        objectFit: "cover",
        priority: true,
    };

    return (
        <div className={styles.portfolioSwiperContainer}>
            <div className="container">
                <div className={styles.swiperHeader}>
                    <h2 className={styles.swiperTitle}>Our Portfolio</h2>
                    <p className={styles.swiperSubtitle}>
                        Explore our diverse range of creative projects and successful campaigns
                    </p>
                </div>
                
                <SwiperSlider
                    slides={portfolioSlides}
                    swiperConfig={swiperConfig}
                    navigationConfig={navigationConfig}
                    paginationConfig={paginationConfig}
                    autoplayConfig={autoplayConfig}
                    imageConfig={imageConfig}
                    className={styles.portfolioSwiper}
                    height="400px"
                />
            </div>
        </div>
    );
}