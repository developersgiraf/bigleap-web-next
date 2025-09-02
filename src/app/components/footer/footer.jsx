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
                    <div className="col-xl-3">
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
                    <div className="col-xl-3">
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
                    <div className="col-xl-3">
                      <div className={styles.subcol}>
                        <h5>Say Hello</h5>
                        <ul>
                          <li>
                            <div className={styles.contactItem}>
                              <svg
                                className={styles.icon}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                  stroke="#bdbdbd"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <polyline
                                  points="22,6 12,13 2,6"
                                  stroke="#bdbdbd"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <a href="mailto:info@giraf.in">info@giraf.in</a>
                            </div>
                          </li>
                          <li>
                            <div className={styles.contactItem}>
                              <svg
                                className={styles.icon}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 21.01 16.92H22Z"
                                  stroke="#bdbdbd"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <a href="tel:+971501234567">+971 50 123 4567</a>
                            </div>
                          </li>
                          <li>
                            <div className={styles.contactItem}>
                              <svg
                                className={styles.icon}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                  stroke="#bdbdbd"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <circle
                                  cx="12"
                                  cy="10"
                                  r="3"
                                  stroke="#bdbdbd"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <Link href="#">Dubai, UAE</Link>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
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
