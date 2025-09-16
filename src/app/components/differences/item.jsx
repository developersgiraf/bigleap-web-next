import styles from "./difference.module.scss";

export default function Items({ title, sub }) {
  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <div className={styles.each}>
          <h5 className={styles.h5}>{title}</h5>
          <p>{sub}</p>
        </div>

      </div>
      
    </>
  )
}