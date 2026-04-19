import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

const statMeta: Record<
  string,
  {
    icon: string;
    desc: string;
    tint: string;
  }
> = {
  Dusun: {
    icon: "location_city",
    desc: "Sebaran wilayah permukiman desa.",
    tint: "linear-gradient(135deg, rgba(31,94,59,0.14) 0%, rgba(31,94,59,0.03) 55%, rgba(255,255,255,0) 100%)",
  },
  Jiwa: {
    icon: "groups",
    desc: "Total penduduk yang tinggal di desa.",
    tint: "linear-gradient(135deg, rgba(246,190,57,0.22) 0%, rgba(246,190,57,0.05) 55%, rgba(255,255,255,0) 100%)",
  },
  "Ha Gambut": {
    icon: "grass",
    desc: "Luas lahan gambut yang dimiliki desa.",
    tint: "linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0.04) 55%, rgba(255,255,255,0) 100%)",
  },
  Embung: {
    icon: "water",
    desc: "Sumber tampungan air untuk desa.",
    tint: "linear-gradient(135deg, rgba(14,165,233,0.16) 0%, rgba(14,165,233,0.04) 55%, rgba(255,255,255,0) 100%)",
  },
};

export default function QuickStatsMobile({ data }: Props) {
  const prioritizedLabels = ["Dusun", "Jiwa", "Ha Gambut", "Embung"];
  const mobileStats = data.stats.filter((item) =>
    prioritizedLabels.includes(item.label)
  );
  const displayedStats =
    mobileStats.length > 0 ? mobileStats : data.stats.slice(0, 4);

  return (
    <section className="relative min-h-screen overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-36 w-36 rounded-full bg-secondary-container/20 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col justify-center px-4 py-5">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-5 text-center">
            <h2 className="text-[1.7rem] font-extrabold leading-tight text-primary">
              Fakta Singkat Desa
            </h2>

            <p className="mx-auto mt-2 max-w-[280px] text-[12px] leading-5 text-on-surface/80">
              {data.quickStatsDescription}
            </p>

            <div className="mt-4 flex justify-center">
              <div
                className="h-4 w-20 bg-secondary-container"
                style={{
                  WebkitMaskImage:
                    'url("https://api.iconify.design/gis:ornament.svg")',
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage:
                    'url("https://api.iconify.design/gis:ornament.svg")',
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {displayedStats.map((item, index) => {
              const meta = statMeta[item.label] ?? {
                icon: "bar_chart",
                desc: "Informasi penting desa.",
                tint: "linear-gradient(135deg, rgba(31,94,59,0.12) 0%, rgba(31,94,59,0.03) 55%, rgba(255,255,255,0) 100%)",
              };

              return (
                <article
                  key={item.label}
                  className="group relative overflow-hidden rounded-[22px] border border-primary/10 bg-white/90 p-4 shadow-[0_10px_30px_rgba(31,94,59,0.08)] backdrop-blur-sm"
                  style={{
                    animation: "qs-card-reveal 480ms cubic-bezier(0.22,1,0.36,1) both",
                    animationDelay: `${index * 110}ms`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: meta.tint }}
                  />
                  <div
                    className="qs-orb absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/50 blur-2xl"
                    style={{
                      animation: "qs-orb-float 7s ease-in-out infinite",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-[23px]">
                          {meta.icon}
                        </span>
                      </div>

                      <span className="rounded-full bg-primary/5 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-primary/90">
                        Info
                      </span>
                    </div>

                    <div className="text-[1.85rem] font-extrabold leading-none tracking-tight text-primary">
                      {item.value}
                    </div>

                    <h3 className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-on-surface/85">
                      {item.label}
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-on-surface/72">
                      {meta.desc}
                    </p>
                  </div>

                  <div className="absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[rgba(31,94,59,0.35)] to-transparent opacity-0 transition duration-300 group-active:opacity-100" />
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes qs-card-reveal {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes qs-orb-float {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.25;
          }
          50% {
            transform: translate3d(-2px, 4px, 0) scale(1.04);
            opacity: 0.4;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          article {
            animation: none !important;
          }

          .qs-orb {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
