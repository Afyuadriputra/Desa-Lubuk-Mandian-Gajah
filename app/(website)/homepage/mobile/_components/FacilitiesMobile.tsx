import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function FacilitiesMobile({ data }: Props) {
  return (
    <section className="section-shell-mobile bg-surface-container-low">
      <div className="px-6">
        <h2 className="type-title font-bold text-primary text-center mb-8">
          Fasilitas Desa
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {data.facilities.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
            >
              <span className="material-symbols-outlined text-primary text-xl">
                {item.icon}
              </span>
              <span className="type-body font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
