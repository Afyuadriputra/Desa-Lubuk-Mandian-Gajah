import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
    return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            className="rounded-[2.5rem] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFJHDDgN08hvlmrU41mUGPKoxupVL-osgtYInTpiEhrXmqG1It1j4RuvRyYBcYPhvv8NwWqrFl_Q489HJ3033F0_s9cKb7-txeJ8S69hSTk5poFV-6ZJ-XDcX9LmYx90BpVQzy_HWD8s9cMJ1LaxG7so1j5PYF8nfIuz9CGHglOgbky_3Ut2GFNiF5VFGkYBpJz1mOpOAV46im-SzjbAA9TZiD6nELxlG9aVYI3NUtxO5eCT5G0z_sWe70W-6_y2zgMPj8tEYLqzg"
            alt="Asal-usul Lubuk Mandian Gajah"
          />
          <div className="absolute -bottom-6 -left-6 bg-primary text-white p-8 rounded-3xl shadow-xl z-20 max-w-[240px]">
            <p className="font-headline italic text-lg leading-snug">"Jejak kawanan gajah di tepian Sungai Skou."</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
              Mengapa Disebut Lubuk Mandian Gajah?
            </h2>
            <div className="pucuk-rebung-divider" />
          </div>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Nama desa ini berakar dari keberadaan Sungai Skou, di mana pada masa lampau kawanan gajah sering terlihat mandi dan beristirahat di lubuk-lubuk sungai tersebut. Seiring waktu, wilayah yang awalnya berupa pondok-pondok ladang nomaden para peladang berpindah, bertransformasi menjadi pemukiman permanen.
          </p>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Perubahan ini menandai babak baru kehidupan masyarakat yang menetap, tanpa meninggalkan akar sejarah alam yang menjadi identitas nama desa mereka hingga saat ini.
          </p>
          <a href="/sejarah" className="flex items-center gap-4 group text-secondary font-bold text-lg">
            Selengkapnya di Halaman Sejarah
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
