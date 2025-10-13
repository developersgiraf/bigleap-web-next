import TitleBanner from "../components/title-banner/titleBannerr";
import styles from "./services.module.css";
import Image from "next/image";
import ServiceImage from "../components/services-sect/servicesImage.jsx";
import DynamicServiceImage from "./components/DynamicServiceImage.jsx";
import Industries from "../components/industries/industries.jsx";
import EnquirySect from "../components/enquiry/enquiry.jsx";
import TitleDescription from "./components/title-description/titleDes.jsx";
import GradientLights from "../components/gradient-lights/gradient.jsx";
import { GRADIENT_PRESETS } from "../components/gradient-lights/gradientConfig.js";
import DownArrow from "../components/downArrow/arrow.jsx";
import OtherListServices from "./components/otherListServices/otherList.jsx";
export default function ServicesPage() {
  return (
    <>
      <TitleBanner title="Our creativity begins where reality ends" sub=""/>

      <DownArrow scrolltoID="#ser_id" />
      {/* SERVICE MAIN AREA START */}
      <section className={styles["service-main-area"]}>
        <div className="container">
          <div className={`row ${styles.serviceBox}`}>
            <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-12 col-12">
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
            <div className="col-xxl-6 col-xl-6 col-lg-7 col-md-12 col-12">
              <div className={styles.content}>
                <h4>
                  You dream it,  We animate it.
                </h4>
                <p>
                Every idea deserves a creative expression, so we make sure that it comes alive with stunning visuals. We offer diverse animation services ranging from 2D and 3D animation, motion graphics, VFX, story boarding and many more. Explore our 360° animation services and join us in setting your story in motion. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.serviceCollect} id="ser_id">
        <Image
          src="/Sersess.png"
          alt="Services Background"
          fill
          priority
          className={styles.bgImage}
          quality={95}
        />
        <DynamicServiceImage head="Services We Provide" />
      </section>

      <OtherListServices />

      <section className={styles.titledes}>
        <div className="container">
          <TitleDescription
            title={'Do You Want to|| Create|| an|| Impact|| with a Professional & Effective|| Animated Video'}
            description={
              <span className={styles.paraColor}>
                At BigLeap, we don’t just animate — we elevate ideas and take concepts to the next level.
                We give narratives a new form through compelling animation that clearly expresses your vision, strengthens your brand, and drives user engagement.
                From 2D animation to motion graphics, product animation, VFX, and post-production, we offer a full range of animation services. 
                Got an idea? Let’s animate it.<br />
                
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
        xs: 10   // Minimal but visible on mobile
      }} />
    </>
  );
}
