"use client";

import { useState } from "react";
import PortfolioEntry from "../portfolioEntry/portfolioEntry";
import styles from "../../portfolio.module.css";

const data = [{
        title: "Animation",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/portfolio/portfolio1.png",
        readbtn: "Explore More"
    },
    {
        title: "Web Design",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/portfolio/portfolio2.png",
        readbtn: "Explore More"
    },
    {
        title: "Animation",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/portfolio/portfolio1.png",
        readbtn: "Explore More"
    },
    {
        title: "Web Design",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/portfolio/portfolio2.png",
        readbtn: "Explore More"
    }
    ];

export default function PortfolioContainer() {
  const [openStates, setOpenStates] = useState(data.map((_, index) => index < 1)); // Initialize based on data length
  const [focusedIndex, setFocusedIndex] = useState(null); // Track which entry is focused

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
        
        // For backward (closing) logic, set focus to the current button's entry (currentIndex)
        setFocusedIndex(currentIndex);
      } else {
        // If next entry is closed, open only the next entry and close all after it
        if (nextIndex < newStates.length) {
          newStates[nextIndex] = true;
          setFocusedIndex(nextIndex); // Set focus to the newly opened entry
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
    return nextIndex < openStates.length && openStates[nextIndex] ? '>' : '<';
  };

  // Function to determine focus class for each entry
  const getFocusClass = (index) => {
    if (focusedIndex === null) return '';
    return index === focusedIndex ? 'focused' : 'unfocused';
  };

  return (
    <div className={styles.portfolioEntryContainer}>
      {data.map((item, index) => (
        <PortfolioEntry 
          key={index}
          index={index}
          data={data}
          open={openStates[index]}
          focusClass={getFocusClass(index)}
          buttonTitle={getArrowDirection(index)}
          onButtonClick={() => handleNextOpen(index)}
        />
      ))}
    </div>
  );
}