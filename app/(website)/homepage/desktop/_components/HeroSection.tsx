import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function HeroSection({ data }: Props) {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIEm68iyNLjllXfE6gSr5C4MAJZq0v_Vz47u8I4Z0UCzuQ09vGd0viVuFlxDpeXxqhHLD7BXHdc92slNlr-GsMrzGV6fYYpMSbaKG-HeTzbRDMkRE7vzR-oDhjTWPqIxCMttnTwHZWqU8HQzDUT4IaVLSP_INNwMtbLZbGqMhzqqS8k-C2Kj-6iKtc2TylINONnikb2svjB8-4NlNZPrp4FFf-C_zy6V3qpUwGpnkEQIus8gU1uq4_Vu_VkaisbRwSxrM82pSWk6I"
          alt={data.villageName}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl text-white space-y-6">
          <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight tracking-tight">
            {data.villageName}
          </h1>
          <p className="text-xl md:text-2xl text-secondary-fixed-dim leading-relaxed font-headline italic font-semibold">
            "{data.tagline}"
          </p>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
            {data.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/sejarah"
              className="bg-primary-container text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Baca Sejarah Desa
              <span className="material-symbols-outlined">history_edu</span>
            </a>
            <a
              href="/gambut"
              className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Kenali Gambut Desa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}