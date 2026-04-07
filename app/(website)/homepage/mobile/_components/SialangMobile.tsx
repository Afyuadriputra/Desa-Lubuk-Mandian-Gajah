import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function SialangMobile({ data }: Props) {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="px-6 space-y-6">
        <div className="rounded-3xl overflow-hidden shadow-2xl h-80 relative">
          <img
            className="w-full h-full object-cover"
            src={data.sialangImage}
            alt={data.sialangTitle}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
            <h3 className="text-2xl font-headline font-bold">
              {data.sialangTitle}
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-bold uppercase">
            Kearifan Lokal
          </span>

          <p className="text-primary-fixed leading-relaxed">
            {data.sialangDescription}
          </p>

          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/20">
            <span className="material-symbols-outlined text-secondary-container">
              park
            </span>
            <span className="font-bold text-sm">50.6 Hektar Area Lindung</span>
          </div>
        </div>
      </div>
    </section>
  );
}