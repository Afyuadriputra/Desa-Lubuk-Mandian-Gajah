export default function BottomNav() {
  const items = [
    {
      href: "/homepage",
      icon: "home",
      label: "Beranda",
      active: true,
    },
    {
      href: "/sejarah",
      icon: "history_edu",
      label: "Sejarah",
    },
    {
      href: "/gambut",
      icon: "nature",
      label: "Gambut",
    },
    {
      href: "#kontak",
      icon: "chat",
      label: "Kontak",
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] md:hidden">
      <nav
        className="pointer-events-auto mx-auto flex max-w-md items-center justify-between rounded-[28px] border border-white/45 px-2.5 py-2 shadow-[0_12px_34px_rgba(20,32,24,0.16)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.32) 100%)",
          backdropFilter: "blur(18px) saturate(180%)",
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
          boxShadow:
            "0 12px 34px rgba(20,32,24,0.16), inset 0 1px 0 rgba(255,255,255,0.55)",
        }}
      >
        {items.map((item) => {
          const isActive = item.active;

          return (
            <a
              key={item.label}
              href={item.href}
              className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 rounded-[22px] px-2 py-3 transition-all duration-300 ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.22) 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 18px rgba(31,94,59,0.10)",
                    }
                  : undefined
              }
            >
              {isActive && (
                <span className="absolute inset-x-4 top-1 h-px rounded-full bg-white/75" />
              )}

              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive ? "bg-primary/12" : "bg-black/5"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive ? "text-[22px]" : "text-[21px]"
                  }`}
                >
                  {item.icon}
                </span>
              </span>

              <span
                className={`text-[11px] font-bold leading-none tracking-[0.1em] uppercase ${
                  isActive ? "text-primary" : "text-on-surface"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
