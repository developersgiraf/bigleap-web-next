import styles from "./industries.module.css";
import ListIndustry from "./list-industry";
export default function Industries() {
  const list = [
    {
      industries: [
        "Real Estate",
        "Healthcare",
        "Education",
        "Finance",
        "Entertainment"
      ]
    },
    {
      industries: [
        "Technology",
        "Retail & E-Commerce",
        "Manufacturing",
        "Automotive",
        "Hospitality & Tourism",
      ]
    },
    {
      industries: [
        "Media & Advertising",
        "Energy & Utilities",
        "Education & E-Learning",
        "Technology & Startups",
      ]
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
                  industries={item.industries}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
