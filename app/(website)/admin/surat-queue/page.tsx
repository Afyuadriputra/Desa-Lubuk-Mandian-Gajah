"use client";

import React, { useEffect, useState } from "react";
import { dashboardApi } from "@/lib/api/dashboard";
import type { DashboardQueueItemDto } from "@/lib/api/types";
import { Clock, Eye, MoreVertical, XCircle } from "lucide-react";

function formatAge(hours: number) {
  if (hours < 1) return "<1h";
  if (hours < 24) return `${Math.round(hours)}h`;
  return `${Math.round(hours / 24)}d`;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  } catch {
    return iso;
  }
}

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

const statusStyle: Record<string, string> = {
  PENDING: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  VERIFIED: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  PROCESSED: "bg-zinc-800 text-zinc-300 border-zinc-700",
  DONE: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  REJECTED: "bg-red-400/10 text-red-400 border-red-400/20",
};

export default function AdminSuratQueuePage() {
  const [items, setItems] = useState<DashboardQueueItemDto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    dashboardApi
      .suratQueue({ status: statusFilter || undefined })
      .then((res) => { setItems(res.data); setTotal(res.meta.total); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
        <span className="text-xs text-zinc-500">Memuat antrean surat...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-950/30 border border-red-900/40 rounded-xl max-w-lg mx-auto mt-16 flex items-start gap-3">
        <XCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-red-300">Gagal Memuat Data</h3>
          <p className="text-xs text-red-400/80 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Antrean Surat</h1>
          <p className="text-sm text-zinc-500 mt-1">Kelola permohonan dokumen administrasi warga.</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-2 focus:border-zinc-600 focus:ring-0 outline-none"
        >
          <option value="">Semua Status</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="PROCESSED">Processed</option>
          <option value="DONE">Done</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-zinc-800/50 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
          <div className="col-span-4">Judul</div>
          <div className="col-span-3">Pemohon</div>
          <div className="col-span-1 text-center">Umur</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Tanggal</div>
          <div className="col-span-1 text-right">Aksi</div>
        </div>

        {items.length === 0 ? (
          <div className="px-5 py-12 text-center text-zinc-600 text-sm">
            Tidak ada data surat ditemukan.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-3 px-5 py-3.5 items-center border-b border-zinc-800/30 last:border-b-0 hover:bg-white/[0.02] transition-colors group relative"
            >
              {item.attention_needed && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-amber-400" />
              )}
              <div className="col-span-4 flex flex-col gap-0.5 pl-1">
                <span className="text-sm font-medium text-zinc-200 truncate">{item.title}</span>
                <span className="text-[11px] text-zinc-600">{item.module}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-zinc-400">
                    {getInitials(item.subject_name)}
                  </span>
                </div>
                <span className="text-sm text-zinc-300 truncate">{item.subject_name}</span>
              </div>
              <div className="col-span-1 flex justify-center">
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    item.attention_needed
                      ? "bg-amber-400/10 text-amber-400"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {formatAge(item.age_hours)}
                </span>
              </div>
              <div className="col-span-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    statusStyle[item.status] || "bg-zinc-800 text-zinc-400 border-zinc-700"
                  }`}
                >
                  <span className="w-1 h-1 rounded-full bg-current" />
                  {item.status}
                </span>
              </div>
              <div className="col-span-1 text-xs text-zinc-600">{formatDate(item.created_at)}</div>
              <div className="col-span-1 flex justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={`/admin/surat-queue/${item.id}`}
                  className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Eye size={14} />
                </a>
                <button className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-800/50 text-[11px] text-zinc-600">
          Menampilkan {items.length} dari {total} entri
        </div>
      </div>
    </div>
  );
}
