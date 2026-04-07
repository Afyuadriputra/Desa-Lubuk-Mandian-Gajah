import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function HeroSection({ data }: Props) {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src={data.heroImage}
          alt={data.villageName}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl text-white section-stack">
          <h1 className="type-display font-bold tracking-tight text-balance">
            {data.villageName}
          </h1>
          <p className="type-title text-secondary-fixed-dim italic font-semibold text-balance">
            "{data.tagline}"
          </p>
          <p className="type-body text-white/90 max-w-2xl">
            {data.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/sejarah"
              className="bg-primary-container text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Baca Sejarah Desa
              <span className="material-symbols-outlined">history_edu</span>
            </a>
            <a
              href="/gambut"
              className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors duration-200"
            >
              Kenali Gambut Desa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
