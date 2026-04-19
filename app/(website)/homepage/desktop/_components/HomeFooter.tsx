import type { HomepageData } from "../../data/homepage.types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <footer className="bg-surface-container pt-20 pb-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="section-stack-tight">
          <div className="type-body font-bold text-primary uppercase tracking-widest">
            {data.villageName}
          </div>
          <p className="type-body text-on-surface-variant">{data.footerDescription}</p>
        </div>

        <div className="section-stack-tight">
          <h4 className="type-body font-bold text-primary">Tautan Penting</h4>
          <ul className="space-y-3 type-body">
            {data.footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="group flex items-center gap-2 rounded-2xl px-3 py-2 text-on-surface-variant transition-colors hover:bg-white/70 hover:text-primary"
                  href={link.href}
                >
                  <DesktopIcon name="chevron_right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="section-stack-tight">
          <h4 className="type-body font-bold text-primary">Jam Operasional Kantor</h4>
          <Accordion
            type="single"
            collapsible
            defaultValue={data.officeHours[0]?.day}
            className="rounded-[1.5rem] border border-primary/10 bg-white/72 px-4 py-2"
          >
            {data.officeHours.map((item) => (
              <AccordionItem key={item.day} value={item.day} className="border-primary/10">
                <AccordionTrigger className="py-3 text-primary hover:no-underline">{item.day}</AccordionTrigger>
                <AccordionContent className="pb-3 text-on-surface-variant">
                  <span className={item.danger ? "font-semibold text-error" : "font-semibold text-primary"}>
                    {item.time}
                  </span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="type-body text-on-surface-variant text-center">{data.footerCopyright}</p>
        <div className="flex flex-wrap gap-3 opacity-80 transition-[filter,opacity] duration-200">
          {data.footerBadges.map((badge) => (
            <Card key={badge} className="rounded-full border-primary/8 bg-white/76 shadow-none">
              <CardContent className="px-4 py-2">
                <span className="type-label font-bold">{badge}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </footer>
  );
}
