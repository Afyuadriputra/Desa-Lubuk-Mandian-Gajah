import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-primary text-white relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="section-stack">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary-container/20 border border-secondary-container/30 text-secondary-container type-label font-bold w-fit">
            {data.sialangBadge}
          </span>
          <h2 className="type-title font-bold">{data.sialangTitle}</h2>
          <p className="type-body text-primary-fixed">{data.sialangDescription}</p>
          <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
            <p className="type-body italic text-primary-fixed mb-4">"{data.sialangQuote}"</p>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary-fixed-dim">park</span>
              <span className="type-body font-bold">{data.sialangStat}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            className="rounded-[3rem] w-full aspect-square object-cover shadow-2xl"
            src={data.sialangImage}
            alt={data.sialangTitle}
          />
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-primary/60 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="type-title font-bold">{data.sialangTitle}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
