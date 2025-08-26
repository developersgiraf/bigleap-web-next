import styles from "./service-detail.module.css";
import TitleDescription from "../components/title-description/titleDes";
import TitleBanner from "../../components/title-banner/title";
const data = {
  "2danimation": {
    image: "/servicess/detail-image.png",
    description: "Description for 2D Animation",
  },
  "3danimation": {
    image: "/servicess/detail-image.png",
    description: "Description for 3D Animation",
  },
  "whiteboard-animation": {
    image: "/servicess/detail-image.png",
    description: "Description for Whiteboard Animation",
  },
};

export default function Services({ params }) {
  const { service } = params;
  const serviceData = data[service];

  return (
    <>
      <TitleBanner
        title="Imagination Unleashed: 
      A Journey Beyond Reality"
      />

      <section className={styles.serDetail}>
        <div className="container">
          <div className={styles.detail}>
            <img
              className={styles.image}
              src={serviceData.image}
              alt={service}
            />
            <p className={styles.description}>{serviceData.description}</p>
          </div>
        </div>
      </section>

      <section className={styles.detailHead}>
        <div className="container">
          <TitleDescription
            title={
              <>
                Do You Want to <span className={styles.textColor}>Create</span>{" "}
                an <span className={styles.textColor}>Impact</span> with a
                Professional & Effective{" "}
                <span className={styles.textColor}>Animated Video</span> ?{" "}
              </>
            }
            description={
              <span className={styles.paraColor}>
                lorem ipsum dolor sit amet consectetur adipiscing elit. lorem
                ipsum dolor sit amet consectetur adipiscing elit. lorem ipsum
                dolor sit amet consectetur adipiscing elit. lorem ipsum dolor
                sit amet consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit.
              </span>
            }
          />
        </div>
      </section>
    </>
  );
}
