import styles from "./business.module.scss";
import BusinessArea from "./business-area";
export default function BusinessItems({ title, sub }) {
    const list = [
  {
    title: "Strengthening brand identity",
    sub: "Custom animated videos make all the difference by anchoring your unique brand identity, that will leave your mark in the competitive edge.",
  },
  {
    title: "Simplifying complex ideas",
    sub: "Complex concepts can be simplified with the help of engaging animation, that will effectively communicate your idea..",
  },
  {
    title: "Strengthening brand identity",
    sub: "Utilize the innovations of animation and create enthralling content that will lead to customer engagement, resulting in more leads and increase in sales.",
  },
];
    return (
        <section className={styles.businessArea}>
        <div className="container">
          <div className={styles["business-list"]}>
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">
                <div className={styles.heading}>
                  <h2>Let animation lead your business</h2>
                  <p className={styles.list}>
                    Where words fail, visuals take over. In this tech-driven
                    world, animation is the major edge that provides a creative
                    nudge to communication.
                  </p>
                </div>
              </div>
              <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12">
                <div className={styles.lists}>
                    {list.map((item, idx) => (
                      <BusinessArea
                        key={idx}
                        title={item.title}
                        sub={item.sub}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}