import styles from "./contactBanner.module.css";
import Link from "next/link";
export default function ContactBanner() {
  return (
    <section className={styles.ContactBanner}>
    
      <ul>
        <li>
          <Link href="/contact">info@bigleap.ae</Link>
        </li>
        <li>
          <Link href="/contact">+971 50 210 93 05</Link>
        </li>
        <li>
          <Link href="/contact">+971 65 21 66 25</Link>
        </li>
        <li>
          <Link href="/contact">
            Big Leap LV36 <br /> A, HAMRIYAH FREE ZONE, PHASE 2,<br /> SHARJAH | UAE
          </Link>
        </li>
      </ul>
    </section>
  );
}
