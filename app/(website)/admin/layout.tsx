"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Globe,
  Store,
  Users,
  LogOut,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";
import type { UserDto } from "@/lib/api/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/surat-queue", label: "Antrean Surat", icon: FileText },
  { href: "/admin/pengaduan-queue", label: "Antrean Pengaduan", icon: MessageSquare },
  { href: "/admin/homepage", label: "Kelola Homepage", icon: Globe },
  { href: "/admin/akun", label: "Kelola Akun", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

  useEffect(() => {
    authApi
      .me()
      .then((user) => setCurrentUser(user))
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const userInitials = useMemo(() => {
    if (!currentUser?.nama_lengkap) return "A";
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

  return (
    <div
      className={`admin-theme ${inter.variable} bg-[#09090b] text-zinc-200 antialiased flex h-screen overflow-hidden font-[var(--font-inter)]`}
    >
      {/* ─── Sidebar ─── */}
      <nav className="hidden md:flex flex-col w-60 h-screen fixed left-0 top-0 z-40 bg-[#0f0f12] border-r border-zinc-800/60">
        {/* Brand */}
        <div className="px-5 pt-6 pb-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold text-sm">D</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-tight">
              Desa Admin
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-wider uppercase">
              Console
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-0.5 px-3 flex-1">
          <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-2 mb-2">
            Menu
          </p>
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom: Logout */}
        <div className="px-3 pb-4 mt-auto border-t border-zinc-800/60 pt-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-150 w-full"
          >
            <LogOut size={18} strokeWidth={1.5} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* ─── Main Area ─── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:ml-60">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 h-14 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/40 flex justify-between items-center px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-800/40 px-3 py-1.5 rounded-lg border border-zinc-800/60 focus-within:border-zinc-600 transition-colors">
              <Search size={14} className="text-zinc-500" />
              <input
                className="bg-transparent border-none outline-none text-[13px] text-zinc-300 placeholder:text-zinc-600 w-40"
                placeholder="Search..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40 transition-colors relative">
              <Bell size={18} strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40 transition-colors">
              <Settings size={18} strokeWidth={1.5} />
            </button>
            <div className="ml-1 flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 px-2 py-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-zinc-300">
                {userInitials}
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[11px] font-semibold text-zinc-200">
                  {currentUser?.nama_lengkap ?? "Memuat..."}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                  {currentUser?.role ?? "ADMIN"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
}
