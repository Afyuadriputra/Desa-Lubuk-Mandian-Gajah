import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            className="rounded-[2.5rem] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover"
            src={data.namingImage}
            alt={data.namingTitle}
          />
          <div className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-3xl shadow-xl z-20 max-w-[240px]">
            <p className="type-body italic leading-snug">"{data.namingQuote}"</p>
          </div>
        </div>

        <div className="section-stack">
          <div className="section-stack-tight">
            <h2 className="type-title font-bold text-primary tracking-tight">
              {data.namingTitle}
            </h2>
            <div className="pucuk-rebung-divider" />
          </div>
          <p className="type-body text-on-surface-variant">{data.namingDescription}</p>
          <a href="/sejarah" className="flex items-center gap-4 group text-secondary font-bold type-body">
            Selengkapnya di Halaman Sejarah
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
