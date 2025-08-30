import Slider from "../slider/slider.jsx";
import styles from "./clients.module.scss";
export default function ClientsArea() {
  return (
    <section className={styles["client-section"]}>
      <div className={styles["client-content"]}>
        <h6>Our Clients</h6>
        <h2>Trusted Clients</h2>
      </div>
      <Slider
        datas={[
          { img: "/image (1).jpg", imgWH: 774, idname: "clientSlide1" },
          { img: "/image (2).jpg", imgWH: 774, idname: "clientSlide2" },
          { img: "/image (3).jpg", imgWH: 774, idname: "clientSlide3" },
          { img: "/image (5).jpg", imgWH: 774, idname: "clientSlide4" },
          { img: "/image (6).jpg", imgWH: 774, idname: "clientSlide1" },
          { img: "/image (7).jpg", imgWH: 774, idname: "clientSlide2" },
          { img: "/image (8).jpg", imgWH: 774, idname: "clientSlide3" },
          { img: "/image (9).jpg", imgWH: 774, idname: "clientSlide1" },
          { img: "/image (10).jpg", imgWH: 774, idname: "clientSlide4" },
          { img: "/image (3).jpg", imgWH: 774, idname: "clientSlide2" },
          { img: "/image (7).jpg", imgWH: 774, idname: "clientSlide3" },
          { img: "/image (5).jpg", imgWH: 774, idname: "clientSlide4" },
        ]}
        spaceBetween={0}
        slidesPerView={11}
        imageSize={180}
        navButtons={false}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 2, spaceBetween: 0 },
          1024: { slidesPerView: 3, spaceBetween: 0 },
          1366: { slidesPerView: 11, spaceBetween: 0 },
        }}
      />
    </section>
  );
}
