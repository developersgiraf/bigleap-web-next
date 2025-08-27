import GradientLights from "../../components/gradient-lights/gradient.jsx";

export default function portfolioDetail({ params }) {
  const { portfolios } = params;

  return (
    <>
      <GradientLights />
      <div>
        <h1>Portfolio: {portfolios}</h1>
      </div>
    </>
  );
}

   
