import GradientLights from "../components/gradient-lights/gradient";
import TitleBanner from "../components/title-banner/title";

import PortfolioSwiper from "./components/portfolio/PortfolioSwiper";

export default function PortfolioPage() {
  return (
    <>
      <TitleBanner title="Our creativity begins where reality ends" />
      <PortfolioSwiper />
      <GradientLights />
    </>
  );
}
