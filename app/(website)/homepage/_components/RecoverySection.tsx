const recoveryItems = [
  {
    icon: "local_fire_department",
    wrapper: "bg-error/10 text-error",
    title: "Refleksi Masa Lalu",
    description:
      "Mengenang kebakaran besar 2015 dan 2019 sebagai titik balik kesadaran menjaga lingkungan.",
  },
  {
    icon: "nature_people",
    wrapper: "bg-primary/10 text-primary",
    title: "PLTB",
    description:
      "Penerapan Pembukaan Lahan Tanpa Bakar (PLTB) sebagai komitmen desa bebas asap.",
  },
  {
    icon: "recycling",
    wrapper: "bg-secondary/10 text-secondary",
    title: "KWT Berkah Mandiri",
    description:
      "Inisiatif pengomposan oleh Kelompok Wanita Tani untuk pertanian berkelanjutan.",
  },
];

export default function RecoverySection() {
  return (
    <section className="py-24 bg-surface-container-high">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-headline font-bold text-primary">Dari Karhutla ke Pemulihan</h2>
          <div className="flex justify-center">
            <div className="pucuk-rebung-divider" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {recoveryItems.map((item) => (
            <div key={item.title} className="bg-white p-8 rounded-3xl shadow-sm">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 ${item.wrapper}`}>
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h4 className="font-bold text-xl mb-4">{item.title}</h4>
              <p className="text-on-surface-variant">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
