export default function ContactSection() {
  return (
    <section className="py-24 bg-surface" id="kontak">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden grid md:grid-cols-2 gap-0 border border-primary/5">
          <div className="p-12 md:p-16 space-y-8">
            <h2 className="text-4xl font-headline font-bold text-primary">Hubungi Kami</h2>
            <p className="text-on-surface-variant text-lg">
              Mari berdiskusi atau berkunjung ke desa kami untuk mengenal lebih dekat warisan budaya dan alamnya.
            </p>

            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold">Alamat Kantor Desa</h4>
                  <p className="text-on-surface-variant">Jl. Raya Lubuk Mandian Gajah, Kec. Bunut, Kab. Pelalawan, Riau.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div>
                  <h4 className="font-bold">WhatsApp</h4>
                  <p className="text-on-surface-variant">+62 812-3456-7890</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" href="#">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
              <a className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" href="#">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
            </div>
          </div>

          <div className="h-[400px] md:h-full min-h-[400px] bg-stone-100 relative">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe2OWIN8WvWVzgBoTga6KZzLKLbIXzZi0XeOreTLO3Hdk47MIDKpGtiX26Ow0CqfkOONLwgw7w9rdW8JcAqpq5IW5QGbLaGOSL0bcC3MqqF_iHdPcw55Q9ziCCmwGN6jp1xhXLyBqdHwwAZXhH1cEonbHy1bPvMoq72MAhPnfHt1ezptkdcJQHhsKPCW0X-WTqMMYbwOixJKq_RcRid7HAjMcVtLOenKNmkT0f4cPIp-yqidIzMZMwnejgjTCwzYhAZ0Ou_FUQ1n8"
              alt="Peta desa"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce">
                <span className="material-symbols-outlined">push_pin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
