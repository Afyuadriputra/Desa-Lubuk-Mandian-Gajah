import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function QuickStatsMobile({ data }: Props) {
  const mobileStats = data.stats.filter((item) =>
    ["Dusun", "Jiwa", "Ha Gambut", "Embung"].includes(item.label)
  );

  return (
    <section className="section-shell-mobile bg-surface">
      <div className="px-6">
        <h2 className="type-title font-bold text-primary mb-2 text-center">
          Fakta Singkat
        </h2>
        <div className="flex justify-center mb-8">
          <div className="pucuk-rebung-divider-mobile" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mobileStats.map((item) => (
            <div
              key={item.label}
              className="bg-white p-4 rounded-2xl shadow-sm border border-primary/5 text-center"
            >
              <div className="type-title font-bold text-primary">
                {item.value}
              </div>
              <div className="type-label font-bold text-stone-500">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
