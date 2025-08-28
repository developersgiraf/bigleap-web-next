import TitleBanner from "../components/title-banner/title";
import GradientLights from "../components/gradient-lights/gradient.jsx";
import styles from "./portfolioDetail.module.scss";
import VideoSwiper from "./components/videos-swiper/videoSwiper";
export default function firstAnimation() {
  return (
    <>
      <TitleBanner title="Our creativity begins where reality ends" />
      <VideoSwiper />


      
      <GradientLights />
    </>
  );
}
