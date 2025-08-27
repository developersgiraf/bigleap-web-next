"use client";

import styles from "./gradient.module.scss";
import { useEffect, useState } from "react";

export default function GradientLights({ count = 0 }) {
  const [dynamicCount, setDynamicCount] = useState(count);
  const [pageHeight, setPageHeight] = useState("100vh");

  useEffect(() => {
    const updateDimensions = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const viewportHeight = window.innerHeight;

      // Set page height for halftone dots
      setPageHeight(`${scrollHeight}px`);

      if (count <= 0) {
        const calculatedCount = Math.ceil(scrollHeight / viewportHeight);
        setDynamicCount(Math.max(calculatedCount, 2)); // Minimum 2 lights
      } else {
        setDynamicCount(count);
      }
    };

    // Initial update with small delay for content to load
    const initialTimer = setTimeout(updateDimensions, 100);

    // Additional checks for dynamic content
    const additionalTimers = [
      setTimeout(updateDimensions, 500),
      setTimeout(updateDimensions, 1000),
    ];

    // Listen for window resize
    window.addEventListener("resize", updateDimensions);

    return () => {
      clearTimeout(initialTimer);
      additionalTimers.forEach((timer) => clearTimeout(timer));
      window.removeEventListener("resize", updateDimensions);
    };
  }, [count]); // Only depend on count, not pathname since it's per-page now

  return (
    <>
      <div className={styles["gradient-lights"]}>
        {Array.from({ length: dynamicCount }).map((_, index) => {
          let position = index % 2 === 0 ? "left" : "right";
          return (
            <div
              key={index}
              className={`${styles.light} ${styles[position]}`}
              style={{
                top: `${index * 100}vh`, // Increment Y position by 100vh for each light
                animationDelay: `${index * 1.5}s`, // Stagger animation delays
              }}
            ></div>
          );
        })}
      </div>
      <div className={styles.halftoneDots} style={{ height: pageHeight }}></div>
    </>
  );
}
