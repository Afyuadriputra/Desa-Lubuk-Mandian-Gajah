import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface scroll-mt-32" id="gambut">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
          <img
            className="rounded-2xl w-full aspect-[3/4] object-cover"
            src={data.peatImages[0]}
            alt="Gambut desa 1"
          />
          <img
            className="rounded-2xl w-full aspect-[3/4] object-cover mt-8"
            src={data.peatImages[1]}
            alt="Gambut desa 2"
          />
        </div>

        <div className="order-1 md:order-2 section-stack-tight">
          <h2 className="type-title font-bold text-primary">{data.peatTitle}</h2>
          <div className="pucuk-rebung-divider" />
          <p className="type-body text-on-surface-variant">{data.peatDescription}</p>
          <div className="bg-secondary-fixed/30 p-8 rounded-3xl border-l-4 border-secondary">
            <p className="type-body italic font-bold text-secondary">
              "{data.peatQuote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
