"use client";

import { useState, useEffect } from "react";
import PortfolioEntry from "../portfolioEntry/portfolioEntry";
import styles from "../../portfolio.module.css";
import { portfoliosClient } from "../../../../lib/portfolios-client";

export default function PortfolioContainer() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openStates, setOpenStates] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null); // Track which entry is focused

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        setLoading(true);
        const data = await portfoliosClient.getPortfolios();
        
        // Transform the data to match the expected structure
        const transformedData = data.map(portfolio => ({
          title: portfolio.cardData.title,
          description: portfolio.cardData.description,
          image: portfolio.cardData.image,
          readbtn: portfolio.cardData.readbtn,
          background: portfolio.cardData.background,
          link: portfolio.cardData.link
        }));

        setPortfolios(transformedData);
        setOpenStates(transformedData.map((_, index) => index < 1)); // Initialize based on data length
        setError(null);
      } catch (err) {
        console.error('Error loading portfolios:', err);
        setError('Failed to load portfolios');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolios();
  }, []);

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
    return nextIndex < openStates.length && openStates[nextIndex] ? '<' : '>';
  };

  // Function to determine focus class for each entry
  const getFocusClass = (index) => {
    if (focusedIndex === null) return '';
    return index === focusedIndex ? 'focused' : 'unfocused';
  };

  if (loading) {
    return (
      <div className={styles.portfolioEntryContainer}>
        <div className={styles.loading}>Loading portfolios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.portfolioEntryContainer}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.portfolioEntryContainer}>
      {portfolios.map((item, index) => (
        <PortfolioEntry 
          key={index}
          index={index}
          data={portfolios}
          open={openStates[index]}
          focusClass={getFocusClass(index)}
          buttonTitle={getArrowDirection(index)}
          onButtonClick={() => handleNextOpen(index)}
        />
      ))}
    </div>
  );
}