import ServiceImage from "../../../../components/services-sect/servicesImage";
import GradientLights from "../../../../components/gradient-lights/gradient";

const motion = [
  {
    image: "/gr-1.gif",
    caption: "client",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
  {
    image: "/gr-2.gif",
    caption: "2D Animation",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
  {
    image: "/gr-3.gif",
    caption: "client",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
  {
    image: "/gr-1.gif",
    caption: "client",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
  {
    image: "/gr-2.gif",
    caption: "client",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
  {
    image: "/gr-1.gif",
    caption: "client",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
  {
    image: "/gr-2.gif",
    caption: "client",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
  {
    image: "/gr-1.gif",
    caption: "client",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
  {
    image: "/gr-3.gif",
    caption: "client",
    date: "sep 03 2025",
    about: "Grand Opening Casa mia",
    link: "#",
  },
];

export default function MotionGraphics() {
  return (
    <>
      <ServiceImage
        sub="Motion Graphics"
        head="Living. Breathing. Digital Experiences"
        data={motion}
        showButton={false}
        showSelect={false}
        anim={false}
      />
      <GradientLights />
    </>
  );
}
