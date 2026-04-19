import type { HomepageData } from "../../data/homepage.types";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  const peatImages = data.peatImages.filter(Boolean);

  return (
    <section className="section-shell bg-surface scroll-mt-32" id="gambut">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
          {peatImages[0] ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white/70 shadow-sm">
              <img
                className="w-full aspect-[3/4] object-cover transition-transform duration-500 hover:scale-[1.04]"
                src={peatImages[0]}
                alt="Gambut desa 1"
              />
            </div>
          ) : null}
          {peatImages[1] ? (
            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white/70 shadow-sm">
              <img
                className="w-full aspect-[3/4] object-cover transition-transform duration-500 hover:scale-[1.04]"
                src={peatImages[1]}
                alt="Gambut desa 2"
              />
            </div>
          ) : null}
        </div>

        <div className="order-1 md:order-2 section-stack-tight">
          <h2 className="type-title font-bold text-primary">{data.peatTitle}</h2>
          <div className="pucuk-rebung-divider" />
          <p className="type-body text-on-surface-variant">{data.peatDescription}</p>
          <Card className="rounded-[2rem] border-secondary/15 bg-secondary-fixed/26">
            <CardContent className="p-8">
              <p className="type-body italic font-bold text-secondary">"{data.peatQuote}"</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
