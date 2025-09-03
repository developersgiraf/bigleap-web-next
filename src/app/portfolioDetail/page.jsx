import TitleBanner from "../components/title-banner/title";
import styles from "./portfolioDetail.module.scss";
import Image from "next/image";
import MotionGraphics from "./components/motionGraphics/motionGraphics";
import TitleDescription from "../servicess/components/title-description/titleDes.jsx";
import GradientLights from "../components/gradient-lights/gradient";

export default function firstAnimation() {
  return (
    <>
      <TitleBanner title="Our creativity begins where reality ends" />

      <>
        <section className={styles.videoSwiper}>
          <div className={styles.sliderText}>
            <h6>Product Animations</h6>
            <h2>Check Our Latest Projects</h2>
            <p>
              Take a look at what we've been crafting for our clients lately —
              from stunning websites to comprehensive branding solutions that
              deliver real results.
            </p>
          </div>
          <Image
            src="/blog1.png"
            alt="Project Image"
            width={500}
            height={300}
          />
        </section>
      </>

      <section className={styles.portfolioDetail}>
        <div className="container">
          <div className={`row ${styles.portfolioDetailRow}`}>
            <div className="col-xl-6">
              <h2>Watch Our Showreel</h2>
            </div>
            <div className="col-xl-6">
              <h6>
                Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                sit aspernatur aut odit aut.
              </h6>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.portVideos}>
        <div className="container">
          <iframe
            src="https://www.youtube.com/embed/geMtgE6RmTQ?autoplay=1&mute=1&loop=1&playlist=geMtgE6RmTQ&controls=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
            title="Showreel Video"
            width="100%"
          ></iframe>
        </div>
      </section>

      <section className={styles.titleDescriptionSection}>
        <TitleDescription
          title={
            <>
              <h2>
                Over the years,{" "}
                <span className={styles.textColor}>our project</span> has
                thrived at the intersection of
                <span className={styles.textColor}> Imagination </span> and{" "}
                <span className={styles.textColor}>innovation.</span>
              </h2>
            </>
          }
        />
      </section>

      <MotionGraphics />

      <GradientLights />
    </>
  );
}
