import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function FacilitiesMobile({ data }: Props) {
  return (
    <section className="py-16 bg-surface-container-low">
      <div className="px-6">
        <h2 className="text-2xl font-headline font-bold text-primary text-center mb-10">
          Fasilitas Desa
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {data.facilities.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
            >
              <span className="material-symbols-outlined text-primary text-xl">
                {item.icon}
              </span>
              <span className="text-xs font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}