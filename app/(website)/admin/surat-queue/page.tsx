"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FileText, FolderClock, OctagonAlert, ShieldAlert } from "lucide-react";
import { dashboardApi } from "@/lib/api/dashboard";
import type { DashboardQueueItemDto } from "@/lib/api/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AdminActiveFilters,
  AdminFilterSkeleton,
  AdminFilterToolbar,
  AdminListSkeleton,
  AdminPageHeader,
  AdminStatsSkeleton,
  ErrorState,
  MetricCard,
  QueueList,
  formatAdminDate,
  getStatusTone,
  type QueueRowViewModel,
} from "../_components/admin-primitives";
import { localizeSuratStatus } from "../_components/admin-labels";

const statusOptions = [
  { label: "Semua status", value: "" },
  { label: "Menunggu Verifikasi", value: "PENDING" },
  { label: "Terverifikasi", value: "VERIFIED" },
  { label: "Sedang Diproses", value: "PROCESSED" },
  { label: "Selesai", value: "DONE" },
  { label: "Ditolak", value: "REJECTED" },
];

const agingOptions = [
  { label: "Semua aging", value: "" },
  { label: "Perlu Dipantau", value: "warning" },
  { label: "Lewat SLA", value: "overdue" },
];

export default function AdminSuratQueuePage() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<DashboardQueueItemDto[]>([]);
  const [scope, setScope] = useState<"all" | "today" | "week">(
    (searchParams.get("scope") as "all" | "today" | "week") || "all",
  );
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? "");
  const [agingFilter, setAgingFilter] = useState(searchParams.get("aging") ?? "");
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardApi
      .suratQueue({
        scope,
        status: statusFilter || undefined,
        aging: (agingFilter as "warning" | "overdue" | "") || undefined,
      })
      .then((res) => {
        setItems(res.data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [scope, statusFilter, agingFilter]);

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) =>
      [item.title, item.subject_name, item.module, item.status]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [items, search]);

  const metrics = useMemo(() => {
    const warning = filteredItems.filter((item) => item.aging_bucket === "warning").length;
    const overdue = filteredItems.filter((item) => item.aging_bucket === "overdue").length;
    const attention = filteredItems.filter((item) => item.attention_needed).length;
    return {
      total: filteredItems.length,
      warning,
      overdue,
      attention,
    };
  }, [filteredItems]);

  const rows: QueueRowViewModel[] = filteredItems.map((item) => ({
    id: item.id,
    title: item.title,
    meta: `${item.module} · Dibuat ${formatAdminDate(item.created_at)}`,
    subjectName: item.subject_name,
    status: item.status,
    statusLabel: localizeSuratStatus(item.status),
    tone: getStatusTone(item.status, item.attention_needed),
    ageLabel: `${Math.round(item.age_hours)}j`,
    ageHint:
      item.aging_bucket === "overdue"
        ? "Lewat SLA"
        : item.aging_bucket === "warning"
          ? "Mendekati SLA"
          : `Diperbarui ${formatAdminDate(item.updated_at)}`,
    attentionNeeded: item.attention_needed,
    detailHref: `/admin/surat-queue/${item.id}`,
  }));

  const activeFilters = [
    statusFilter ? { key: "status", label: `Status: ${localizeSuratStatus(statusFilter)}` } : null,
    agingFilter
      ? {
          key: "aging",
          label: agingFilter === "overdue" ? "Aging: Lewat SLA" : "Aging: Perlu Dipantau",
        }
      : null,
    scope !== "all"
      ? { key: "scope", label: scope === "today" ? "Scope: Hari ini" : "Scope: Minggu ini" }
      : null,
    search.trim() ? { key: "search", label: `Cari: ${search.trim()}` } : null,
  ].filter(Boolean) as Array<{ key: string; label: string }>;

  const clearFilters = () => {
    setScope("all");
    setStatusFilter("");
    setAgingFilter("");
    setSearch("");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Antrean Operasional"
          title="Antrean surat"
          description="Prioritaskan dokumen yang mendekati atau melewati SLA, lalu buka detail untuk memproses status berikutnya."
        />
        <AdminStatsSkeleton />
        <AdminFilterSkeleton />
        <AdminListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Gagal memuat antrean surat"
        description={error}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Antrean Operasional"
        title="Antrean surat"
        description="Prioritaskan dokumen yang mendekati atau melewati SLA, lalu buka detail untuk memproses status berikutnya."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total tiket" value={String(metrics.total)} icon={<FileText className="size-5" />} />
        <MetricCard
          label="Perlu Dipantau"
          value={String(metrics.warning)}
          tone="warning"
          icon={<FolderClock className="size-5" />}
        />
        <MetricCard
          label="Lewat SLA"
          value={String(metrics.overdue)}
          tone="danger"
          icon={<ShieldAlert className="size-5" />}
        />
        <MetricCard
          label="Perlu aksi"
          value={String(metrics.attention)}
          tone={metrics.attention > 0 ? "danger" : "neutral"}
          icon={<OctagonAlert className="size-5" />}
        />
      </div>

      <AdminFilterToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari judul surat, pemohon, atau modul"
        selectLabel="Status"
        selectValue={statusFilter}
        onSelectChange={setStatusFilter}
        selectOptions={statusOptions}
        agingLabel="Aging"
        agingValue={agingFilter}
        onAgingChange={setAgingFilter}
        agingOptions={agingOptions}
      >
        <div className="flex min-w-[260px] flex-col gap-1.5">
          <span className="text-[11px] font-medium text-slate-400">Scope</span>
          <Tabs value={scope} onValueChange={(value) => setScope(value as "all" | "today" | "week")}>
            <TabsList className="grid h-10 grid-cols-3 rounded-2xl bg-white/85 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)]">
              <TabsTrigger value="all" className="rounded-xl">Semua</TabsTrigger>
              <TabsTrigger value="today" className="rounded-xl">Hari ini</TabsTrigger>
              <TabsTrigger value="week" className="rounded-xl">Minggu ini</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </AdminFilterToolbar>

      <AdminActiveFilters items={activeFilters} onClear={clearFilters} />

      <QueueList
        items={rows}
        emptyTitle="Tidak ada antrean surat"
        emptyDescription="Coba reset filter atau tunggu pengajuan baru masuk dari warga."
      />
    </div>
  );
}
