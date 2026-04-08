import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function FooterMobile({ data }: Props) {
  const logoUrl =
    data.brand?.logoUrl ||
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Pelalawan_logo.png/330px-Pelalawan_logo.png";

  return (
    <footer className="border-t border-primary/10 bg-surface-container pt-8 pb-24">
      <div className="px-4">
        <div className="overflow-hidden rounded-[24px] border border-primary/10 bg-white shadow-[0_14px_34px_rgba(31,94,59,0.07)]">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-container to-primary px-4 py-5 text-white">
            <div
              className="pointer-events-none absolute -right-[12px] -top-[14px] h-[82px] w-[82px] rotate-[14deg] opacity-10"
              style={{
                backgroundImage:
                  'url("https://api.iconify.design/gis:ornament.svg")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-[18px] -left-[10px] h-[82px] w-[82px] rotate-[190deg] scale-90 opacity-10"
              style={{
                backgroundImage:
                  'url("https://api.iconify.design/gis:ornament.svg")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />

            <div className="relative z-[1] flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/12 p-2 backdrop-blur-sm">
                <img
                  src={logoUrl}
                  alt={data.brand?.logoAlt || "Logo Kabupaten Pelalawan"}
                  className="h-full w-full object-contain"
                  width="96"
                  height="144"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
                  {data.brand?.regionLabel || "Kabupaten Pelalawan"}
                </p>
                <h2 className="mt-1 text-[1rem] font-extrabold leading-5 text-white">
                  {data.villageName}
                </h2>
                <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-white/82">
                  {data.footerDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="space-y-2">
              <details className="group rounded-2xl border border-primary/8 bg-surface-container-low px-4 py-3">
                <summary className="flex list-none items-center justify-between gap-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-[18px]">
                        link
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      Tautan Penting
                    </span>
                  </div>

                  <span className="material-symbols-outlined text-[18px] text-primary transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>

                <ul className="mt-3 space-y-2">
                  {data.footerLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex min-h-[44px] items-center justify-between rounded-xl bg-white px-3 text-sm font-medium text-on-surface-variant transition hover:bg-primary/5"
                      >
                        <span>{link.label}</span>
                        <span className="material-symbols-outlined text-[18px] text-primary/70">
                          arrow_forward
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </details>

              <details className="group rounded-2xl border border-primary/8 bg-surface-container-low px-4 py-3">
                <summary className="flex list-none items-center justify-between gap-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-[18px]">
                        schedule
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      Jam Operasional
                    </span>
                  </div>

                  <span className="material-symbols-outlined text-[18px] text-primary transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>

                <div className="mt-3 space-y-2">
                  {data.officeHours.map((item) => (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between rounded-xl bg-white px-3 py-3 text-sm ${
                        item.danger
                          ? "font-bold text-error"
                          : "text-on-surface-variant"
                      }`}
                    >
                      <span>{item.day}</span>
                      <span>{item.time}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <div className="mt-3 rounded-2xl border border-primary/8 bg-surface px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {data.footerBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-primary/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-[11px] leading-5 text-on-surface-variant">
                {data.footerCopyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
