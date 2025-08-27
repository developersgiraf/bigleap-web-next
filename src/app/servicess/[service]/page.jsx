import styles from "./service-detail.module.scss";
import TitleDescription from "../components/title-description/titleDes";
import TitleBanner from "../../components/title-banner/title";
const data = {
  "2danimation": {
    image: "/servicess/detail-image.png",
    heading:
      "A dynamic studio focused on crafting engaging 3D mascot animations that transform concepts into vibrant visuals.",
    description:
      "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt Ut labore et dolore magna aliqua. Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua .",
  },
  "3danimation": {
    image: "/servicess/red-machine.png",
    heading:
      "A dynamic studio focused on crafting engaging 3D mascot animations that transform concepts into vibrant visuals.",
    description: "do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ",
  },
  "whiteboard-animation": {
    image: "/servicess/detail-image.png",
    heading:
      "A dynamic studio focused on crafting engaging 3D mascot animations that transform concepts into vibrant visuals.",
      description: "do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ",
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
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-11">
              <div
                className={`row justify-content-center align-items-center ${styles.detail}`}
              >
                <div
                  className={`col-xl-4 col-lg-5 col-md-6 d-flex ${styles.imgs}`}
                >
                  <img
                    className={styles.image}
                    src={serviceData.image}
                    alt={service}
                  />
                </div>
                <div
                  className={`col-xl-8 col-lg-7 col-md-6 d-flex align-items-center ${styles.des}`}
                >
                  <div>
                    <h4>{serviceData.heading}</h4>
                    <p className={styles.description}>
                      {serviceData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
