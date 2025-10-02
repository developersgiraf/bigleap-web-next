import Image from "next/image";
import styles from "./creative.module.css";

export default function Profile({ image, name, status }) {
  return (
    <div className={styles.profile}>
      <div className={styles["image-style"]}>
        <Image src={image} alt={name} width={387} height={396} />
      </div>
      <div className={styles.content}>
        <h6>{name}</h6>
        <p>{status}</p>
      </div>
    </div>
  );
}
