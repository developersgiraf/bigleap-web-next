import styles from "./service-detail.module.scss";
import TitleDescription from "../components/title-description/titleDes";
import TitleBanner from "../../components/title-banner/titleBannerr";
import GradientLights from "../../components/gradient-lights/gradient";
import ListServices from "../components/list/list";
import EnquirySect from "@/app/components/enquiry/enquiry";
const data = {
  "2danimation": {
    image: "/servicess/detail-image.png",
    heading:
      "The Dynamic Studio That Brings Ideas To Life With Remarkable 2D Animations ",
    description:
      "Thinking of incorporating 2D animation into your marketing strategy? We are the trusted 2D animation company in Dubai that offers the best animating services that will enhance your brand presence. When it comes to animation that stands out, Big Leap leads the way. As a renowned animation studio trusted by companies across Dubai, our 2D animation services go beyond expectations, crafted to captivate and connect with the audience.",
      subhead1:
      "Enhanced Audience Engagement",
      subdes1:
      "2D animation will make the content more visually appealing, comprehensible, and engaging by simplifying the complex concepts. The visual representation of the content, combining the dynamic characters and interesting storyline, will hook their attention. ",
      subhead2:
      "Brand Awareness and Recall",
      subdes2:
      "Visually compelling animated content is more likely to be remembered and shared by the audience. Unique visual styles will always be associated with the brand, thereby enhancing brand recall. "
      
  },
  "3danimation": {
    image: "/servicess/red-machine.png",
    heading:
      "A dynamic studio focused on crafting engaging 3D mascot animations that transform concepts into vibrant visuals.",
    description:
      "do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ",
  },
  "whiteboard-animation": {
    image: "/servicess/detail-image.png",
    heading:
      "A dynamic studio focused on crafting engaging 3D mascot animations that transform concepts into vibrant visuals.",
    description:
      "do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ",
  },
};

export default function Services({ params }) {
  const { service } = params;
  const serviceData = data[service];

  return (
    <>
      <TitleBanner
        title="Imagination Unleashed:
      A Journey Beyond Reality" sub=""
      />

      <section className={styles.serDetail}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-11">
              <div
                className={`row justify-content-center align-items-center ${styles.detail}`}
              >
                <div
                  className={`col-xl-4 col-lg-5 col-md-6 d-flex ${styles.imgs}`}
                >
                  <img
                    className={styles.image}
                    src={serviceData.image}
                    alt={service}
                  />
                </div>
                <div
                  className={`col-xl-8 col-lg-7 col-md-6 d-flex align-items-center ${styles.des}`}
                >
                  <div>
                    <h4>{serviceData.heading}</h4>
                    <p className={styles.description}>
                      {serviceData.description}
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
            title={
              <>
               When Visuals Speak: Why 2D Animation Is  <span className={styles.textColor}>The Best Choice</span>{" "}
               
              </>
            }
            description={
              <span className={styles.paraColor}>
                2D animation involves creating motion in a two-dimensional space, using flat images to get the illusion of motion. A sequence of individual images slightly different from each other is played in quick succession, which will in turn appear to move.  <br />
                 Advanced tools may come and go, but 2D animation remains a timeless and popular choice.
              </span>
            }
            subhead1={
              <>
                    <h4>{serviceData.subhead1}</h4>
                    <p>{serviceData.subdes1}</p>
                  
              </>
            }
            subhead2={
              <>
              <h4>{serviceData.subhead2}</h4>
                    <p>{serviceData.subdes2}</p>
              </>
              
            }
          />
        </div>
      </section>
      <ListServices />
      <EnquirySect />
      <GradientLights count={5} />
    </>
  );
}
