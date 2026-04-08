import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamingMobile({ data }: Props) {
  return (
    <section className="defer-section relative overflow-hidden bg-surface-container-low px-4 py-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="naming-card overflow-hidden rounded-[28px] border border-primary/8 bg-white/60 shadow-[0_16px_40px_rgba(31,94,59,0.08)] backdrop-blur-sm">
          <div className="relative h-[240px] overflow-hidden">
            <img
              className="naming-image h-full w-full object-cover"
              src={data.namingImage}
              alt={data.namingTitle}
              width="960"
              height="720"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,94,59,0.52)_0%,rgba(31,94,59,0.16)_42%,rgba(31,94,59,0.02)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="inline-flex max-w-[85%] rounded-2xl border border-white/14 bg-white/10 px-3 py-2 backdrop-blur-md">
                <p className="text-[12px] font-semibold leading-5 text-white">
                  {data.namingQuote}
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 pb-5 pt-4">
            <div className="mb-3 inline-flex items-center rounded-full bg-secondary-container px-3 py-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#2d1600]">
                Asal Penamaan
              </span>
            </div>

            <h2 className="text-[1.55rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-primary">
              {data.namingTitle}
            </h2>

            <div className="mt-3 h-4 w-20 bg-secondary-container"
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

            <p className="mt-4 text-[14px] leading-7 text-on-surface/78">
              {data.namingDescription}
            </p>

            <a
              href="/sejarah"
              className="naming-link mt-5 inline-flex items-center gap-2 rounded-full border border-primary/12 bg-primary/5 px-4 py-2.5 text-[13px] font-bold text-secondary"
            >
              <span>Baca Selengkapnya</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .naming-card {
          animation: namingCardReveal 720ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .naming-image {
          animation: namingImageFloat 14s ease-in-out infinite alternate;
          transform: scale(1.03);
          will-change: transform;
        }

        .naming-link {
          transition:
            transform 220ms ease,
            background-color 220ms ease,
            border-color 220ms ease,
            color 220ms ease,
            box-shadow 220ms ease;
        }

        .naming-link:active {
          transform: scale(0.985);
        }

        .naming-link:hover,
        .naming-link:active {
          background: rgba(31, 94, 59, 0.09);
          border-color: rgba(31, 94, 59, 0.16);
        }

        @keyframes namingCardReveal {
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

        @keyframes namingImageFloat {
          0% {
            transform: scale(1.03) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.07) translate3d(0, -8px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .naming-card,
          .naming-image {
            animation: none !important;
          }

          .naming-link {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
