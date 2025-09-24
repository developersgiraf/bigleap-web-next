import TitleBanner from "../components/title-banner/titleBannerr";
import styles from "./services.module.scss";
import Image from "next/image";
import ServiceImage from "../components/services-sect/servicesImage.jsx";
import Industries from "../components/industries/industries.jsx";
import EnquirySect from "../components/enquiry/enquiry.jsx";
import TitleDescriptionMain from "./components/title-description/titleDesMain.jsx";
import GradientLights from "../components/gradient-lights/gradient.jsx";
import { GRADIENT_PRESETS } from "../components/gradient-lights/gradientConfig.js";

export default function ServicesPage() {
  return (
    <>
      <TitleBanner title="Our creativity begins where reality ends" sub=""/>

      {/* SERVICE MAIN AREA START */}
      <section className={styles["service-main-area"]}>
        <div className="container">
          <div className={`row ${styles.serviceBox}`}>
            <div className="col-xl-3 col-lg-5 col-md-12 col-12">
              <div className={styles.image}>
                <Image
                  src="/servicess/comic-book.png"
                  alt=""
                  width={237}
                  height={365}
                  className={styles.comicImg}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-7 col-md-12 col-12">
              <div className={styles.content}>
                <h4>
                  A creative studio specializing in the production of
                  captivating animation videos that bring ideas to life.
                </h4>
                <p>
                  Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt <br />
                 Ut labore et dolore magna aliqua. Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.serviceCollect}>
        <Image
          src="/Services.png"
          alt="Services Background"
          fill
          priority
          className={styles.bgImage}
          quality={95}
        />
        <ServiceImage head="Services We Provide" />
      </section>

      <section className={styles.titledes}>
        <div className="container">
          <TitleDescriptionMain
            title={
              <>
                Do You Want to <span className={styles.textColor}>Create</span>{" "}
                an 
                <span className={styles.textColor}> Impact</span> with a
                Professional & Effective{" "}
                <span className={styles.textColor}>Animated Video</span> ?{" "}
              </>
            }
            description={
              <span className={styles.paraColor}>
                lorem ipsum dolor sit amet consectetur adipiscing elit. lorem
                ipsum dolor sit amet consectetur adipiscing elit. lorem ipsum
                dolor sit amet consectetur adipiscing elit. lorem ipsum dolor
                sit amet consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
                dolores, quasi porro ducimus inventore corporis maxime commodi
                quo optio nemo aliquam officia recusandae consequatur ipsa
                dolorum blanditiis vitae placeat delectus!Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Modi dolores, quasi porro
                ducimus inventore corporis maxime commodi quo optio nemo aliquam
                officia recusandae consequatur ipsa dolorum blanditiis vitae
                placeat delectus!
              </span>
            }
          />
        </div>
      </section>
      <Industries />
      
      <EnquirySect />
      <GradientLights customCounts={{
        xl: 7,  // Rich visual experience for extra large screens
        lg: 7,  // Substantial gradients for large screens
        md: 13,  // Balanced for medium screens
        sm: 12,  // Moderate for tablets
        xs: 11   // Minimal but visible on mobile
      }} />
    </>
  );
}
