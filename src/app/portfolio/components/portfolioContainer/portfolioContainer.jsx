"use client";

import { useState } from "react";
import PortfolioEntry from "../portfolioEntry/portfolioEntry";
import styles from "../../portfolio.module.css";

export default function PortfolioContainer() {
  const [openStates, setOpenStates] = useState([true, true, false, false]);

  const handleNextOpen = (currentIndex) => {
    setOpenStates(prevStates => {
      const newStates = [...prevStates];
      
      // Check if the next entry (currentIndex + 1) is currently open
      const nextIndex = currentIndex + 1;
      const isNextOpen = nextIndex < newStates.length && newStates[nextIndex];
      
      if (isNextOpen) {
        // If next entry is open, close all entries after current index
        for (let i = currentIndex + 1; i < newStates.length; i++) {
          newStates[i] = false;
        }
      } else {
        // If next entry is closed, open only the next entry and close all after it
        if (nextIndex < newStates.length) {
          newStates[nextIndex] = true;
          // Close all entries after the next one
          for (let i = nextIndex + 1; i < newStates.length; i++) {
            newStates[i] = false;
          }
        }
      }
      
      return newStates;
    });
  };

  // Function to determine arrow direction for each button
  const getArrowDirection = (index) => {
    const nextIndex = index + 1;
    return nextIndex < openStates.length && openStates[nextIndex] ? '<' : '>';
  };

  return (
    <div className={styles.portfolioEntryContainer}>
      {openStates.map((isOpen, index) => (
        <PortfolioEntry 
          key={index}
          open={isOpen}
          buttonTitle={getArrowDirection(index)}
          onButtonClick={() => handleNextOpen(index)}
        />
      ))}
    </div>
  );
}