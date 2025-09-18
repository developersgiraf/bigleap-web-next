"use client";

import { useState } from "react";
import PortfolioEntry from "../portfolioEntry/portfolioEntry";
import styles from "../../portfolio.module.css";

export default function PortfolioContainer() {
  const [openStates, setOpenStates] = useState([true, true, false, false]);

  const handleNextOpen = (currentIndex) => {
    setOpenStates(prevStates => {
      const newStates = [...prevStates];
      // Find the next closed entry and open it
      for (let i = currentIndex + 1; i < newStates.length; i++) {
        if (!newStates[i]) {
          newStates[i] = true;
          break;
        }
      }
      return newStates;
    });
  };

  return (
    <div className={styles.portfolioEntryContainer}>
      {openStates.map((isOpen, index) => (
        <PortfolioEntry 
          key={index}
          open={isOpen}
          onButtonClick={() => handleNextOpen(index)}
        />
      ))}
    </div>
  );
}