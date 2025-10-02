import styles from "./industries.module.css";
import ListIndustry from "./list-industry";
export default function Industries() {
  const list = [
    {
      li1: "Real Estate",
      li2: "Healthcare",
      li3: "Education",
      li4: "Finance",
      li5: "Entertainment",
    },
    {
      li1: "Technology",
      li2: "Retail & E-Commerce",
      li3: "Manufacturing",
      li4: "Automotive",
      li5: "Hospitality & Tourism",
    },
    {
      li1: "Media & Advertising",
      li2: "Energy & Utilities",
      li3: "Education & E-Learning",
      li4: "Technology & Startups",
      
    },
  ];
  return (
    <>
      <section className={styles.Industries}>
        <h2>INDUSTRIES WE SERVE</h2>
        <p>At Big Leap, from scribble to motion, we don’t just animate, we bring life to narratives that create an impact.</p>
        <div className="container">
          <div className={`row ${styles.contents}`}>
            {list.map((item, index) => (
              <div key={index} className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                <ListIndustry
                  industries={[
                    item.li1,
                    item.li2,
                    item.li3,
                    item.li4,
                    item.li5,
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
