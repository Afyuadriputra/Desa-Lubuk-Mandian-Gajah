import type { HomepageData } from "../../data/homepage.types";
import { Card, CardContent } from "@/components/ui/card";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  const hasImage = Boolean(data.sialangImage);

  return (
    <section className="section-shell bg-primary text-white relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="section-stack">
          <span className="inline-block w-fit rounded-full border border-secondary-container/30 bg-secondary-container/20 px-4 py-2 type-label font-bold text-secondary-container">
            {data.sialangBadge}
          </span>
          <h2 className="type-title font-bold">{data.sialangTitle}</h2>
          <p className="type-body text-primary-fixed">{data.sialangDescription}</p>
          <Card className="border-white/14 bg-white/10 text-white backdrop-blur-md">
            <CardContent className="space-y-5 p-6">
              <p className="type-body italic text-primary-fixed">"{data.sialangQuote}"</p>
              <div className="flex items-center gap-4 rounded-2xl border border-white/12 bg-black/10 px-4 py-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary-container/15 text-secondary-fixed-dim">
                  <DesktopIcon name="park" className="h-5 w-5" />
                </div>
                <span className="type-body font-bold">{data.sialangStat}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          {hasImage ? (
            <img
              className="rounded-[3rem] w-full aspect-square object-cover shadow-2xl"
              src={data.sialangImage}
              alt={data.sialangTitle}
            />
          ) : (
            <div className="rounded-[3rem] w-full aspect-square bg-white/10 shadow-2xl" />
          )}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-primary/72 via-primary/10 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="type-title font-bold">{data.sialangTitle}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
