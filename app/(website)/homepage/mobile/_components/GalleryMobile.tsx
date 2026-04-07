import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function GalleryMobile({ data }: Props) {
  return (
    <section className="section-shell-mobile bg-surface">
      <div className="px-6">
        <h2 className="type-title font-bold text-primary mb-6">
          Galeri Desa
        </h2>

        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-6 px-6">
          {data.gallery.map((item) => (
            <div
              key={item.alt}
              className="min-w-[280px] h-48 rounded-2xl overflow-hidden shrink-0"
            >
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
