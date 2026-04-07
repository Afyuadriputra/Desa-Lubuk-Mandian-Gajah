import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <footer className="bg-surface-container pt-20 pb-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="section-stack-tight">
          <div className="type-body font-bold text-primary uppercase tracking-widest">
            {data.villageName}
          </div>
          <p className="type-body text-on-surface-variant">{data.footerDescription}</p>
        </div>

        <div className="section-stack-tight">
          <h4 className="type-body font-bold text-primary">Tautan Penting</h4>
          <ul className="space-y-4 type-body">
            {data.footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
                  href={link.href}
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="section-stack-tight">
          <h4 className="type-body font-bold text-primary">Jam Operasional Kantor</h4>
          <ul className="space-y-4 type-body text-on-surface-variant">
            {data.officeHours.map((item) => (
              <li key={item.day} className="flex justify-between pb-4 border-b border-primary/5 last:border-b-0">
                <span>{item.day}</span>
                <span className={item.danger ? "text-error font-semibold" : "font-semibold"}>
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="type-body text-on-surface-variant text-center">{data.footerCopyright}</p>
        <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-[filter,opacity] duration-200">
          {data.footerBadges.map((badge) => (
            <span key={badge} className="type-label font-bold">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
