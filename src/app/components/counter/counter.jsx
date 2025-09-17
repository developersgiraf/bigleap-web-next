import CounterJs from './counter.js'
import styles from './counter.module.scss'

export default function CounterSect() {
  return (
    <>
      <CounterJs />
      <section className={styles['stats-section']}>
        {/* <div className="container"> */}
        <div className={styles['stat-block']}>
          <span className={styles['stat-label']}>Projects</span>
          <span className="stat-number" data-target="105" data-symbol="+">
            0
          </span>
        </div>
        <div className={styles['stat-divider']}></div>
        <div className={styles['stat-block']}>
          <span className={styles['stat-label']}>Clients</span>
          <span className="stat-number" data-target="65" data-symbol="+">
            0
          </span>
        </div>
        <div className={styles['stat-divider']}></div>
        <div className={styles['stat-block']}>
          <span className={styles['stat-label']}>Years</span>
          <span className="stat-number" data-target="10" data-symbol="+">
            0
          </span>
        </div>
        <div className={styles['stat-divider']}></div>
        <div className={styles['stat-block']}>
          <span className={styles['stat-label']}>Branches</span>
          <span className="stat-number" data-target="15" data-symbol="+">
            0
          </span>
        </div>
      </section>
    </>
  );
}
