import GradientLights from "../components/gradient-lights/gradient";
import TitleBanner from "../components/title-banner/titleBannerr";
import PortfolioContainer from "./components/portfolioContainer/portfolioContainer";

export default function PortfolioPage() {
  return (
    <>
      <PortfolioContainer />
      <GradientLights count={2} />
    </>
  );
}
