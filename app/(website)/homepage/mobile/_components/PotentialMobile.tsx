"use client";

import { useEffect, useId, useRef } from "react";
import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

declare global {
  interface Window {
    Swiper?: new (
      element: Element,
      options: Record<string, unknown>
    ) => {
      realIndex: number;
      slideTo: (index: number) => void;
      destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
    };
  }
}

const potentialMeta: Record<
  string,
  {
    icon: string;
    subtitle: string;
  }
> = {
  Karet: {
    icon: "forest",
    subtitle: "Hasil kebun yang menopang ekonomi warga.",
  },
  Sawit: {
    icon: "eco",
    subtitle: "Komoditas utama dengan nilai produksi tinggi.",
  },
  Padi: {
    icon: "grass",
    subtitle: "Pangan lokal yang menghidupi keseharian desa.",
  },
  Cabe: {
    icon: "local_florist",
    subtitle: "Komoditas hortikultura bernilai jual baik.",
  },
  Madu: {
    icon: "hive",
    subtitle: "Hasil alam yang lekat dengan tradisi Sialang.",
  },
};

export default function PotentialMobile({ data }: Props) {
  const sectionId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.Swiper) return;

    const swiperEl = root.querySelector(".potential-swiper");
    const progressEls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-story-progress]")
    );
    const dotEls = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-story-dot]")
    );
    const modal = root.querySelector<HTMLElement>("[data-preview-modal]");
    const previewImageWrap = root.querySelector<HTMLElement>(
      "[data-preview-image-wrap]"
    );
    const previewTitle =
      root.querySelector<HTMLElement>("[data-preview-title]");
    const previewSubtitle = root.querySelector<HTMLElement>(
      "[data-preview-subtitle]"
    );
    const previewTriggers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-preview-trigger]")
    );
    const previewCloseEls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-preview-close]")
    );

    if (!swiperEl) return;

    const updateIndicators = (swiper: { realIndex: number }) => {
      progressEls.forEach((el, index) => {
        el.classList.remove("is-past", "is-active");
        if (index < swiper.realIndex) el.classList.add("is-past");
        if (index === swiper.realIndex) el.classList.add("is-active");
      });

      dotEls.forEach((el, index) => {
        el.classList.toggle("is-active", index === swiper.realIndex);
      });
    };

    const swiper = new window.Swiper(swiperEl, {
      slidesPerView: 1.12,
      centeredSlides: true,
      spaceBetween: 12,
      speed: 620,
      grabCursor: true,
      slideToClickedSlide: true,
      watchSlidesProgress: true,
      resistanceRatio: 0.82,
      observer: true,
      observeParents: true,
      breakpoints: {
        390: {
          slidesPerView: 1.08,
          spaceBetween: 14,
        },
      },
      on: {
        init(swiperInstance: { realIndex: number }) {
          updateIndicators(swiperInstance);
        },
        slideChange(swiperInstance: { realIndex: number }) {
          updateIndicators(swiperInstance);
        },
      },
    });

    const dotHandlers = dotEls.map((dot, index) => {
      const handler = () => swiper.slideTo(index);
      dot.addEventListener("click", handler);
      return { dot, handler };
    });

    const openPreview = (
      image: string | null,
      title: string | null,
      subtitle: string | null
    ) => {
      if (!modal || !previewImageWrap || !previewTitle || !previewSubtitle)
        return;

      previewImageWrap.innerHTML = "";

      if (image) {
        const img = document.createElement("img");
        img.className = "story-preview-image";
        img.src = image;
        img.alt = title || "";
        previewImageWrap.appendChild(img);
      }

      previewTitle.textContent = title || "";
      previewSubtitle.textContent = subtitle || "";
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closePreview = () => {
      if (!modal || !previewImageWrap) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      previewImageWrap.innerHTML = "";
      document.body.style.overflow = "";
    };

    const triggerHandlers = previewTriggers.map((trigger) => {
      const handler = () => {
        openPreview(
          trigger.getAttribute("data-image"),
          trigger.getAttribute("data-title"),
          trigger.getAttribute("data-subtitle")
        );
      };
      trigger.addEventListener("click", handler);
      return { trigger, handler };
    });

    const closeHandlers = previewCloseEls.map((el) => {
      const handler = () => closePreview();
      el.addEventListener("click", handler);
      return { el, handler };
    });

    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      dotHandlers.forEach(({ dot, handler }) =>
        dot.removeEventListener("click", handler)
      );
      triggerHandlers.forEach(({ trigger, handler }) =>
        trigger.removeEventListener("click", handler)
      );
      closeHandlers.forEach(({ el, handler }) =>
        el.removeEventListener("click", handler)
      );
      document.removeEventListener("keydown", keyHandler);
      document.body.style.overflow = "";
      swiper.destroy(true, true);
    };
  }, []);

  return (
    <section
      id={`potential-story-mobile-${sectionId}`}
      ref={rootRef}
      className="section-shell-mobile relative overflow-hidden bg-surface px-4"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute right-0 top-24 h-24 w-24 rounded-full bg-secondary-container/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-sm">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1.5 shadow-sm">
            <span className="type-label text-[10px] font-extrabold text-on-secondary-fixed">
              Potensi Desa
            </span>
          </div>

          <h2 className="type-title mt-3 font-extrabold tracking-[-0.02em] text-primary">
            Potensi Unggulan
          </h2>

          <p className="type-body mx-auto mt-4 max-w-[32ch] text-sm text-on-surface/76">
            Geser seperti melihat story untuk mengenal hasil kebun, pangan, dan
            kekayaan alam desa.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">
              swipe
            </span>
            <span className="text-[11px] font-bold text-primary/75">
              Geser untuk melihat
            </span>
          </div>

          <span className="type-label text-[11px] font-bold text-primary/55">
            {data.potentials.length} cerita
          </span>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-1.5" aria-hidden="true">
          {data.potentials.map((item, index) => (
            <span
              key={item.title}
              data-story-progress={index}
              className={`story-progress-bar ${index === 0 ? "is-active" : ""}`}
            />
          ))}
        </div>

        <div className="swiper potential-swiper mt-4 overflow-visible">
          <div className="swiper-wrapper">
            {data.potentials.map((item, index) => {
              const meta = potentialMeta[item.title] ?? {
                icon: "yard",
                subtitle: "Potensi unggulan desa.",
              };

              return (
                <div className="swiper-slide" key={item.title}>
                  <article className="story-card">
                    <button
                      type="button"
                      className="story-media-button"
                      data-preview-trigger="true"
                      data-image={item.image}
                      data-title={item.title}
                      data-subtitle={meta.subtitle}
                      aria-label={`Lihat preview ${item.title}`}
                    >
                      <div className="story-media">
                        <img
                          className="story-image"
                          src={item.image}
                          alt={item.title}
                        />
                        <div className="story-image-overlay" />

                        <div className="story-chip">
                          <span className="material-symbols-outlined text-[16px] text-secondary-container">
                            {meta.icon}
                          </span>
                          <span className="type-label text-[10px] font-extrabold text-white">
                            Potensi
                          </span>
                        </div>

                        <div className="story-index">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </button>

                    <div className="story-panel">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-[1.1rem] font-extrabold leading-6 text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-[13px] leading-6 text-on-surface/72">
                            {meta.subtitle}
                          </p>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                          <span className="material-symbols-outlined text-[20px]">
                            {meta.icon}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5">
                        <span className="material-symbols-outlined text-[14px] text-primary/70">
                          visibility
                        </span>
                        <span className="text-[11px] font-semibold text-primary/72">
                          Ketuk gambar untuk preview
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
          {data.potentials.map((item, index) => (
            <button
              key={item.title}
              type="button"
              data-story-dot={index}
              className={`story-dot ${index === 0 ? "is-active" : ""}`}
              aria-label={`Lihat slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        className="story-preview-modal"
        data-preview-modal="true"
        aria-hidden="true"
      >
        <div className="story-preview-backdrop" data-preview-close="true" />

        <div
          className="story-preview-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Preview potensi desa"
        >
          <button
            type="button"
            className="story-preview-close"
            data-preview-close="true"
            aria-label="Tutup preview"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div
            className="story-preview-image-wrap"
            data-preview-image-wrap="true"
          />

          <div className="story-preview-panel">
            <h3
              className="text-[1.05rem] font-extrabold leading-6 text-primary"
              data-preview-title="true"
            />
            <p
              className="mt-2 text-[13px] leading-6 text-on-surface/72"
              data-preview-subtitle="true"
            />
          </div>
        </div>
      </div>

      <style>{`
        .potential-swiper {
          overflow: visible;
        }

        .potential-swiper .swiper-slide {
          width: 86%;
          transition: transform 420ms ease, opacity 420ms ease;
          opacity: 0.68;
          transform: scale(0.94);
        }

        .potential-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }

        .potential-swiper .swiper-slide-prev,
        .potential-swiper .swiper-slide-next {
          opacity: 0.86;
          transform: scale(0.965);
        }

        .story-card {
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid rgba(31, 94, 59, 0.08);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 18px 42px rgba(31, 94, 59, 0.08);
          backdrop-filter: blur(8px);
        }

        .story-media-button {
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .story-media {
          position: relative;
          height: 400px;
          overflow: hidden;
          background: #ddd;
        }

        .story-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 700ms ease;
        }

        .potential-swiper .swiper-slide-active .story-image {
          transform: scale(1.06);
        }

        .story-image-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.05) 22%, rgba(0, 0, 0, 0) 48%),
            linear-gradient(to top, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.02) 24%, rgba(0, 0, 0, 0) 48%);
          pointer-events: none;
        }

        .story-chip {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.12);
          padding: 8px 12px;
          backdrop-filter: blur(10px);
        }

        .story-index {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(0, 0, 0, 0.18);
          padding: 6px 10px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
        }

        .story-panel {
          padding: 16px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.97),
            rgba(255, 255, 255, 0.9)
          );
        }

        .story-progress-bar {
          height: 3px;
          border-radius: 999px;
          background: rgba(31, 94, 59, 0.12);
          transition: background-color 260ms ease, transform 260ms ease,
            opacity 260ms ease;
          opacity: 0.7;
        }

        .story-progress-bar.is-past {
          background: rgba(31, 94, 59, 0.35);
          opacity: 1;
        }

        .story-progress-bar.is-active {
          background: rgba(31, 94, 59, 0.95);
          opacity: 1;
          transform: scaleY(1.15);
        }

        .story-dot {
          width: 8px;
          height: 8px;
          border: 0;
          border-radius: 999px;
          background: rgba(31, 94, 59, 0.18);
          transition: width 260ms ease, background-color 260ms ease,
            transform 260ms ease, opacity 260ms ease;
          opacity: 0.9;
        }

        .story-dot.is-active {
          width: 24px;
          background: rgba(31, 94, 59, 0.95);
          transform: translateY(-1px);
        }

        .story-preview-modal {
          position: fixed;
          inset: 0;
          z-index: 80;
          opacity: 0;
          pointer-events: none;
          transition: opacity 260ms ease;
        }

        .story-preview-modal.is-open {
          opacity: 1;
          pointer-events: auto;
        }

        .story-preview-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(10, 16, 12, 0.76);
          backdrop-filter: blur(10px);
        }

        .story-preview-dialog {
          position: absolute;
          inset: auto 16px 16px 16px;
          overflow: hidden;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.26);
          transform: translateY(20px) scale(0.98);
          transition: transform 280ms ease;
        }

        .story-preview-modal.is-open .story-preview-dialog {
          transform: translateY(0) scale(1);
        }

        .story-preview-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          display: flex;
          height: 40px;
          width: 40px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.82);
          color: #1f5e3b;
          backdrop-filter: blur(8px);
        }

        .story-preview-image-wrap {
          height: 58vh;
          max-height: 520px;
          overflow: hidden;
          background: #ddd;
        }

        .story-preview-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-preview-panel {
          padding: 16px;
        }

        @media (max-width: 380px) {
          .potential-swiper .swiper-slide {
            width: 89%;
          }

          .story-media {
            height: 372px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .potential-swiper .swiper-slide,
          .story-image,
          .story-progress-bar,
          .story-dot,
          .story-preview-modal,
          .story-preview-dialog {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
