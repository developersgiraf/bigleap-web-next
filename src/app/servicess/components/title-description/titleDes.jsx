import styles from "./titledes.module.scss";

export default function TitleDescription({ title, description, subhead1, subdes1,subhead2, subdes2 }) {
  return (
    <div className={styles.titleDescription}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <h4 className={styles.subhead1}>{subhead1}</h4>
      <p className={styles.subdes1}>{subdes1}</p>
<h4 className={styles.subhead2}>{subhead2}</h4>
      <p className={styles.subdes2}>{subdes2}</p>
    </div>
  );
}
