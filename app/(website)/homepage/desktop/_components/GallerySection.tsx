"use client";

import * as React from "react";
import type { HomepageData } from "../../data/homepage.types";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeItem = data.gallery[activeIndex];

  return (
    <section className="section-shell bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-stack-tight mb-12">
          <h2 className="type-title font-bold text-primary text-balance">{data.galleryTitle}</h2>
          <p className="type-body text-on-surface-variant max-w-3xl">{data.galleryDescription}</p>
        </div>

        {data.gallery.length === 0 ? (
          <Card className="p-10 text-center text-on-surface-variant">
            Galeri belum tersedia.
          </Card>
        ) : (
          <Dialog>
            <div className="masonry-grid">
              {data.gallery.map((item, index) => (
                <DialogTrigger key={`${item.alt}-${index}`} asChild>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Buka galeri ${item.alt || `gambar ${index + 1}`}`}
                    className={`group relative overflow-hidden rounded-[1.75rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${item.tall ? "row-span-2" : ""}`}
                  >
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      src={item.image}
                      alt={item.alt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent opacity-90 transition-opacity duration-200 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                          Dokumentasi Desa
                        </p>
                        <p className="mt-1 text-lg font-bold text-white">
                          {item.caption || item.alt || `Galeri ${index + 1}`}
                        </p>
                      </div>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white">
                        <DesktopIcon name="arrow_forward" className="h-4 w-4" />
                      </span>
                    </div>
                  </button>
                </DialogTrigger>
              ))}
            </div>

            {activeItem ? (
              <DialogContent>
                <div className="grid max-h-[88vh] md:grid-cols-[1.35fr_0.65fr]">
                  <div className="bg-black">
                    <img
                      className="h-full max-h-[88vh] w-full object-cover"
                      src={activeItem.image}
                      alt={activeItem.alt}
                    />
                  </div>
                  <div className="bg-[#fcf4e5] text-on-surface">
                    <DialogHeader className="p-8 pb-5">
                      <DialogTitle className="text-primary">
                        {activeItem.caption || activeItem.alt || `Galeri ${activeIndex + 1}`}
                      </DialogTitle>
                      <DialogDescription className="text-on-surface-variant">
                        Potret visual desa yang tersaji di halaman publik.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 px-8 pb-8">
                      <div className="rounded-[1.5rem] border border-primary/10 bg-white/75 p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/60">
                          Keterangan
                        </p>
                        <p className="mt-3 type-body text-on-surface-variant">
                          {activeItem.alt || "Dokumentasi visual desa."}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {data.gallery.map((item, index) => (
                          <button
                            key={`${item.alt}-${index}-thumb`}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`overflow-hidden rounded-2xl border transition-colors ${
                              index === activeIndex
                                ? "border-primary shadow-md"
                                : "border-primary/10 opacity-80 hover:opacity-100"
                            }`}
                            aria-label={`Pilih gambar ${index + 1}`}
                          >
                            <img className="h-16 w-16 object-cover" src={item.image} alt="" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            ) : null}
          </Dialog>
        )}
      </div>
    </section>
  );
}
