import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Desa Segamai",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="light" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {[
          <link
            key="fonts-preconnect"
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />,
          <link
            key="fonts-static-preconnect"
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />,
          <link
            key="manrope-font"
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />,
          <link
            key="material-symbols"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />,
          <link
            key="swiper-styles"
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css"
          />,
        ]}
      </head>
      <body className="bg-surface font-body text-on-surface selection:bg-primary/20 antialiased">
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
