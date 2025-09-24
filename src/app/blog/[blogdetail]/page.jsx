import TitleBanner from "@/app/components/title-banner/titleBannerr";
import GradientLights from "@/app/components/gradient-lights/gradient";
import { GRADIENT_PRESETS } from "@/app/components/gradient-lights/gradientConfig.js";
import styles from "../[blogdetail]/blog-details.module.scss";
import Image from "next/image";

const list = {
  "2danimation": {
    title: "Where Imagination Takes Flight: The Art of 2d Animation",
    image: "/servicess/2danimation.png",
    description:
      "2D animation brings stories to life through traditional hand-drawn techniques and modern digital tools. Our expert animators create captivating characters and scenes that engage audiences across all platforms. From concept to completion, we handle every aspect of 2D animation production with meticulous attention to detail. Whether it's for marketing videos, educational content, or entertainment, our 2D animations deliver powerful visual storytelling that resonates with viewers and achieves your creative goals.2D animation brings stories to life through traditional hand-drawn techniques and modern digital tools. Our expert animators create captivating characters and scenes that engage audiences across all platforms. From concept to completion, we handle every aspect of 2D animation production with meticulous attention to detail. Whether it's for marketing videos, educational content, or entertainment, our 2D animations deliver powerful visual storytelling that resonates with viewers and achieves your creative goals.",
  },
  "3danimation": {
    title: "Where Imagination Takes Flight: The Art of 3d Animation",
    image: "/servicess/3danimation.png",
    description:
      "3D animation offers unlimited creative possibilities with realistic characters, environments, and visual effects. Our skilled team uses cutting-edge software and techniques to create immersive animated experiences that captivate audiences. From product visualizations to character animations, we bring your ideas to life with stunning three-dimensional artistry. Our 3D animation services combine technical expertise with creative vision to deliver professional-quality content for various industries and applications.",
  },
  "whiteboard-animation": {
    title: "Where Imagination Takes Flight: The Art of 2d Animation",
    image: "/servicess/Whiteboard Animation.png",
    description:
      "Whiteboard animation is a powerful communication tool that simplifies complex ideas through engaging visual storytelling. Our whiteboard animations combine clear narration with hand-drawn illustrations that appear to be created in real-time. This format is perfect for educational content, explainer videos, and presentations that need to convey information in an easily digestible format. We create compelling whiteboard animations that keep viewers engaged while effectively communicating your message.",
  },
  "character-design": {
    title: "Where Imagination Takes Flight: The Art of 2d Animation",
    image: "/servicess/character.png",
    description:
      "Character design is the foundation of memorable storytelling and brand identity. Our talented designers create unique, expressive characters that connect with audiences and bring your stories to life. From initial concept sketches to final polished designs, we develop characters with distinct personalities, visual appeal, and emotional depth. Whether for animation, games, marketing, or publishing, our character designs are crafted to be both visually striking and functionally effective for your project needs.",
  },
  "comic-book": {
    title: "Where Imagination Takes Flight: The Art of 2d Animation",
    image: "/servicess/comic-book.png",
    description:
      "Comic book creation combines visual artistry with compelling storytelling to create immersive reading experiences. Our team of artists and writers collaborate to produce professional-quality comics with dynamic artwork, engaging plots, and memorable characters. From concept development to final publication, we handle every aspect of comic book production including storyboarding, illustration, coloring, and lettering. Whether you're creating educational comics, marketing materials, or entertainment content, we deliver comics that captivate readers and effectively communicate your message.",
  },
};
export default function BlogDetailPage({ params }) {
  const { blogdetail } = params;
  const blogsData = list[blogdetail];

  if (!blogsData) {
    return (
      <>
        <TitleBanner title={list[blogdetail]?.title || "Blog Not Found"} />
        <div className={styles.container}>
          <h2>Sorry, this blog post doesn't exist.</h2>
          <p>
            Please check the URL or visit our blog page to see all available
            posts.
          </p>
        </div>
        <GradientLights />
      </>
    );
  }

  return (
    <>
      <TitleBanner title={blogsData.title} sub="" />
      <div className="container">
        <div className={styles.imageContainer}>
          <Image
            src={blogsData.image}
            width={500}
            height={400}
            alt={blogsData.title}
            className={styles.image}
          />
          <p className={styles.description}>{blogsData.description}</p>
        </div>
      </div>
      <GradientLights customCounts={{
        xl: 8,  // Rich visual experience for extra large screens
        lg: 2,  // Substantial gradients for large screens
        md: 3,  // Balanced for medium screens
        sm: 3,  // Moderate for tablets
        xs: 3   // Minimal but visible on mobile
      }} />
    </>
  );
}
