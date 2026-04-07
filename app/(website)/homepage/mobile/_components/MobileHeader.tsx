import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function MobileHeader({ data }: Props) {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-center px-4 pt-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 shadow-sm backdrop-blur-md">
          <div className="flex h-12 w-10 items-center justify-center rounded-lg bg-white/90 ring-1 ring-white/20">
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/75">
              {data.brand.regionLabel}
            </span>
            <span className="text-[15px] font-bold tracking-tight text-white">
              {data.villageName}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}