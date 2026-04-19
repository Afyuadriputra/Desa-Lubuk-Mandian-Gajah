import type { HomepageData } from "../../data/homepage.types";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  data: HomepageData;
};

export default function QuickStatsSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-center mb-16">
          <div className="md:col-span-1">
            <h2 className="type-title font-bold text-primary mb-6">
              Fakta Singkat Desa
            </h2>
            <p className="type-body text-on-surface-variant">
              {data.quickStatsDescription}
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stats.map((item) => (
              <Card
                key={item.label}
                className="group overflow-hidden rounded-[1.75rem] border-primary/8 bg-white/92 text-center transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1.5 hover:border-primary/15 hover:shadow-[0_22px_38px_-28px_rgba(31,94,59,0.7)]"
              >
                <CardContent className="relative p-6">
                  <div
                    className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary/75 via-primary/40 to-secondary/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="type-title font-bold text-primary [font-variant-numeric:tabular-nums]">
                    {item.value}
                  </div>
                  <div className="type-label font-medium text-stone-500">
                    {item.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
