"use client";

import { useEffect, useRef, useState } from "react";
import type { HomepageData } from "../../data/homepage.types";
import type { SwiperInstance } from "./swiper.types";

type Props = {
  data: HomepageData;
};

export default function GalleryMobile({ data }: Props) {
  const hasGallery = data.gallery.length > 0;
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !hasGallery || typeof window === "undefined") {
      return;
    }

    let retryTimer: number | undefined;
    let isDisposed = false;

    swiperRef.current?.destroy?.(true, true);

    const initSwiper = () => {
      if (isDisposed) return;
      if (!window.Swiper) {
        retryTimer = window.setTimeout(initSwiper, 120);
        return;
      }

      const instance = new window.Swiper(slider, {
        slidesPerView: 1.08,
        spaceBetween: 14,
        centeredSlides: false,
        grabCursor: true,
        speed: 650,
        watchOverflow: true,
        breakpoints: {
          420: {
            slidesPerView: 1.12,
            spaceBetween: 16,
          },
        },
      });

      swiperRef.current = instance;

      instance.on?.("slideChange", () => {
        setActiveIndex(instance.activeIndex ?? 0);
      });
    };

    initSwiper();

    return () => {
      isDisposed = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      swiperRef.current?.destroy?.(true, true);
      swiperRef.current = null;
    };
  }, [data.gallery.length, hasGallery]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo?.(index);
  };

  const activeItem = data.gallery[activeIndex];

  return (
    <>
      <section className="defer-section section-shell-mobile bg-surface overflow-hidden">
        <div className="px-4">
          <div className="gallery-shell rounded-[28px] border border-primary/10 bg-surface-container-low p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <span className="material-symbols-outlined text-[16px]">
                    photo_library
                  </span>
                  Galeri
                </div>

                <h2 className="mt-3 type-title font-extrabold text-primary">
                  {data.galleryTitle}
                </h2>

                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {data.galleryDescription}
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-white px-3 py-2 text-right shadow-sm ring-1 ring-primary/8">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary">
                  Foto
                </p>
                <p className="mt-1 text-sm font-extrabold text-primary">
                  {hasGallery ? activeIndex + 1 : 0}/{data.gallery.length}
                </p>
              </div>
            </div>

            {!hasGallery ? (
              <div className="mt-5 rounded-[22px] border border-dashed border-primary/15 bg-white px-4 py-8 text-center">
                <p className="text-sm font-semibold text-primary">
                  Galeri belum tersedia.
                </p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  Tambahkan item galeri dari dashboard admin agar tampil di homepage.
                </p>
              </div>
            ) : null}

            <div ref={sliderRef} className="swiper gallery-swiper mt-5">
              <div className="swiper-wrapper">
                {data.gallery.map((item, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <div className="swiper-slide" key={`${item.alt}-${index}`}>
                      <button
                        type="button"
                        onClick={() => {
                          goToSlide(index);
                          setLightboxOpen(true);
                        }}
                        className={`gallery-card group w-full overflow-hidden rounded-[26px] border text-left transition-all duration-300 ${
                          isActive
                            ? "border-primary/15 bg-white"
                            : "border-outline/10 bg-surface"
                        }`}
                        aria-label={`Lihat ${item.alt}`}
                      >
                        <div className="gallery-image-wrap relative h-[280px] overflow-hidden">
                          <div className="ornament-gallery ornament-gallery-top" />
                          <img
                            src={item.image}
                            alt={item.alt}
                            className="gallery-image h-full w-full object-cover"
                            width="960"
                            height="1280"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="gallery-overlay absolute inset-x-0 bottom-0 p-4">
                            <div className="rounded-2xl bg-black/28 px-4 py-3 backdrop-blur-[6px]">
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-bold text-white">
                                    {item.alt}
                                  </p>
                                  {item.caption ? (
                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/80">
                                      {item.caption}
                                    </p>
                                  ) : null}
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/18 text-white">
                                  <span className="material-symbols-outlined text-[20px]">
                                    open_in_full
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {data.gallery.map((item, index) => (
                <button
                  key={`${item.alt}-dot`}
                  type="button"
                  aria-label={`Pilih gambar ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className={`gallery-dot min-h-3 min-w-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-8 bg-primary"
                      : "w-3 bg-primary/30"
                  } h-3`}
                />
              ))}
            </div>

            <div className="mt-4 overflow-x-auto hide-scrollbar -mx-4 px-4">
              <div className="flex gap-3 pb-1">
                {data.gallery.map((item, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={`${item.alt}-thumb`}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`gallery-thumb relative h-[72px] w-[88px] shrink-0 overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-outline/10"
                      }`}
                      aria-label={`Preview ${item.alt}`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover"
                        width="320"
                        height="256"
                        loading="lazy"
                        decoding="async"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-primary/10" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeItem ? (
              <div className="mt-4 rounded-[22px] border border-primary/8 bg-white px-4 py-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
                  Sorotan
                </p>
                <h3 className="mt-1 text-sm font-extrabold text-on-surface">
                  {activeItem.alt}
                </h3>
                {activeItem.caption ? (
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                    {activeItem.caption}
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                    Dokumentasi visual yang merekam ruang, suasana, dan wajah
                    kehidupan desa.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {lightboxOpen && activeItem ? (
        <div
          className="gallery-lightbox fixed inset-0 z-[60] flex items-end bg-black/72 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full rounded-t-[28px] bg-surface-container-low p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
                  Galeri Desa
                </p>
                <h3 className="truncate text-sm font-extrabold text-on-surface">
                  {activeItem.alt}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/8 text-primary"
                aria-label="Tutup galeri"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>

            <div className="overflow-hidden rounded-[24px]">
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="max-h-[68vh] w-full object-cover"
                width="1280"
                height="1600"
                decoding="async"
              />
            </div>

            {activeItem.caption ? (
              <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                {activeItem.caption}
              </p>
            ) : null}

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  goToSlide(
                    activeIndex === 0 ? data.gallery.length - 1 : activeIndex - 1
                  )
                }
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-sm font-semibold text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                Sebelumnya
              </button>

              <div className="rounded-full bg-secondary/10 px-3 py-2 text-xs font-bold text-secondary">
                {activeIndex + 1}/{data.gallery.length}
              </div>

              <button
                type="button"
                onClick={() =>
                  goToSlide(
                    activeIndex === data.gallery.length - 1 ? 0 : activeIndex + 1
                  )
                }
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Berikutnya
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .gallery-shell {
          box-shadow: 0 16px 42px rgba(31, 94, 59, 0.08);
        }

        .gallery-swiper {
          overflow: visible;
          padding-right: 1rem;
        }

        .gallery-swiper .swiper-wrapper {
          display: flex;
          align-items: stretch;
        }

        .gallery-card {
          -webkit-tap-highlight-color: transparent;
          box-shadow:
            0 10px 28px rgba(31, 94, 59, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.55);
        }

        .gallery-swiper .swiper-slide {
          height: auto;
          flex-shrink: 0;
        }

        .gallery-swiper .swiper-slide-active .gallery-card {
          transform: translateY(-2px);
          box-shadow:
            0 16px 38px rgba(31, 94, 59, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.65);
        }

        .gallery-image-wrap {
          position: relative;
        }

        .gallery-image {
          transition: transform 500ms ease;
        }

        .gallery-swiper .swiper-slide-active .gallery-image {
          transform: scale(1.03);
        }

        .gallery-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.34) 0%,
            rgba(0, 0, 0, 0.08) 50%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .gallery-dot {
          flex: 0 0 auto;
        }

        .gallery-thumb {
          -webkit-tap-highlight-color: transparent;
        }

        .ornament-gallery {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          width: 84px;
          height: 84px;
          opacity: 0.12;
          background-image: url("https://api.iconify.design/gis:ornament.svg");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          filter: brightness(0) invert(1);
        }

        .ornament-gallery-top {
          top: 10px;
          right: 10px;
          transform: rotate(12deg);
        }

        .gallery-lightbox {
          animation: fadeIn 220ms ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-swiper .swiper-slide-active .gallery-card {
            transform: none;
          }

          .gallery-image {
            transition: none;
          }

          .gallery-swiper .swiper-slide-active .gallery-image {
            transform: none;
          }

          .gallery-lightbox {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
