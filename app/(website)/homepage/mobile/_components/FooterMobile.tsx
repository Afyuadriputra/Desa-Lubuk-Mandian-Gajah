import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function FooterMobile({ data }: Props) {
  return (
    <footer className="bg-surface-container pt-12 pb-24 border-t border-primary/10">
      <div className="px-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="text-sm font-bold text-primary uppercase tracking-widest font-headline">
            {data.villageName}
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Melestarikan warisan leluhur Melayu Petalangan dan menjaga ekosistem gambut.
          </p>
        </div>

        <div className="border-t border-primary/5 pt-6">
          <details className="group">
            <summary className="flex justify-between items-center font-bold text-primary list-none cursor-pointer">
              Tautan Penting
              <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <ul className="pt-4 space-y-3 text-xs text-on-surface-variant">
              {data.footerLinks.map((link) => (
                <li key={link.label}>
                  <a className="block py-1" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <div className="border-t border-primary/5 pt-6">
          <details className="group">
            <summary className="flex justify-between items-center font-bold text-primary list-none cursor-pointer">
              Jam Operasional
              <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="pt-4 space-y-2 text-xs text-on-surface-variant">
              <div className="flex justify-between"><span>Senin - Kamis</span> <span>08:00 - 15:00</span></div>
              <div className="flex justify-between"><span>Jumat</span> <span>08:00 - 11:30</span></div>
              <div className="flex justify-between text-error font-bold"><span>Sabtu - Minggu</span> <span>Tutup</span></div>
            </div>
          </details>
        </div>

        <div className="pt-8 border-t border-primary/10 text-center space-y-4">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
            © 2024 {data.villageName}
          </p>
          <div className="flex justify-center gap-4 opacity-40 grayscale scale-75">
            <span className="text-[8px] font-bold tracking-widest">WONDERFUL INDONESIA</span>
            <span className="text-[8px] font-bold tracking-widest">RIAU HOMELAND</span>
          </div>
        </div>
      </div>
    </footer>
  );
}