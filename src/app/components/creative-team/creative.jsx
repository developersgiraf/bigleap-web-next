import Profile from "./profile";
import styles from "./creative.module.scss";
export default function CreativeTeam() {
  const list = [
    {
      image: "/team/gokul.jpg",
      name: "Gokul",
      status: "Creative Director",
    },
    {
      image: "/team/basil.jpg",
      name: "Basil",
      status: "Generalist",
    },
    {
      image: "/team/iyas.jpg",
      name: "Iyas",
      status: "Senior Designer",
    },
    {
      image: "/team/anu.jpg",
      name: "Anu",
      status: "Animator",
    },
    {
      image: "/team/sreerag.jpg",
      name: "Sreerag",
      status: "Video Editor",
    },
    {
      image: "/team/hadi.jpg",
      name: "Hadi",
      status: "Graphic Designer",
    },
  ];
  return (
    <section className={styles["creative-team"]}>
      <h2>Meet The Creative Team</h2>
      <div className="container">
        <div className={`row ${styles.teamRow}`}>
              {list.map((item, index) => (
                <div key={index} className="col-xl-4">
                    <Profile
                      image={item.image}
                      name={item.name}
                      status={item.status}
                    />
                  </div>
              ))}
          <div >
            </div>
          </div>
        </div>
    </section>
  );
}
                
