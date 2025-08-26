import ServiceImage from "../components/services-sect/ser";
import TitleBanner from "../components/title-banner/title";
import Testimonials from "../components/team-slider/testimonials";
const blogData = [
  {
    image: "/servicess/2danimation.png",
    caption: "2D Animation",
    link: "#",
  },
  {
    image: "/servicess/3danimation.png",
    caption: "3D Animation",
    link: "#",
  },
  {
    image: "/servicess/Whiteboard Animation.png",
    caption: "Whiteboard Animation",
    link: "#",
  },
  {
    image: "/servicess/character.png",
    caption: "Character Design",
    link: "#",
  },
  {
    image: "/servicess/comic-book.png",
    caption: "Comic Book",
    link: "#",
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

      <ServiceImage head="Our Blogs" data={blogData} anim="x" />

      <Testimonials />
    </>
  );
}
