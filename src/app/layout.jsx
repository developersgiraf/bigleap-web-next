import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "./components/header/header";
import InfoArea from "./components/info-area/info";
import Footer from "./components/footer/footer";
import WebVitals from "./components/web-vitals/web-vitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//img.youtube.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <WebVitals />
        <InfoArea />
        <MainHeader />
        {children}
        <Footer />
        
        {/* Load FontAwesome with better strategy */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          strategy="afterInteractive"
        />
        
        {/* Load Bootstrap JS after interactive */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
