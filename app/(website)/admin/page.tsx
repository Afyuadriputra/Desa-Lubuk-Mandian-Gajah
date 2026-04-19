"use client";

import React, { useEffect, useState } from "react";
import { dashboardApi } from "@/lib/api/dashboard";
import type { DashboardOverviewDto } from "@/lib/api/types";
import {
  FileText,
  MessageSquare,
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [data, setData] = useState<DashboardOverviewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardApi
      .overview()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
        <span className="text-xs text-zinc-500">Memuat data dashboard...</span>
      </div>
    );
  }

  if (error || !data) {
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

  const { summary, alerts, quick_actions } = data;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Overview</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Ringkasan aktivitas dan status sistem desa.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Users size={18} />}
          label="Warga Aktif"
          value={summary.total_warga_aktif.toLocaleString("id-ID")}
        />
        <MetricCard
          icon={<FileText size={18} />}
          label="Surat Pending"
          value={String(summary.surat_pending)}
          accent={summary.surat_pending > 0}
        />
        <MetricCard
          icon={<MessageSquare size={18} />}
          label="Pengaduan Aktif"
          value={String(summary.pengaduan_aktif)}
          accent={summary.pengaduan_aktif > 0}
        />
        <MetricCard
          icon={<CheckCircle2 size={18} />}
          label="Pengaduan Selesai"
          value={String(summary.pengaduan_selesai)}
        />
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            Alerts
          </h2>
          <div className="space-y-2">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  alert.severity === "critical"
                    ? "bg-red-950/20 border-red-900/30"
                    : alert.severity === "warning"
                    ? "bg-amber-950/20 border-amber-900/30"
                    : "bg-zinc-900/50 border-zinc-800/50"
                }`}
              >
                <AlertTriangle
                  size={16}
                  className={`shrink-0 mt-0.5 ${
                    alert.severity === "critical"
                      ? "text-red-400"
                      : alert.severity === "warning"
                      ? "text-amber-400"
                      : "text-zinc-400"
                  }`}
                />
                <div>
                  <span className="text-sm font-medium text-zinc-200">{alert.message}</span>
                  {alert.metric > 0 && (
                    <p className="text-xs text-zinc-500 mt-0.5">Jumlah: {alert.metric}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      {quick_actions.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            Akses Cepat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quick_actions.map((action, idx) => (
              <a
                key={idx}
                href={action.path.startsWith("/") ? action.path : `/admin${action.path}`}
                className="group flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/60 hover:bg-zinc-800/30 transition-all"
              >
                <div>
                  <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
                    {action.category}
                  </p>
                  <p className="text-sm font-medium text-zinc-200 mt-0.5">{action.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  {action.badge_count > 0 && (
                    <span className="text-[10px] font-bold bg-white text-black px-1.5 py-0.5 rounded-full">
                      {action.badge_count}
                    </span>
                  )}
                  <ArrowRight
                    size={14}
                    className="text-zinc-600 group-hover:text-zinc-300 transition-colors"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className={`${accent ? "text-amber-400" : "text-zinc-500"}`}>{icon}</span>
        {accent && (
          <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            Perlu Aksi
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
