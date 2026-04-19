import type { HomepageData } from "../../data/homepage.types";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center section-stack-tight mb-16">
          <h2 className="type-title font-bold text-primary">{data.potentialTitle}</h2>
          <div className="flex justify-center">
            <div className="pucuk-rebung-divider" />
          </div>
          <p className="type-body text-on-surface-variant max-w-2xl mx-auto">{data.potentialQuote}</p>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {data.potentials.map((item) => (
            <Card
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border-white/10 bg-transparent"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <h4 className="type-body font-bold text-white">{item.title}</h4>
              </div>
            </Card>
          ))}
        </div>

        <div className="rounded-[2.5rem] bg-primary-container p-12 text-white">
          <h3 className="mb-8 text-center type-title font-bold">{data.potentialOpportunitiesTitle}</h3>
          <Tabs defaultValue={data.potentialOpportunityItems[0]?.title ?? "default"}>
            <div className="mb-8 flex justify-center">
              <TabsList className="h-auto flex-wrap rounded-[1.6rem] bg-white/10 p-1.5 text-white/72">
                {data.potentialOpportunityItems.map((item) => (
                  <TabsTrigger
                    key={item.title}
                    value={item.title}
                    className="rounded-[1.2rem] px-4 py-2 text-white/72 data-active:bg-white data-active:text-primary"
                  >
                    {item.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {data.potentialOpportunityItems.map((item) => (
              <TabsContent key={item.title} value={item.title}>
                <Card className="border-white/12 bg-white/8 text-white shadow-none">
                  <CardContent className="grid items-center gap-8 p-8 md:grid-cols-[auto_1fr]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/14 text-white">
                      <DesktopIcon name={item.icon} className="h-7 w-7" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="type-body font-bold">{item.title}</h4>
                      <p className="type-body text-primary-fixed opacity-90">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
