import type { HomepageData } from "../../data/homepage.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  const hasImage = Boolean(data.namingImage);

  return (
    <section className="section-shell bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          {hasImage ? (
            <img
              className="rounded-[2.5rem] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover"
              src={data.namingImage}
              alt={data.namingTitle}
            />
          ) : (
            <div className="rounded-[2.5rem] shadow-2xl relative z-10 w-full aspect-[4/5] bg-primary/10" />
          )}
          <Card className="absolute -bottom-8 -left-8 z-20 max-w-[280px] border-white/10 bg-primary text-white shadow-2xl">
            <CardContent className="p-7">
              <p className="type-body italic leading-snug text-white/92">"{data.namingQuote}"</p>
            </CardContent>
          </Card>
        </div>

        <div className="section-stack">
          <div className="section-stack-tight">
            <h2 className="type-title font-bold text-primary tracking-tight">
              {data.namingTitle}
            </h2>
            <div className="pucuk-rebung-divider" />
          </div>
          <p className="type-body max-w-[64ch] text-on-surface-variant">{data.namingDescription}</p>
          <div>
            <a href="/sejarah" className="inline-flex">
              <Button variant="outline" className="group">
                Selengkapnya di Halaman Sejarah
                <DesktopIcon
                  name="arrow_forward"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
