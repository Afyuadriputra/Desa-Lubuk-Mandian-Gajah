export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary/10 z-[60] px-6 py-4 flex justify-between items-center md:hidden">
      <a className="flex flex-col items-center gap-2 text-primary" href="/homepage">
        <span className="material-symbols-outlined text-2xl">home</span>
        <span className="type-label font-bold">Beranda</span>
      </a>
      <a className="flex flex-col items-center gap-2 text-stone-400" href="/sejarah">
        <span className="material-symbols-outlined text-2xl">history_edu</span>
        <span className="type-label font-bold">Sejarah</span>
      </a>
      <a className="flex flex-col items-center gap-2 text-stone-400" href="/gambut">
        <span className="material-symbols-outlined text-2xl">nature</span>
        <span className="type-label font-bold">Gambut</span>
      </a>
      <a className="flex flex-col items-center gap-2 text-stone-400" href="#kontak">
        <span className="material-symbols-outlined text-2xl">chat</span>
        <span className="type-label font-bold">Kontak</span>
      </a>
    </nav>
  );
}
