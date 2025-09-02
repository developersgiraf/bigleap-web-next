'use client'

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
    link: "/servicess/2danimation",
  },
  {
    image: "/servicess/3danimation.png",
    caption: "3D Animation",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/3danimation",
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
    image: "/servicess/comic-book.png",
    caption: "Comic Book",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "/servicess/comic-book",
  },
  {
    image: "/servicess/red-machine.png",
    caption: "red machine",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#",
  },
  {
    image: "/servicess/VFX & Post Production.png",
    caption: "VFX & Post Production",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#",
  },
  {
    image: "/servicess/video.png",
    caption: "Video Editing & Post Production",
    sub1: "Lorem ipsum dolor sit",
    link: "#",
  },
  {
    image: "/servicess/Whiteboard Animation.png",
    caption: "white board",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    link: "#",
  },
];
export default function ServiceImage({
  data = defaultData,
  anim = "scale",
  head = "",
  maxCols = 3,
}) {
  return (
    <>
      <section className={styles.ServiceImage}>
        <div className="container">
          <div className={styles.headings}>
            {head.length > 0 && <h2>{head}</h2>}
            <select className={styles.select}>
              <option value="scale" className={styles.options}>Creative Team</option>
              <option value="fade" className={styles.options}>Fade</option>
              <option value="slide" className={styles.options}>Slide</option>
            </select>
          </div>
          <div className="container">
            <div
              className={`row ${styles.serimgs}`}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
                gap: "24px",
              }}
            >
              {data.map((item, index) => (
                <div key={index} className={styles.serImg}>
                  <div className={styles.serMain}>
                    <Animation
                      data={item}
                      buttonName="LEARN MORE"
                      anim={anim}
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
