import Link from "next/link";
import styles from "./footer.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <section className={styles.footerArea}>
        <div className="container">
          <div className="row justify-content-center">
            <div
              className={`col-xl-4 col-lg-4 col-md-3 col-12 ${styles.firstcol}`}
            >
              <div className={styles.bigleap}>
                <Image
                  src="/footer.png"
                  alt="footer"
                  width={216}
                  height={172}
                  className={styles.footerImage}
                />
              </div>
              <div className={styles.address}>
                <h6>
                  Big Leap <br />
                  LV36 A, HAMRIYAH FREE ZONE, PHASE 2, <br />
                  SHARJAH | UAE
                </h6>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-9 col-12">
              <div className={styles.content}>
                <div className={styles.bigleapCnt}>
                  <h2>Let's Starts from a 'Hi'</h2>
                </div>

                <div className={styles.footerList}>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-6">
                      <div className={styles.subcol}>
                        <h5>Socials</h5>
                        <ul>
                          <li>
                            <Link href="">facebook</Link>
                          </li>
                          <li>
                            <Link href="">LinkedIn</Link>
                          </li>
                          <li>
                            <Link href="">instagram</Link>
                          </li>
                          <li>
                            <Link href="">twitter</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-6">
                      <div className={styles.subcol}>
                        <h5>Menu</h5>
                        <ul>
                          <li>
                            <Link href="">Home</Link>
                          </li>
                          <li>
                            <Link href="">About</Link>
                          </li>
                          <li>
                            <Link href="">Services</Link>
                          </li>
                          <li>
                            <Link href="">Blogs</Link>
                          </li>
                          <li>
                            <Link href="">Portfolio</Link>
                          </li>
                          <li>
                            <Link href="">Contact</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-6">
                      <div className={styles.subcol}>
                        <h5>Say Hello</h5>
                        <ul>
                          <li>
                            <Image src="/icons/email-new.png" alt="Contact Us" width={16} height={16} className={styles.iconImg}/>
                            <Link href="mailto:info@giraf.in" >info@giraf.in</Link>

                          </li>
                          <li>
                            <Image src="/icons/whatsap.png" alt="Contact Us" width={16} height={16} className={styles.iconImg}/>
                            <Link href="tel:+971502109305">+971 50 210 93 05</Link>

                          </li>
                          <li>
                            <Image src="/icons/phone.png" alt="Contact Us" width={16} height={16} className={styles.iconImg}/>
                            <Link href="tel:+97165216625">+971 65 21 66 25</Link>

                          </li>
                           
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className={styles["footer-bottom"]}>
                <ul className={styles.footerCopyRight}>
                  <li>
                    {" "}
                    Bigleap © 2025. All Rights Reserved.{" "}
                    <Link href=""> bigleap.ae </Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="#"> <u>Privacy Policy</u> </Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
