"use client";

import styles from "./ser.module.scss";
import Animation from "./animation";
import React from "react";
const defaultData = [
  {
    image: "/servicess/2danimation.png",
    caption: "2D Animation",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/twoDanimation",
  },
  {
    image: "/servicess/3danimation.png",
    caption: "3D Animation",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/threeDanimation",
  },
  {
    image: "/servicess/Whiteboard Animation.png",
    caption: "Whiteboard Animation",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/whiteboard-animation",
  },
  {
    image: "/servicess/character.png",
    caption: "Character Design",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/character-design",
  },
  {
    image: "/servicess/motion-graphics.png",
    caption: "Motion Graphics",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/motion-graphics",
  },
  {
    image: "/servicess/red-machine.png",
    caption: "Product Animation",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/product-animation",
  },
  {
    image: "/servicess/VFX & Post Production.png",
    caption: "VFX & Post Production",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/vfx-post-production",
  },
  {
    image: "/servicess/video.png",
    caption: "Video Editing & Post Production",
    sub1: "Lorem ipsum dolor sit",
    link: "/servicess/video-editing-post-production",
  },
  {
    image: "/servicess/storytelling.png",
    caption: "Storyboarding & Post Production",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    link: "/servicess/storyboarding-design",
  },
];
export default function ServiceImage({
  data = defaultData,
  anim = "scale",
  head = "",
  sub = "",
  showButton = true,
  showSelect = true,
}) {
  return (
    <>
      <section className={styles.ServiceImage}>
        <div className="container">
          <div className={styles.sub}>{sub}</div>
          <div className={styles.headings}>
            {head.length > 0 && <h2>{head}</h2>}
            {showSelect && (
              <select className={styles.select}>
                <option value="scale" className={styles.options}>
                  Creative Team
                </option>
                <option value="fade" className={styles.options}>
                  Fade
                </option>
                <option value="slide" className={styles.options}>
                  Slide
                </option>
              </select>
            )}
          </div>
          <div className="container">
            <div
              className={`row ${styles.serimgs}`}
              // style={{
              //   display: "grid",
              //   gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
              //   gap: "24px",
              // }}
            >
              {data.map((item, index) => (
                <div key={index} className={styles.serImg}>
                  <div className={styles.serMain}>
                    <Animation
                      data={item}
                      buttonName={showButton ? "LEARN MORE" : null}
                      anim={anim}
                      showButton={showButton}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
