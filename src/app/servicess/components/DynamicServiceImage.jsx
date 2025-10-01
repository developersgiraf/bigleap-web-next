"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import styles from "../../components/services-sect/ser.module.scss";
import Animation from "../../components/services-sect/animation";

export default function DynamicServiceImage({
  anim = "scale",
  head = "",
  sub = "",
  showButton = true,
  showSelect = true,
}) {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const docRef = doc(db, 'WebsiteDatas', 'services');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const allServices = docSnap.data();
          
          // Convert Firebase data to the format expected by the component
          const formattedServices = Object.values(allServices)
            .filter(service => !service.archived) // Only show non-archived services
            .map(service => ({
              image: service.thumbnail || service.section01?.image || "/servicess/default-image.png",
              caption: service.title,
              sub1: service.listHead || "Professional service",
              sub2: service.bannerTitle || "",
              sub3: service.section01?.heading || "",
              link: `/servicess/${service.customSlug || service.slug || service.id}`,
            }));
          
          setServicesData(formattedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to default data if Firebase fails
        setServicesData(getDefaultData());
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  // Default fallback data
  const getDefaultData = () => [
    {
      image: "/servicess/2danimation.png",
      caption: "2D Animation",
      sub1: "Lorem ipsum dolor sit",
      sub2: "Lorem ipsum dolor sit",
      sub3: "Lorem ipsum dolor sit",
      link: "/servicess/twoDanimation",
    },
    {
      image: "/servicess/3danimation.png",
      caption: "3D Animation",
      sub1: "Lorem ipsum dolor sit",
      sub2: "Lorem ipsum dolor sit",
      sub3: "Lorem ipsum dolor sit",
      link: "/servicess/threeDanimation",
    },
    {
      image: "/servicess/Whiteboard Animation.png",
      caption: "Whiteboard Animation",
      sub1: "Lorem ipsum dolor sit",
      sub2: "Lorem ipsum dolor sit",
      sub3: "Lorem ipsum dolor sit",
      link: "/servicess/whiteboard-animation",
    },
    {
      image: "/servicess/character.png",
      caption: "Character Design",
      sub1: "Lorem ipsum dolor sit",
      sub2: "Lorem ipsum dolor sit",
      sub3: "Lorem ipsum dolor sit",
      link: "/servicess/character-design",
    },
    {
      image: "/servicess/motion-graphics.png",
      caption: "Motion Graphics",
      sub1: "Lorem ipsum dolor sit",
      sub2: "Lorem ipsum dolor sit",
      sub3: "Lorem ipsum dolor sit",
      link: "/servicess/motion-graphics",
    },
    {
      image: "/servicess/red-machine.png",
      caption: "Product Animation",
      sub1: "Lorem ipsum dolor sit",
      sub2: "Lorem ipsum dolor sit",
      sub3: "Lorem ipsum dolor sit",
      link: "/servicess/product-animation",
    },
    {
      image: "/servicess/VFX & Post Production.png",
      caption: "VFX & Post Production",
      sub1: "Lorem ipsum dolor sit",
      sub2: "Lorem ipsum dolor sit",
      sub3: "Lorem ipsum dolor sit",
      link: "/servicess/vfx-post-production",
    },
    {
      image: "/servicess/video.png",
      caption: "Video Editing & Post Production",
      sub1: "Lorem ipsum dolor sit",
      link: "/servicess/video-editing-post-production",
    },
    {
      image: "/servicess/storytelling.png",
      caption: "Storytelling",
      sub1: "Lorem ipsum dolor sit",
      sub2: "Lorem ipsum dolor sit",
      link: "/servicess/storytelling",
    },
  ];

  if (loading) {
    return (
      <section className={styles.ServiceImage}>
        <div className="container">
          <div className={styles.sub}>{sub}</div>
          <div className={styles.headings}>
            {head.length > 0 && <h2>{head}</h2>}
          </div>
          <div className="container">
            <div className={`row ${styles.serimgs}`}>
              <div className={styles.loadingMessage}>Loading services...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={styles.ServiceImage}>
        <div className="container">
          <div className={styles.sub}>{sub}</div>
          <div className={styles.headings}>
            {head.length > 0 && <h2>{head}</h2>}
            {showSelect && (
              <select className={styles.select}>
                <option value="scale" className={styles.options}>
                  Creative Team
                </option>
                <option value="fade" className={styles.options}>
                  Fade
                </option>
                <option value="slide" className={styles.options}>
                  Slide
                </option>
              </select>
            )}
          </div>
          <div className="container">
            <div className={`row ${styles.serimgs}`}>
              {servicesData.map((item, index) => (
                <div key={index} className={styles.serImg}>
                  <div className={styles.serMain}>
                    <Animation
                      data={item}
                      buttonName={showButton ? "LEARN MORE" : null}
                      anim={anim}
                      showButton={showButton}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}