import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center section-stack-tight mb-16">
          <h2 className="type-title font-bold text-primary">Potensi Unggulan Desa</h2>
          <div className="flex justify-center">
            <div className="pucuk-rebung-divider" />
          </div>
          <p className="type-body text-on-surface-variant max-w-2xl mx-auto">{data.potentialQuote}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {data.potentials.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4]"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <h4 className="type-body font-bold text-white">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary-container rounded-[2.5rem] p-12 text-white">
          <h3 className="type-title font-bold mb-8 text-center">Potensi yang Bisa Berkembang</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {data.potentialOpportunityItems.map((item) => (
              <div key={item.title} className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h4 className="type-body font-bold">{item.title}</h4>
                <p className="type-body text-primary-fixed opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
