import type { HomepageData } from "../../data/homepage.types";
import { Card, CardContent } from "@/components/ui/card";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center section-stack-tight">
          <h2 className="type-title font-bold text-primary">{data.facilitiesTitle}</h2>
          <p className="mx-auto max-w-3xl type-body text-on-surface-variant">
            Infrastruktur desa ditata untuk mobilitas, layanan dasar, dan ketahanan lingkungan yang lebih baik.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {data.facilities.map((item) => (
            <Card
              key={item.label}
              className="group rounded-[2rem] border-primary/8 bg-white/92 text-center transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1.5 hover:border-primary/15 hover:shadow-[0_22px_38px_-30px_rgba(31,94,59,0.72)]"
            >
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-primary/7 text-primary transition-transform duration-200 group-hover:scale-105">
                  <DesktopIcon name={item.icon} className="h-9 w-9" />
                </div>
                <span className="type-body font-bold">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
