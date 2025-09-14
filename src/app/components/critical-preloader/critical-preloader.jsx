import Head from "next/head";

const CriticalResourcePreloader = () => {
  return (
    <Head>
      {/* Preload critical images */}
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
        href="/video-bg.png" 
        type="image/png"
        fetchPriority="high"
      />
      
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/geist/v1/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7SUc.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload critical CSS */}
      <link
        rel="preload"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        as="style"
        onLoad="this.onload=null;this.rel='stylesheet'"
      />
    </Head>
  );
};

export default CriticalResourcePreloader;