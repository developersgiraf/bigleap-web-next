import ServiceImage from "../../../../components/services-sect/servicesImage";
import GradientLights from "../../../../components/gradient-lights/gradient";

export default function PortfolioGallery({ projectGallery }) {
  // Fallback data if no projectGallery is provided
  const fallbackData = {
    title: "Portfolio Projects",
    subtitle: "Our Latest Work",
    projects: []
  };

  const galleryData = projectGallery || fallbackData;

  return (
    <>
      <ServiceImage
        sub={galleryData.title}
        head={galleryData.subtitle}
        data={galleryData.projects}
        showButton={false}
        showSelect={false}
        anim={false}
      />
      <GradientLights />
    </>
  );
}