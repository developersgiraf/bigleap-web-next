import styles from "./difference.module.scss";

export default function Items({ title, sub }) {
  return (
    <>
      <div className="col-xl-3">
        <div className={styles.each}>
          <h5 className={styles.h5}>{title}</h5>
          <p>{sub}</p>
        </div>

      </div>
      
    </>
  )
}