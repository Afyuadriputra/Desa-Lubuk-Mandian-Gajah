import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function QuickStatsSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-center mb-16">
          <div className="md:col-span-1">
            <h2 className="type-title font-bold text-primary mb-6">
              Fakta Singkat Desa
            </h2>
            <p className="type-body text-on-surface-variant">
              {data.quickStatsDescription}
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stats.map((item) => (
              <div
                key={item.label}
                className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 text-center transition-transform hover:-translate-y-1"
              >
                <div className="type-title font-bold text-primary">
                  {item.value}
                </div>
                <div className="type-label text-stone-500 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
