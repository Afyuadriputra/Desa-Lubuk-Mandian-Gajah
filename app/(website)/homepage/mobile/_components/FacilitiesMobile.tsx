"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { HomepageData } from "../../data/homepage.types";
import type { SwiperInstance } from "./swiper.types";

type Props = {
  data: HomepageData;
};

const AUTOPLAY_DELAY = 4200;

const facilityDescriptions: Record<
  string,
  {
    eyebrow: string;
    short: string;
    detail: string;
    accent: string;
    stat?: string;
  }
> = {
  construction: {
    eyebrow: "Infrastruktur Jalan",
    short: "Saluran penunjang mobilitas dan ketahanan akses lingkungan.",
    detail:
      "Box culvert membantu aliran air tetap lancar dan menjaga akses jalan desa lebih aman, terutama saat curah hujan meningkat.",
    accent: "from-primary/15 to-primary/5",
    stat: "58 Unit",
  },
  water: {
    eyebrow: "Tata Air Desa",
    short: "Embung dan reservoir mendukung pengelolaan air kawasan desa.",
    detail:
      "Embung dan reservoir berfungsi sebagai cadangan air, pengendali genangan, serta mendukung kebutuhan lingkungan dan aktivitas warga.",
    accent: "from-secondary/20 to-secondary/5",
    stat: "19 Titik Air",
  },
  school: {
    eyebrow: "Pendidikan",
    short: "Fasilitas belajar dasar untuk anak usia dini hingga sekolah dasar.",
    detail:
      "Keberadaan PAUD dan SDN memberi fondasi pendidikan yang dekat, mudah dijangkau, dan penting bagi tumbuh kembang generasi desa.",
    accent: "from-tertiary/20 to-tertiary/5",
    stat: "2 Layanan Pendidikan",
  },
  health_and_safety: {
    eyebrow: "Kesehatan",
    short: "Layanan kesehatan desa yang dekat dengan kebutuhan warga.",
    detail:
      "Poskesdes menjadi titik layanan dasar untuk pemeriksaan awal, edukasi kesehatan, dan dukungan kebutuhan kesehatan masyarakat desa.",
    accent: "from-error/15 to-error/5",
    stat: "Layanan Dasar",
  },
  account_balance: {
    eyebrow: "Pelayanan Publik",
    short: "Pusat administrasi, koordinasi, dan pelayanan pemerintahan desa.",
    detail:
      "Kantor desa menjadi tempat utama untuk pelayanan administrasi, musyawarah, koordinasi program, dan komunikasi masyarakat.",
    accent: "from-primary/12 to-secondary/10",
    stat: "Pusat Layanan",
  },
};

