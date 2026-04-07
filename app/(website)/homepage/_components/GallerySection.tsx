const galleryImages = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBe2OWIN8WvWVzgBoTga6KZzLKLbIXzZi0XeOreTLO3Hdk47MIDKpGtiX26Ow0CqfkOONLwgw7w9rdW8JcAqpq5IW5QGbLaGOSL0bcC3MqqF_iHdPcw55Q9ziCCmwGN6jp1xhXLyBqdHwwAZXhH1cEonbHy1bPvMoq72MAhPnfHt1ezptkdcJQHhsKPCW0X-WTqMMYbwOixJKq_RcRid7HAjMcVtLOenKNmkT0f4cPIp-yqidIzMZMwnejgjTCwzYhAZ0Ou_FUQ1n8",
    tall: true,
    caption: "Peta Wilayah Desa",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqMr6jhCxZomZK_pcEN6aNshbWi5k8TcaJJbmr88FYia0CeCk1crf1IzMwaoddDwDN7Q-WRx-XSwAlcNbKa7JpzqQAuyK25rmadkc-vu9ybSy65DNWUyOoNjcKi0tM1k_NWfArDP5UPZ8tF74o4_ICV2OVVuKihaIaG8xWUCpmPBNbdXcM1oFfg2ZnuH7Ux-veTNY52qwB0MfvebF98oXJSWWU8X-vBIuoSq5ZIZ6F9dTNcfJz5H1bdjWiONBo1Uy2bv96OQXCg34",
    tall: false,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpqIWN5Ey98N7l2qF2MdGb-3RnZidVj-qaMXVA0F-tSLmaSXIQ1f4kTD0vvH7sD5hnRp7nlW-MarBXdsX_4relk9s0wK9AXQIKpXjsbmPehSls9rcTeIwl0xqMOqAd69rAEnxUqVfU5b9jGJ0l0uZNWe6o33WMYimQdtdbO3lCW8eqzDal50IVb9FjX87pQ_1hSNrgb_OlOG5ZN1s7ENplfvB061WcUFI42vz0d9KL_TCsg-Hs7JuW520BuWd_HU5ENkeYakc4puc",
    tall: false,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKRm5Kezn1GW2oOwiNtjyvOrJmgXp9T8lD4Xs7KQ0vND94x2NGEevGJSABFiBLpBvcl3TsD4TJGEB61Va_oyCsfNaHFqOE8i2BQC4UgDChYCeLpu8_PehPF3fYuypa8IyXDy5RU3VTzeEjkz7NTQp9nF16Rmsk6VOobKSz5gbYklwSmEzFUGdpOVloTrR8unS9BZrrVmNMbyK-vSu0E6hG8lO9nesh1mFwybUZXE1osYxHNSUKtFNM0pRBLCF4aqSzqBwms85m5yI",
    tall: true,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIRJCXJHR7CdBmAUAolGEtpl0z42sU-BeqfqTbp254fqUgZOa16bwahMEhh313llvIfsKIxznr6WoDaa85R0y3p9rAp7neGDDjczS5C9olyaSf7_h73dw77HMrwD93quSq2Vnw0nyA4rXZ6SMFwHz8cbGyKqFuSY1UJWZVZZeBHQs4bJMRUx9jQ4odyNetFSkjwDFEIWAmFq3PK9n3DME2WIuxLXEWodFKDNFwjMnaMgryn-ubn-cdFngpi-HHNmeYQBagnvqZCtc",
    tall: false,
  },
];

export default function GallerySection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-headline font-bold text-primary mb-12">Galeri Desa</h2>
        <div className="masonry-grid">
          {galleryImages.map((item, index) => (
            <div key={index} className={`rounded-3xl overflow-hidden relative group ${item.tall ? "row-span-2" : ""}`}>
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image} alt={`Galeri desa ${index + 1}`} />
              {item.caption ? (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold">{item.caption}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
