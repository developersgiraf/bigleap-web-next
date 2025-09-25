import styles from "./service-detail.module.scss";
import TitleDescription from "../components/title-description/titleDes";
import TitleBanner from "../../components/title-banner/titleBannerr";
import FAQSection from "../../components/faq/faq";
import GradientLights from "../../components/gradient-lights/gradient";
import { GRADIENT_PRESETS } from "../../components/gradient-lights/gradientConfig";
import ListServices from "../components/list/list";
import EnquirySect from "@/app/components/enquiry/enquiry";
import { servicesData } from "./data/ServicePageData.js";




export default async function Services({ params }) {
  
  const metadata = {
  title: "Services - Big Leap",
  description: "Explore our range of creative services designed to elevate your brand.",
};
  const { service } = await params;
  const serviceData = servicesData[service];

  // Fallback if service data is not found
  if (!serviceData) {
    return (
      <>
        <TitleBanner
          title="Service Not Found"
          sub="The requested service page could not be found."
        />
      </>
    );
  }

  return (
    <>
      <TitleBanner
        title={serviceData.bannerTitle || "Imagination Unleashed: A Journey Beyond Reality"}
        sub=""
      />

      <section className={styles.serDetail}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-12 col-12">
              <div
                className={`row justify-content-center align-items-center ${styles.detail}`}
              >
                <div
                  className={`col-xl-4 col-lg-4 col-md-12 col-12 d-flex ${styles.imgs}`}
                >
                  <img
                    className={styles.image}
                    src={serviceData.section01.image}
                    alt={service}
                  />
                </div>
                <div
                  className={`col-xl-8 col-lg-8 col-md-12 col-12 d-flex align-items-center ${styles.des}`}
                >
                  <div>
                    <h4>{serviceData.section01.heading}</h4>
                    <p className={styles.description}>
                      {serviceData.section01.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.detailHead}>
        <div className="container">
          <TitleDescription
            title={serviceData.section02.DescTitle}
            description={
              <span className={styles.paraColor}>
                {serviceData.section02.Descpara}
              </span>
            }
            subhead1={serviceData.section02.subhead1}
            subdes1={serviceData.section02.subdes1}
            subhead2={serviceData.section02.subhead2}
            subdes2={serviceData.section02.subdes2}
            subhead3={serviceData.section02.subhead3}
            subdes3={serviceData.section02.subdes3}
            subhead4={serviceData.section02.subhead4}
            subdes4={serviceData.section02.subdes4}
          />
        </div>
      </section>
      <div className={styles.listContainer}>
       <h2 className={styles.listHead}>{serviceData.listHead}</h2>
      <p className={styles.listPara}>{serviceData.listPara}</p>
      </div>
     
      <ListServices listItems={serviceData.list} />
      {/* <FAQSection /> */}
      <EnquirySect />
      <GradientLights
        customCounts={{
          xl: 5, // Rich visual experience for extra large screens
          lg: 5, // Substantial gradients for large screens
          md: 5, // Balanced for medium screens
          sm: 4, // Moderate for tablets
          xs: 5, // Minimal but visible on mobile
        }}
      />
    </>
  );
}
