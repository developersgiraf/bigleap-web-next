import GradientLights from "../components/gradient-lights/gradient";
import TitleBanner from "../components/title-banner/titleBannerr";
import PortfolioContainer from "./components/portfolioContainer/portfolioContainer";
import PortfolioSwiper from "./components/portfolioSwiper/portfolioSwiper";

export default function PortfolioPage() {
  return (
    <>
      <PortfolioContainer />
      <PortfolioSwiper />
      <GradientLights count={2} />
    </>
  );
}
