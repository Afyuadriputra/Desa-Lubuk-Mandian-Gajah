import type { ReactNode } from "react";
import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

const HERO_INTRO =
  "Hamparan gambut, warisan Melayu Petalangan, dan kehidupan desa dalam satu cerita yang utuh.";

export default function HeroMobile({ data }: Props) {
  return (
    <section className="relative h-[100dvh] overflow-hidden bg-surface">
      <HeroBackground image={data.heroImage} alt={data.villageName} />

      <div className="relative z-10 flex h-[100dvh] w-full flex-col justify-end px-4 pb-5 pt-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="hero-content">
            <HeroBadge>{data.heroBadge}</HeroBadge>

            <div className="mt-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                Selamat datang di
              </p>

              <h1 className="mt-2 text-[2.05rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.30)]">
                {data.villageName}
              </h1>

              <p className="mt-2 max-w-[24ch] text-[0.95rem] font-semibold italic leading-5 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.24)]">
                “{data.tagline}”
              </p>

              <p className="mt-2 max-w-[30ch] text-[12px] leading-5 text-white">
                {HERO_INTRO}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <HeroButton href="/sejarah" variant="primary">
                Sejarah Desa
              </HeroButton>

              <HeroButton href="/gambut" variant="secondary">
                Kenali Gambut
              </HeroButton>
            </div>
          </div>
        </div>
      </div>

      <HeroStyles />
    </section>
  );
}

function HeroBackground({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  return (
    <div className="absolute inset-0 z-0">
      <img
        className="hero-image h-full w-full object-cover"
        src={image}
        alt={alt}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(31,94,59,0.04)_0%,rgba(31,94,59,0.10)_34%,rgba(31,94,59,0.28)_68%,rgba(31,94,59,0.58)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(0,0,0,0.12),transparent)]" />
    </div>
  );
}

function HeroBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-secondary-container px-3 py-1.5 shadow-sm">
      <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#2d1600]">
        {children}
      </span>
    </span>
  );
}

function HeroButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
}) {
  const baseClassName =
    "inline-flex min-h-[48px] items-center justify-center rounded-2xl px-4 text-center text-[13px] font-bold text-white";
  const variantClassName =
    variant === "primary"
      ? "hero-cta-primary bg-primary-container shadow-[0_10px_24px_rgba(31,94,59,0.22)]"
      : "hero-cta-secondary border border-white/24 bg-white/8 backdrop-blur-[4px]";

  return (
    <a href={href} className={`${baseClassName} ${variantClassName}`}>
      {children}
    </a>
  );
}

function ScrollIndicator() {
  return (
    <div className="hero-scroll-indicator" aria-hidden="true">
      <span />
    </div>
  );
}

function HeroStyles() {
  return (
    <style>{`
      .hero-image {
        animation: heroImageFloat 14s ease-in-out infinite alternate;
        transform: scale(1.02);
        will-change: transform;
      }

      .hero-content {
        animation: heroContentReveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      .hero-cta-primary,
      .hero-cta-secondary {
        transition:
          transform 220ms ease,
          background-color 220ms ease,
          border-color 220ms ease,
          box-shadow 220ms ease,
          opacity 220ms ease;
      }

      .hero-cta-primary:active,
      .hero-cta-secondary:active {
        transform: scale(0.985);
      }

      .hero-cta-secondary:hover,
      .hero-cta-secondary:active {
        background: rgba(255, 255, 255, 0.14);
        border-color: rgba(255, 255, 255, 0.32);
      }

      .hero-scroll-indicator {
        width: 26px;
        height: 38px;
        border: 1.5px solid rgba(255, 255, 255, 0.42);
        border-radius: 999px;
        display: flex;
        justify-content: center;
        padding-top: 7px;
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(3px);
      }

      .hero-scroll-indicator span {
        width: 4px;
        height: 8px;
        border-radius: 999px;
        background: rgba(255, 198, 65, 0.95);
        animation: heroScrollMove 1.8s ease-in-out infinite;
      }

      @keyframes heroContentReveal {
        0% {
          opacity: 0;
          transform: translateY(20px);
          filter: blur(6px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes heroImageFloat {
        0% {
          transform: scale(1.02) translate3d(0, 0, 0);
        }
        100% {
          transform: scale(1.05) translate3d(0, -6px, 0);
        }
      }

      @keyframes heroScrollMove {
        0%,
        100% {
          transform: translateY(0);
          opacity: 0.95;
        }
        50% {
          transform: translateY(8px);
          opacity: 0.35;
        }
      }

      @media (max-height: 740px) {
        .hero-content h1 {
          font-size: 1.9rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-image,
        .hero-content,
        .hero-scroll-indicator span {
          animation: none !important;
        }

        .hero-cta-primary,
        .hero-cta-secondary {
          transition: none !important;
        }
      }
    `}</style>
  );
}