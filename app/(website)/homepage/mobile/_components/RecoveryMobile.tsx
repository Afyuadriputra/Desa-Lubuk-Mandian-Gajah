import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

const recoveryMeta: Record<
  string,
  {
    step: string;
    label: string;
  }
> = {
  "Refleksi Masa Lalu": {
    step: "01",
    label: "Titik Balik",
  },
  PLTB: {
    step: "02",
    label: "Perubahan Praktik",
  },
  "KWT Berkah Mandiri": {
    step: "03",
    label: "Gerakan Warga",
  },
};

export default function RecoveryMobile({ data }: Props) {
  return (
    <section className="relative overflow-hidden bg-surface-container-high px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute right-0 top-24 h-24 w-24 rounded-full bg-secondary-container/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-sm">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1.5 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#2d1600]">
              Alur Pemulihan
            </span>
          </div>

          <h2 className="mt-3 text-[1.65rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary">
            Upaya Pemulihan
          </h2>

          <div className="mt-3 flex justify-center">
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

          <p className="mt-4 text-[14px] leading-7 text-on-surface/76">
            Dari pengalaman pahit kebakaran, desa membangun langkah bertahap
            menuju pemulihan yang lebih bijak, aman, dan berkelanjutan.
          </p>
        </div>

        <div className="relative mt-6">
          <div className="absolute bottom-4 left-[27px] top-4 w-[2px] rounded-full bg-gradient-to-b from-error/25 via-primary/20 to-secondary/20" />

          <div className="flex flex-col gap-4">
            {data.recoveryItems.map((item, index) => {
              const colorClass = item.wrapper ?? "bg-primary/10 text-primary";
              const meta = recoveryMeta[item.title] ?? {
                step: `0${index + 1}`,
                label: "Langkah",
              };

              return (
                <article
                  key={item.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                  className="recovery-card relative pl-16"
                >
                  <div className="absolute left-0 top-0 z-10 flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-white/70 bg-white shadow-[0_10px_24px_rgba(31,94,59,0.08)]">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colorClass}`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[24px] border border-primary/8 bg-white/80 p-4 shadow-[0_12px_30px_rgba(31,94,59,0.06)] backdrop-blur-sm">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary/62">
                          {meta.label}
                        </div>
                        <h3 className="mt-1 text-[1rem] font-extrabold leading-6 text-primary">
                          {item.title}
                        </h3>
                      </div>

                      <span className="shrink-0 rounded-full bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/70">
                        {meta.step}
                      </span>
                    </div>

                    <p className="text-[13px] leading-6 text-on-surface/74">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="380"
          className="mt-5 rounded-[24px] border border-primary/8 bg-primary/5 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">
              trending_up
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
              Arah Perubahan
            </span>
          </div>

          <p className="text-[13px] leading-6 text-on-surface/74">
            Pemulihan tidak berhenti pada menjaga lahan dari api, tetapi juga
            tumbuh menjadi gerakan bersama yang memperkuat pertanian dan
            kepedulian lingkungan desa.
          </p>
        </div>
      </div>

      <style>{`
        .recovery-card {
          animation: recoveryCardReveal 760ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .recovery-card:nth-child(1) {
          animation-delay: 0ms;
        }

        .recovery-card:nth-child(2) {
          animation-delay: 120ms;
        }

        .recovery-card:nth-child(3) {
          animation-delay: 240ms;
        }

        @keyframes recoveryCardReveal {
          0% {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .recovery-card {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}