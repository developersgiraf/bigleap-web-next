import GradientLights from "../components/gradient-lights/gradient.jsx";
import Image from "next/image";
export default function PortfolioPage() {
  return (
    <>
    <div>
      <Image src="/testimonials.png" alt="Portfolio Image" layout="responsive" width={700} height={475} />
      <div style={{color: "white"}}>hloooo</div>
    </div>
      <GradientLights />
    </>
  );
}
