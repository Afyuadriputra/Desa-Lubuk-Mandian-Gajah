import type { HomepageData } from "../../data/homepage.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  const whatsappNumber = data.contact.whatsapp.replace(/\D/g, "");
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(data.contact.address)}`;
  const hasMapImage = Boolean(data.contact.mapImage);

  return (
    <section className="section-shell bg-surface" id="kontak">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden grid md:grid-cols-2 gap-0 border border-primary/5">
          <div className="p-12 md:p-16 section-stack">
            <h2 className="type-title font-bold text-primary">{data.contactTitle}</h2>
            <p className="type-body text-on-surface-variant">
              {data.contactDescription}
            </p>

            <div className="space-y-6">
              <Card className="rounded-[1.75rem] shadow-none">
                <CardContent className="flex items-start gap-6 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <DesktopIcon name="location_on" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="type-body font-bold">Alamat Kantor Desa</h4>
                    <p className="type-body text-on-surface-variant">{data.contact.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[1.75rem] shadow-none">
                <CardContent className="flex items-start gap-6 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <DesktopIcon name="chat" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="type-body font-bold">WhatsApp</h4>
                    <p className="type-body text-on-surface-variant">{data.contact.whatsapp}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4 pt-4">
              <Button asChild variant="icon" className="rounded-full bg-primary text-white hover:bg-[#174a2e] hover:text-white">
                <a
                  aria-label="Buka lokasi di Google Maps"
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <DesktopIcon name="public" className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="icon" className="rounded-full bg-secondary text-white hover:bg-[#664a00] hover:text-white">
                <a
                  aria-label="Hubungi lewat WhatsApp"
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <DesktopIcon name="share" className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="h-[400px] md:h-full min-h-[400px] bg-stone-100 relative">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="block h-full w-full">
              {hasMapImage ? (
                <img className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]" src={data.contact.mapImage} alt="Peta desa" />
              ) : (
                <div className="w-full h-full bg-primary/10" />
              )}
              <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/12 bg-black/35 p-4 text-white backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">Lokasi Kantor</p>
                <p className="mt-1 text-base font-semibold">Buka peta & arah kunjungan</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
