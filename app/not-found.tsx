"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-4 py-6 text-[#161616]">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-sm items-center justify-center">
        <section className="w-full rounded-[28px] border border-black/8 bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#f5f5f5] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#303030]">
            <span className="material-symbols-outlined text-[16px]">
              construction
            </span>
            Under Maintenance
          </div>

          <div className="mt-4 rounded-[24px] border border-black/8 bg-[#fafafa] p-3">
            <img
              src="https://media.tenor.com/cb9L14uH-YAAAAAM/cool-fun.gif"
              alt="Animasi lucu under maintenance"
              className="h-[200px] w-full rounded-[18px] object-contain"
            />
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6f6f6f]">
              Halaman Belum Jadi
            </p>
            <h1 className="text-[1.55rem] font-extrabold leading-tight text-[#111111]">
              Waduh, halamannya masih dipoles.
            </h1>
            <p className="text-sm leading-6 text-[#5f5f5f]">
              Fitur atau halaman yang kamu buka belum siap dipakai. Untuk
              sementara, tim desa masih sibuk merapikan tampilan dan isi
              halamannya.
            </p>
          </div>

          <div className="mt-4 rounded-[22px] border border-dashed border-black/10 bg-[#fafafa] px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#777777]">
              Pemberitahuan Penting
            </p>
            <p className="mt-2 text-[14px] font-extrabold leading-6 text-[#141414]">
              Pria solo x Nasi cumi hitam nasi cumi hitam pak kris
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2.5">
            <Link
              href="/"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-[#111111] px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#222222]"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Kembali ke Beranda
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-bold text-[#181818] transition-colors duration-200 hover:bg-[#f7f7f7]"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Halaman Sebelumnya
            </button>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-[#707070]">
            Kalau ini bukan sengaja, berarti link yang dibuka memang belum
            tersedia atau sedang dalam perawatan.
          </p>
        </section>
      </div>
    </main>
  );
}
