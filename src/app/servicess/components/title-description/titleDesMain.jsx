import styles from "./titledes.module.css";

export default function TitleDescriptionMain({ title, description, subhead1, subdes1,
subhead2, subdes2,subhead3, subdes3, subhead4, subdes4 }) {
  return (
    <div className={styles.titleDescription}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <h4 className={styles.subhead1}>{subhead1}</h4>
      <p className={styles.subdes1}>{subdes1}</p>
     <h4 className={styles.subhead2}>{subhead2}</h4>
      <p className={styles.subdes2}>{subdes2}</p>
      <h4 className={styles.subhead3}>{subhead3}</h4>
      <p className={styles.subdes3}>{subdes3}</p>
      <h4 className={styles.subhead4}>{subhead4}</h4>
      <p className={styles.subdes4}>{subdes4}</p>
    </div>
  );
}
