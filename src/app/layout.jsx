import { Geist, Geist_Mono } from "next/font/google";
// import url("https://use.typekit.net/jdv0uzk.css");
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "./components/header/header";
import InfoArea from "./components/info-area/info";
import Footer from "./components/footer/footer";
import ConditionalLayout from "./components/ConditionalLayout";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bigleap-new",
  description: "Bigleap new",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Comic Book Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Creepster&family=Fredoka+One&family=Kalam:wght@300;400;700&display=swap"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
        <div className="head-info">
          <ConditionalLayout excludeComponents={['info']}>
            <InfoArea />
          </ConditionalLayout>
          <MainHeader />
          </div>
          {children}
          <ConditionalLayout excludeComponents={['footer']}>
            <Footer />
          </ConditionalLayout>
        </Providers>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
