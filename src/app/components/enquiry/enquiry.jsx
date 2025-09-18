"use client";

import { useEffect } from "react";
import styles from "../enquiry/enquiry.module.scss";
import Image from "next/image";
import CTAButton from "../ctaButton/ctabtn.jsx";

export default function EnquirySect() {
  useEffect(() => {
    // Dynamically import Bootstrap JS only on client side
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Submitted:", data);
    // You can send `data` to your API here
  };

  return (
    <>
      <section className={styles["enquiry-section"]}>
        <Image
          src="/enquiry/EnquireNow.png"
          alt="Enquiry Background"
          width={1728}
          height={756}
          className={styles.image}
        />
        <div className={styles.buttonContainer}>
          <CTAButton
            title="ENQUIRE NOW"
            isModal={true}
            modalTarget="#enquiryModal"
          />
        </div>
      </section>

      {/* Enquiry Modal */}
      <div
        className="modal fade"
        id="enquiryModal"
        aria-hidden="true"
        aria-labelledby="enquiryModalLabel"
        tabIndex="-1"
      >
        <div
          className={`modal-dialog modal-dialog-centered ${styles.modalDialog}`}
        >
          <div className={`modal-content ${styles.modalContent}`}>
            <div className={`modal-header ${styles.modalHeader}`}>
              <h1
                className={`modal-title ${styles.title} fs-5`}
                id="enquiryModalLabel"
              >
                ENQUIRY FORM
              </h1>
              <button
                type="button"
                className={`btn-close ${styles.btnClose}`}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={`modal-body ${styles.modalBody}`}>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className={styles.input}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className={styles.input}>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Your Phone"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className={styles.input}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className={styles.input}>
                      <input
                        type="text"
                        name="message"
                        placeholder="Your Message"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`modal-footer ${styles.foottt}`}>
                <CTAButton title="SUBMIT" link="#" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
