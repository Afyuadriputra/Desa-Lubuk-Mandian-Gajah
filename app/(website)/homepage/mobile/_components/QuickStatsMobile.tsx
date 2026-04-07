import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function QuickStatsMobile({ data }: Props) {
  const mobileStats = data.stats.filter((item) =>
    ["Dusun", "Jiwa", "Ha Gambut", "Embung"].includes(item.label)
  );

  return (
    <section className="py-16 bg-surface">
      <div className="px-6">
        <h2 className="text-2xl font-headline font-bold text-primary mb-2 text-center">
          Fakta Singkat
        </h2>
        <div className="flex justify-center mb-8">
          <div className="pucuk-rebung-divider-mobile" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mobileStats.map((item) => (
            <div
              key={item.label}
              className="bg-white p-5 rounded-2xl shadow-sm border border-primary/5 text-center"
            >
              <div className="text-2xl font-headline font-bold text-primary">
                {item.value}
              </div>
              <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}