import styles from "./industries.module.scss";
import Link from "next/link";

export default function ListIndustry({ industries }) {
  return (
    <div className={styles.industryList} >
      <ul>
        {industries.map((industry, idx) => (
          <li key={idx}>
            <Link href="#" className={styles.link}>
              {industry}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
