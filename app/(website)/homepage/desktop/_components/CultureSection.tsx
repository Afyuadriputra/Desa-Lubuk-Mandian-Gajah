import type { HomepageData } from "../../data/homepage.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-6 gap-4 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full aspect-square border-2 border-primary rotate-45" />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center section-stack relative z-10">
        <h2 className="type-title font-bold text-primary">{data.cultureTitle}</h2>
        <div className="flex justify-center">
          <div className="pucuk-rebung-divider" />
        </div>
        <p className="type-body text-on-surface-variant">{data.cultureDescription}</p>

        <div className="mt-12 grid grid-cols-1 gap-8 text-left md:grid-cols-2">
          {data.cultureCards.map((card) => (
            <HoverCard key={card.title}>
              <div className="relative">
                <HoverCardTrigger className="block h-full rounded-[2rem] text-left no-underline focus-visible:outline-none">
                  <Card className="group h-full rounded-[2rem] bg-surface-container/92 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1.5 hover:border-primary/16 hover:shadow-[0_24px_36px_-28px_rgba(31,94,59,0.65)]">
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/12 text-secondary">
                        <DesktopIcon name={card.icon} className="h-7 w-7" />
                      </div>
                      <CardTitle className="type-body text-primary">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">{card.description}</CardDescription>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="max-w-[22rem] rounded-[1.5rem] border-primary/12 bg-[#fffaf0] p-5 text-on-surface shadow-[0_30px_60px_-40px_rgba(31,94,59,0.9)]">
                  <h4 className="mb-2 text-base font-bold text-primary">{card.title}</h4>
                  <p className="text-sm leading-6 text-on-surface-variant">{card.description}</p>
                </HoverCardContent>
              </div>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
