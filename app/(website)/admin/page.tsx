"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { dashboardApi } from "@/lib/api/dashboard";
import type {
  AdminInsightViewModel,
  AdminKpiViewModel,
  AdminStatusTone,
  AdminWidgetState,
  DashboardActivityDto,
  DashboardHealthDto,
  DashboardOverviewDto,
  UserRole,
} from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { StatusBarChart, TrendLineChart } from "./_components/admin-charts";
import {
  AdminActionRail,
  AdminAlertStrip,
  AdminDataPanel,
  AdminInsightCard,
  AdminKpiCard,
  AdminNotice,
  AdminPageHeader,
  AdminShellSection,
  AdminWidgetSkeleton,
  EmptyState,
  HealthFlagList,
  RecentActivityList,
  StatusBadge,
  type HealthFlagViewModel,
} from "./_components/admin-primitives";

function createWidgetState<T>(data: T): AdminWidgetState<T> {
  return { loading: true, error: null, data };
}

function mapSeverityToTone(severity: string): AdminStatusTone {
  const normalized = severity.toLowerCase();
  if (normalized === "critical") return "danger";
  if (normalized === "warning") return "warning";
  if (normalized === "success") return "success";
  if (normalized === "info") return "info";
  return "neutral";
}

function mapHealthData(source: unknown): HealthFlagViewModel[] {
  if (!source || typeof source !== "object") return [];
  const record = source as Record<string, unknown>;
  const flags = Array.isArray(record.flags)
    ? record.flags
    : Array.isArray(record.items)
      ? record.items
      : [];

  return flags
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const value = item as Record<string, unknown>;
      return {
        key: String(value.key ?? value.label ?? `flag-${index}`),
        label: String(value.label ?? value.key ?? "Flag"),
        total: Number(value.total ?? 0),
        detail: typeof value.detail === "string" ? value.detail : null,
        tone: mapSeverityToTone(String(value.severity ?? "neutral")),
      } satisfies HealthFlagViewModel;
    })
    .filter(Boolean) as HealthFlagViewModel[];
}

function inferActionFromAlert(message: string) {
  const text = message.toLowerCase();
  if (text.includes("surat")) return { href: "/admin/surat-queue", label: "Tinjau surat" };
  if (text.includes("pengaduan")) return { href: "/admin/pengaduan-queue", label: "Tinjau pengaduan" };
  if (text.includes("homepage")) return { href: "/admin/homepage", label: "Kelola homepage" };
  if (text.includes("publikasi")) return { href: "/admin/publikasi", label: "Buka publikasi" };
  if (text.includes("unit") || text.includes("bumdes") || text.includes("wisata")) {
    return { href: "/admin/potensi-ekonomi", label: "Buka potensi" };
  }
  if (text.includes("akun") || text.includes("role")) return { href: "/admin/akun", label: "Buka akun" };
  if (text.includes("perangkat") || text.includes("dusun") || text.includes("profil")) {
    return { href: "/admin/profil-wilayah", label: "Buka wilayah" };
  }
  return { href: "/admin", label: "Lihat overview" };
}

function filterQuickActionsByRole(
  actions: DashboardOverviewDto["quick_actions"],
  role: UserRole | null,
) {
  if (!role) return actions;
  if (role === "SUPERADMIN") return actions;
  if (role === "BUMDES") {
    return actions.filter((action) =>
      [action.path, action.label, action.category]
        .join(" ")
        .toLowerCase()
        .match(/potensi|bumdes|unit|wisata|katalog/),
    );
  }
  if (role === "ADMIN") {
    return actions.filter((action) =>
      ![action.path, action.label, action.category]
        .join(" ")
        .toLowerCase()
        .match(/superadmin|permission/),
    );
  }
  return actions;
}

