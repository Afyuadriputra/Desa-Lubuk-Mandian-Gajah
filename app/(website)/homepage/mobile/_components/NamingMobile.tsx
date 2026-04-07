import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamingMobile({ data }: Props) {
  return (
    <section className="section-shell-mobile bg-surface-container-low">
      <div className="px-6 section-stack-tight">
        <div className="rounded-3xl overflow-hidden shadow-lg h-64">
          <img
            className="w-full h-full object-cover"
            src={data.namingImage}
            alt={data.namingTitle}
          />
        </div>

        <div className="section-stack-tight">
          <h2 className="type-title font-bold text-primary tracking-tight">
            {data.namingTitle}
          </h2>

          <div className="pucuk-rebung-divider-mobile" />

          <p className="type-body text-on-surface-variant">
            {data.namingDescription}
          </p>

          <a
            href="/sejarah"
            className="flex items-center gap-2 text-secondary font-bold"
          >
            Baca Selengkapnya
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
