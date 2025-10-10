import styles from "./info.module.css";
import Link from "next/link";

export default function InfoArea() {
  return (
    <>
      <section className={styles["header-top-area"]}>
          <div className={styles["info-overlay"]}>
            <div className={styles["info-container"]}>
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
      </section>

      
    </>
  );
}
