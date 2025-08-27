import styles from "./list.module.scss";
export default function ListItem({ title, description }) {
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
      <div className={styles.listStyle}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
