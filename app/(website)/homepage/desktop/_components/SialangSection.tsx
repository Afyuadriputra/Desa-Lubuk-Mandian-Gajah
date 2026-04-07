import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="py-24 bg-primary text-white relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container/20 border border-secondary-container/30 text-secondary-container text-xs font-bold tracking-widest uppercase">
            Kearifan Lokal
          </span>
          <h2 className="text-5xl font-headline font-bold">Warisan Alam yang Masih Dijaga</h2>
          <p className="text-lg text-primary-fixed leading-relaxed">
            Kawasan Hutan Adat Kopung Sialang adalah bukti nyata kepedulian kami. Di sini terdapat pohon-pohon Sialang raksasa yang dilindungi secara adat. Tradisi <strong>"Menumbai"</strong> — memanen madu di malam hari dengan lantunan mantra — dipimpin oleh Juagan Tuo dan Juagan Mudo.
          </p>
          <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
            <p className="italic text-primary-fixed mb-4">"Menjaga Sialang berarti menjaga keberlangsungan hidup dan berkah dari alam."</p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-fixed-dim">park</span>
              <span className="font-bold">50.6 Hektar di 9 Lokasi Lindung</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            className="rounded-[3rem] w-full aspect-square object-cover shadow-2xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKRm5Kezn1GW2oOwiNtjyvOrJmgXp9T8lD4Xs7KQ0vND94x2NGEevGJSABFiBLpBvcl3TsD4TJGEB61Va_oyCsfNaHFqOE8i2BQC4UgDChYCeLpu8_PehPF3fYuypa8IyXDy5RU3VTzeEjkz7NTQp9nF16Rmsk6VOobKSz5gbYklwSmEzFUGdpOVloTrR8unS9BZrrVmNMbyK-vSu0E6hG8lO9nesh1mFwybUZXE1osYxHNSUKtFNM0pRBLCF4aqSzqBwms85m5yI"
            alt="Kopung Sialang"
          />
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-primary/60 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-3xl font-headline font-bold">Kopung Sialang</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
