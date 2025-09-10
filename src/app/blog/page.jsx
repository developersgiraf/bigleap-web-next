import ServiceImage from "../components/services-sect/servicesImage";
import GradientLights from "../components/gradient-lights/gradient";
import TitleBanner from "../components/title-banner/titleBanner";
import styles from "./blog.module.css";

const blogData = [
  {
    image: "/servicess/2danimation.png",
    caption: "2D Animation",
    link: "/blogs/blog1",
  },
  {
    image: "/servicess/3danimation.png",
    caption: "3D Animation",
    link: "/blogs/blog2",
  },
  {
    image: "/servicess/Whiteboard Animation.png",
    caption: "Whiteboard Animation",
    link: "/blogs/blog3",
  },
  {
    image: "/servicess/character.png",
    caption: "Character Design",
    link: "/blogs/blog4",
  },
  {
    image: "/servicess/comic-book.png",
    caption: "Comic Book",
    link: "/blogs/blog5",
  },
  {
    image: "/servicess/red-machine.png",
    caption: "red machine",
    link: "/blogs/blog6",
  },
  {
    image: "/servicess/VFX & Post Production.png",
    caption: "VFX & Post Production",
    link: "/blogs/blog7",
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
