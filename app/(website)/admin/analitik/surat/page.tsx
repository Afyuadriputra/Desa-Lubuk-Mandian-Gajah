"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { dashboardApi } from "@/lib/api/dashboard";
import { Button } from "@/components/ui/button";
import {
  AdminNotice,
  AdminPageHeader,
} from "@/app/(website)/admin/_components/admin-primitives";
import {
  AnalyticsListPanel,
  AnalyticsQueuePanel,
  type AnalyticsSummaryCard,
  AnalyticsSummaryGrid,
  AnalyticsTrendAndBreakdown,
  analyticsIcons,
} from "@/app/(website)/admin/_components/admin-analytics";

type SuratAnalyticsData = {
  by_status?: { label: string; total: number }[];
  by_jenis?: { label: string; total: number }[];
  trend?: { date: string; total: number }[];
  summary?: {
    average_completion_hours?: number;
    total_completed?: number;
    missing_document_total?: number;
  };
  top_rejection_reasons?: Array<{ label?: string; total?: number; reason?: string }>;
  missing_documents?: Array<Record<string, string | number | boolean | null | undefined>>;
};

export default function AdminAnalitikSuratPage() {
  const [periodDays, setPeriodDays] = useState(7);
  const [data, setData] = useState<SuratAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    dashboardApi
      .suratAnalytics(periodDays)
      .then((res) => {
        setData((res.data ?? {}) as SuratAnalyticsData);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [periodDays]);

  const summaryCards = useMemo<AnalyticsSummaryCard[]>(
    () => [
      {
        label: "Rata-rata selesai",
        value: `${Number(data?.summary?.average_completion_hours ?? 0).toLocaleString("id-ID")} jam`,
        hint: "Estimasi waktu dari dibuat sampai selesai.",
        tone: "info",
        icon: analyticsIcons.clock,
      },
      {
        label: "Surat selesai",
        value: String(data?.summary?.total_completed ?? 0),
        hint: "Dokumen yang sudah berhasil ditutup.",
        tone: "success",
        icon: analyticsIcons.document,
      },
      {
        label: "Dokumen kurang",
        value: String(data?.summary?.missing_document_total ?? 0),
        hint: "Pengajuan yang masih kurang kelengkapan berkas.",
        tone: Number(data?.summary?.missing_document_total ?? 0) > 0 ? "warning" : "neutral",
        icon: analyticsIcons.warning,
      },
    ],
    [data],
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Analitik Layanan"
        title="Analitik surat"
        description="Baca tren, distribusi, dan hambatan layanan surat tanpa harus membuka antrean satu per satu."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {[7, 14, 30].map((days) => (
              <Button
                key={days}
                variant={periodDays === days ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setPeriodDays(days)}
              >
                {days} hari
              </Button>
            ))}
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/admin/surat-queue">Buka antrean surat</Link>
            </Button>
          </div>
        }
      />

      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <AnalyticsSummaryGrid cards={summaryCards} />

      <AnalyticsTrendAndBreakdown
        trendTitle="Tren pengajuan surat"
        trendDescription="Lihat naik turun volume pengajuan dalam periode aktif."
        trendData={data?.trend ?? []}
        breakdownTitle="Distribusi jenis surat"
        breakdownDescription="Jenis layanan yang paling sering diajukan warga."
        breakdownData={data?.by_jenis ?? []}
        trendColor="#2563eb"
        loading={loading}
        error={error}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AnalyticsListPanel
          title="Alasan penolakan teratas"
          description="Ringkasan alasan penolakan paling sering untuk bantu perbaikan SOP."
          items={(data?.top_rejection_reasons ?? []).map((item) => ({
            label: item.label ?? item.reason ?? "Tanpa label",
            total: item.total ?? 0,
            reason: item.reason,
          }))}
          emptyTitle="Belum ada alasan penolakan"
          emptyDescription="Saat belum ada surat ditolak, panel ini tetap kosong."
        />

        <AnalyticsQueuePanel
          title="Dokumen kurang lengkap"
          description="Daftar singkat pengajuan yang paling perlu follow-up."
          items={data?.missing_documents ?? []}
          emptyTitle="Tidak ada dokumen kurang"
          emptyDescription="Semua pengajuan yang masuk sudah cukup lengkap."
          href="/admin/surat-queue"
          hrefLabel="Tinjau antrean"
        />
      </div>
    </div>
  );
}
