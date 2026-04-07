import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function PeatMobile({ data }: Props) {
  return (
    <section className="section-shell-mobile bg-surface">
      <div className="px-6 section-stack-tight">
        <h2 className="type-title font-bold text-primary">
          {data.peatTitle}
        </h2>

        <div className="pucuk-rebung-divider-mobile" />

        <div className="rounded-2xl overflow-hidden h-64">
          <img
            className="w-full h-full object-cover"
            src={data.peatImages[0]}
            alt={data.peatTitle}
          />
        </div>

        <div className="p-6 bg-secondary-fixed/20 rounded-2xl border-l-4 border-secondary italic type-body font-semibold text-secondary">
          "{data.peatQuote}"
        </div>

        <p className="type-body text-on-surface-variant">
          {data.peatDescription}
        </p>
      </div>
    </section>
  );
}
