"use client";

import * as React from "react";
import type { HomepageData } from "../../data/homepage.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function HomeNavbar({ data }: Props) {
  const hasLogo = Boolean(data.brand.logoUrl);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
        isScrolled
          ? "border-primary/10 bg-surface/92 shadow-[0_18px_40px_-34px_rgba(31,94,59,0.8)] backdrop-blur-xl"
          : "border-primary/5 bg-surface/80 shadow-sm backdrop-blur-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <a
            className="brand-link inline-flex items-center gap-3 rounded-[1.4rem] border border-primary/10 bg-white/75 px-3 py-2 text-primary shadow-sm hover:text-[#1f5e3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
            href="/homepage"
          >
            <div className="flex h-14 w-12 items-center justify-center rounded-lg bg-white ring-1 ring-primary/10">
              {hasLogo ? (
                <img
                  className="h-12 w-10 object-contain"
                  src={data.brand.logoUrl}
                  alt={data.brand.logoAlt}
                  width="40"
                  height="58"
                  fetchPriority="high"
                />
              ) : (
                <DesktopIcon name="location_city" className="h-7 w-7 text-primary/60" />
              )}
            </div>
            <span className="flex min-w-0 flex-col gap-1 leading-none">
              <Badge className="w-fit border-primary/8 bg-primary/6 px-2.5 py-1 text-[9px] tracking-[0.16em] text-primary/75">
                {data.brand.regionLabel}
              </Badge>
              <span className="truncate text-xl font-bold tracking-tight">{data.villageName}</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-5">
            <a aria-current="page" className="nav-link type-body font-semibold text-primary border-b-2 border-secondary pb-2" href="/homepage">
              Beranda
            </a>
            <a className="nav-link type-body font-semibold text-stone-600 hover:text-primary" href="/sejarah">
              Sejarah
            </a>
            <a className="nav-link type-body font-semibold text-stone-600 hover:text-primary" href="/gambut">
              Gambut
            </a>
            <a className="nav-link type-body font-semibold text-stone-600 hover:text-primary" href="/potensi">
              Potensi
            </a>
            <Separator orientation="vertical" className="h-6 bg-primary/12" />
            <span className="type-label text-primary/55">Jelajahi Desa</span>
          </div>

          <Button asChild className="nav-cta hidden md:inline-flex">
            <a href="#kontak">Kontak</a>
          </Button>

          <details className="mobile-nav md:hidden relative">
            <summary aria-label="Buka navigasi" className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-[#795900]/15 bg-white/70 px-4 py-4 font-semibold text-primary shadow-sm cursor-pointer touch-manipulation">
              <DesktopIcon name="menu" className="menu-open h-5 w-5" />
              <DesktopIcon name="close" className="menu-close h-5 w-5" />
              <span className="type-body text-sm">Menu</span>
            </summary>

            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-3xl border border-[#795900]/10 bg-[#fff9eb]/95 p-4 shadow-xl backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                <a aria-current="page" className="nav-link rounded-2xl bg-primary/10 px-4 py-4 font-semibold text-primary" href="/homepage">
                  Beranda
                </a>
                <a className="nav-link rounded-2xl px-4 py-4 font-semibold text-stone-700 hover:bg-primary/5 hover:text-primary" href="/sejarah">
                  Sejarah
                </a>
                <a className="nav-link rounded-2xl px-4 py-4 font-semibold text-stone-700 hover:bg-primary/5 hover:text-primary" href="/gambut">
                  Gambut
                </a>
                <a className="nav-link rounded-2xl px-4 py-4 font-semibold text-stone-700 hover:bg-primary/5 hover:text-primary" href="/potensi">
                  Potensi
                </a>
                <a className="nav-cta mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-4 py-4 font-bold text-on-primary hover:bg-primary-container" href="#kontak">
                  Kontak
                </a>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
