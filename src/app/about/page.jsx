import styles from "./about.module.scss";
import Image from "next/image";
import CreativeTeam from "../components/creative-team/creative";
import FAQSection from "../components/faq/faq";
import Difference from "../components/different";
import ClientsArea from "../components/clients-area/clients.jsx";
import TitleBanner from "../components/title-banner/title.jsx";
import Testimonials from "../components/team-slider/testimonials.jsx";
export default function AboutPage() {
  return (
    <>
      {/* TITLE BANNER AREA */}

      {/* <section className={styles['title-banner']}>
                <h1> Our creativity begins where reality ends </h1>

            </section> */}
      <TitleBanner title="Our creativity begins where reality ends" />

      {/* ABOUT CONTENT AREA */}

      <section className={styles["about-main-section"]}>
        <div className="container">
          <div className={styles["about-sect"]}>
            <div className="row">
              <div className="col-xl-5">
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
              <div className="col-xl-7">
                <div className={styles["abt-cnt"]}>
                  <h4>
                    A creative studio specializing in the production of
                    captivating animation videos that bring ideas to life.
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt debitis beatae voluptatem libero impedit iusto maiores
                    quaerat magnam expedita odit natus fugit quasi accusamus
                    veritatis, nemo delectus cupiditate perferendis
                    eligendi.Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Sunt debitis beatae voluptatem libero impedit iusto
                    maiores quaerat magnam expedita odit natus fugit quasi
                    accusamus veritatis, nemo delectus cupiditate perferendis
                    eligendi.Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Sunt debitis beatae voluptatem libero impedit iusto
                    maiores quaerat magnam expedita odit natus fugit quasi
                    accusamus veritatis, nemo delectus cupiditate perferendis
                    eligendi.Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Sunt debitis beatae voluptatem libero impedit iusto
                    maiores quaerat magnam expedita odit natus fugit quasi
                    accusamus veritatis, nemo delectus cupiditate perferendis
                    eligendi.Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Sunt debitis beatae voluptatem libero impedit iusto
                    maiores quaerat magnam expedita odit natus fugit quasi
                    accusamus veritatis, nemo delectus cupiditate perferendis
                    eligendi.Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Sunt debitis beatae voluptatem libero impedit iusto
                    maiores quaerat magnam expedita odit natus fugit quasi
                    accusamus veritatis, nemo delectus cupiditate perferendis
                    eligendi.Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Sunt debitis beatae voluptatem libero impedit iusto
                    maiores quaerat magnam expedita odit natus fugit quasi
                    accusamus veritatis, nemo delectus cupiditate perferendis
                    eligendi.Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Sunt debitis beatae voluptatem libero impedit iusto
                    maiores quaerat magnam expedita odit natus fugit quasi
                    accusamus veritatis, nemo delectus cupiditate perferendis
                    eligendi.Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Sunt debitis beatae voluptatem libero
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORY AREA START */}

      <section className={styles["history-area"]}>
        <div className="container">
          <div className={styles["history-head"]}>
            <h2>HISTORY</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              sint dolorem sed nihil atque tempora commodi eligendi,
              exercitationem, dicta totam sequi ab culpa repellendus nesciunt
              fugiat
            </p>
          </div>
        </div>
      </section>

      {/* CREATIVE TEAM */}
      <CreativeTeam />
      <ClientsArea />
      <Testimonials />

      <FAQSection />
      <Difference />
    </>
  );
}
