import GradientLights from "../components/gradient-lights/gradient.jsx";
import styles from "./contact.module.scss";
import TitleBanner from "../components/title-banner/titleBannerr";
import ContactBanner from "./components/contactDetails/contactBanner.jsx";
import ContactForm from "./components/contactDetails/contactForm/form.jsx";
import Testimonials from "../components/team-slider/testimonials.jsx";

export default function ContactPage() {
  return (
    <>
      <TitleBanner title="Get in Touch With Us" sub="We strive to deliver innovative digital marketing solutions that drive
          your business forward."/>
      <div className={styles.ContactPage}>
        {/* <p>
          We strive to deliver innovative digital marketing solutions that drive
          your business forward.
        </p> */}
        <h5 className="signature-text-large">Basanth Raghavan</h5>
      </div>
      <ContactBanner />
      <ContactForm />
      <div className={styles.testimonialsSection}>
        <Testimonials hideBackground />
      </div>

      <GradientLights />
    </>
  );
}
