import { Inter } from "next/font/google";
import Script from "next/script";
import "./critical.css";
import "./globals.css";
import "./performance-optimizations.css";
import "./lightweight-grid.css";
import MainHeader from "./components/header/header";
import InfoArea from "./components/info-area/info";
import Footer from "./components/footer/footer";
import WebVitals from "./components/web-vitals/web-vitals";

// Optimize font loading - use single font family with multiple weights
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const metadata = {
  title: "Bigleap - Digital Product Design Agency",
  description: "Bigleap is a digital product design agency that turns complex technology into intuitive, usable interfaces. We create market-ready digital products.",
  openGraph: {
    title: "Bigleap - Digital Product Design Agency",
    description: "We create market-ready digital products that are easy to use and hard to ignore.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//img.youtube.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      </head>
      <body className={inter.className}>
        <WebVitals />
        <InfoArea />
        <MainHeader />
        {children}
        <Footer />
        
        {/* Defer non-critical CSS */}
        <Script
          id="load-fontawesome"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
              link.media = 'print';
              link.onload = function() { this.media = 'all'; };
              document.head.appendChild(link);
            `
          }}
        />
      </body>
    </html>
  );
}
