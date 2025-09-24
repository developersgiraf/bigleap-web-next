"use client";
import Image from "next/image";
import { motion } from "framer-motion";
// import styles from "./page.module.css";
import styles from "./index.module.scss";
import pageStyles from "./page.module.css";
import Slider from "./components/slider/slider.jsx";
import BusinessItems from "./components/business/business-items";
import Difference from "./components/differences/different";
import CTAButton from "./components/ctaButton/ctabtn.jsx";
import FAQSection from "./components/faq/faq.jsx";
import BlogSection from "./components/blogs/blog.jsx";
import EnquirySect from "./components/enquiry/enquiry.jsx";
import ClientsArea from "./components/clients-area/clients.jsx";
import Testimonials from "./components/team-slider/testimonials";
import GradientLights from "./components/gradient-lights/gradient";
import { GRADIENT_PRESETS } from "./components/gradient-lights/gradientConfig.js";
import InstaFeeds from "./components/insta-feeds/feeds";
import CounterSect from "./components/counter/counter.jsx";
import SocialMediaIcon from "./components/socialMedia-icon/socialMedia-icon";
import { FALSE } from "sass";

export default function Home() {
  return (
    <>
      {/* HERO SECTION START */}

      <section className={styles.hero}>
        <div className={styles.hanging}>
          <Image
            id="yeeha-img"
            src="/Yeeha.png"
            alt="yeeha"
            width={1711}
            height={655}
            className={styles.yeehaimage}
            priority
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 90vw, 100vw"
          />

          {/* <img id="img360" src="360.png" alt="360image" /> */}
          <motion.div
            id="character-img"
            className={styles.characterimage}
            style={{ 
              transformOrigin: "center center",
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto"
            }}
            initial={{ rotateZ: 0 }}
            whileHover={{ 
              rotateZ: 45,
              transition: {
                type: "spring",
                stiffness: 30,  // Faster animation
                damping: 2,     // Less bouncy
              }
            }}
            animate={{ rotateZ: 0 }}
            transition={{
              type: "spring",
              stiffness: 30,
              damping: 2,
            }}
          >
            <Image
              src="/character.png"
              alt="Character Image"
              width={1200}
              height={1666}
              style={{ 
                display: "block",
                width: "100%",
                height: "auto"
              }}
              sizes="(max-width: 360px) 50vw, (max-width: 480px) 60vw, (max-width: 768px) 70vw, (max-width: 1024px) 80vw, 1200px"
            />
          </motion.div>
        </div>
      </section>
      {/* HERO SECTION END */}

      <SocialMediaIcon />

      <section className={styles["about-area"]}>
        <div className="container">
          <div className={`row align-items-center ${styles["about-row"]}`}>
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-12">
              <div className={styles["about-first-box"]}>
                <img src="Scate.png" alt="" />
              </div>
            </div>

            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-12">
              <div className={styles["about-secont-box"]}>
                <h4>
                  {" "}
                  Bigleap is a digital product design agency thatturns complex
                  technology into intuitive, usable interfaces. We work with
                  forward-thinking teams to create market-ready digital products
                  that areeasy to use and hard to ignore.
                </h4>

                <CTAButton title="ABOUT US" link="/about" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSPECIALIZED AREA START */}

      <section className={styles["slide-head"]}>
        <div className="container">
          <div className={styles["special-head"]}>
            <h2>We are Specialized</h2>

            <p>
              We are a highly dynamic creative bunch who specializes in
              delivering 360 production services. Specialized company in
              photography, videography and film production in UAE
            </p>
          </div>
          <div className={styles.specialslide}>
            <Slider
              datas={[
                {
                  img: "/img2.jpg",
                  caption: "2D motion graphics",
                  readbtn: "Learn more...",
                  idname: "folio1",
                },
                {
                  img: "/img3.jpg",
                  caption: "Whiteboard Animations",
                  readbtn: "Learn more...",
                  idname: "folio",
                },
                {
                  img: "/img4.jpg",
                  caption: "Storytelling scripted animations",
                  readbtn: "Learn more...",
                  idname: "folio",
                },
                {
                  img: "/img1.jpg",
                  caption: "3D product animation",
                  readbtn: "Learn more...",
                  idname: "folio",
                },
                {
                  img: "/img2.jpg",
                  caption: "2D motion graphics",
                  readbtn: "Learn more...",
                  idname: "folio",
                },
                {
                  img: "/img1.jpg",
                  caption: "2D motion graphics",
                  readbtn: "Learn more...",
                  idname: "folio",
                },
              ]}
              spaceBetween={-60}
              slidesPerView={4}
              loop={true}
              imageSize={160}
              navPos={180}
              autoplay={false}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 3, spaceBetween: 80 },
                1024: { slidesPerView: 3, spaceBetween: 100 },
                1366: { slidesPerView: 4, spaceBetween: 10 },
              }}
            />

            <CTAButton title="VIEW ALL" link="/servicess" />
          </div>
        </div>
      </section>

      {/* WATCH VIDEO AREA */}
      <section
        className={`${styles["watch-area"]} ${pageStyles.watchAreaContainer}`}
      >
        <div className={pageStyles.backgroundWrapper}>
          <Image
            src="/video-bg.png"
            alt="Background"
            fill
            priority
            className={pageStyles.backgroundImage}
          />
          {/* Removed overlay for originality effect */}
        </div>
        <div className={`container ${pageStyles.contentWrapper}`}>
          <div className={styles.watch}>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <div className={styles["first-video"]}>
                  <div className={styles.video1}>
                    <iframe
                      src="https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className={styles.video2}>
                    <iframe
                      src="https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12 odr">
                <div className={styles["second-video"]}>
                  <div className={styles.content}>
                    <p> Our Portfolio</p>
                    <h2>Lorem ipsum </h2>
                    <CTAButton title="WATCH MORE" link="#" />
                  </div>

                  <div className={styles.video3}>
                    <iframe
                      src="https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CounterSect />
      {/* <CounterHead /> */}

      {/* VIDEO SLIDER AREA START */}

      <section className={styles["video-slider"]}>
        <div className="container">
          <div className="vdo">
            <Slider
              datas={[
                {
                  sub: "key projects",
                  caption: "Lorem ipsum dolor sit amet.",
                  paragraph:
                    "Take a deep dive into some of our favorite projects. From established corporations to startups gearing to launch, we’ve seen a lot of our partners win – and we're excited to see you thrive too.",
                  iframe:
                    "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
                  idname: "VDOSlider",
                },
                {
                  sub: "key projects",
                  caption: "Lorem ipsum dolor sit amet.",
                  paragraph:
                    "Take a deep dive into some of our favorite projects. From established corporations to startups gearing to launch, we’ve seen a lot of our partners win – and we're excited to see you thrive too.",
                  iframe:
                    "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&loop=1&playlist=xiW4HMDR1eo",
                  idname: "VDOSlider",
                },
                {
                  sub: "key projects",
                  caption: "Lorem ipsum dolor sit amet.",
                  paragraph:
                    "Take a deep dive into some of our favorite projects. From established corporations to startups gearing to launch, we’ve seen a lot of our partners win – and we're excited to see you thrive too.",
                  iframe:
                    "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
                  idname: "VDOSlider",
                },
              ]}
              spaceBetween={0}
              slidesPerView={1}
              imageSize={100}
              loop={true}
              navPos={-20}
              autoplay={false}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 1, spaceBetween: 15 },
                1024: { slidesPerView: 1, spaceBetween: 120 },
                1366: { slidesPerView: 1, spaceBetween: 20 },
              }}
              aspectRatio={"16/9"}
              videoWidth={"80%"}
            />
          </div>
        </div>
      </section>

      {/* MOTION GRAPHICS AREA START */}

      <section className={styles["motion-graphics"]}>
        <div className="container">
          <div className={styles["motion-graphics-content"]}>
            <h6>Motion Graphics</h6>
            <h2>Living. Breathing. Digital Experiences</h2>
          </div>
          <div className={styles.specialslides}>
            <Slider
              datas={[
                {
                  img: "/gr-1.gif",
                  client: "client",
                  date: "01-02-2025",
                  caption: "2D motion graphics",
                  idname: "MoGraph",
                },
                {
                  img: "/gr-2.gif",
                  client: "client",
                  date: "01-02-2025",
                  caption: "Whiteboard Animations",
                  idname: "MoGraph",
                },
                {
                  img: "/gr-3.gif",
                  client: "client",
                  date: "01-02-2025",
                  caption: "Storytelling scripted ",
                  idname: "MoGraph",
                },
                {
                  img: "/gr-1.gif",
                  client: "client",
                  date: "01-02-2025",
                  caption: "3D product animation",
                  idname: "MoGraph",
                },
              ]}
              spaceBetween={50}
              slidesPerView={3}
              navPos={20}
              autoplay={false}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 1, spaceBetween: 50 },
                992: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 2, spaceBetween: 100 },
                1366: { slidesPerView: 3, spaceBetween: 10 },
              }}
              imageSize={400}
            />
          </div>
        </div>
      </section>

      <BusinessItems />

      <Testimonials />

      {/* client area */}
      <ClientsArea />
      {/* DIFFERENCE AREA START */}
      <Difference />

      <FAQSection />

      <BlogSection />

      <EnquirySect />
      <InstaFeeds />
      <GradientLights customCounts={{
        xl: 13,  // Rich visual experience for extra large screens
        lg: 13,  // Substantial gradients for large screens
        md: 13,  // Balanced for medium screens
        sm: 11,  // Moderate for tablets
        xs: 12   // Minimal but visible on mobile
      }} />
    </>
  );
}