export default function FacilitiesMobile({ data }: Props) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalSummary = useMemo(() => {
    return data.facilities.reduce((acc, item) => {
      const number = Number(item.label.match(/\d+/)?.[0] ?? 0);
      return acc + number;
    }, 0);
  }, [data.facilities]);

  const clearProgressTimer = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const startProgress = () => {
    clearProgressTimer();
    setProgress(0);

    const startedAt = Date.now();

    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const next = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
      setProgress(next);

      if (next >= 100) {
        clearProgressTimer();
      }
    }, 60);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || typeof window === "undefined") {
      return;
    }

    let retryTimer: number | undefined;
    let isDisposed = false;

    swiperRef.current?.destroy?.(true, true);
    clearProgressTimer();

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
        autoplay: {
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
        breakpoints: {
          420: {
            slidesPerView: 1.14,
            spaceBetween: 16,
          },
        },
      });

      swiperRef.current = instance;

      instance.on?.("slideChange", () => {
        const nextIndex = instance.activeIndex ?? 0;
        setActiveIndex(nextIndex);
        startProgress();
      });

      startProgress();
    };

    initSwiper();

    return () => {
      isDisposed = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      clearProgressTimer();
      swiperRef.current?.destroy?.(true, true);
      swiperRef.current = null;
    };
  }, [data.facilities.length]);

  useEffect(() => {
    return () => clearProgressTimer();
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo?.(index);
    startProgress();
  };

  return (
    <section className="defer-section section-shell-mobile bg-surface-container-low overflow-hidden">
      <div className="px-4">
        <div className="facilities-hero rounded-[28px] border border-primary/10 bg-gradient-to-br from-primary-container to-primary p-5 text-on-primary">
          <div className="ornament-local ornament-local-top" />
          <div className="ornament-local ornament-local-bottom" />

          <div className="relative z-[1]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
              <span className="material-symbols-outlined text-[16px]">
                holiday_village
              </span>
              Fasilitas
            </div>

            <div className="mt-4">
              <h2 className="type-title font-extrabold text-white">
                {data.facilitiesTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/85">
                Infrastruktur dan layanan utama yang mendukung kehidupan warga desa.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/70">
                  Fasilitas
                </p>
                <p className="mt-1 text-xl font-extrabold text-white">
                  {data.facilities.length}
                </p>
              </div>

              <div className="min-w-0 flex-1 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/70">
                  Total Ringkas
                </p>
                <p className="mt-1 truncate text-xl font-extrabold text-white">
                  {totalSummary}+
                </p>
              </div>
            </div>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="autoplay-progress h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div ref={sliderRef} className="swiper facilities-swiper mt-5">
          <div className="swiper-wrapper">
            {data.facilities.map((item, index) => {
              const meta = facilityDescriptions[item.icon] ?? {
                eyebrow: "Fasilitas Desa",
                short: "Fasilitas pendukung kehidupan dan layanan warga desa.",
                detail:
                  "Fasilitas ini menjadi bagian penting dari kehidupan masyarakat dan mendukung aktivitas warga sehari-hari.",
                accent: "from-primary/10 to-secondary/10",
                stat: "Tersedia",
              };

              const isExpanded = expandedIndex === index;
              const isActive = activeIndex === index;

              return (
                <div className="swiper-slide" key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      goToSlide(index);
                      setExpandedIndex(isExpanded ? -1 : index);
                    }}
                    aria-expanded={isExpanded}
                    className={`facility-slide-card w-full rounded-[26px] border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-primary/20 bg-white"
                        : "border-outline/10 bg-surface"
                    }`}
                  >
                    <div className="ornament-card ornament-card-top" />
                    <div className="ornament-card ornament-card-bottom" />

                    <div className="relative z-[1]">
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-primary ring-1 ring-primary/10`}
                        >
                          <span className="material-symbols-outlined text-[28px]">
                            {item.icon}
                          </span>
                        </div>

                        <div className="rounded-full bg-primary/8 px-3 py-1 text-[11px] font-bold text-primary">
                          {meta.stat}
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
                          {meta.eyebrow}
                        </p>
                        <h3 className="mt-1 text-[1.05rem] leading-6 font-extrabold text-on-surface">
                          {item.label}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                          {meta.short}
                        </p>
                      </div>

                      <div
                        className={`detail-wrap grid transition-all duration-300 ${
                          isExpanded
                            ? "mt-4 grid-rows-[1fr] opacity-100"
                            : "mt-0 grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="rounded-2xl bg-surface-container px-4 py-4 ring-1 ring-primary/8">
                            <p className="text-sm leading-6 text-on-surface-variant">
                              {meta.detail}
                            </p>
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
          {data.facilities.map((item, index) => (
            <button
              key={`${item.label}-dot`}
              type="button"
              aria-label={`Pilih ${item.label}`}
              onClick={() => goToSlide(index)}
              className={`snap-indicator relative overflow-hidden rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-primary/15 ring-1 ring-primary/10"
                  : "w-2.5 bg-primary/20"
              } h-2.5`}
            >
              {activeIndex === index && (
                <span className="snap-indicator-fill absolute inset-y-0 left-0 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .facilities-hero {
          position: relative;
          overflow: hidden;
          box-shadow: 0 18px 50px rgba(31, 94, 59, 0.16);
        }

        .facilities-swiper {
          overflow: visible;
          padding-right: 1rem;
        }

        .facility-slide-card {
          position: relative;
          overflow: hidden;
          min-height: 250px;
          -webkit-tap-highlight-color: transparent;
          box-shadow:
            0 10px 28px rgba(31, 94, 59, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.55);
        }

        .swiper-slide {
          height: auto;
        }

        .swiper-slide-active .facility-slide-card {
          transform: translateY(-2px);
          box-shadow:
            0 16px 36px rgba(31, 94, 59, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.65);
        }

        .detail-wrap {
          will-change: grid-template-rows, opacity;
        }

        .autoplay-progress {
          transition: width 90ms linear;
        }

        .snap-indicator-fill {
          animation: snapFill ${AUTOPLAY_DELAY}ms linear forwards;
        }

        .ornament-local,
        .ornament-card {
          position: absolute;
          pointer-events: none;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }

        .ornament-local {
          width: 120px;
          height: 120px;
          opacity: 0.1;
          background-image: url("https://api.iconify.design/gis:ornament.svg");
          filter: brightness(0) invert(1);
        }

        .ornament-local-top {
          top: -24px;
          right: -18px;
          transform: rotate(10deg);
        }

        .ornament-local-bottom {
          bottom: -26px;
          left: -20px;
          transform: rotate(180deg) scale(0.88);
        }

        .ornament-card {
          width: 72px;
          height: 72px;
          opacity: 0.05;
          background-image: url("https://api.iconify.design/gis:ornament.svg");
        }

        .ornament-card-top {
          top: -10px;
          right: -10px;
          transform: rotate(14deg);
        }

        .ornament-card-bottom {
          bottom: -12px;
          left: -12px;
          transform: rotate(190deg) scale(0.88);
        }

        @keyframes snapFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .facilities-hero,
          .facility-slide-card,
          .swiper-slide-active .facility-slide-card {
            box-shadow:
              0 8px 20px rgba(31, 94, 59, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.55);
          }

          .swiper-slide-active .facility-slide-card {
            transform: none;
          }

          .snap-indicator-fill {
            animation: none;
            width: 100%;
          }

          .autoplay-progress {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
