import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function FooterMobile({ data }: Props) {
  return (
    <footer className="bg-surface-container pt-12 pb-24 border-t border-primary/10">
      <div className="px-6 section-stack">
        <div className="text-center section-stack-tight">
          <div className="type-body font-bold text-primary uppercase tracking-widest">
            {data.villageName}
          </div>
          <p className="type-body text-on-surface-variant">{data.footerDescription}</p>
        </div>

        <div className="border-t border-primary/5 pt-6">
          <details className="group">
            <summary className="flex justify-between items-center font-bold text-primary list-none cursor-pointer py-2">
              Tautan Penting
              <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <ul className="pt-4 space-y-4 type-body text-on-surface-variant">
              {data.footerLinks.map((link) => (
                <li key={link.label}>
                  <a className="block py-2" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <div className="border-t border-primary/5 pt-6">
          <details className="group">
            <summary className="flex justify-between items-center font-bold text-primary list-none cursor-pointer py-2">
              Jam Operasional
              <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="pt-4 space-y-4 type-body text-on-surface-variant">
              {data.officeHours.map((item) => (
                <div key={item.day} className={`flex justify-between ${item.danger ? "text-error font-bold" : ""}`}>
                  <span>{item.day}</span>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </details>
        </div>

        <div className="pt-8 border-t border-primary/10 text-center section-stack-tight">
          <p className="type-label text-on-surface-variant">{data.footerCopyright}</p>
          <div className="flex justify-center gap-4 opacity-40 grayscale scale-75">
            {data.footerBadges.map((badge) => (
              <span key={badge} className="type-label font-bold">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
