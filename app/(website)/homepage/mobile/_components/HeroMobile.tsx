import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function HeroMobile({ data }: Props) {
  return (
    <section className="relative min-h-[75svh] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIEm68iyNLjllXfE6gSr5C4MAJZq0v_Vz47u8I4Z0UCzuQ09vGd0viVuFlxDpeXxqhHLD7BXHdc92slNlr-GsMrzGV6fYYpMSbaKG-HeTzbRDMkRE7vzR-oDhjTWPqIxCMttnTwHZWqU8HQzDUT4IaVLSP_INNwMtbLZbGqMhzqqS8k-C2Kj-6iKtc2TylINONnikb2svjB8-4NlNZPrp4FFf-C_zy6V3qpUwGpnkEQIus8gU1uq4_Vu_VkaisbRwSxrM82pSWk6I"
          alt={data.villageName}
        />
        <div className="absolute inset-0 hero-gradient-mobile" />
      </div>

      <div className="relative z-10 w-full px-6 pb-12">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full">
            <span className="material-symbols-outlined text-sm">eco</span>
            Desa Peduli Gambut
          </span>

          <h1 className="text-4xl font-headline font-bold text-white leading-tight">
            {data.villageName}
          </h1>

          <p className="text-secondary-fixed-dim italic font-headline text-lg font-semibold leading-snug">
            "{data.tagline}"
          </p>

          <div className="flex flex-col gap-3 pt-4">
            <a
              href="/sejarah"
              className="w-full bg-primary-container text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2"
            >
              Sejarah Desa
              <span className="material-symbols-outlined text-xl">history_edu</span>
            </a>

            <a
              href="/gambut"
              className="w-full border border-white/40 bg-white/10 backdrop-blur-md text-white py-4 rounded-xl font-bold text-center"
            >
              Kenali Gambut
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}