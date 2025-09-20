import styles from "./blog.module.scss";
import CTAButton from "../ctaButton/ctabtn.jsx";
export default function BlogSection() {
  const list = [
    {
      image: "blog1.png",
      title: "Blog 1 Subtitle",
      date: "2023-10-01",
      about: "This is a brief description of Blog 1.",
    },
    {
      image: "blog2.png",
      title: "Blog 2 Subtitle",
      date: "2023-10-02",
      about: "This is a brief description of Blog 2.",
    },
    {
      image: "blog3.png",
      title: "Blog 3 Subtitle",
      date: "2023-10-03",
      about: "This is a brief description of Blog 3.",
    },
   
  ];

  return (
    <>
      <section className={styles.blogsection}>
        <div className="container">
          <div className={styles.blogcontent}>
            <div className={styles.bloghead}>
              <h6>Blogs</h6>
              <h2>Our Latest Blogs</h2>
            </div>
            <div className={styles.blogimages}>
              <div className={`row ${styles.blogrow}`}>
                {list.map((item, index) => (
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" key={index}>
                    <img src={item.image} alt={item.title} />
                    <div className={styles.titleHead}>
                      <h6 className={styles.title}>{item.title}</h6>
                      <p className={styles.date}>{item.date}</p>
                    </div>
                    <div className={styles.about}>
                      <p>{item.about}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <CTAButton title="VIEW MORE" link="/blog" />
          </div>
        </div>
      </section>
    </>
  );
}
