import GradientLights from "../components/gradient-lights/gradient";
import TitleBanner from "../components/title-banner/titleBannerr";
import PortfolioEntry from "./components/portfolioEntry/portfolioEntry";
import styles from "./portfolio.module.css";

export default function PortfolioPage() {

  return (
    <>
      <TitleBanner title="Our creativity begins where reality ends" sub=""/>

      <div className={styles.portfolioEntryContainer}>

        <PortfolioEntry open={true}/>
        <PortfolioEntry open={false}/>
        <PortfolioEntry open={false}/>
        <PortfolioEntry open={false}/>
      </div>
      <GradientLights count={2} />
    </>
  );
}
