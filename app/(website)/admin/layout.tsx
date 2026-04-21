"use client";

import "./admin-theme.css";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  MessageSquare,
  Newspaper,
  Search,
  Store,
  Users,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";
import type { UserDto } from "@/lib/api/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavGroup = {
  label: string;
  items: Array<{
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

const navGroups: NavGroup[] = [
  {
    label: "Operasional",
    items: [
      { href: "/admin", label: "Ringkasan", icon: LayoutDashboard },
      { href: "/admin/surat-queue", label: "Antrean Surat", icon: FileText },
      { href: "/admin/pengaduan-queue", label: "Antrean Pengaduan", icon: MessageSquare },
    ],
  },
  {
    label: "Analitik",
    items: [{ href: "/admin/analitik", label: "Pusat Analitik", icon: BarChart3 }],
  },
  {
    label: "Konten",
    items: [
      { href: "/admin/homepage", label: "Konten Beranda", icon: Globe },
      { href: "/admin/publikasi", label: "Publikasi", icon: Newspaper },
      { href: "/admin/potensi-ekonomi", label: "Potensi Ekonomi", icon: Store },
    ],
  },
  {
    label: "Master Data",
    items: [{ href: "/admin/profil-wilayah", label: "Profil Wilayah", icon: Map }],
  },
  {
    label: "Akses",
    items: [
      { href: "/admin/akun", label: "Kelola Akun", icon: Users },
      { href: "/admin/akun/ganti-password", label: "Ganti Password", icon: Users },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

  const activeItem = useMemo(() => {
    for (const group of navGroups) {
      for (const item of group.items) {
        const isActive =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

        if (isActive) {
          return { ...item, groupLabel: group.label };
        }
      }
    }

    return {
      href: pathname,
      label: "Workspace",
      icon: LayoutDashboard,
      groupLabel: "Admin",
    };
  }, [pathname]);

  useEffect(() => {
    authApi
      .me()
      .then((user) => setCurrentUser(user))
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const userInitials = useMemo(() => {
    if (!currentUser?.nama_lengkap) return "AD";
    return currentUser.nama_lengkap
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    router.push("/");
  };

  const roleContext = useMemo(() => {
    switch (currentUser?.role) {
      case "SUPERADMIN":
        return {
          label: "Kontrol penuh sistem",
          quickHref: "/admin/akun",
          quickLabel: "Tinjau akses",
        };
      case "BUMDES":
        return {
          label: "Fokus katalog dan promosi unit",
          quickHref: "/admin/potensi-ekonomi",
          quickLabel: "Kelola unit",
        };
      case "ADMIN":
        return {
          label: "Operasional harian desa",
          quickHref: "/admin/surat-queue",
          quickLabel: "Buka antrean",
        };
      default:
        return {
          label: "Workspace admin",
          quickHref: "/admin",
          quickLabel: "Buka overview",
        };
    }
  }, [currentUser?.role]);

  const renderNav = (isMobile = false) => (
    <div className="space-y-7">
      {navGroups.map((group) => (
        <section key={group.label} className="space-y-2.5">
          <div className="px-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {group.label}
            </p>
          </div>

          <div className="space-y-1.5">
            {group.items.map((item) => {
              const isActive =
                item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex min-h-12 items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "border border-white/90 bg-white text-slate-950 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.32)]"
                      : "border border-transparent text-slate-600 hover:border-white/70 hover:bg-white/65 hover:text-slate-950",
                    isMobile && "bg-white/80",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900",
                    )}
                  >
                    <Icon className="size-4.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block truncate">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );

  return (
    <div className="admin-theme admin-page-bg h-screen overflow-hidden">
      <div className="mx-auto flex h-screen w-full max-w-[1680px] gap-4 px-4 py-4 sm:px-6 lg:gap-6 lg:px-8">
        {/* Desktop sidebar */}
        <aside className="hidden h-full w-[292px] shrink-0 lg:block">
          <div className="admin-glass flex h-full flex-col overflow-hidden rounded-[30px]">
            {/* Sidebar header */}
            <div className="shrink-0 border-b border-slate-200/70 px-5 py-5">
              <div className="flex items-start gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-[18px] bg-white text-slate-900 shadow-[0_14px_30px_-20px_rgba(15,23,42,0.35)]">
                  <LayoutDashboard className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Portal Desa
                  </p>
                  <h1 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                    Admin Workspace
                  </h1>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{roleContext.label}</p>
                </div>
              </div>
            </div>

            {/* Sidebar navigation scroll */}
            <ScrollArea className="admin-scrollbar min-h-0 flex-1 px-4 py-5">
              {renderNav()}
            </ScrollArea>

            {/* Sidebar footer */}
            <div className="shrink-0 border-t border-slate-200/70 px-4 py-4">
              <div className="rounded-2xl border border-white/80 bg-white/80 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Context aktif
                </p>

                <div className="mt-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {activeItem.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{activeItem.groupLabel}</p>
                  </div>

                  <Badge
                    variant="outline"
                    className="rounded-full border-slate-200 bg-slate-50 text-slate-600"
                  >
                    {currentUser?.role ?? "Admin"}
                  </Badge>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent px-3.5 py-3 text-sm font-medium text-slate-600 transition hover:border-red-100 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="size-4" />
                Keluar
              </button>
            </div>
          </div>
        </aside>

        {/* Main workspace */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Sticky header inside main pane */}
          <header className="admin-glass z-30 mb-5 shrink-0 rounded-[28px] px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="mt-0.5 rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950 lg:hidden"
                      aria-label="Buka navigasi admin"
                    >
                      <Menu />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="left" showCloseButton className="overflow-hidden p-0">
                    <SheetHeader className="border-b border-slate-200/70 px-5 py-5 text-left">
                      <SheetTitle className="text-lg font-semibold text-slate-950">
                        Admin Workspace
                      </SheetTitle>
                      <SheetDescription>{roleContext.label}</SheetDescription>
                    </SheetHeader>

                    <ScrollArea className="admin-scrollbar h-[calc(100vh-88px)] px-4 py-5">
                      {renderNav(true)}
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-full border-slate-200 bg-white/70 text-slate-600"
                    >
                      {activeItem.groupLabel}
                    </Badge>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {currentUser?.role ?? "Admin"}
                    </p>
                  </div>

                  <h2 className="mt-2 truncate text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                    {activeItem.label}
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    {roleContext.label}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-slate-200 bg-white/80 text-slate-600 hover:bg-white hover:text-slate-950"
                >
                  <Link href={roleContext.quickHref}>
                    <Search className="mr-2 size-4" />
                    {roleContext.quickLabel}
                  </Link>
                </Button>

                <div className="hidden items-center gap-3 rounded-full border border-white/80 bg-white/80 px-2.5 py-2 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.2)] sm:flex">
                  <div className="flex size-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {userInitials}
                  </div>

                  <div className="min-w-0 pr-1 leading-tight">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {currentUser?.nama_lengkap ?? "Memuat pengguna"}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-slate-400">
                      {currentUser?.role ?? "Admin"}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-full border-slate-200 bg-white/80 text-slate-600 hover:bg-white hover:text-slate-950 lg:hidden"
                >
                  <LogOut className="size-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Only this area scrolls */}
          <main className="admin-scrollbar min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1">
            <div className="min-w-0 pb-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}