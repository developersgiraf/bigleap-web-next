import styles from "./about.module.scss";
import Image from "next/image";
import CreativeTeam from "../components/creative-team/creative";
import FAQSection from "../components/faq/faq";
import Difference from "../components/differences/different";
import ClientsArea from "../components/clients-area/clients.jsx";
import TitleBanner from "../components/title-banner/titleBannerr";
import Testimonials from "../components/team-slider/testimonials.jsx";
import GradientLights from "../components/gradient-lights/gradient.jsx";
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
              <div className="col-xxl-col-xl-5 col-lg-5 col-md-12 col-12">
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
              <div className="col-xl-7 col-lg-7 col-md-12 col-12">
                <div className={styles["abt-cnt"]}>
                  <h4>
                    A creative studio specializing in the production of
                    captivating animation videos that bring ideas to life.
                  </h4>
                  <div className={styles["aboutContent"]}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt debitis beatae voluptatem libero impedit iusto
                      maiores quaerat magnam expedita odit natus fugit quasi
                      accusamus veritatis, nemo delectus cupiditate perferendis
                      eligendi.Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Sunt debitis beatae voluptatem libero
                      impedit iusto maiores quaerat magnam expedita odit natus
                      fugit quasi accusamus veritatis, nemo delectus cupiditate
                      perferendis eligendi.Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Sunt debitis beatae
                      voluptatem libero impedit iusto maiores quaerat magnam
                      expedita odit natus fugit quasi accusamus veritatis, nemo
                      delectus cupiditate perferendis eligendi.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Sunt debitis beatae
                      voluptatem libero impedit iusto maiores quaerat magnam
                      expedita odit natus fugit quasi accusamus veritatis, nemo
                      delectus cupiditate perferendis eligendi.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Sunt debitis beatae
                      voluptatem libero impedit iusto maiores quaerat magnam
                      expedita odit natus fugit quasi accusamus veritatis, nemo
                      delectus cupiditate perferendis eligendi.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Sunt debitis beatae
                      voluptatem libero impedit iusto maiores quaerat magnam
                      expedita odit natus fugit quasi accusamus veritatis, nemo
                      delectus cupiditate perferendis eligendi.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Sunt debitis beatae
                      voluptatem libero impedit iusto maiores quaerat magnam
                      expedita odit natus fugit quasi accusamus veritatis, nemo
                      delectus cupiditate perferendis eligendi.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Sunt debitis beatae
                      voluptatem libero impedit iusto maiores quaerat magnam
                      expedita odit natus fugit quasi accusamus veritatis, nemo
                      delectus cupiditate perferendis eligendi.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Sunt debitis beatae
                      voluptatem libero
                    </p>
                    
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
      <GradientLights count={8} />
    </>
  );
}
