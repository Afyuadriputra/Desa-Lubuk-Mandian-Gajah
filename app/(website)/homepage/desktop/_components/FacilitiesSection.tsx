const facilities = [
  { icon: "construction", label: "58 Box Culvert" },
  { icon: "water", label: "17 Embung & 2 Reservoir" },
  { icon: "school", label: "SDN 007 & PAUD" },
  { icon: "health_and_safety", label: "Poskesdes" },
  { icon: "account_balance", label: "Kantor Desa" },
];

import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-headline font-bold text-primary text-center mb-16">Fasilitas dan Kehidupan Desa</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {facilities.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center gap-4 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
              </div>
              <span className="font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
