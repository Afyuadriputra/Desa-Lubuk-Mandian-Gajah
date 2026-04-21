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

type PengaduanAnalyticsData = {
  by_status?: { label: string; total: number }[];
  by_kategori?: { label: string; total: number }[];
  trend?: { date: string; total: number }[];
  summary?: {
    average_first_response_hours?: number;
    average_resolved_hours?: number;
    oldest_active_total?: number;
  };
  oldest_active?: Array<Record<string, string | number | boolean | null | undefined>>;
  top_categories?: Array<{ label?: string; total?: number }>;
};

export default function AdminAnalitikPengaduanPage() {
  const [periodDays, setPeriodDays] = useState(7);
  const [data, setData] = useState<PengaduanAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    dashboardApi
      .pengaduanAnalytics(periodDays)
      .then((res) => {
        setData((res.data ?? {}) as PengaduanAnalyticsData);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [periodDays]);

  const summaryCards = useMemo<AnalyticsSummaryCard[]>(
    () => [
      {
        label: "Respon pertama",
        value: `${Number(data?.summary?.average_first_response_hours ?? 0).toLocaleString("id-ID")} jam`,
        hint: "Rata-rata waktu sampai pengaduan pertama kali disentuh.",
        tone: "warning",
        icon: analyticsIcons.clock,
      },
      {
        label: "Sampai selesai",
        value: `${Number(data?.summary?.average_resolved_hours ?? 0).toLocaleString("id-ID")} jam`,
        hint: "Rata-rata waktu sampai laporan ditutup.",
        tone: "info",
        icon: analyticsIcons.report,
      },
      {
        label: "Tiket tertua aktif",
        value: String(data?.summary?.oldest_active_total ?? 0),
        hint: "Jumlah pengaduan lama yang masih aktif.",
        tone: Number(data?.summary?.oldest_active_total ?? 0) > 0 ? "danger" : "neutral",
        icon: analyticsIcons.warning,
      },
    ],
    [data],
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Analitik Pengaduan"
        title="Analitik pengaduan"
        description="Pantau kategori dominan, beban respon, dan laporan aktif paling tua untuk menentukan prioritas tindak lanjut."
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
              <Link href="/admin/pengaduan-queue">Buka antrean pengaduan</Link>
            </Button>
          </div>
        }
      />

      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <AnalyticsSummaryGrid cards={summaryCards} />

      <AnalyticsTrendAndBreakdown
        trendTitle="Tren pengaduan masuk"
        trendDescription="Volume laporan warga dalam periode aktif."
        trendData={data?.trend ?? []}
        breakdownTitle="Distribusi kategori"
        breakdownDescription="Kategori masalah yang paling sering dilaporkan."
        breakdownData={data?.by_kategori ?? []}
        trendColor="#d97706"
        loading={loading}
        error={error}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AnalyticsListPanel
          title="Kategori dominan"
          description="Kategori pengaduan dengan volume tertinggi."
          items={(data?.top_categories ?? []).map((item) => ({
            label: item.label ?? "Tanpa label",
            total: item.total ?? 0,
          }))}
          emptyTitle="Belum ada kategori dominan"
          emptyDescription="Saat data belum cukup, panel ini akan tetap kosong."
        />

        <AnalyticsQueuePanel
          title="Pengaduan aktif tertua"
          description="Laporan aktif yang paling lama belum selesai."
          items={data?.oldest_active ?? []}
          emptyTitle="Tidak ada pengaduan tertua"
          emptyDescription="Semua laporan aktif masih dalam rentang sehat."
          href="/admin/pengaduan-queue"
          hrefLabel="Tinjau antrean"
        />
      </div>
    </div>
  );
}
