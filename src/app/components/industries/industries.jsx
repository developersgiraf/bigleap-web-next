import styles from "./industries.module.scss";
import ListIndustry from "./list-industry";
export default function Industries() {
  const list = [
    {
      li1: "Real Estate",
      li2: "Healthcare",
      li3: "Education",
      li4: "Finance",
      li5: "Entertainment",
      li6: "Real Estate",
    },
    {
      li1: "Real Estate",
      li2: "Healthcare",
      li3: "Education",
      li4: "Finance",
      li5: "Entertainment",
      li6: "Real Estate",
    },
    {
      li1: "Real Estate",
      li2: "Healthcare",
      li3: "Education",
      li4: "Finance",
      li5: "Entertainment",
      li6: "Real Estate",
    },
  ];
  return (
    <>
      <section className={styles.Industries}>
        <h2>INDUSTRIES WE SERVE</h2>
        <p>At Big Leap, from scribble to motion, we don’t just animate, we bring life to narratives that create an impact.</p>
        <div className="container">
          <div className="row contents">
            {list.map((item, index) => (
              <div key={index} className="col-xl-4">
                <ListIndustry
                  industries={[
                    item.li1,
                    item.li2,
                    item.li3,
                    item.li4,
                    item.li5,
                    item.li6,
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
