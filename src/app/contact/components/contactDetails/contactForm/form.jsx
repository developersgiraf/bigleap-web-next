import CTAButton from "../../../../components/ctaButton/ctabtn";
import styles from "./form.module.scss";
import Image from "next/image";
export default function ContactForm() {
  return (
    <section
      className={styles.contactFormArea}
      style={{ position: "relative" }}
    >
      {/* Background Image */}
      <Image
        src="/enquiry/comic.png"
        alt="Contact Background"
        fill
        priority
        className={styles.formBackground} />
          
        
     
      {/* Centered Content overlays the background */}
      <div className={styles.formContent}>
        
      
        <div className="container">
          <h4>Get in Touch</h4>
          <p>Reach out to us for any inquiries or collaborations.</p>
          <div className={styles.formContainer}>
            <form className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className={styles.formInput}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  placeholder="Placeholder"
                  className={`${styles.formInput} ${styles.textArea}`}
                  rows="6"
                />
              </div>
              <CTAButton title="VIEW" link="/contact" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
