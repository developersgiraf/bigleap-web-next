'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './arrow.module.css';

export default function DownArrow({scrolltoID = "#"}) {
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    
    if (!isRotated) {
      // First click: scroll to target section
      if (scrolltoID !== "#") {
        const targetElement = document.querySelector(scrolltoID);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
          setIsRotated(true);
        }
      }
    } else {
      // Second click: scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setIsRotated(false);
    }
  };

  return (
    <motion.a 
      href={scrolltoID} 
      onClick={handleClick} 
      aria-label={isRotated ? "Scroll to Top" : "Scroll Down"}
      animate={{ 
        y: [0, -8, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
      whileHover={{
        scale: 1.1,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
    <div className={`${styles.downArrow} ${isRotated ? styles.rotated : ''}`}>
      <motion.svg 
        width="100" 
        height="100" 
        viewBox="0 0 30 41" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={styles.arrowImage}
        animate={{
          y: [0, -3, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      >
        <path 
          d="M13.6719 39.4531L3.04688 28.8281C2.26562 28.125 2.26562 26.9531 3.04688 26.1719C3.75 25.4688 4.92188 25.4688 5.70312 26.1719L13.125 33.6719V1.875C13.125 0.859375 13.9062 0 15 0C16.0156 0 16.875 0.859375 16.875 1.875V33.6719L24.2969 26.25C25 25.4688 26.1719 25.4688 26.9531 26.25C27.6562 26.9531 27.6562 28.125 26.9531 28.8281L16.25 39.4531C15.5469 40.2344 14.375 40.2344 13.6719 39.4531Z" 
          fill="var(--arrow-color, white)"
        />
      </motion.svg>
    </div>
    </motion.a>
  )
}