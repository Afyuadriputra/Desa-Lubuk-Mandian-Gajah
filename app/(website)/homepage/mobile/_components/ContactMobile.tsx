import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

const LATITUDE = 0.21392621504433937;
const LONGITUDE = 102.1626206;

export default function ContactMobile({ data }: Props) {
  const whatsappNumber = data.contact.whatsapp.replace(/\D/g, "");
  const mapsUrl = `https://www.google.com/maps?q=${LATITUDE},${LONGITUDE}`;

  return (
    <section className="defer-section section-shell-mobile px-4 bg-surface" id="kontak">
      <div className="overflow-hidden rounded-[24px] border border-primary/10 bg-white shadow-[0_14px_34px_rgba(31,94,59,0.08)]">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-container to-primary px-4 py-5 text-white">
          <div
            className="pointer-events-none absolute -right-[14px] -top-[18px] h-[92px] w-[92px] rotate-[14deg] opacity-10"
            style={{
              backgroundImage:
                'url("https://api.iconify.design/gis:ornament.svg")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-[18px] -left-[12px] h-[92px] w-[92px] rotate-[190deg] scale-90 opacity-10"
            style={{
              backgroundImage:
                'url("https://api.iconify.design/gis:ornament.svg")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />

          <div className="relative z-[1]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
              <span className="material-symbols-outlined text-[15px]">
                call
              </span>
              Kontak Desa
            </div>

            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-tight text-white">
              Hubungi Kami
            </h2>

            <p className="mt-2 text-[13px] leading-5 text-white/92">
              Kontak dan lokasi desa untuk komunikasi dan kunjungan.
            </p>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 rounded-2xl border border-primary/8 bg-surface-container-low px-3.5 py-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">
                  location_on
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary">
                  Alamat
                </p>
                <p className="mt-1 text-[13px] leading-5 text-on-surface-variant">
                  {data.contact.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-primary/8 bg-surface-container-low px-3.5 py-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">
                  chat
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary">
                  WhatsApp
                </p>
                <p className="mt-1 text-[13px] font-semibold leading-5 text-on-surface">
                  {data.contact.whatsapp}
                </p>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-primary px-3 text-white"
                aria-label="Hubungi lewat WhatsApp"
              >
                <span className="material-symbols-outlined text-[18px]">
                  send
                </span>
              </a>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-primary px-3 text-[13px] font-bold text-white shadow-[0_10px_22px_rgba(31,94,59,0.16)]"
            >
              <span className="material-symbols-outlined text-[18px]">
                forum
              </span>
              WhatsApp
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-primary/10 bg-surface px-3 text-[13px] font-bold text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">
                map
              </span>
              Lokasi
            </a>
          </div>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="relative block h-[160px] overflow-hidden border-t border-primary/8 bg-surface-container-low"
          aria-label="Buka lokasi di Google Maps"
        >
          <img
            className="h-full w-full object-cover"
            src={data.contact.mapImage}
            alt="Peta desa"
            width="960"
            height="640"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="rounded-2xl bg-white/88 px-3.5 py-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[18px]">
                    near_me
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary">
                    Koordinat
                  </p>
                  <p className="truncate text-[13px] font-semibold text-on-surface">
                    {LATITUDE}, {LONGITUDE}
                  </p>
                </div>

                <span className="material-symbols-outlined text-primary text-[18px]">
                  open_in_new
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
