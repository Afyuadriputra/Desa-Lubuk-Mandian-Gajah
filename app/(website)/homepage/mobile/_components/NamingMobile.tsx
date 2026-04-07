import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamingMobile({ data }: Props) {
  return (
    <section className="py-16 bg-surface-container-low">
      <div className="px-6 space-y-6">
        <div className="rounded-3xl overflow-hidden shadow-lg h-64">
          <img
            className="w-full h-full object-cover"
            src={data.namingImage}
            alt={data.namingTitle}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-headline font-bold text-primary tracking-tight">
            {data.namingTitle}
          </h2>

          <div className="pucuk-rebung-divider-mobile" />

          <p className="text-on-surface-variant leading-relaxed">
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