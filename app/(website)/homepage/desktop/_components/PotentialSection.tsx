const potentials = [
  {
    title: "Karet (40%)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAl2SPLnuZEJeUb1trZnGqRck_UShIbVvvK4JZVEa3KrEN34AKvybUvS_bMDB_s6CVJlmX_jNb3wpBHiIRvMUdX-SrrryUQVqgeLBv_KvfZkLSR8fmKQ63ldAaLodbXjp_feOwXmHKT7tSnlxBjeGbp3BBgqU0lWGJvXuFx_rZ0fU53JII069eawust7urY3Ue4y1gd1WTohL7lH25rb1M_Q0FNPrHoXh3rM96bRPbP96xv_irTxx_EorOr7PUprDVsvCDvQqBR4SQ",
  },
  {
    title: "Sawit (40%)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdX6sqZcUkoOv9nVR4rju2Rafo3KXvGuCYn6oEvR4yWtkHq9ZTz2sY2FrQd7a7FYOs-1UJXp0yhRQNOOCCf0b8Ky_oAdI80ewe5hw9jMuO-BaShxdcj1SWOJGNZl0w3pn8SwQxAzuedxtnKWNl_wwcpad7N8SIfBNeaSJMBimXUtNkhJdnhPa8oQWaCsAu8RtH8pgKAdsMGiJ2ftozSWEbB_k8pgBVH3IM0wizVu5EfYABpMnOPGy0SGIsT-3MtodzbryFsT9tYzs",
  },
  {
    title: "Padi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGyJt19_TWGmGaj7iyHyKwEkNeqnzZBBPCZqEuaCd-hPNSM4lq0731xwJVn9zn-UKzXgzBKFvoRI4f2srk1NBzhiiK7qn4dhqLpfp8aIRhp-lVW_PbNoR1ugkGvBNmgTxEzQVQ90awvRaT7WsJax-7nc3kZA3FxhNbz1iZOOF5VvvhEXMvCAIQMJ3ce3RMCQ_IEWdrwmkBzDdktiL5f9iT2leuIimbM-B1PBBNHFzAaw7Yq2lZJuS6f9GPy8mXS8F4lzEnKy1a4I4",
  },
  {
    title: "Cabe (Hortikultura)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSGc-W8Ye_BTFZg36V8GuCLp66pSWlujmM48nIh8tjBgROCG6U-QHrRquQdMjhekoThqw8wyWeTGgBE0peFHmnONqAckbqZD32fxPT4L-Pgt3l5o8x76ZHgB0mhCkC1VeE0kI6nHJ_RcT4-F6_Q7yqB71H_eFLAFmSqvBX70XGy1OI8Ri_pfnTvA8V5o9NEm31DyqDvmit99p9gZxX-Mg3R83sSUqqLEVcoXy3UUvpcX52G9JfE-wn6cniCPvs1tUG96f0TfAMc8Y",
  },
  {
    title: "Madu Sialang",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1D3k556q6tHa2yGBB-VE5Ki_GBmz_XBR0zKz_H3k-Q4IUNWQTIhEO8G6lKc2aBUFfURR2IlP2dQin46QSMpursJWIkBurdFRS8CNFtwTO9QT50L6FF92DFkSUExsX94W4hJjAijRY8LUBCIqQF0EH9gk3zPKVvvJ__Hs5OQBv51eX-h_qyp9iVQJiYh6SBSd0yRONaSgT0NHp8D3h_gBXCJAnL71yiSrdcMmOiwbifuaoGNiFpihHDMv5cw0zVjZ_Rx8IhzFeUPg",
  },
];

const opportunityItems = [
  {
    icon: "storefront",
    title: "Akses Pasar",
    description: "Lokasi strategis memudahkan distribusi hasil bumi ke pasar regional.",
  },
  {
    icon: "travel_explore",
    title: "Ekowisata",
    description: "Kopung Sialang berpotensi menjadi destinasi wisata alam dan budaya yang unik.",
  },
  {
    icon: "handshake",
    title: "Kemitraan",
    description: "Peran BUMDes dan Koperasi diperkuat untuk meningkatkan nilai tambah produk lokal.",
  },
];

import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center section-stack-tight mb-16">
          <h2 className="type-title font-bold text-primary">Potensi Unggulan Desa</h2>
          <div className="flex justify-center">
            <div className="pucuk-rebung-divider" />
          </div>
          <p className="type-body text-on-surface-variant max-w-2xl mx-auto">
            "Karet dan sawit menjadi primadona pendapatan utama masyarakat, sementara padi dan hortikultura melengkapi kehidupan pangan."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {potentials.map((item) => (
            <div key={item.title} className="group relative rounded-3xl overflow-hidden aspect-[3/4]">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.image} alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <h4 className="type-body font-bold text-white">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary-container rounded-[2.5rem] p-12 text-white">
          <h3 className="type-title font-bold mb-8 text-center">Potensi yang Bisa Berkembang</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {opportunityItems.map((item) => (
              <div key={item.title} className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h4 className="type-body font-bold">{item.title}</h4>
                <p className="type-body text-primary-fixed opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
