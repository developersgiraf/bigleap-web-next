"use client";

import { useState, useEffect } from "react";
import SwiperSlider from "@/app/components/swiper-slider/SwiperSlider";
import CTAButton from "@/app/components/ctaButton/ctabtn";
import ButtonCTA from "@/app/components/ctaButton/buttoncta";
import styles from "./portfolioSwiper.module.css";
import { portfoliosClient } from "../../../../lib/portfolios-client";

export default function PortfolioSwiper() {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPortfolios = async () => {
            try {
                setLoading(true);
                const data = await portfoliosClient.getPortfolios();
                
                // Transform the data to match the swiper slide structure
                const transformedData = data.map((portfolio, index) => ({
                    id: index + 1,
                    src: portfolio.cardData.image,
                    alt: `${portfolio.cardData.title} Portfolio`,
                    title: portfolio.cardData.title,
                    description: portfolio.cardData.description,
                    background: portfolio.cardData.background,
                    ctaButton: {
                        title: portfolio.cardData.readbtn,
                        link: portfolio.cardData.link
                    }
                }));

                setPortfolios(transformedData);
                setError(null);
            } catch (err) {
                console.error('Error loading portfolios:', err);
                setError('Failed to load portfolios');
            } finally {
                setLoading(false);
            }
        };

        loadPortfolios();
    }, []);

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

    // Custom render function to use CTAButton component
    const renderSlide = (slide, index) => {
        return (
            <div className={styles.portfolioSlideWrapper}>
                <div className={`${styles.portfolioSlide} portfolioSlide imageSlide`}>
                    <img
                        src={slide.src}
                        alt={slide.alt || slide.title || `Slide ${index + 1}`}
                        className={`slideImage ${styles.slideImage}`}
                        
                    />
                    <div className={styles.portfolioContent}>
                        {slide.title && (
                            <h3 className={styles.portfolioTitle}>{slide.title}</h3>
                        )}
                        {slide.description && (
                            <p className={styles.portfolioDescription}>{slide.description}</p>
                        )}
                        {slide.background && false && (
                            <div 
                                className={styles.portfolioBackground} 
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

    if (loading) {
        return (
            <div className={styles.portfolioSwiperContainer}>
                <div className="container">
                    <div className={styles.loading}>Loading portfolios...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.portfolioSwiperContainer}>
                <div className="container">
                    <div className={styles.error}>Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.portfolioSwiperContainer}>
            <div className="container">
                {/*<div className={styles.swiperHeader}>
                    <h2 className={styles.swiperTitle}>Our Portfolio</h2>
                    <p className={styles.swiperSubtitle}>
                        Explore our diverse range of creative projects and successful campaigns
                    </p>
                </div>*/}

                <div className={styles.swiperWrapper}>
                    {false && <div className={styles.portfolioNavigation}>
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
                    </div>}

                    <SwiperSlider
                        slides={portfolios}
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