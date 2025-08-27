export default function portfolioDetail({ params }) {
  const { portfolios } = params;

  return (
    <div>
      <h1>Portfolio: {portfolios}</h1>
    </div>
  );
}

   
