import type { HomepageData } from "../../data/homepage.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function HeroSection({ data }: Props) {
  const hasHeroImage = Boolean(data.heroImage);

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {hasHeroImage ? (
          <img
            className="w-full h-full object-cover"
            src={data.heroImage}
            alt={data.villageName}
          />
        ) : (
          <div className="w-full h-full bg-[linear-gradient(135deg,#1f5e3b_0%,#2f7d4f_45%,#d7a93b_100%)]" />
        )}
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl text-white section-stack">
          <Badge className="w-fit animate-[stat-card-reveal_700ms_cubic-bezier(0.22,1,0.36,1)_both] shadow-md">
            {data.heroBadge}
          </Badge>
          <h1 className="type-display font-bold tracking-tight text-balance">
            {data.villageName}
          </h1>
          <p className="type-title text-secondary-fixed-dim italic font-semibold text-balance">
            "{data.tagline}"
          </p>
          <p className="type-body text-white/90 max-w-2xl">
            {data.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="group">
              <a href="/sejarah">
                Baca Sejarah Desa
                <DesktopIcon
                  name="history_edu"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </Button>
            <Button
              asChild
                variant="outline"
                size="lg"
                className="border-white/24 bg-white/10 text-white backdrop-blur-md hover:bg-white/18 hover:text-white"
              >
              <a href="/gambut">
                Kenali Gambut Desa
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-sm font-medium text-white/72">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" aria-hidden="true" />
            Narasi desa, sejarah, lingkungan, dan potensi ekonomi dalam satu alur.
          </div>
        </div>
      </div>
    </section>
  );
}
