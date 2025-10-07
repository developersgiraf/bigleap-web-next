import styles from "./industries.module.css";
import Link from "next/link";

export default function ListIndustry({ industries }) {
  return (
    <div className={styles.industryList} >
      <ul>
        {industries.map((industry, idx) => (
          industry && (
            <li key={idx-1}>
              <Link href={industry.link} className={styles.link}>
                {industry.title}
              </Link>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}
