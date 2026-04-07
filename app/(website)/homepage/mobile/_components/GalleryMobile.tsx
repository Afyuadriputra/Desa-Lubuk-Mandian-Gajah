import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function GalleryMobile({ data }: Props) {
  return (
    <section className="py-16 bg-surface">
      <div className="px-6">
        <h2 className="text-2xl font-headline font-bold text-primary mb-6">
          Galeri Desa
        </h2>

        <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar -mx-6 px-6">
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