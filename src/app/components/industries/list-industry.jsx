import styles from "./industries.module.css";
import Link from "next/link";

export default function ListIndustry({ industries }) {
  return (
    <div className={styles.industryList} >
      <ul>
        {industries.map((industry, idx) => (
          <li key={idx-1}>
            <Link href="#" className={styles.link}>
              {industry}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
