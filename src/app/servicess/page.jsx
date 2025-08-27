import TitleBanner from "../components/title-banner/title.jsx";
import styles from "./services.module.scss";
import Image from "next/image";
import ServiceImage from "../components/services-sect/servicesImage.jsx";
import Industries from "../components/industries/industries.jsx";
import EnquirySect from "../components/enquiry/enquiry.jsx";
import TitleDescription from "./components/title-description/titleDes.jsx";
import GradientLights from "../components/gradient-lights/gradient.jsx";
export default function ServicesPage() {
  return (
    <>
      <TitleBanner title="Our creativity begins where reality ends" />

      {/* SERVICE MAIN AREA START */}
      <section className={styles["service-main-area"]}>
        <div className="container">
          <div className={`row ${styles.serviceBox}`}>
            <div className="col-xl-3">
              <div className={styles.image}>
                <Image
                  src="/servicess/comic-book.png"
                  alt=""
                  width={237}
                  height={365}
                  className={styles.comicImg}
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className={styles.content}>
                <h4>
                  A creative studio specializing in the production of
                  captivating animation videos that bring ideas to life.
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  quo illum eum eligendi, obcaecati repellat aliquid repudiandae
                  dolore culpa earum tenetur voluptas rem veritatis nisi
                  molestiae explicabo! Cum, ad omnis? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Alias quod autem, assumenda
                  voluptates cupiditate numquam, vel excepturi consequuntur id
                  illo quibusdam! Vero facere veritatis dolorem rerum
                  repellendus nulla, ipsa dignissimos. <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  eius neque delectus, eveniet magni modi est. Assumenda eveniet
                  ipsam sunt modi tempora ex debitis, non totam doloribus nobis
                  aspernatur doloremque. Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Est, iusto officia? Cupiditate dolorem omnis
                  iure, consequuntur quae qui est delectus doloremque excepturi
                  nobis neque sunt libero a sequi, quam laudantium. Lorem ipsum
                  dolor, sit amet consectetur adipisicing elit. Officia esse
                  accusamus repudiandae culpa amet mollitia nam odio recusandae
                  debitis et reprehenderit autem aspernatur beatae, eos
                  quibusdam provident repellendus. Quam, neque!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.serviceCollect}>
        <ServiceImage head="Services We Provide" />
      </section>

      <section className={styles.titledes}>
        <div className="container">
          <TitleDescription
            title={
              <>
                Do You Want to <span className={styles.textColor}>Create</span>{" "}
                an <br />
                <span className={styles.textColor}>Impact</span> with a
                Professional & <br /> Effective{" "}
                <span className={styles.textColor}>Animated Video</span> ?{" "}
              </>
            }
            description={
              <span className={styles.paraColor}>
                lorem ipsum dolor sit amet consectetur adipiscing elit. lorem
                ipsum dolor sit amet consectetur adipiscing elit. lorem ipsum
                dolor sit amet consectetur adipiscing elit. lorem ipsum dolor
                sit amet consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. lorem ipsum dolor sit amet
                consectetur adipiscing elit. <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
                dolores, quasi porro ducimus inventore corporis maxime commodi
                quo optio nemo aliquam officia recusandae consequatur ipsa
                dolorum blanditiis vitae placeat delectus!Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Modi dolores, quasi porro
                ducimus inventore corporis maxime commodi quo optio nemo aliquam
                officia recusandae consequatur ipsa dolorum blanditiis vitae
                placeat delectus!
              </span>
            }
          />
        </div>
      </section>
      <Industries />
      <EnquirySect />
      <GradientLights />
    </>
  );
}
