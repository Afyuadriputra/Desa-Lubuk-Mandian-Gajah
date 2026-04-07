import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function PeatMobile({ data }: Props) {
  return (
    <section className="py-16 bg-surface">
      <div className="px-6 space-y-6">
        <h2 className="text-3xl font-headline font-bold text-primary">
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

        <div className="p-6 bg-secondary-fixed/20 rounded-2xl border-l-4 border-secondary italic font-headline text-lg text-secondary leading-snug">
          "{data.peatQuote}"
        </div>

        <p className="text-on-surface-variant leading-relaxed text-sm">
          {data.peatDescription}
        </p>
      </div>
    </section>
  );
}