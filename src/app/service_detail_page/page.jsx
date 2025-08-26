import styles from "./service-detail.module.scss";
import TitleDescription from "../components/title-description/titleDes";

export default function Services() {
  return (
    <>
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
                dolor sit amet consectetur adipiscing elit. lorem ipsum dolor sit
                amet consectetur adipiscing elit. lorem ipsum dolor sit amet
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
