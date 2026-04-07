import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-6 gap-4 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full aspect-square border-2 border-primary rotate-45" />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center section-stack relative z-10">
        <h2 className="type-title font-bold text-primary">{data.cultureTitle}</h2>
        <div className="flex justify-center">
          <div className="pucuk-rebung-divider" />
        </div>
        <p className="type-body text-on-surface-variant">{data.cultureDescription}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
          {data.cultureCards.map((card) => (
            <div key={card.title} className="p-8 rounded-3xl bg-surface-container shadow-sm border border-primary/10">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">{card.icon}</span>
              <h4 className="type-body font-bold mb-2">{card.title}</h4>
              <p className="type-body text-on-surface-variant">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
