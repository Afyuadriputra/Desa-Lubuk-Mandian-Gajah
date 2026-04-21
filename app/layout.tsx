import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import SwiperRuntime from "./SwiperRuntime";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Desa Segamai",
  description:
    "Profil Desa Segamai yang menampilkan sejarah, gambut, potensi, fasilitas, galeri, dan informasi kontak desa.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={cn("light", "font-sans")} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="bg-surface font-body text-on-surface selection:bg-primary/20 antialiased"
        suppressHydrationWarning
      >
        <TooltipProvider>
          <SwiperRuntime />
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              classNames: {
                toast:
                  "!rounded-2xl !border !border-black/5 !bg-white/95 !text-slate-900 !shadow-[0_24px_64px_-34px_rgba(15,23,42,0.35)]",
              },
            }}
          />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
