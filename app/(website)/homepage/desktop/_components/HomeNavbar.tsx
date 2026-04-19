import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function HomeNavbar({ data }: Props) {
  const hasLogo = Boolean(data.brand.logoUrl);

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-primary/5">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <a className="brand-link inline-flex items-center gap-3 rounded-2xl border border-primary/10 bg-white/65 px-3 py-2 text-primary shadow-sm hover:text-[#1f5e3b]" href="/homepage">
            <div className="flex h-14 w-12 items-center justify-center rounded-lg bg-white ring-1 ring-primary/10">
              {hasLogo ? (
                <img
                  className="h-12 w-10 object-contain"
                  src={data.brand.logoUrl}
                  alt={data.brand.logoAlt}
                  width="40"
                  height="58"
                  fetchPriority="high"
                />
              ) : (
                <span className="material-symbols-outlined text-[28px] text-primary/60">
                  location_city
                </span>
              )}
            </div>
            <span className="flex flex-col leading-none">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/70">
                {data.brand.regionLabel}
              </span>
              <span className="text-xl font-bold tracking-tight">{data.villageName}</span>
            </span>
          </a>

          <div className="hidden md:flex gap-8 items-center">
            <a aria-current="page" className="nav-link type-body font-semibold text-primary border-b-2 border-secondary pb-2" href="/homepage">
              Beranda
            </a>
            <a className="nav-link type-body font-semibold text-stone-600 hover:text-primary" href="/sejarah">
              Sejarah
            </a>
            <a className="nav-link type-body font-semibold text-stone-600 hover:text-primary" href="/gambut">
              Gambut
            </a>
            <a className="nav-link type-body font-semibold text-stone-600 hover:text-primary" href="/potensi">
              Potensi
            </a>
          </div>

          <a className="nav-cta hidden md:inline-flex min-h-12 items-center rounded-xl bg-primary px-6 py-4 font-bold text-on-primary hover:bg-primary-container active:scale-95" href="#kontak">
            Kontak
          </a>

          <details className="mobile-nav md:hidden relative">
            <summary aria-label="Buka navigasi" className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-[#795900]/15 bg-white/70 px-4 py-4 font-semibold text-primary shadow-sm cursor-pointer touch-manipulation">
              <span aria-hidden="true" className="material-symbols-outlined menu-open text-[20px]">menu</span>
              <span aria-hidden="true" className="material-symbols-outlined menu-close text-[20px]">close</span>
              <span className="type-body text-sm">Menu</span>
            </summary>

            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-3xl border border-[#795900]/10 bg-[#fff9eb]/95 p-4 shadow-xl backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                <a aria-current="page" className="nav-link rounded-2xl bg-primary/10 px-4 py-4 font-semibold text-primary" href="/homepage">
                  Beranda
                </a>
                <a className="nav-link rounded-2xl px-4 py-4 font-semibold text-stone-700 hover:bg-primary/5 hover:text-primary" href="/sejarah">
                  Sejarah
                </a>
                <a className="nav-link rounded-2xl px-4 py-4 font-semibold text-stone-700 hover:bg-primary/5 hover:text-primary" href="/gambut">
                  Gambut
                </a>
                <a className="nav-link rounded-2xl px-4 py-4 font-semibold text-stone-700 hover:bg-primary/5 hover:text-primary" href="/potensi">
                  Potensi
                </a>
                <a className="nav-cta mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-4 py-4 font-bold text-on-primary hover:bg-primary-container" href="#kontak">
                  Kontak
                </a>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
