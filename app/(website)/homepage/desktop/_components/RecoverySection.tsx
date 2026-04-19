import type { HomepageData } from "../../data/homepage.types";
import { Card, CardContent } from "@/components/ui/card";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface-container-high">
      <div className="max-w-5xl mx-auto px-6 text-center section-stack">
        <div className="section-stack-tight">
          <h2 className="type-title font-bold text-primary">{data.recoveryTitle}</h2>
          <div className="flex justify-center">
            <div className="pucuk-rebung-divider" />
          </div>
          <p className="type-body text-on-surface-variant max-w-3xl mx-auto">
            {data.recoveryDescription}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {data.recoveryItems.map((item) => (
            <Card
              key={item.title}
              className="group rounded-[2rem] border-primary/8 bg-white/92 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1.5 hover:border-primary/15 hover:shadow-[0_22px_38px_-30px_rgba(31,94,59,0.72)]"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full ${item.wrapper ?? "bg-primary/10 text-primary"}`}
                >
                  <DesktopIcon name={item.icon} className="h-7 w-7" />
                </div>
                <h4 className="mb-4 type-body font-bold">{item.title}</h4>
                <p className="type-body text-on-surface-variant">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
