import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function MobileHeader({ data }: Props) {
  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b border-primary/5">
      <nav className="px-6 py-3 flex justify-center items-center">
        <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white/70 px-3 py-2 shadow-sm">
          <div className="flex h-12 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-primary/10">
            <img
              className="h-10 w-8 object-contain"
              src={data.brand.logoUrl}
              alt={data.brand.logoAlt}
              width="32"
              height="48"
              fetchPriority="high"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/70">
              {data.brand.regionLabel}
            </span>
            <div className="text-[15px] font-bold text-primary tracking-tight">
              {data.villageName}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
