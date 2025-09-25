"use client";

import SwiperSlider from "@/app/components/swiper-slider/SwiperSlider";
import CTAButton from "@/app/components/ctaButton/ctabtn";
import ButtonCTA from "@/app/components/ctaButton/buttoncta";
import styles from "./portfolioSwiper.module.scss";

const portfolioSlides = [
    {
        id: 1,
        src: "/portfolio/portfolio1.png",
        alt: "Animation Portfolio",
        title: "Animation",
        description: "Creative animations that bring stories to life with stunning visual effects and motion graphics.",
        background: "linear-gradient(to bottom, #28002A, #000000)",
        ctaButton: {
            title: "Explore More",
            link: "/portfolio/animation"
        }
    },
    {
        id: 2,
        src: "/portfolio/blue.png",
        alt: "Web & App Portfolio",
        title: "Web & App",
        description: "Modern web applications and mobile apps designed with cutting-edge technology and user experience.",
        background: "linear-gradient(to bottom, #00062A, #000000)",
        ctaButton: {
            title: "Explore More",
            link: "/portfolio/web-app"
        }
    },
    {
        id: 3,
        src: "/portfolio/black.png",
        alt: "Graphic Design Portfolio",
        title: "Graphic Design",
        description: "Bold and creative graphic designs that communicate your brand's message effectively.",
        background: "linear-gradient(to bottom, #102A00, #000000)",
        ctaButton: {
            title: "Explore More",
            link: "/portfolio/graphic-design"
        }
    },
    {
        id: 4,
        src: "/portfolio/last.png",
        alt: "SEO/SEM Portfolio",
        title: "SEO/SEM",
        description: "Strategic digital marketing campaigns that drive traffic and boost your online presence.",        
        background: "linear-gradient(to bottom, #2A2500, #000000)",
        ctaButton: {
            title: "Explore More",
            link: "/portfolio/seo-sem"
        }
    }
];

export default function PortfolioSwiper() {
    const swiperConfig = {
        spaceBetween: 20,
        slidesPerView: 1,
        loop: true,
        speed: 800,
        showCounter: false,
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
        prevEl: ".portfolio-nav-prev",
        nextEl: ".portfolio-nav-next",
    };

    const paginationConfig = {
        enabled: false,
        clickable: true,
        dynamicBullets: true,
    };

    const autoplayConfig = {
        enabled: false,
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

    // Custom render function to use CTAButton component
    const renderSlide = (slide, index) => {
        return (
            <div className={styles.portfolioSlideWrapper}>
                <div className={`${styles.portfolioSlide} imageSlide`} style={{ height: "400px" }}>
                    <img
                        src={slide.src}
                        alt={slide.alt || slide.title || `Slide ${index + 1}`}
                        className="slideImage"
                        style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover",
                            borderRadius: "12px" 
                        }}
                    />
                    <div className="slideContent">
                        {slide.title && (
                            <h3 className="slideTitle">{slide.title}</h3>
                        )}
                        {slide.description && (
                            <p className="slideDescription">{slide.description}</p>
                        )}
                        {slide.background && (
                            <div 
                                className="slideBackground" 
                                style={{ background: slide.background }}
                            />
                        )}
                        {slide.ctaButton && (
                            <CTAButton 
                                title={slide.ctaButton.title}
                                link={slide.ctaButton.link}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.portfolioSwiperContainer}>
            <div className="container">
                {/*<div className={styles.swiperHeader}>
                    <h2 className={styles.swiperTitle}>Our Portfolio</h2>
                    <p className={styles.swiperSubtitle}>
                        Explore our diverse range of creative projects and successful campaigns
                    </p>
                </div>*/}

                <div style={{ position: 'relative' }}>
                    <div className={styles.portfolioNavigation}>
                        <div className="portfolio-nav-prev">
                            <ButtonCTA  
                                title="‹"
                                type="button"
                            />
                        </div>
                        <div className="portfolio-nav-next">
                            <ButtonCTA 
                                title="›"
                                type="button"
                            />
                        </div>
                    </div>

                    <SwiperSlider
                        slides={portfolioSlides}
                        swiperConfig={swiperConfig}
                        navigationConfig={navigationConfig}
                        paginationConfig={paginationConfig}
                        autoplayConfig={autoplayConfig}
                        imageConfig={imageConfig}
                        renderSlide={renderSlide}
                        className={styles.portfolioSwiper}
                        height="400px"
                    />
                </div>
            </div>
        </div>
    );
}