"use client";

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
    items: [
      { href: "/admin/analitik", label: "Pusat Analitik", icon: BarChart3 },
    ],
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
    return { href: pathname, label: "Workspace", icon: LayoutDashboard, groupLabel: "Admin" };
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
    <div className="space-y-6">
      {navGroups.map((group) => (
        <div key={group.label} className="space-y-2">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            {group.label}
          </p>
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
                    "flex items-center gap-3 rounded-[22px] border px-3.5 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "border-white/90 bg-white text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_40px_-28px_rgba(15,23,42,0.28)]"
                      : "border-transparent text-slate-500 hover:border-white/80 hover:bg-white/65 hover:text-slate-950",
                    isMobile && "bg-white/75",
                  )}
                >
                  <Icon className={cn("size-5", isActive ? "text-slate-950" : "text-slate-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="admin-theme admin-page-bg min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1720px] admin-shell-gap px-4 py-4 sm:px-6 lg:px-8">
        <aside className="admin-glass hidden w-[284px] shrink-0 rounded-[32px] lg:flex lg:flex-col">
          <div className="border-b border-slate-200/70 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-[18px] bg-white text-slate-900 shadow-[0_14px_30px_-20px_rgba(15,23,42,0.35)]">
                <LayoutDashboard className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Portal Desa
                </p>
                <h1 className="text-lg font-semibold tracking-tight text-slate-950">
                  Admin Workspace
                </h1>
                <p className="text-xs text-slate-500">{roleContext.label}</p>
              </div>
            </div>
          </div>

          <ScrollArea className="admin-scrollbar flex-1 px-4 py-5">
            {renderNav()}
          </ScrollArea>

          <div className="mt-auto space-y-3 border-t border-slate-200/70 px-4 py-4">
            <div className="rounded-[22px] border border-white/80 bg-white/80 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Context aktif
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{activeItem.label}</p>
                  <p className="text-xs text-slate-500">{activeItem.groupLabel}</p>
                </div>
                <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50 text-slate-600">
                  {currentUser?.role ?? "Admin"}
                </Badge>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-[22px] border border-transparent px-3.5 py-3 text-sm font-medium text-slate-500 transition hover:border-red-100 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="size-5" />
              Keluar
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="admin-glass sticky top-4 z-30 mb-6 rounded-[30px] px-4 py-3 sm:px-6">
            <div className="flex min-h-20 items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950 lg:hidden"
                      aria-label="Buka navigasi admin"
                    >
                      <Menu />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" showCloseButton className="overflow-hidden">
                    <SheetHeader className="border-b border-slate-200/70 px-5 py-5 text-left">
                      <SheetTitle className="text-lg font-semibold text-slate-950">Admin Workspace</SheetTitle>
                      <SheetDescription>{roleContext.label}</SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="admin-scrollbar h-[calc(100vh-7rem)] px-4 py-5">
                      {renderNav(true)}
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="rounded-full border-slate-200 bg-white/70 text-slate-500">
                      {activeItem.groupLabel}
                    </Badge>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                      {currentUser?.role ?? "Admin"}
                    </p>
                  </div>
                  <p className="truncate text-lg font-semibold text-slate-950">{activeItem.label}</p>
                  <p className="admin-reading-width text-sm text-slate-500">{roleContext.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="hidden rounded-full border-slate-200 bg-white/80 text-slate-600 hover:bg-white hover:text-slate-950 md:inline-flex"
                >
                  <Link href={roleContext.quickHref}>
                    <Search data-icon="inline-start" />
                    {roleContext.quickLabel}
                  </Link>
                </Button>
                <div className="hidden rounded-full border border-white/80 bg-white/80 px-2.5 py-2 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.2)] sm:flex sm:items-center sm:gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {userInitials}
                  </div>
                  <div className="pr-1 leading-tight">
                    <p className="text-sm font-semibold text-slate-900">
                      {currentUser?.nama_lengkap ?? "Memuat pengguna"}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
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

          <main className="pb-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
