import styles from "./info.module.css";
import Link from "next/link";

export default function InfoArea() {
  return (
    <>
      <section className={styles["header-top-area"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-7 col-lg-6 col-md-12 col-12"></div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-12 col-12">
              <div className={styles["head-top-contacts"]}>
                <ul>
                  <li>
                    <Link href="mailto:info@bigleap.ae" className={styles.link}>
                      <i
                        className="fa fa-envelope"
                        style={{ marginRight: "8px" }}
                      ></i>
                      info@bigleap.ae
                    </Link>
                  </li>
                  <li>
                    <Link href="tel:+123456789" className={styles.link}>
                      <i
                        className="fa fa-phone"
                        style={{ marginRight: "8px" }}
                      ></i>
                      +971 05 6646 464
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className={styles.infosec}>
                <div className="container">
                <div className="row">
                    <div className="col-xl-7"></div>
                    <div className="col-xl-5">
                        <div className={styles.contacts}>
                            <ul>
                                <li> <a href="mailto:info@bigleap.ae"> <i className="fa fa-envelope"></i> info@bigleap.ae</a>
                                </li>
                                <li> <a href="tel:+123456789"> <i className="fa fa-phone"></i> +971 05 6646 464 </a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                </div>
            </section> */}
    </>
  );
}
