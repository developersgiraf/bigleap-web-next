import Image from "next/image";
import dynamic from "next/dynamic";
// import styles from "./page.module.css";
import styles from "./index.module.scss";
import CTAButton from "./components/ctaButton/ctabtn.jsx";
import GradientLights from "./components/gradient-lights/gradient";
import YouTubeLazyEmbed from "./components/youtube-lazy/youtube-lazy.jsx";
import CriticalResourcePreloader from "./components/critical-preloader/critical-preloader.jsx";
import { FALSE } from "sass";

// Dynamic imports for better code splitting
const Slider = dynamic(() => import("./components/slider/slider.jsx"), {
  loading: () => <div>Loading...</div>,
});
const BusinessItems = dynamic(() => import("./components/business/business-items"), {
  loading: () => <div>Loading...</div>,
});
const Difference = dynamic(() => import("./components/differences/different"), {
  loading: () => <div>Loading...</div>,
});
const FAQSection = dynamic(() => import("./components/faq/faq.jsx"), {
  loading: () => <div>Loading...</div>,
});
const BlogSection = dynamic(() => import("./components/blogs/blog.jsx"), {
  loading: () => <div>Loading...</div>,
});
const EnquirySect = dynamic(() => import("./components/enquiry/enquiry.jsx"), {
  loading: () => <div>Loading...</div>,
});
const ClientsArea = dynamic(() => import("./components/clients-area/clients.jsx"), {
  loading: () => <div>Loading...</div>,
});
const Testimonials = dynamic(() => import("./components/team-slider/testimonials"), {
  loading: () => <div>Loading...</div>,
});
const InstaFeeds = dynamic(() => import("./components/insta-feeds/feeds"), {
  loading: () => <div>Loading...</div>,
});
const CounterSect = dynamic(() => import("./components/counter/counter.jsx"), {
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  return (
    <>
      <CriticalResourcePreloader />
      
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
          />
          {/* <img id="img360" src="360.png" alt="360image" /> */}
          <Image
            id="character-img"
            src="/character.png"
            alt="Character Image"
            width={1200}
            height={1666}
            className={styles.characterimage}
          />
        </div>
      </section>
      {/* HERO SECTION END */}

      <section className={styles["about-area"]}>
        <div className="container">
          <div className={`row align-items-center ${styles["about-row"]}`}>
            <div className="col-xl-5 col-lg-4 col-md-3 col-12">
              <div className={styles["about-first-box"]}>
                <Image 
                  src="/Scate.png" 
                  alt="Skate illustration" 
                  width={500}
                  height={400}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            <div className="col-xl-7 col-lg-8 col-md-9 col-12">
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
              autoplay={true}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 120 },
                1366: { slidesPerView: 4, spaceBetween: 20 },
              }}
            />

            <CTAButton title="VIEW ALL" link="#" />
          </div>
        </div>
      </section>

      {/* WATCH VIDEO AREA */}
      <section
        className={styles["watch-area"]}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Image
            src="/video-bg.png"
            alt="Background"
            fill
            priority
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              boxShadow: "0 0 80px 40px rgba(15,18,24,0.7)",
            }}
          />
          {/* Removed overlay for originality effect */}
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className={styles.watch}>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <div className={styles["first-video"]}>
                  <div className={styles.video1}>
                    <YouTubeLazyEmbed 
                      videoId="xiW4HMDR1eo" 
                      title="Bigleap Portfolio Video 1"
                    />
                  </div>
                  <div className={styles.video2}>
                    <YouTubeLazyEmbed 
                      videoId="xiW4HMDR1eo" 
                      title="Bigleap Portfolio Video 2"
                    />
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
                    <YouTubeLazyEmbed 
                      videoId="xiW4HMDR1eo" 
                      title="Bigleap Portfolio Video 3"
                    />
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
                    "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
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
              autoplay={true}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 120 },
                1366: { slidesPerView: 4, spaceBetween: 20 },
              }}
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
          <div className={styles.specialslide}>
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
              navPos={90}
              autoplay={true}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 120 },
                1366: { slidesPerView: 3, spaceBetween: 50 },
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
      <GradientLights />
    </>
  );
}
