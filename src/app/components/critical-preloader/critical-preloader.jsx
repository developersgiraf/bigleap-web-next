import Head from "next/head";

const CriticalResourcePreloader = () => {
  return (
    <Head>
      {/* Preload critical images with highest priority */}
      <link 
        rel="preload" 
        as="image" 
        href="/Yeeha.png" 
        type="image/png"
        fetchPriority="high"
      />
      <link 
        rel="preload" 
        as="image" 
        href="/character.png" 
        type="image/png"
        fetchPriority="high"
      />
      <link 
        rel="preload" 
        as="image" 
        href="/Scate.png" 
        type="image/png"
        fetchPriority="high"
      />
      
      {/* Preload critical background image */}
      <link 
        rel="preload" 
        as="image" 
        href="/video-bg.png" 
        type="image/png"
        fetchPriority="high"
      />
      
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://img.youtube.com" />
      
      {/* Prefetch likely navigation */}
      <link rel="prefetch" href="/about" />
      <link rel="prefetch" href="/portfolio" />
      <link rel="prefetch" href="/servicess" />
      
      {/* Resource hints for performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  );
};

export default CriticalResourcePreloader;