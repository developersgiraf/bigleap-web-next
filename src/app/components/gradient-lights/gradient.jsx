"use client";

import styles from "./gradient.module.css";
import useResponsiveGradientCount from "./useResponsiveGradientCount";

export default function GradientLights({ 
  count, // Optional static count (if provided, overrides responsive behavior)
  customCounts, // Custom counts for different breakpoints
  enableResponsive = true // Enable/disable responsive behavior
}) {
  const { gradientCount, currentBreakpoint } = useResponsiveGradientCount(customCounts);
  
  // Use static count if provided, otherwise use responsive count
  const finalCount = count !== undefined ? count : (enableResponsive ? gradientCount : 2);

  return (
    <>
      <div className={styles["gradient-lights"]} data-breakpoint={currentBreakpoint}>
        {Array.from({ length: finalCount }).map((_, index) => {
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
