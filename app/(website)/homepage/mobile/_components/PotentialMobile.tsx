import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function PotentialMobile({ data }: Props) {
  return (
    <section className="py-16 bg-surface">
      <div className="px-6">
        <h2 className="text-2xl font-headline font-bold text-primary mb-6">
          Potensi Unggulan
        </h2>

        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-6 px-6">
          {data.potentials.map((item) => (
            <div
              key={item.title}
              className="min-w-[180px] h-60 rounded-2xl overflow-hidden relative shrink-0"
            >
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-sm">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}