function WidgetError({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return <AdminNotice tone="error">{title}: {description}</AdminNotice>;
}

export default function AdminOverviewPage() {
  const [overviewState, setOverviewState] = useState(createWidgetState<DashboardOverviewDto | null>(null));
  const [activityState, setActivityState] = useState(createWidgetState<DashboardActivityDto["data"]>([]));
  const [contentHealthState, setContentHealthState] = useState(createWidgetState<DashboardHealthDto | null>(null));
  const [masterHealthState, setMasterHealthState] = useState(createWidgetState<DashboardHealthDto | null>(null));
  const [viewerRole, setViewerRole] = useState<UserRole | null>(null);

  useEffect(() => {
    dashboardApi
      .overview()
      .then((res) => setOverviewState({ loading: false, error: null, data: res.data }))
      .catch((err: Error) =>
        setOverviewState({ loading: false, error: err.message, data: null }),
      );

    dashboardApi
      .recentActivity(8)
      .then((res) => setActivityState({ loading: false, error: null, data: res.data }))
      .catch((err: Error) =>
        setActivityState({ loading: false, error: err.message, data: [] }),
      );

    dashboardApi
      .contentHealth()
      .then((res) => setContentHealthState({ loading: false, error: null, data: res }))
      .catch((err: Error) =>
        setContentHealthState({ loading: false, error: err.message, data: null }),
      );

    dashboardApi
      .masterHealth()
      .then((res) => setMasterHealthState({ loading: false, error: null, data: res }))
      .catch((err: Error) =>
        setMasterHealthState({ loading: false, error: err.message, data: null }),
      );

    authApi.me().then((user) => setViewerRole(user.role)).catch(() => setViewerRole(null));
  }, []);

  const overview = overviewState.data;
  const summary = overview?.summary;
  const alerts = overview?.alerts ?? [];
  const charts = overview?.charts;

  const contentFlags = useMemo(
    () =>
      mapHealthData(contentHealthState.data?.data).length
        ? mapHealthData(contentHealthState.data?.data)
        : (overview?.health.content_flags ?? []).map((flag) => ({
            key: flag.key,
            label: flag.label,
            total: flag.total,
            detail: flag.detail,
            tone: mapSeverityToTone(flag.severity),
          })),
    [contentHealthState.data, overview],
  );

  const masterFlags = useMemo(
    () =>
      mapHealthData(masterHealthState.data?.data).length
        ? mapHealthData(masterHealthState.data?.data)
        : (overview?.health.master_flags ?? []).map((flag) => ({
            key: flag.key,
            label: flag.label,
            total: flag.total,
            detail: flag.detail,
            tone: mapSeverityToTone(flag.severity),
          })),
    [masterHealthState.data, overview],
  );

  const kpis: AdminKpiViewModel[] = useMemo(() => {
    if (!summary) return [];
    return [
      {
        key: "surat-pending",
        label: "Surat pending",
        value: String(summary.surat_pending),
        hint: "Perlu verifikasi atau proses lanjut.",
        tone: summary.surat_pending > 0 ? "warning" : "neutral",
        actionLabel: "Lihat antrean",
        actionHref: "/admin/surat-queue",
      },
      {
        key: "pengaduan-aktif",
        label: "Pengaduan aktif",
        value: String(summary.pengaduan_aktif),
        hint: "Laporan warga yang masih berjalan.",
        tone: summary.pengaduan_aktif > 0 ? "danger" : "neutral",
        actionLabel: "Tinjau pengaduan",
        actionHref: "/admin/pengaduan-queue",
      },
      {
        key: "surat-done",
        label: "Surat selesai",
        value: String(summary.surat_done),
        hint: "Dokumen final yang sudah ditutup.",
        tone: "success",
      },
      {
        key: "warga-aktif",
        label: "Warga aktif",
        value: summary.total_warga_aktif.toLocaleString("id-ID"),
        hint: "Basis akun warga yang aktif saat ini.",
        tone: "info",
        actionLabel: "Kelola akun",
        actionHref: "/admin/akun",
      },
    ];
  }, [summary]);

  const insightCards: AdminInsightViewModel[] = useMemo(
    () =>
      alerts.slice(0, 3).map((alert) => {
        const action = inferActionFromAlert(alert.message);
        return {
          key: alert.key,
          title: alert.severity === "critical" ? "Prioritas tinggi" : "Butuh perhatian",
          description: alert.message,
          tone: mapSeverityToTone(alert.severity),
          actionHref: action.href,
          actionLabel: action.label,
          metricLabel: "Terukur",
          metricValue: String(alert.metric),
        };
      }),
    [alerts],
  );

  const quickActions = useMemo(
    () => filterQuickActionsByRole(overview?.quick_actions ?? [], viewerRole).slice(0, 4),
    [overview?.quick_actions, viewerRole],
  );

  const roleMessage = useMemo(() => {
    switch (viewerRole) {
      case "SUPERADMIN":
        return "Ringkasan ini menonjolkan kontrol akses, anomali lintas modul, dan data prioritas tinggi.";
      case "BUMDES":
        return "Ringkasan ini memprioritaskan katalog, publikasi, dan insight yang berdampak ke promosi unit.";
      case "ADMIN":
        return "Ringkasan ini memprioritaskan antrean kerja, SLA, dan kesehatan data operasional.";
      default:
        return "Pantau antrean kerja, insight, dan kesehatan data tanpa pindah halaman.";
    }
  }, [viewerRole]);

  const overviewFatal = !overviewState.loading && !!overviewState.error && !overview;

  if (overviewFatal) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Pusat Kendali"
          title="Overview operasional desa"
          description={roleMessage}
        />
        <WidgetError
          title="Overview gagal dimuat"
          description={overviewState.error ?? "Backend belum mengembalikan data overview."}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Pusat Kendali"
        title="Overview operasional desa"
        description={roleMessage}
        actions={
          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950"
          >
            <Link href={viewerRole === "BUMDES" ? "/admin/potensi-ekonomi" : "/admin/homepage"}>
              {viewerRole === "BUMDES" ? "Kelola potensi" : "Kelola homepage"}
            </Link>
          </Button>
        }
      />

      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.slice(0, 2).map((alert) => (
            <AdminAlertStrip
              key={alert.key}
              title={alert.severity === "critical" ? "Alert prioritas" : "Perlu perhatian"}
              message={alert.message}
              tone={mapSeverityToTone(alert.severity)}
            />
          ))}
        </div>
      ) : null}

      <AdminShellSection className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewState.loading
          ? Array.from({ length: 4 }).map((_, index) => <AdminWidgetSkeleton key={index} lines={2} />)
          : kpis.map((kpi) => (
              <AdminKpiCard
                key={kpi.key}
                label={kpi.label}
                value={kpi.value}
                hint={kpi.hint}
                tone={kpi.tone}
                actionLabel={kpi.actionLabel}
                actionHref={kpi.actionHref}
                icon={
                  kpi.key === "surat-pending" ? (
                    <FileText className="size-5" />
                  ) : kpi.key === "pengaduan-aktif" ? (
                    <MessageSquare className="size-5" />
                  ) : kpi.key === "surat-done" ? (
                    <CheckCircle2 className="size-5" />
                  ) : (
                    <Users className="size-5" />
                  )
                }
              />
            ))}
      </AdminShellSection>

      <AdminShellSection className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <AdminDataPanel
            title="Insight prioritas"
            description="Ringkasan yang langsung mengarah ke tindakan."
            tooltip="Alert dan insight ini dipilih untuk dibaca cepat dalam beberapa detik pertama."
          >
            {overviewState.loading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <AdminWidgetSkeleton lines={2} />
                <AdminWidgetSkeleton lines={2} />
              </div>
            ) : insightCards.length ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {insightCards.map((insight) => (
                  <AdminInsightCard
                    key={insight.key}
                    title={insight.title}
                    description={insight.description}
                    tone={insight.tone}
                    metricLabel={insight.metricLabel}
                    metricValue={insight.metricValue}
                    actionLabel={insight.actionLabel}
                    actionHref={insight.actionHref}
                    icon={
                      insight.tone === "danger" ? (
                        <ShieldAlert className="size-5" />
                      ) : (
                        <AlertTriangle className="size-5" />
                      )
                    }
                    detail="Arahkan operator ke route kerja nyata. Hindari insight tanpa aksi."
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Belum ada insight prioritas"
                description="Saat backend mengirim alert operasional, kartu insight akan tampil di sini."
              />
            )}
          </AdminDataPanel>

          <AdminActionRail
            title="Aksi cepat"
            description="Shortcut relevan role, tanpa menumpuk semua tombol sekaligus."
            actions={
              quickActions.length ? (
                <>
                  {quickActions.map((action) => (
                    <Button
                      asChild
                      key={action.key}
                      variant={action.badge_count > 0 ? "default" : "outline"}
                      className="rounded-full"
                    >
                      <Link href={action.path.startsWith("/") ? action.path : `/admin${action.path}`}>
                        {action.badge_count > 0 ? (
                          <Sparkles data-icon="inline-start" />
                        ) : null}
                        {action.label}
                      </Link>
                    </Button>
                  ))}
                </>
              ) : (
                <p className="text-sm text-slate-500">Belum ada quick action relevan.</p>
              )
            }
          />
        </div>

        <AdminDataPanel
          title="Status kerja cepat"
          description="Baca titik panas operasional tanpa buka tabel penuh."
          tooltip="Gunakan ini untuk scan cepat kondisi hari ini sebelum membuka antrean detail."
        >
          {overviewState.loading ? (
            <AdminWidgetSkeleton lines={3} />
          ) : summary ? (
            <div className="admin-soft-grid rounded-[24px] border border-white/80 bg-white/72 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="admin-subtle-panel rounded-[20px] p-4">
                  <p className="admin-metric-label text-slate-400">Surat tertunda</p>
                  <p className="admin-number-tabular mt-2 text-2xl font-semibold text-slate-950">
                    {summary.surat_pending}
                  </p>
                  <div className="mt-3">
                    <StatusBadge
                      label={summary.surat_pending > 0 ? "Perlu review" : "Stabil"}
                      tone={summary.surat_pending > 0 ? "warning" : "success"}
                    />
                  </div>
                </div>
                <div className="admin-subtle-panel rounded-[20px] p-4">
                  <p className="admin-metric-label text-slate-400">Pengaduan aktif</p>
                  <p className="admin-number-tabular mt-2 text-2xl font-semibold text-slate-950">
                    {summary.pengaduan_aktif}
                  </p>
                  <div className="mt-3">
                    <StatusBadge
                      label={summary.pengaduan_aktif > 0 ? "Monitor" : "Terkendali"}
                      tone={summary.pengaduan_aktif > 0 ? "danger" : "success"}
                    />
                  </div>
                </div>
                <div className="admin-subtle-panel rounded-[20px] p-4">
                  <p className="admin-metric-label text-slate-400">Unit publish</p>
                  <p className="admin-number-tabular mt-2 text-2xl font-semibold text-slate-950">
                    {summary.total_unit_published}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">Indikator promosi ekonomi aktif.</p>
                </div>
                <div className="admin-subtle-panel rounded-[20px] p-4">
                  <p className="admin-metric-label text-slate-400">Warga aktif</p>
                  <p className="admin-number-tabular mt-2 text-2xl font-semibold text-slate-950">
                    {summary.total_warga_aktif.toLocaleString("id-ID")}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">Basis layanan dan pelaporan warga.</p>
                </div>
              </div>
            </div>
          ) : (
            <WidgetError title="Ringkasan tidak tersedia" description="Overview belum siap." />
          )}
        </AdminDataPanel>
      </AdminShellSection>

      <AdminShellSection className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <AdminDataPanel
          title="Tren surat 7 hari"
          description="Pantau beban layanan harian sebelum operator turun ke detail tiket."
          tooltip="Tren dipakai untuk membaca lonjakan. Detail raw tetap ada di antrean surat."
        >
          {overviewState.loading ? (
            <AdminWidgetSkeleton lines={5} />
          ) : overviewState.error ? (
            <WidgetError title="Tren surat gagal dimuat" description={overviewState.error} />
          ) : charts?.surat_trend.length ? (
            <TrendLineChart data={charts.surat_trend} color="#3b82f6" />
          ) : (
            <EmptyState
              title="Belum ada tren surat"
              description="Data tren surat akan muncul setelah ada aktivitas layanan administrasi."
            />
          )}
        </AdminDataPanel>

        <AdminDataPanel
          title="Distribusi status surat"
          description="Lihat titik macet proses tanpa buka daftar penuh."
          tooltip="Warna netral dipakai untuk perbandingan standar; fokus tetap pada nilai dan tindakan."
        >
          {overviewState.loading ? (
            <AdminWidgetSkeleton lines={5} />
          ) : overviewState.error ? (
            <WidgetError title="Distribusi status gagal dimuat" description={overviewState.error} />
          ) : charts?.surat_by_status.length ? (
            <StatusBarChart data={charts.surat_by_status} />
          ) : (
            <EmptyState
              title="Belum ada distribusi status"
              description="Belum ada data status surat yang dapat divisualkan."
            />
          )}
        </AdminDataPanel>
      </AdminShellSection>

      <AdminShellSection className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <AdminDataPanel
          title="Aktivitas terbaru"
          description="Jejak perubahan penting lintas modul admin."
          tooltip="Gunakan daftar ini untuk konteks cepat sebelum masuk ke modul terkait."
        >
          {activityState.loading ? (
            <AdminWidgetSkeleton lines={6} />
          ) : activityState.error ? (
            <WidgetError title="Aktivitas gagal dimuat" description={activityState.error} />
          ) : (
            <RecentActivityList items={activityState.data} />
          )}
        </AdminDataPanel>

        <div className="space-y-6">
          <AdminDataPanel
            title="Content health"
            description="Flag konten kosong, unpublished, atau butuh perapian."
            tooltip="Widget ini harus mengarahkan operator ke tindakan, bukan hanya angka."
          >
            {contentHealthState.loading && !contentFlags.length ? (
              <AdminWidgetSkeleton lines={4} />
            ) : contentHealthState.error && !contentFlags.length ? (
              <WidgetError title="Content health gagal dimuat" description={contentHealthState.error} />
            ) : (
              <HealthFlagList items={contentFlags} />
            )}
          </AdminDataPanel>
          <AdminDataPanel
            title="Master data health"
            description="Pantau gap data wilayah, akun, dan data inti operasional."
            tooltip="Widget ini cocok dibaca setelah KPI untuk menentukan sumber masalah struktural."
          >
            {masterHealthState.loading && !masterFlags.length ? (
              <AdminWidgetSkeleton lines={4} />
            ) : masterHealthState.error && !masterFlags.length ? (
              <WidgetError title="Master health gagal dimuat" description={masterHealthState.error} />
            ) : (
              <HealthFlagList items={masterFlags} />
            )}
          </AdminDataPanel>
        </div>
      </AdminShellSection>

      <AdminShellSection className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <AdminDataPanel
          title="Tren pengaduan 7 hari"
          description="Baca apakah volume pengaduan meningkat dan perlu respon lebih cepat."
          tooltip="Chart detail tetap ringkas; operator bisa lanjut ke antrean pengaduan untuk data mentah."
        >
          {overviewState.loading ? (
            <AdminWidgetSkeleton lines={5} />
          ) : overviewState.error ? (
            <WidgetError title="Tren pengaduan gagal dimuat" description={overviewState.error} />
          ) : charts?.pengaduan_trend.length ? (
            <TrendLineChart data={charts.pengaduan_trend} color="#d97706" />
          ) : (
            <EmptyState
              title="Belum ada tren pengaduan"
              description="Tren pengaduan akan muncul saat ada laporan warga yang masuk."
            />
          )}
        </AdminDataPanel>

        <AdminDataPanel
          title="Kategori pengaduan"
          description="Pola masalah warga yang paling dominan."
          tooltip="Distribusi ini membantu menentukan tindakan cepat atau redistribusi operator."
        >
          {overviewState.loading ? (
            <AdminWidgetSkeleton lines={5} />
          ) : overviewState.error ? (
            <WidgetError title="Kategori pengaduan gagal dimuat" description={overviewState.error} />
          ) : charts?.pengaduan_by_kategori.length ? (
            <StatusBarChart data={charts.pengaduan_by_kategori} />
          ) : (
            <EmptyState
              title="Belum ada kategori"
              description="Distribusi kategori pengaduan akan tampil setelah data tersedia."
            />
          )}
        </AdminDataPanel>
      </AdminShellSection>

      {alerts.length > 2 ? (
        <details className="admin-panel admin-panel-radius rounded-[28px] border-white/80 bg-white/88 p-5">
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
            Alert tambahan
          </summary>
          <div className="mt-4 space-y-3">
            {alerts.slice(2).map((alert) => {
              const action = inferActionFromAlert(alert.message);
              return (
                <div
                  key={alert.key}
                  className="admin-subtle-panel flex flex-col gap-3 rounded-[22px] p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={`mt-0.5 size-4 shrink-0 ${
                        alert.severity === "critical" ? "text-red-500" : "text-amber-500"
                      }`}
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">{alert.message}</p>
                      <p className="text-sm text-slate-500">Jumlah terukur: {alert.metric}</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={action.href}>{action.label}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </details>
      ) : null}
    </div>
  );
}
