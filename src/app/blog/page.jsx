import ServiceImage from "../components/services-sect/servicesImage";
import GradientLights from "../components/gradient-lights/gradient";
import TitleBanner from "../components/title-banner/title";
import styles from "./blog.module.css";

const blogData = [
  {
    image: "/servicess/2danimation.png",
    caption: "2D Animation",
    link: "/services/2danimation",
  },
  {
    image: "/servicess/3danimation.png",
    caption: "3D Animation",
    link: "/services/3danimation",
  },
  {
    image: "/servicess/Whiteboard Animation.png",
    caption: "Whiteboard Animation",
    link: "/services/whiteboard-animation",
  },
  {
    image: "/servicess/character.png",
    caption: "Character Design",
    link: "/services/character-design",
  },
  {
    image: "/servicess/comic-book.png",
    caption: "Comic Book",
    link: "/services/comic-book.png",
  },
  {
    image: "/servicess/red-machine.png",
    caption: "red machine",
    link: "#",
  },
  {
    image: "/servicess/VFX & Post Production.png",
    caption: "VFX & Post Production",
    link: "#",
  },
  {
    image: "/servicess/video.png",
    caption: "Video Editing & Post Production",
    link: "#",
  },
  {
    image: "/servicess/Whiteboard Animation.png",
    caption: "white board",
    link: "#",
  },
];

export default function BlogPage() {
  return (
    <>
      <TitleBanner title="Where Imagination Takes Flight: The Art of Animation" />

      <div className={styles.blogPageWrapper}>
        <ServiceImage
          head="Our Blogs"
          data={blogData}
          anim="x"
          showSelect={false}
        />
      </div>
      <GradientLights />
    </>
  );
}
