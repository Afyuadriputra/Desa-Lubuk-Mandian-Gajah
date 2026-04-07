import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function SialangMobile({ data }: Props) {
  return (
    <section className="section-shell-mobile bg-primary text-white">
      <div className="px-6 section-stack-tight">
        <div className="rounded-3xl overflow-hidden shadow-2xl h-80 relative">
          <img className="w-full h-full object-cover" src={data.sialangImage} alt={data.sialangTitle} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
            <h3 className="type-title font-bold">{data.sialangTitle}</h3>
          </div>
        </div>

        <div className="section-stack-tight">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 border border-white/30 type-label font-bold w-fit">
            {data.sialangBadge}
          </span>

          <p className="type-body text-primary-fixed">{data.sialangDescription}</p>

          <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
            <span className="material-symbols-outlined text-secondary-container">park</span>
            <span className="type-body font-bold">{data.sialangStat}</span>
          </div>
          <p className="type-body italic text-primary-fixed/90">"{data.sialangQuote}"</p>
        </div>
      </div>
    </section>
  );
}
