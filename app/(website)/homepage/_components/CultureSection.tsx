const cultureCards = [
  {
    icon: "groups",
    title: "Batin Bunut",
    description:
      "Keterikatan sejarah dan adat dengan kedatuan Bunut sebagai pusat peradaban lokal.",
  },
  {
    icon: "record_voice_over",
    title: "Dialek Melayu Kampar",
    description:
      "Identitas tutur yang khas, mencerminkan kedekatan geografis dan kekerabatan budaya.",
  },
];

export default function CultureSection() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-6 gap-4 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full aspect-square border-2 border-primary rotate-45" />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
        <h2 className="text-4xl font-headline font-bold text-primary">Akar Budaya Melayu Petalangan</h2>
        <div className="flex justify-center">
          <div className="pucuk-rebung-divider" />
        </div>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          Masyarakat desa merupakan bagian dari Sub-Suku Petalangan yang memiliki hubungan erat dengan Batin Bunut. Kami menuturkan Dialek Melayu Kampar dan memegang teguh nilai-nilai musyawarah serta kebersamaan dalam setiap sendi kehidupan sosial.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
          {cultureCards.map((card) => (
            <div key={card.title} className="p-8 rounded-3xl bg-surface-container shadow-sm border border-primary/10">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">{card.icon}</span>
              <h4 className="text-xl font-bold mb-2">{card.title}</h4>
              <p className="text-on-surface-variant">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
