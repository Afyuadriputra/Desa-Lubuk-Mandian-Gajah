import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function ContactMobile({ data }: Props) {
  return (
    <section className="py-16 px-6" id="kontak">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-primary/5">
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-headline font-bold text-primary">Hubungi Kami</h2>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <p className="text-sm text-on-surface-variant">{data.contact.address}</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary">chat</span>
              <p className="text-sm text-on-surface-variant">{data.contact.whatsapp}</p>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2">
            Kirim Pesan
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>

        <div className="h-48 bg-stone-100 relative">
          <img
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe2OWIN8WvWVzgBoTga6KZzLKLbIXzZi0XeOreTLO3Hdk47MIDKpGtiX26Ow0CqfkOONLwgw7w9rdW8JcAqpq5IW5QGbLaGOSL0bcC3MqqF_iHdPcw55Q9ziCCmwGN6jp1xhXLyBqdHwwAZXhH1cEonbHy1bPvMoq72MAhPnfHt1ezptkdcJQHhsKPCW0X-WTqMMYbwOixJKq_RcRid7HAjMcVtLOenKNmkT0f4cPIp-yqidIzMZMwnejgjTCwzYhAZ0Ou_FUQ1n8"
            alt="Peta desa"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">
            <span className="material-symbols-outlined text-4xl animate-bounce">push_pin</span>
          </div>
        </div>
      </div>
    </section>
  );
}