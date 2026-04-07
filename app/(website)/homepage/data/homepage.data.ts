import type { HomepageData } from "./homepage.types";

export const homepageData: HomepageData = {
  villageName: "Lubuk Mandian Gajah",
  tagline:
    "Jejak Sejarah Melayu Petalangan, Warisan Sialang, dan Desa Peduli Gambut",
  heroDescription:
    "Desa ini berada di Kecamatan Bunut, Kabupaten Pelalawan, terdiri dari 2 dusun, 8 RT, dan memiliki bentang dataran rendah yang dialiri beberapa sungai menuju kawasan gambut di bagian timur.",
  heroImage:
    "https://asset.kompas.com/crops/QO5r2ti4CwzQ0npRCSipExrAfvA=/0x0:800x533/1200x800/data/photo/2024/02/27/65ddcfb80fe4c.jpg",
  heroBadge: "Desa Peduli Gambut",
  brand: {
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Pelalawan_logo.png/330px-Pelalawan_logo.png",
    logoAlt: "Logo Kabupaten Pelalawan",
    regionLabel: "Kabupaten Pelalawan",
  },

  stats: [
    { value: "2", label: "Dusun" },
    { value: "4", label: "RW" },
    { value: "8", label: "RT" },
    { value: "791", label: "Jiwa" },
    { value: "233", label: "KK" },
    { value: "82.02", label: "Ha Gambut" },
    { value: "17", label: "Embung" },
  ],
  quickStatsDescription:
    "Desa Lubuk Mandian Gajah merupakan desa di bagian tenggara Provinsi Riau, bertopografi dataran rendah, memiliki sungai-sungai yang mengarah ke lahan gambut, dan memiliki akses darat yang strategis.",

  contact: {
    address: "Jl. Raya Lubuk Mandian Gajah, Kec. Bunut, Kab. Pelalawan, Riau.",
    whatsapp: "+62 812-3456-7890",
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBe2OWIN8WvWVzgBoTga6KZzLKLbIXzZi0XeOreTLO3Hdk47MIDKpGtiX26Ow0CqfkOONLwgw7w9rdW8JcAqpq5IW5QGbLaGOSL0bcC3MqqF_iHdPcw55Q9ziCCmwGN6jp1xhXLyBqdHwwAZXhH1cEonbHy1bPvMoq72MAhPnfHt1ezptkdcJQHhsKPCW0X-WTqMMYbwOixJKq_RcRid7HAjMcVtLOenKNmkT0f4cPIp-yqidIzMZMwnejgjTCwzYhAZ0Ou_FUQ1n8",
  },

  namingTitle: "Kenapa Mandian Gajah?",
  namingDescription:
    "Berakar dari Sungai Skou, tempat kawanan gajah liar mandi di masa lampau. Kini menjadi desa menetap tanpa melupakan akar sejarah alamnya.",
  namingImage:
    "https://awsimages.detik.net.id/community/media/visual/2022/06/26/berfoto-bersama-gajah-di-tangkahan_169.jpeg?w=1200",
  namingQuote: "Jejak kawanan gajah di tepian Sungai Skou.",

  cultureTitle: "Akar Budaya Melayu Petalangan",
  cultureDescription:
    "Masyarakat desa merupakan bagian dari Sub-Suku Petalangan yang memiliki hubungan erat dengan Batin Bunut. Kami menuturkan Dialek Melayu Kampar dan memegang teguh nilai-nilai musyawarah serta kebersamaan dalam setiap sendi kehidupan sosial.",
  cultureCards: [
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
  ],

  sialangTitle: "Kopung Sialang",
  sialangDescription:
    'Kawasan Hutan Adat Kopung Sialang adalah bukti nyata kepedulian kami. Di sini terdapat pohon-pohon Sialang raksasa yang dilindungi secara adat. Tradisi "Menumbai" dipimpin oleh Juagan Tuo dan Juagan Mudo.',
  sialangImage:
    "https://upload.wikimedia.org/wikipedia/commons/b/ba/Koompasia_excelsa.jpg",
  sialangBadge: "Kearifan Lokal",
  sialangStat: "50.6 Hektar Area Lindung",
  sialangQuote:
    "Menjaga Sialang berarti menjaga keberlangsungan hidup dan berkah dari alam.",

  peatTitle: "Desa & Gambut",
  peatDescription:
    "Melalui sejarah panjang sebagai area persawahan, kini desa beradaptasi dengan tantangan iklim melalui pemulihan ekosistem.",
  peatQuote:
    "Gambut bukan sekadar bentang alam, tapi bagian dari sejarah dan tantangan masa depan.",
  peatImages: [
    "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1611395086/vgwzn1aviqhxysu2xesv.jpg",
    "https://indomgb.s3.amazonaws.com/wp-content/uploads/2024/05/22003021/Mengukur-subsiden-gambut-pada-tanaman-kelapa-di-Indragiri-Hilir.-Foto-Sigit-Sutikno-768x512.jpg",
  ],

  recoveryItems: [
    {
      icon: "local_fire_department",
      title: "Refleksi Masa Lalu",
      description:
        "Mengenang kebakaran besar 2015 dan 2019 sebagai titik balik kesadaran menjaga lingkungan.",
      wrapper: "bg-error/10 text-error",
    },
    {
      icon: "nature_people",
      title: "PLTB",
      description:
        "Penerapan Pembukaan Lahan Tanpa Bakar (PLTB) sebagai komitmen desa bebas asap.",
      wrapper: "bg-primary/10 text-primary",
    },
    {
      icon: "recycling",
      title: "KWT Berkah Mandiri",
      description:
        "Inisiatif pengomposan oleh Kelompok Wanita Tani untuk pertanian berkelanjutan.",
      wrapper: "bg-secondary/10 text-secondary",
    },
  ],

  potentials: [
    {
      title: "Karet",
      image:
        "https://www.cakaplah.com/assets/news/20102020/cakaplah_zvk8y_60304.jpg",
    },
    {
      title: "Sawit",
      image:
        "https://asset.tribunnews.com/0QnQXxKZICOb9GELeslvWlig2mM=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/medan/foto/bank/originals/Ilustrasi-Kebun-Sawitsds.jpg",
    },
    {
      title: "Padi",
      image:
        "https://www.okeline.com/foto_berita/9202d84308b5fed99621bd32ab708b52.jpg",
    },
    {
      title: "Cabe",
      image:
        "https://mediacenter.riau.go.id/foto_berita/medium/pemprov-riau-datangkan-1-ton-cabai.jpg",
    },
    {
      title: "Madu",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTtub4CjqPnN2fBz9V-iDFKqDB5dO0KbCjrV57MHQOH0aF8Pi87ivcJwwna9lWBRqRAhDX0RXEEQ34rn4WRWED-Bz1Z2Y5XXke8bfLqY7Cx38wcpaJWSv4WNNqbUdnalkdPWa2upGM57qW/s1600/Cara+Mengambil+Madu+Sialang+Secara+Tradisional+Maupun+Modern+4.png",
    },
  ],
  potentialQuote:
    "Karet dan sawit menjadi primadona pendapatan utama masyarakat, sementara padi dan hortikultura melengkapi kehidupan pangan.",
  potentialOpportunityItems: [
    {
      icon: "storefront",
      title: "Akses Pasar",
      description:
        "Lokasi strategis memudahkan distribusi hasil bumi ke pasar regional.",
    },
    {
      icon: "travel_explore",
      title: "Ekowisata",
      description:
        "Kopung Sialang berpotensi menjadi destinasi wisata alam dan budaya yang unik.",
    },
    {
      icon: "handshake",
      title: "Kemitraan",
      description:
        "Peran BUMDes dan Koperasi diperkuat untuk meningkatkan nilai tambah produk lokal.",
    },
  ],

  facilitiesTitle: "Fasilitas dan Kehidupan Desa",
  facilities: [
    { icon: "construction", label: "58 Box Culvert" },
    { icon: "water", label: "17 Embung & 2 Reservoir" },
    { icon: "school", label: "SDN 007 & PAUD" },
    { icon: "health_and_safety", label: "Poskesdes" },
    { icon: "account_balance", label: "Kantor Desa" },
  ],

  gallery: [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBe2OWIN8WvWVzgBoTga6KZzLKLbIXzZi0XeOreTLO3Hdk47MIDKpGtiX26Ow0CqfkOONLwgw7w9rdW8JcAqpq5IW5QGbLaGOSL0bcC3MqqF_iHdPcw55Q9ziCCmwGN6jp1xhXLyBqdHwwAZXhH1cEonbHy1bPvMoq72MAhPnfHt1ezptkdcJQHhsKPCW0X-WTqMMYbwOixJKq_RcRid7HAjMcVtLOenKNmkT0f4cPIp-yqidIzMZMwnejgjTCwzYhAZ0Ou_FUQ1n8",
      alt: "Peta Wilayah Desa",
      tall: true,
      caption: "Peta Wilayah Desa",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBqMr6jhCxZomZK_pcEN6aNshbWi5k8TcaJJbmr88FYia0CeCk1crf1IzMwaoddDwDN7Q-WRx-XSwAlcNbKa7JpzqQAuyK25rmadkc-vu9ybSy65DNWUyOoNjcKi0tM1k_NWfArDP5UPZ8tF74o4_ICV2OVVuKihaIaG8xWUCpmPBNbdXcM1oFfg2ZnuH7Ux-veTNY52qwB0MfvebF98oXJSWWU8X-vBIuoSq5ZIZ6F9dTNcfJz5H1bdjWiONBo1Uy2bv96OQXCg34",
      alt: "Galeri desa 2",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDpqIWN5Ey98N7l2qF2MdGb-3RnZidVj-qaMXVA0F-tSLmaSXIQ1f4kTD0vvH7sD5hnRp7nlW-MarBXdsX_4relk9s0wK9AXQIKpXjsbmPehSls9rcTeIwl0xqMOqAd69rAEnxUqVfU5b9jGJ0l0uZNWe6o33WMYimQdtdbO3lCW8eqzDal50IVb9FjX87pQ_1hSNrgb_OlOG5ZN1s7ENplfvB061WcUFI42vz0d9KL_TCsg-Hs7JuW520BuWd_HU5ENkeYakc4puc",
      alt: "Galeri desa 3",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDKRm5Kezn1GW2oOwiNtjyvOrJmgXp9T8lD4Xs7KQ0vND94x2NGEevGJSABFiBLpBvcl3TsD4TJGEB61Va_oyCsfNaHFqOE8i2BQC4UgDChYCeLpu8_PehPF3fYuypa8IyXDy5RU3VTzeEjkz7NTQp9nF16Rmsk6VOobKSz5gbYklwSmEzFUGdpOVloTrR8unS9BZrrVmNMbyK-vSu0E6hG8lO9nesh1mFwybUZXE1osYxHNSUKtFNM0pRBLCF4aqSzqBwms85m5yI",
      alt: "Galeri desa 4",
      tall: true,
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIRJCXJHR7CdBmAUAolGEtpl0z42sU-BeqfqTbp254fqUgZOa16bwahMEhh313llvIfsKIxznr6WoDaa85R0y3p9rAp7neGDDjczS5C9olyaSf7_h73dw77HMrwD93quSq2Vnw0nyA4rXZ6SMFwHz8cbGyKqFuSY1UJWZVZZeBHQs4bJMRUx9jQ4odyNetFSkjwDFEIWAmFq3PK9n3DME2WIuxLXEWodFKDNFwjMnaMgryn-ubn-cdFngpi-HHNmeYQBagnvqZCtc",
      alt: "Galeri desa 5",
    },
  ],

  footerLinks: [
    { label: "Sejarah Lengkap", href: "/sejarah" },
    { label: "Profil Gambut", href: "/gambut" },
    { label: "Potensi Ekonomi", href: "/potensi" },
    { label: "Transparansi Desa", href: "/transparansi" },
  ],
  footerDescription:
    "Melestarikan warisan leluhur Melayu Petalangan, menjaga keseimbangan ekosistem gambut, dan membangun kemandirian ekonomi desa.",
  officeHours: [
    { day: "Senin - Kamis", time: "08:00 - 15:00" },
    { day: "Jumat", time: "08:00 - 11:30" },
    { day: "Sabtu - Minggu", time: "Tutup", danger: true },
  ],
  footerBadges: ["Wonderful Indonesia", "Riau Homeland of Melayu"],
  footerCopyright:
    "© 2024 Desa Lubuk Mandian Gajah. Melestarikan Warisan, Menjaga Alam.",
};
