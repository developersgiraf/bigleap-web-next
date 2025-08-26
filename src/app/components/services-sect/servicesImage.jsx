import styles from "./ser.module.scss";
import Animation from "./animation";

const defaultData = [
  {
    image: "/servicess/2danimation.png",
    caption: "2D Animation",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#"
  },
  {
    image: "/servicess/3danimation.png",
    caption: "3D Animation",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#"
  },
  {
    image: "/servicess/Whiteboard Animation.png",
    caption: "Whiteboard Animation",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#"
  },
  {
    image: "/servicess/character.png",
    caption: "Character Design",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#"
  },
  {
    image: "/servicess/comic-book.png",
    caption: "Comic Book",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#"
  },
  {
    image: "/servicess/red-machine.png",
    caption: "red machine",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#"
  },
  {
    image: "/servicess/VFX & Post Production.png",
    caption: "VFX & Post Production",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    sub3: "Lorem ipsum dolor sit",
    link: "#"
  },
  {
    image: "/servicess/video.png",
    caption: "Video Editing & Post Production",
    sub1: "Lorem ipsum dolor sit",
    link: "#"
  },
  {
    image: "/servicess/Whiteboard Animation.png",
    caption: "white board",
    sub1: "Lorem ipsum dolor sit",
    sub2: "Lorem ipsum dolor sit",
    link: "#"
  },
];
export default function ServiceImage({ data = defaultData, anim='scale', head='', maxCols = 3 }) {

  return (
    <>
      <section className={styles.ServiceImage}>
        {head.length > 0 && <h2>{head}</h2>}
        <div className="container">
          <div
            className={`row ${styles.serimgs}`}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
              gap: '24px',
            }}
          >
            {data.map((item, index) => (
              <div key={index} className={styles.serImg}>
                <div className={styles.serMain}>
                  <Animation data={item} buttonName="LEARN MORE" anim={anim} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
