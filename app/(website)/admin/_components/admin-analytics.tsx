"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CircleAlert, Clock3, FileBarChart, ListFilter, MessageSquareWarning } from "lucide-react";
import type { DashboardChartItemDto, DashboardTrendPointDto } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import {
  AdminDataPanel,
  AdminNotice,
  AdminSectionCard,
  AdminWidgetSkeleton,
  EmptyState,
  MetricCard,
} from "./admin-primitives";
import { StatusBarChart, TrendLineChart } from "./admin-charts";

type AnalyticsSummaryCard = {
  label: string;
  value: string;
  hint: string;
  tone?: "neutral" | "info" | "warning" | "danger" | "success";
  icon?: React.ReactNode;
};

export type { AnalyticsSummaryCard };

export function AnalyticsSummaryGrid({
  cards,
}: {
  cards: AnalyticsSummaryCard[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <MetricCard
          key={card.label}
          label={card.label}
          value={card.value}
          hint={card.hint}
          tone={card.tone}
          icon={card.icon}
        />
      ))}
    </div>
  );
}

export function AnalyticsTrendAndBreakdown({
  trendTitle,
  trendDescription,
  trendData,
  breakdownTitle,
  breakdownDescription,
  breakdownData,
  trendColor,
  loading,
  error,
}: {
  trendTitle: string;
  trendDescription: string;
  trendData: DashboardTrendPointDto[];
  breakdownTitle: string;
  breakdownDescription: string;
  breakdownData: DashboardChartItemDto[];
  trendColor: string;
  loading: boolean;
  error?: string | null;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <AdminDataPanel title={trendTitle} description={trendDescription}>
        {loading ? (
          <AdminWidgetSkeleton lines={5} />
        ) : error ? (
          <AdminNotice tone="error">{error}</AdminNotice>
        ) : trendData.length ? (
          <TrendLineChart data={trendData} color={trendColor} />
        ) : (
          <EmptyState
            title="Belum ada data tren"
            description="Tren akan muncul setelah backend mengirim histori yang cukup."
          />
        )}
      </AdminDataPanel>

      <AdminDataPanel title={breakdownTitle} description={breakdownDescription}>
        {loading ? (
          <AdminWidgetSkeleton lines={5} />
        ) : error ? (
          <AdminNotice tone="error">{error}</AdminNotice>
        ) : breakdownData.length ? (
          <StatusBarChart data={breakdownData} />
        ) : (
          <EmptyState
            title="Belum ada distribusi"
            description="Distribusi kategori atau status akan tampil jika data tersedia."
          />
        )}
      </AdminDataPanel>
    </div>
  );
}

export function AnalyticsListPanel({
  title,
  description,
  items,
  emptyTitle,
  emptyDescription,
  labelKey = "label",
  totalKey = "total",
}: {
  title: string;
  description: string;
  items: Array<Record<string, string | number | null | undefined>>;
  emptyTitle: string;
  emptyDescription: string;
  labelKey?: string;
  totalKey?: string;
}) {
  return (
    <AdminSectionCard title={title} description={description}>
      {items.length ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={`${String(item[labelKey] ?? "item")}-${index}`}
              className="admin-subtle-panel flex items-center justify-between gap-3 rounded-[22px] px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {String(item[labelKey] ?? `Item ${index + 1}`)}
                </p>
                {item.reason ? (
                  <p className="mt-1 text-sm text-slate-500">{String(item.reason)}</p>
                ) : item.detail ? (
                  <p className="mt-1 text-sm text-slate-500">{String(item.detail)}</p>
                ) : null}
              </div>
              <div className="admin-number-tabular shrink-0 text-lg font-semibold text-slate-950">
                {String(item[totalKey] ?? 0)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
    </AdminSectionCard>
  );
}

export function AnalyticsQueuePanel({
  title,
  description,
  items,
  emptyTitle,
  emptyDescription,
  href,
  hrefLabel,
}: {
  title: string;
  description: string;
  items: Array<Record<string, string | number | boolean | null | undefined>>;
  emptyTitle: string;
  emptyDescription: string;
  href: string;
  hrefLabel: string;
}) {
  return (
    <AdminSectionCard
      title={title}
      description={description}
      actions={
        <Button
          asChild
          variant="outline"
          className="rounded-full border-slate-200 bg-white/85 text-slate-700 hover:bg-white hover:text-slate-950"
        >
          <Link href={href}>
            {hrefLabel}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      }
    >
      {items.length ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={`${String(item.id ?? index)}-${index}`}
              className="admin-subtle-panel rounded-[22px] px-4 py-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {String(item.title ?? item.label ?? `Item ${index + 1}`)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {String(item.subject_name ?? item.subjectName ?? "-")}
                  </p>
                </div>
                <div className="text-right">
                  {item.status ? (
                    <p className="text-sm font-semibold text-slate-900">{String(item.status)}</p>
                  ) : null}
                  {typeof item.age_hours === "number" ? (
                    <p className="text-xs text-slate-500">{item.age_hours} jam</p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
    </AdminSectionCard>
  );
}

export const analyticsIcons = {
  document: <FileBarChart data-icon="inline-start" />,
  clock: <Clock3 data-icon="inline-start" />,
  warning: <CircleAlert data-icon="inline-start" />,
  filter: <ListFilter data-icon="inline-start" />,
  report: <MessageSquareWarning data-icon="inline-start" />,
};
