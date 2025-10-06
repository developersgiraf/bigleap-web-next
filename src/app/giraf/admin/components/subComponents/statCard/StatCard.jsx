import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ icon, title, number, label }) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statInfo}>
      <h3>{title}</h3>
      <p className={styles.statNumber}>{number}</p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  </div>
);

export default StatCard;
