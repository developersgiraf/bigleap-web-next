import TitleBanner from "../../components/title-banner/titleBannerr";
import styles from "./portfolioDetail.module.css";
import Image from "next/image";
import MotionGraphics from "./components/motionGraphics/motionGraphics";
import TitleDescription from "../../servicess/components/title-description/titleDes";
import GradientLights from "../../components/gradient-lights/gradient";
import VideoSwiper from "./components/VideoSwiper";

// Portfolio data based on the route parameter
const portfolioData = {
  portfolio1: {
    title: "Animation Portfolio",
    subtitle: "Our creativity begins where reality ends",
    description: "Watch Our Animation Showreel",
    content: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut.",
    videoUrl: "geMtgE6RmTQ",
    titleDescription: ("Over the years,|| our animation project|| has thrived at the intersection of|| Imagination || and|| innovation.")
  },
  portfolio2: {
    title: "Web & App Portfolio", 
    subtitle: "Digital solutions that make a difference",
    description: "Watch Our Web & App Showreel",
    content: "Innovative web and mobile applications designed to deliver exceptional user experiences.",
    videoUrl: "geMtgE6RmTQ",
    titleDescription: ("Over the years,|| our web development|| has thrived at the intersection of|| Technology || and|| user experience.")
  },
  portfolio3: {
    title: "Graphic Design Portfolio",
    subtitle: "Visual storytelling at its finest", 
    description: "Watch Our Design Showreel",
    content: "Creative graphic design solutions that communicate your brand's unique story.",
    videoUrl: "geMtgE6RmTQ",
    titleDescription: ("Over the years,|| our design work|| has thrived at the intersection of|| Art || and|| communication.")
  },
  portfolio4: {
    title: "SEO SEM Portfolio",
    subtitle: "Driving digital growth through optimization",
    description: "Watch Our SEO SEM Results",
    content: "Strategic search engine optimization and marketing that delivers measurable results.",
    videoUrl: "geMtgE6RmTQ", 
    titleDescription: ("Over the years,|| our SEO strategies|| have thrived at the intersection of|| Analytics || and|| growth.")
  }
};

export default async function PortfolioDetail({ params }) {
  const { portfolios } = await params;
  const portfolio = portfolioData[portfolios] || portfolioData.portfolio1;

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

      <MotionGraphics />

      <GradientLights count={6} />
    </>
  );
}
