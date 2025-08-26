"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

export default function Testimonials({ teamData = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleMembers, setVisibleMembers] = useState([]);

  // Default team data if none provided - memoized to prevent recreation
  const defaultTeamData = useMemo(
    () => [
      {
        id: 1,
        image: "/team/gokul.jpg",
        name: "Gokul",
        title: "Creative Director",
        description:
          "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
      },
      {
        id: 2,
        image: "/team/basil.jpg",
        name: "Basil",
        title: "Generalist",
        description:
          "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 3,
        image: "/team/iyas.jpg",
        name: "Iyas",
        title: "Senior Designer",
        description:
          "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 4,
        image: "/team/anu.jpg",
        name: "Anu",
        title: "Animator",
        description:
          "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 5,
        image: "/team/sreerag.jpg",
        name: "Sreerag",
        title: "Video Editor",
        description:
          "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 6,
        image: "/team/hadi.jpg",
        name: "Hadi",
        title: "Graphic Designer",
        description:
          "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
    []
  );

  // Memoize the data to prevent infinite re-renders
  const data = useMemo(() => {
    return teamData.length > 0 ? teamData : defaultTeamData;
  }, [teamData, defaultTeamData]);

  // Calculate visible members (show 5 at a time)
  useEffect(() => {
    const getVisibleMembers = () => {
      const totalMembers = data.length;
      const visible = [];

      for (let i = 0; i < Math.min(5, totalMembers); i++) {
        const index = (currentIndex + i - 2 + totalMembers) % totalMembers;
        visible.push({
          ...data[index],
          position: i,
          isCenter: i === 2,
        });
      }

      return visible;
    };

    setVisibleMembers(getVisibleMembers());
  }, [currentIndex, data]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const goToMember = (index) => {
    setCurrentIndex(index);
  };

  const currentMember = data[currentIndex];

  return (
    <div className={styles.teamSlider}>
      <div className={styles.sliderContainer}>
        {/* Team Members Circle */}
        <div className={styles.membersCircle}>
          {visibleMembers.map((member, index) => (
            <div
              key={member.id}
              className={`${styles.memberAvatar} ${
                member.isCenter ? styles.centerMember : styles.sideMember
              } ${styles[`position${member.position}`]}`}
              onClick={() =>
                goToMember(
                  (currentIndex + member.position - 2 + data.length) %
                    data.length
                )
              }
            >
              <div className={styles.avatarWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={member.isCenter ? 150 : 80}
                  height={member.isCenter ? 150 : 80}
                  className={styles.avatarImage}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="circle-nav-btn left"
          onClick={goToPrev}
          aria-label="Previous team member"
        >
          {"<"}
        </button>

        <button
          className="circle-nav-btn right"
          onClick={goToNext}
          aria-label="Next team member"
        >
          {">"}
        </button>
      </div>

      {/* Member Details */}
      <div className={styles.memberDetails}>
        <h3 className={styles.memberName}>{currentMember.name}</h3>
        <p className={styles.memberTitle}>{currentMember.title}</p>
        <p className={styles.memberDescription}>{currentMember.description}</p>
      </div>

      {/* Dots Indicator
      <div className={styles.dotsIndicator}>
        {data.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => goToMember(index)}
            aria-label={`Go to team member ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
}

// export default TeamSlider;
