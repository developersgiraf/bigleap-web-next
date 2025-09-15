import styles from "./gradient.module.scss";

export default function GradientLights({ count = 2 }) {
  return (
    <>
      <div className={styles["gradient-lights"]}>
        {Array.from({ length: count }).map((_, index) => {
          let position = index % 2 === 0 ? "left" : "right";
          return (
            <div
              key={index}
              className={`${styles.light} ${styles[position]}`}
              style={{
                top: `${index * 100}dvh`, // Increment Y position by 100dvh for each light
                animationDelay: `${index * 1.5}s`, // Stagger animation delays
              }}
            ></div>
          );
        })}
      </div>
      <div className={styles.halftoneDots} style={{ height: "100dvh" }}></div>
    </>
  );
}
