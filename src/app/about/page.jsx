import styles from "./about.module.scss";
import Image from "next/image";
import CreativeTeam from "../components/creative-team/creative";
import FAQSection from "../components/faq/faq";
import Difference from "../components/differences/different";
import ClientsArea from "../components/clients-area/clients.jsx";
import TitleBanner from "../components/title-banner/titleBannerr";
import Testimonials from "../components/team-slider/testimonials.jsx";
import GradientLights from "../components/gradient-lights/gradient.jsx";
import { GRADIENT_PRESETS } from "../components/gradient-lights/gradientConfig.js";
import Timeline from "./components/timeline/timelineSlider.jsx";
export default function AboutPage() {
  return (
    <>
      {/* TITLE BANNER AREA */}

      <TitleBanner title="Our creativity begins where reality ends" sub=""/>

      {/* ABOUT CONTENT AREA */}

      <section className={styles["about-main-section"]}>
        <div className="container">
          <div className={styles["about-sect"]}>
            <div className="row">
              <div className="col-xl-5 col-lg-6 col-md-12 col-12">
                <div className={styles["abt-img"]}>
                  <Image
                    src="/comic.png"
                    alt="comic"
                    width={574}
                    height={885}
                    className={styles.comic}
                  />
                </div>
              </div>
              <div className="col-xl-7 col-lg-6 col-md-12 col-12">
                <div className={styles["abt-cnt"]}>
                  <h4>
                    A creative studio specializing in the production of
                    captivating animation videos that bring ideas to life.
                  </h4>
                  <div className={styles["aboutContent"]}>
                    <p>
                      Ready to expand your brand beyond limits? At Big Leap, we don’t just create animated videos, we create narratives that reflect your vision. Where creativity meets purpose, our dynamic team is by your side, at each step, to build your brand identity brick by brick. We evolve along with the changing trends, adapting to innovations and expanding our expertise in animated video production. 
                      
                    </p>
                    <p>When we say 360 degree animation, yes, we got you covered from start to finish. The spectrum of animation services include:</p>
                    <ul className={styles["aboutList"]}>
                      <li>2D&3D Animation</li>
                      <li>white board animation</li>
                      <li>motion graphics</li>
                      <li>VFX and post production</li>
                      <li>product animation</li>
                      <li>character designing</li>
                      <li>Storyboarding</li>
                      <li>video editing</li>
                    </ul>
                    <p>
                    Whether it's a product explanatory video or a full service animation, we aim to produce engaging, quality video content that will help your brand to connect with your target audience, converting viewers into loyal customers.
                    </p>
                    <p>Our services are tailored to boost your online presence and maximize ROI, all at a competitive price. </p>
                    <p>Your success is our win, because we are here to help you take that Big Leap!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORY AREA START */}

      <section className={styles["history-area"]}>
        {/* <div className="container"> */}
          <div className={styles["history-head"]}>
            <h2>History</h2>
            <p>
              We are a highly dynamic creative bunch who specializes in delivering 360 production services. Specialized company in photography, videography and film production in UAE
            </p>
            <Timeline />
          </div>
        {/* </div> */}
      </section>

      {/* CREATIVE TEAM */}
      <CreativeTeam />
      <ClientsArea />
      <Testimonials />

      <FAQSection />
      <Difference />
      <GradientLights customCounts={{
        xl: 8,  // Rich visual experience for extra large screens
        lg: 8,  // Substantial gradients for large screens
        md: 8,  // Balanced for medium screens
        sm:8,  // Moderate for tablets
        xs: 10   // Minimal but visible on mobile
      }} />
    </>
  );
}
