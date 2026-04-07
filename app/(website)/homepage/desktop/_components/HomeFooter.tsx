const links = [
  "Sejarah Lengkap",
  "Profil Gambut",
  "Potensi Ekonomi",
  "Transparansi Desa",
];

const officeHours = [
  { day: "Senin - Kamis", time: "08:00 - 15:00" },
  { day: "Jumat", time: "08:00 - 11:30" },
  { day: "Sabtu - Minggu", time: "Tutup", danger: true },
];

import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <footer className="bg-surface-container pt-20 pb-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="space-y-6">
          <div className="text-xl font-bold text-primary uppercase tracking-widest font-headline">
            Lubuk Mandian Gajah
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Melestarikan warisan leluhur Melayu Petalangan, menjaga keseimbangan ekosistem gambut, dan membangun kemandirian ekonomi desa.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-primary font-headline">Tautan Penting</h4>
          <ul className="space-y-3 text-sm">
            {links.map((link) => (
              <li key={link}>
                <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2" href="#">
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-primary font-headline">Jam Operasional Kantor</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            {officeHours.map((item) => (
              <li key={item.day} className="flex justify-between pb-2 border-b border-primary/5 last:border-b-0">
                <span>{item.day}</span>
                <span className={item.danger ? "text-error font-semibold" : "font-semibold"}>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-on-surface-variant text-sm text-center">
          © 2024 Desa Lubuk Mandian Gajah. Melestarikan Warisan, Menjaga Alam.
        </p>
        <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Wonderful Indonesia</span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Riau Homeland of Melayu</span>
        </div>
      </div>
    </footer>
  );
}
