import styles from "./videoSwiper.module.scss";
import SwiperSlider from "../../../components/swiper-slider/SwiperSlider";
export default function VideoSwiper() {
  const videoSlides = [
    {
      id: 1,
      type: "video",
      iframe:
        "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
      overlay: {
        // title: "Amazing Video Content",
        // description: "Watch our latest video showcase",
      },
    },
    {
      id: 2,
      type: "video",
      iframe:
        "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
      controls: false,
    },
    {
      id: 3,
      type: "video",
      iframe:
        "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
      controls: false,
    },
    {
      id: 4,
      type: "video",
      iframe:
        "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
      controls: false,
      overlay: {},
    },
    {
      id: 5,
      type: "video",
      iframe:
        "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
      controls: false,
      overlay: {},
    },
  ];

  return (
    <>
      <section className={styles.swipe}>
        <div className="container">
          <div className={styles.stikyText}>
            <h2>Video Showcase</h2>
            <p>Watch our latest video content</p>
          </div>

          <SwiperSlider
            slides={videoSlides}
            swiperConfig={{
              slidesPerView: 1,
              spaceBetween: 0,
              loop: true,
            }}
            navigationConfig={{ enabled: true }}
            paginationConfig={{ enabled: true }}
            // autoplayConfig={{ enabled: false }}
            height="500px"
          />
        </div>
      </section>
    </>
  );
}
