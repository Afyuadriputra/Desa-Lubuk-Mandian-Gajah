import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="type-title font-bold text-primary mb-12">Galeri Desa</h2>
        <div className="masonry-grid">
          {data.gallery.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl overflow-hidden relative group ${item.tall ? "row-span-2" : ""}`}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={item.image}
                alt={item.alt}
              />
              {item.caption ? (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="type-body text-white font-bold">{item.caption}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
