import CTAButton from "../../../../components/ctaButton/ctabtn";
import styles from "./form.module.scss";

export default function ContactForm() {
  return (
    <>
      <section className={styles.contactFormArea}>
        <div className="container">
          <h5>Get in Touch</h5>
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
      </section>
    </>
  );
}
