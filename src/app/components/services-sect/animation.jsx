import Items from "../differences/item";
import styles from "./ser.module.css";
import Image from "next/image";
import CTAButton from "../ctaButton/ctabtn";

export default function Animation({
  data = {
    image: "/servicess/character.png",
    caption: "Character Design",
    link: "#",
  },
  buttonName = "LEARN MORE",
  anim = "scale",
  showButton = true,
}) {
  return (
    <>
      <div className={styles.servicepage}>
        <div className={styles.serviceimageCover}>
          <div
            className={
              styles.image +
              " " +
              (anim === "scale" ? styles.scale : styles.posX)
            }
          >
            <Image src={data.image} width={387} height={396} alt="image" className={styles.imageClass} />
            <div className={styles.list}>
              {data.sub1 && (
                <div
                  className={styles.listItem}
                  style={{ transitionDelay: ".05s" }}
                >
                  <h5>{data.sub1}</h5>
                </div>
              )}
              {data.sub2 && (
                <div
                  className={styles.listItem}
                  style={{ transitionDelay: ".1s" }}
                >
                  <h5>{data.sub2}</h5>
                </div>
              )}
              {data.sub3 && (
                <div
                  className={styles.listItem}
                  style={{ transitionDelay: ".15s" }}
                >
                  <h5>{data.sub3}</h5>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h5>{data.caption}</h5>
          <p>{data.date}</p>
        </div>
        <h4>{data.about}</h4>

        {showButton && buttonName && (
          <CTAButton title={buttonName} link={data.link} />
        )}
      </div>
    </>
  );
}
