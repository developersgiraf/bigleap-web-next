"use client";

import { useState } from "react";
import GradientLights from "../components/gradient-lights/gradient";
import TitleBanner from "../components/title-banner/titleBannerr";
import PortfolioEntry from "./components/portfolioEntry/portfolioEntry";
import styles from "./portfolio.module.css";

export default function PortfolioPage() {
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
    <>
      <TitleBanner title="Our creativity begins where reality ends" sub=""/>

      <div className={styles.portfolioEntryContainer}>
        {openStates.map((isOpen, index) => (
          <PortfolioEntry 
            key={index}
            open={isOpen}
            onButtonClick={() => handleNextOpen(index)}
          />
        ))}
      </div>
      <GradientLights count={2} />
    </>
  );
}
