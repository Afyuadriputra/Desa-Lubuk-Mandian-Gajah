export default function PeatSection() {
  return (
    <section className="py-24 bg-surface scroll-mt-32" id="kontak">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
          <img
            className="rounded-2xl w-full aspect-[3/4] object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqMr6jhCxZomZK_pcEN6aNshbWi5k8TcaJJbmr88FYia0CeCk1crf1IzMwaoddDwDN7Q-WRx-XSwAlcNbKa7JpzqQAuyK25rmadkc-vu9ybSy65DNWUyOoNjcKi0tM1k_NWfArDP5UPZ8tF74o4_ICV2OVVuKihaIaG8xWUCpmPBNbdXcM1oFfg2ZnuH7Ux-veTNY52qwB0MfvebF98oXJSWWU8X-vBIuoSq5ZIZ6F9dTNcfJz5H1bdjWiONBo1Uy2bv96OQXCg34"
            alt="Gambut desa 1"
          />
          <img
            className="rounded-2xl w-full aspect-[3/4] object-cover mt-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqIWN5Ey98N7l2qF2MdGb-3RnZidVj-qaMXVA0F-tSLmaSXIQ1f4kTD0vvH7sD5hnRp7nlW-MarBXdsX_4relk9s0wK9AXQIKpXjsbmPehSls9rcTeIwl0xqMOqAd69rAEnxUqVfU5b9jGJ0l0uZNWe6o33WMYimQdtdbO3lCW8eqzDal50IVb9FjX87pQ_1hSNrgb_OlOG5ZN1s7ENplfvB061WcUFI42vz0d9KL_TCsg-Hs7JuW520BuWd_HU5ENkeYakc4puc"
            alt="Gambut desa 2"
          />
        </div>

        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-4xl font-headline font-bold text-primary">Desa dan Gambut</h2>
          <div className="pucuk-rebung-divider" />
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Dengan luas 82.02 hektar lahan gambut bertingkat kematangan saprik dan hemik, wilayah ini memiliki sejarah panjang sebagai area persawahan. Namun, tantangan perubahan iklim kini membuat kawasan ini rentan terhadap risiko banjir saat hujan dan kekeringan ekstrem.
          </p>
          <div className="bg-secondary-fixed/30 p-8 rounded-3xl border-l-4 border-secondary">
            <p className="text-xl font-headline italic font-bold text-secondary">
              "Gambut bukan hanya bentang alam, tetapi bagian dari sejarah, tantangan, dan masa depan Desa Lubuk Mandian Gajah."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
