import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function CultureMobile({ data }: Props) {
  return (
    <section className="relative overflow-hidden bg-surface px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute right-0 top-24 h-24 w-24 rounded-full bg-secondary-container/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-sm">
        <div className="culture-shell">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1.5 shadow-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#2d1600]">
                Warisan Budaya
              </span>
            </div>

            <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary">
              {data.cultureTitle}
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

            <p className="mt-4 text-[14px] leading-7 text-on-surface/78">
              {data.cultureDescription}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4">
            {data.cultureCards.map((card, index) => (
              <article
                key={card.title}
                className="culture-card group rounded-[24px] border border-primary/8 bg-white/72 p-4 shadow-[0_12px_30px_rgba(31,94,59,0.06)] backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="culture-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/8 text-secondary shadow-inner shadow-primary/5">
                    <span className="material-symbols-outlined text-[22px]">
                      {card.icon}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="mb-1 inline-flex rounded-full bg-primary/5 px-2.5 py-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary/75">
                        Identitas
                      </span>
                    </div>

                    <h3 className="text-[1rem] font-extrabold leading-6 text-primary">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-[13px] leading-6 text-on-surface/72">
                      {card.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .culture-shell {
          animation: cultureReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .culture-card {
          animation: cultureCardReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            box-shadow 220ms ease,
            background-color 220ms ease;
        }

        .culture-card:active {
          transform: scale(0.988);
        }

        .culture-card:hover,
        .culture-card:active {
          border-color: rgba(31, 94, 59, 0.14);
          box-shadow: 0 16px 34px rgba(31, 94, 59, 0.08);
          background: rgba(255, 255, 255, 0.82);
        }

        .culture-icon {
          transition:
            transform 220ms ease,
            background-color 220ms ease;
        }

        .culture-card:hover .culture-icon,
        .culture-card:active .culture-icon {
          transform: translateY(-1px);
          background: rgba(31, 94, 59, 0.12);
        }

        @keyframes cultureReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes cultureCardReveal {
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
          .culture-shell,
          .culture-card {
            animation: none !important;
          }

          .culture-card,
          .culture-icon {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}