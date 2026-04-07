export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary/10 z-[60] px-6 py-2 flex justify-between items-center md:hidden">
      <a className="flex flex-col items-center gap-1 text-primary" href="/homepage">
        <span className="material-symbols-outlined text-2xl">home</span>
        <span className="text-[10px] font-bold uppercase tracking-wider">Beranda</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-stone-400" href="/sejarah">
        <span className="material-symbols-outlined text-2xl">history_edu</span>
        <span className="text-[10px] font-bold uppercase tracking-wider">Sejarah</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-stone-400" href="/gambut">
        <span className="material-symbols-outlined text-2xl">nature</span>
        <span className="text-[10px] font-bold uppercase tracking-wider">Gambut</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-stone-400" href="#kontak">
        <span className="material-symbols-outlined text-2xl">chat</span>
        <span className="text-[10px] font-bold uppercase tracking-wider">Kontak</span>
      </a>
    </nav>
  );
}