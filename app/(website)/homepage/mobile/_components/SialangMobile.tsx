import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function SialangMobile({ data }: Props) {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-8 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-white/6 blur-3xl" />
        <div className="absolute right-0 top-24 h-24 w-24 rounded-full bg-secondary-container/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-sm">
        <div className="sialang-shell">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary-container">
                forest
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/88">
                {data.sialangBadge}
              </span>
            </span>

            <h2 className="mt-3 text-[1.65rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
              {data.sialangTitle}
            </h2>

            <div
              className="mt-3 h-4 w-20 bg-secondary-container"
              style={{
                WebkitMaskImage:
                  'url("https://api.iconify.design/gis:ornament.svg")',
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskImage:
                  'url("https://api.iconify.design/gis:ornament.svg")',
                maskRepeat: "no-repeat",
                maskPosition: "left center",
              }}
            />
          </div>

          <div className="relative overflow-hidden rounded-[28px] shadow-[0_18px_42px_rgba(0,0,0,0.22)]">
            <img
              className="sialang-image h-[260px] w-full object-cover"
              src={data.sialangImage}
              alt={data.sialangTitle}
            />

            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,94,59,0.82)_0%,rgba(31,94,59,0.30)_46%,rgba(31,94,59,0.03)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="max-w-[88%] rounded-2xl border border-white/14 bg-white/10 px-3 py-2 backdrop-blur-md">
                <p className="text-[12px] font-semibold leading-5 text-white">
                  {data.sialangQuote}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
            <p className="text-[14px] leading-7 text-white/86">
              {data.sialangDescription}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="sialang-info-card rounded-[22px] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-secondary-container">
                  <span className="material-symbols-outlined text-[22px]">
                    park
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/65">
                    Area Lindung
                  </div>
                  <p className="text-[14px] font-bold leading-6 text-white">
                    {data.sialangStat}
                  </p>
                </div>
              </div>
            </div>

            <div className="sialang-info-card rounded-[22px] border border-white/12 bg-secondary-container/12 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary-container/18 text-secondary-container">
                  <span className="material-symbols-outlined text-[22px]">
                    hive
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/65">
                    Tradisi Adat
                  </div>
                  <p className="text-[13px] leading-6 text-white/84">
                    Menumbai dipimpin oleh Juagan Tuo dan Juagan Mudo sebagai
                    bagian dari warisan adat yang tetap dijaga.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sialang-shell {
          animation: sialangReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .sialang-image {
          animation: sialangImageFloat 14s ease-in-out infinite alternate;
          transform: scale(1.03);
          will-change: transform;
        }

        .sialang-info-card {
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            box-shadow 220ms ease;
        }

        .sialang-info-card:active {
          transform: scale(0.988);
        }

        .sialang-info-card:hover,
        .sialang-info-card:active {
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
        }

        @keyframes sialangReveal {
          0% {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes sialangImageFloat {
          0% {
            transform: scale(1.03) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.07) translate3d(0, -8px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sialang-shell,
          .sialang-image {
            animation: none !important;
          }

          .sialang-info-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}