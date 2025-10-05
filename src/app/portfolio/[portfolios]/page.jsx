import TitleBanner from "../../components/title-banner/titleBannerr";
import styles from "./portfolioDetail.module.css";
import Image from "next/image";
import PortfolioGallery from "./components/portfolioGallery/portfolioGallery";
import TitleDescription from "../../servicess/components/title-description/titleDes";
import GradientLights from "../../components/gradient-lights/gradient";
import VideoSwiper from "./components/VideoSwiper";
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

async function getPortfolioData(slug) {
  try {
    
    const portfoliosDir = path.join(process.cwd(), 'data', 'portfolios');
    const portfolioPath = path.join(portfoliosDir, `${slug}.json`);
    
    if (!fs.existsSync(portfolioPath)) {
      return null;
    }

    const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));
    return portfolioData;
  } catch (error) {
    console.error('Error loading portfolio:', error);
    return null;
  }
}

export default async function PortfolioDetail({ params }) {
  const { portfolios } = await params;
  const portfolio = await getPortfolioData(portfolios);

  if (!portfolio) {
    notFound();
  }

  return (
    <>
      <TitleBanner title={portfolio.subtitle} sub="" />

      <>
        <section className={styles.videoSwiper}>
          <div className={styles.sliderText}>
            <h6>{portfolio.title}</h6>
            <h2>Check Our Latest Projects</h2>
            <p>
              Take a look at what we've been crafting for our clients lately —
              from stunning websites to comprehensive branding solutions that
              deliver real results.
            </p>
          </div>
          
          <VideoSwiper styles={styles} />
        </section>
      </>

      <section className={styles.portfolioDetail}>
        <div className="container">
          <div className={`row ${styles.portfolioDetailRow}`}>
            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
              <h2>{portfolio.description}</h2>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
              <h6>
                {portfolio.content}
              </h6>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.portVideos}>
        <div className="container">
          <iframe
            src={`https://www.youtube.com/embed/${portfolio.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${portfolio.videoUrl}&controls=0&modestbranding=0&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
            title="Showreel Video"
            width="100%"
          ></iframe>
        </div>
      </section>

      <section className={styles.titleDescriptionSection}>
        <TitleDescription
          title={portfolio.titleDescription}
        />
      </section>

      <PortfolioGallery projectGallery={portfolio.projectGallery} />

      <GradientLights count={6} />
    </>
  );
}
