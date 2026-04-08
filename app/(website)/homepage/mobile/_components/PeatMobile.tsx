import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function PeatMobile({ data }: Props) {
  return (
    <section className="defer-section relative overflow-hidden bg-surface px-4 py-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="peat-shell">
          <div className="mb-4">
            <div className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1.5 shadow-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#2d1600]">
                Lanskap Gambut
              </span>
            </div>

            <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-primary">
              {data.peatTitle}
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

          <div className="relative overflow-hidden rounded-[28px] shadow-[0_16px_40px_rgba(31,94,59,0.10)]">
            <img
              className="peat-image h-[240px] w-full object-cover"
              src={data.peatImages[0]}
              alt={data.peatTitle}
              width="960"
              height="720"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,94,59,0.56)_0%,rgba(31,94,59,0.15)_45%,rgba(31,94,59,0.02)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="inline-flex max-w-[88%] rounded-2xl border border-white/14 bg-white/10 px-3 py-2 backdrop-blur-md">
                <p className="text-[12px] font-semibold leading-5 text-white">
                  {data.peatQuote}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-secondary/10 bg-secondary-fixed/20 p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">
                water_drop
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-secondary">
                Nilai Ekologis
              </span>
            </div>

            <p className="text-[14px] italic leading-7 text-secondary">
              “{data.peatQuote}”
            </p>
          </div>

          <div className="mt-4 rounded-[24px] border border-primary/8 bg-white/70 p-4 shadow-[0_12px_30px_rgba(31,94,59,0.06)] backdrop-blur-sm">
            <p className="text-[14px] leading-7 text-on-surface/78">
              {data.peatDescription}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .peat-shell {
          animation: peatReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .peat-image {
          animation: peatImageFloat 14s ease-in-out infinite alternate;
          transform: scale(1.03);
          will-change: transform;
        }

        @keyframes peatReveal {
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

        @keyframes peatImageFloat {
          0% {
            transform: scale(1.03) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.07) translate3d(0, -8px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .peat-shell,
          .peat-image {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
