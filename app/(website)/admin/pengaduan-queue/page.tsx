"use client";

import React, { useEffect, useState } from "react";
import { dashboardApi } from "@/lib/api/dashboard";
import type { DashboardQueueItemDto } from "@/lib/api/types";
import { Clock, AlertTriangle, Eye, XCircle } from "lucide-react";

function formatAge(hours: number) {
  if (hours < 1) return "<1h";
  if (hours < 24) return `${Math.round(hours)}h`;
  return `${Math.round(hours / 24)}d`;
}

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

const statusStyle: Record<string, string> = {
  OPEN: "bg-zinc-800 text-zinc-300 border-zinc-700",
  TRIAGED: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  IN_PROGRESS: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  RESOLVED: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  CLOSED: "bg-zinc-800 text-zinc-500 border-zinc-700",
};

export default function AdminPengaduanQueuePage() {
  const [items, setItems] = useState<DashboardQueueItemDto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    dashboardApi
      .pengaduanQueue({ status: statusFilter || undefined })
      .then((res) => { setItems(res.data); setTotal(res.meta.total); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
        <span className="text-xs text-zinc-500">Memuat antrean pengaduan...</span>
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
          <h1 className="text-2xl font-semibold text-white tracking-tight">Antrean Pengaduan</h1>
          <p className="text-sm text-zinc-500 mt-1">Kelola dan tinjau laporan warga yang membutuhkan perhatian.</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-2 focus:border-zinc-600 focus:ring-0 outline-none"
        >
          <option value="">Semua Status</option>
          <option value="OPEN">Open</option>
          <option value="TRIAGED">Triaged</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-zinc-800/50 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
          <div className="col-span-4">Judul</div>
          <div className="col-span-2">Pelapor</div>
          <div className="col-span-2">Waktu Tunggu</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Aksi</div>
        </div>

        {items.length === 0 ? (
          <div className="px-5 py-12 text-center text-zinc-600 text-sm">
            Tidak ada pengaduan ditemukan.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-3 px-5 py-3.5 items-center border-b border-zinc-800/30 last:border-b-0 hover:bg-white/[0.02] transition-colors group relative"
            >
              {item.attention_needed && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-500" />
              )}
              <div className="col-span-4 flex flex-col gap-0.5 pl-1">
                <span className={`text-sm truncate ${item.attention_needed ? "font-semibold text-white" : "font-medium text-zinc-200"}`}>
                  {item.title}
                </span>
                {item.attention_needed && (
                  <span className="text-[10px] text-red-400 flex items-center gap-1 font-medium">
                    <AlertTriangle size={10} /> Perlu Perhatian
                  </span>
                )}
              </div>
              <div className="col-span-2 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-zinc-400">
                    {getInitials(item.subject_name)}
                  </span>
                </div>
                <span className="text-sm text-zinc-300 truncate">{item.subject_name}</span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5">
                <Clock size={12} className={item.attention_needed ? "text-amber-400" : "text-zinc-600"} />
                <span className={`text-xs ${item.attention_needed ? "text-amber-400 font-medium" : "text-zinc-500"}`}>
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
              <div className="col-span-2 flex justify-end">
                <a
                  href={item.detail_url}
                  className="text-[11px] font-medium text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                >
                  <Eye size={12} />
                  {item.attention_needed ? "Tinjau" : "Detail"}
                </a>
              </div>
            </div>
          ))
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-800/50 text-[11px] text-zinc-600">
          Menampilkan {items.length} dari {total} pengaduan
        </div>
      </div>
    </div>
  );
}
