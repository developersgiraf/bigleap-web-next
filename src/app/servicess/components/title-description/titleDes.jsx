import styles from "./titledes.module.scss";

export default function TitleDescription({ title, description }) {
  return (
    <div className={styles.titleDescription}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
