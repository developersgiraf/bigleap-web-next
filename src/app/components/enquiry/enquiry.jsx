"use client";

import { useState } from "react";
import styles from "../enquiry/enquiry.module.scss";
import Image from "next/image";
import CTAButton from "../ctaButton/ctabtn.jsx";
import CustomModal from "../custom-modal/custom-modal.jsx";

export default function EnquirySect() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Submitted:", data);
    // You can send `data` to your API here
    setIsModalOpen(false);
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
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </section>

      {/* Custom Enquiry Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ENQUIRY FORM"
        className={styles.modalContent}
      >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-6">
              <div className={styles.input}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className={styles.input}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  required
                />
              </div>
            </div>
            <div className="col-xl-12">
              <div className={styles.input}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div className="col-xl-12">
              <div className={styles.input}>
                <input
                  type="text"
                  name="message"
                  placeholder="Your Message"
                />
              </div>
            </div>
          </div>
          <div className={styles.foottt}>
            <CTAButton title="SUBMIT" type="submit" />
          </div>
        </form>
      </CustomModal>
    </>
  );
}
