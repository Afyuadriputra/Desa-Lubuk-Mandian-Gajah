"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2, Clock3, Loader2 } from "lucide-react";
import { formatDistanceToNowStrict, format as formatDateFn } from "date-fns";
import { id } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type AdminStatusTone =
  | "neutral"
  | "info"
  | "warning"
  | "danger"
  | "success";

export type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  tone?: AdminStatusTone;
  actionLabel?: string;
  actionHref?: string;
};

export type AdminInsightCardProps = {
  title: string;
  description: string;
  tone?: AdminStatusTone;
  metricLabel?: string;
  metricValue?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
  detail?: React.ReactNode;
};

export type AdminFilterOption = {
  label: string;
  value: string;
};

export type QueueRowViewModel = {
  id: string;
  title: string;
  meta: string;
  subjectName: string;
  status: string;
  statusLabel?: string;
  tone: AdminStatusTone;
  ageLabel: string;
  ageHint: string;
  attentionNeeded: boolean;
  detailHref: string;
};

export type HealthFlagViewModel = {
  key: string;
  label: string;
  total: number;
  detail?: string | null;
  tone: AdminStatusTone;
};

export type AdminSkeletonVariant = "stats" | "list" | "form" | "detail";

export type AdminDirtyState = "clean" | "dirty" | "saving";

const toneMap: Record<AdminStatusTone, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const toneDotMap: Record<AdminStatusTone, string> = {
  neutral: "bg-slate-400",
  info: "bg-blue-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  success: "bg-emerald-500",
};

export function formatAdminDate(value: string) {
  try {
    return formatDateFn(new Date(value), "dd MMM yyyy, HH:mm", { locale: id });
  } catch {
    return value;
  }
}

export function formatRelativeDate(value: string) {
  try {
    return formatDistanceToNowStrict(new Date(value), {
      locale: id,
      addSuffix: true,
    });
  } catch {
    return value;
  }
}

export function getStatusTone(status: string, isAttention = false): AdminStatusTone {
  if (isAttention) return "danger";
  const normalized = status.toUpperCase();
  if (["DONE", "RESOLVED", "CLOSED"].includes(normalized)) return "success";
  if (["VERIFIED", "IN_PROGRESS", "TRIAGED"].includes(normalized)) return "info";
  if (["PENDING", "OPEN", "PROCESSED"].includes(normalized)) return "warning";
  if (["REJECTED"].includes(normalized)) return "danger";
  return "neutral";
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminSurface({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn("admin-panel rounded-[28px] border-white/70 bg-white/88", className)}>
      {children}
    </Card>
  );
}

export function AdminShellSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <section className={cn("admin-grid", className)}>{children}</section>;
}

export function AdminSectionCard({
  title,
  description,
  actions,
  className,
  contentClassName,
  children,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <AdminSurface className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-slate-950">{title}</CardTitle>
            {description ? (
              <CardDescription className="text-sm leading-6 text-slate-500">
                {description}
              </CardDescription>
            ) : null}
          </div>
          {actions}
        </div>
      </CardHeader>
      <CardContent className={cn("pt-0", contentClassName)}>{children}</CardContent>
    </AdminSurface>
  );
}

export function MetricCard({
  label,
  value,
  hint,
  icon,
  tone = "neutral",
  actionLabel,
  actionHref,
}: MetricCardProps) {
  return (
    <AdminSurface className="admin-widget-radius admin-insight-glow rounded-[26px]">
      <CardContent className="flex min-h-40 flex-col justify-between gap-6 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="admin-metric-label font-semibold text-slate-400">
              {label}
            </p>
          </div>
          {icon ? (
            <div className={cn("rounded-2xl border p-2.5", toneMap[tone])}>{icon}</div>
          ) : null}
        </div>
        <div className="space-y-2">
          <div className="admin-kpi-number admin-display-compact font-semibold tracking-tight text-slate-950">
            {value}
          </div>
          {hint ? <p className="text-sm text-slate-500">{hint}</p> : null}
        </div>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            {actionLabel}
            <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </CardContent>
    </AdminSurface>
  );
}

export function AdminKpiCard(props: MetricCardProps) {
  return <MetricCard {...props} />;
}

export function AdminInsightCard({
  title,
  description,
  tone = "neutral",
  metricLabel,
  metricValue,
  actionLabel,
  actionHref,
  icon,
  detail,
}: AdminInsightCardProps) {
  return (
    <AdminSurface className="admin-widget-radius admin-insight-glow rounded-[26px]">
      <CardContent className="flex min-h-44 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {icon ? (
                <div className={cn("rounded-2xl border p-2.5", toneMap[tone])}>{icon}</div>
              ) : null}
              <StatusBadge
                label={tone === "danger" ? "Prioritas" : tone === "warning" ? "Perlu cek" : "Ringkasan"}
                tone={tone}
              />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-950">{title}</p>
              <p className="text-sm leading-6 text-slate-500">{description}</p>
            </div>
          </div>
          {metricValue ? (
            <div className="min-w-[92px] text-right">
              {metricLabel ? (
                <p className="admin-metric-label mb-1 text-slate-400">{metricLabel}</p>
              ) : null}
              <div className="admin-number-tabular text-2xl font-semibold text-slate-950">
                {metricValue}
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          {detail ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  type="button"
                  className="text-left text-xs text-slate-400 transition hover:text-slate-600"
                >
                  Lihat konteks
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 rounded-3xl border-slate-200/80 bg-white/98 p-4 text-sm text-slate-600 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.3)]">
                {detail}
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div />
          )}
          {actionLabel && actionHref ? (
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950"
            >
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </AdminSurface>
  );
}

export function AdminWidgetSkeleton({
  lines = 4,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <AdminSurface className={cn("admin-widget-radius rounded-[26px]", className)}>
      <CardContent className="space-y-4 p-5">
        <Skeleton className="h-4 w-28 rounded-full" />
        <Skeleton className="h-10 w-36 rounded-2xl" />
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton key={index} className="h-3.5 w-full rounded-full" />
          ))}
        </div>
      </CardContent>
    </AdminSurface>
  );
}

export function AdminStatsSkeleton({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <AdminWidgetSkeleton key={index} lines={2} />
      ))}
    </div>
  );
}

export function AdminListSkeleton({
  rows = 6,
}: {
  rows?: number;
}) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <AdminSurface key={index} className="rounded-[26px] border-white/70">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-5 w-40 rounded-full" />
              <Skeleton className="h-4 w-3/4 rounded-full" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
            <div className="w-full max-w-[180px] space-y-3">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-9 w-full rounded-2xl" />
            </div>
          </CardContent>
        </AdminSurface>
      ))}
    </div>
  );
}

export function AdminFormSkeleton({
  fields = 6,
}: {
  fields?: number;
}) {
  return (
    <AdminSectionCard title="Memuat form" description="Menyiapkan workspace editor.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="h-11 w-full rounded-[22px]" />
          </div>
        ))}
        <div className="md:col-span-2 space-y-2">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-36 w-full rounded-[22px]" />
        </div>
      </div>
    </AdminSectionCard>
  );
}

export function AdminFilterSkeleton({
  filters = 3,
}: {
  filters?: number;
}) {
  return (
    <AdminSurface className="rounded-[26px]">
      <CardContent className="flex flex-col gap-3 p-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
          {Array.from({ length: filters }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-3 w-20 rounded-full" />
              <Skeleton className="h-11 w-full rounded-[22px]" />
            </div>
          ))}
        </div>
        <Skeleton className="h-9 w-32 rounded-full" />
      </CardContent>
    </AdminSurface>
  );
}

export function AdminDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-10 w-80 rounded-full" />
        <Skeleton className="h-4 w-96 max-w-full rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <AdminFormSkeleton fields={4} />
          <AdminFormSkeleton fields={4} />
        </div>
        <AdminSectionCard title="Memuat riwayat">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2 rounded-[22px] border border-slate-200/80 bg-white/80 p-3">
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-3 w-40 rounded-full" />
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
            ))}
          </div>
        </AdminSectionCard>
      </div>
    </div>
  );
}

export function StatusBadge({
  label,
  tone,
  className,
}: {
  label: string;
  tone: AdminStatusTone;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        toneMap[tone],
        className,
      )}
    >
      <span className={cn("mr-1.5 size-1.5 rounded-full", toneDotMap[tone])} />
      {label}
    </Badge>
  );
}

export function AdminAlertStrip({
  title,
  message,
  tone,
}: {
  title: string;
  message: string;
  tone: AdminStatusTone;
}) {
  return (
    <div
      className={cn(
        "admin-glass flex items-start gap-3 rounded-[24px] px-4 py-4",
        toneMap[tone],
      )}
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-slate-200 bg-white/60 p-8 text-center">
      <div className="rounded-full bg-slate-100 p-3 text-slate-500">
        <Clock3 className="size-5" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-slate-900">{title}</p>
        <p className="max-w-md text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export function ErrorState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-[28px] border border-red-200 bg-red-50/90 p-8 text-center">
      <div className="rounded-full bg-white p-3 text-red-500 shadow-sm">
        <AlertCircle className="size-5" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-red-700">{title}</p>
        {description ? (
          <p className="max-w-md text-sm leading-6 text-red-600/80">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-3">
      <Loader2 className="size-5 animate-spin text-slate-400" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

export function AdminFilterToolbar({
  searchValue,
  searchPlaceholder,
  onSearchChange,
  searchLabel = "Cari",
  selectLabel,
  selectValue,
  onSelectChange,
  selectOptions,
  agingLabel,
  agingValue,
  onAgingChange,
  agingOptions,
  rightSlot,
  children,
}: {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  searchLabel?: string;
  selectLabel?: string;
  selectValue?: string;
  onSelectChange?: (value: string) => void;
  selectOptions?: AdminFilterOption[];
  agingLabel?: string;
  agingValue?: string;
  onAgingChange?: (value: string) => void;
  agingOptions?: AdminFilterOption[];
  rightSlot?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="admin-glass sticky top-3 z-20 rounded-[26px] p-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          {onSearchChange ? (
            <FieldBlock label={searchLabel} className="min-w-[240px] flex-1">
              <Input
                value={searchValue ?? ""}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
              />
            </FieldBlock>
          ) : null}
          {selectOptions && onSelectChange ? (
            <FieldBlock label={selectLabel ?? "Status"} className="min-w-[180px]">
              <Select
                value={selectValue ?? ""}
                onChange={(event) => onSelectChange(event.target.value)}
              >
                {selectOptions.map((option) => (
                  <option key={option.value || option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FieldBlock>
          ) : null}
          {agingOptions && onAgingChange ? (
            <FieldBlock label={agingLabel ?? "Aging"} className="min-w-[180px]">
              <Select
                value={agingValue ?? ""}
                onChange={(event) => onAgingChange(event.target.value)}
              >
                {agingOptions.map((option) => (
                  <option key={option.value || option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FieldBlock>
          ) : null}
          {children}
        </div>
        {rightSlot ? <div className="flex items-end gap-2">{rightSlot}</div> : null}
      </div>
    </div>
  );
}

export function AdminFilterBar(props: React.ComponentProps<typeof AdminFilterToolbar>) {
  return <AdminFilterToolbar {...props} />;
}

export function AdminActiveFilters({
  items,
  onClear,
}: {
  items: Array<{ key: string; label: string }>;
  onClear?: () => void;
}) {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <Badge
          key={item.key}
          variant="outline"
          className="rounded-full border-slate-200 bg-white/85 px-3 py-1 text-xs font-medium text-slate-600"
        >
          {item.label}
        </Badge>
      ))}
      {onClear ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="rounded-full text-slate-500 hover:bg-white/80 hover:text-slate-900"
        >
          Reset filter
        </Button>
      ) : null}
    </div>
  );
}

export function AdminActionRail({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions: React.ReactNode;
}) {
  return (
    <AdminSectionCard
      title={title}
      description={description}
      contentClassName="pt-0"
    >
      <div className="flex flex-wrap gap-2">{actions}</div>
    </AdminSectionCard>
  );
}

export function AdminDataPanel({
  title,
  description,
  tooltip,
  children,
}: {
  title: string;
  description?: string;
  tooltip?: string;
  children: React.ReactNode;
}) {
  return (
    <AdminSectionCard
      title={title}
      description={description}
      actions={
        tooltip ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Info ${title}`}
                className="rounded-full text-slate-400 hover:bg-white/80 hover:text-slate-700"
              >
                <AlertCircle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        ) : null
      }
    >
      {children}
    </AdminSectionCard>
  );
}

function FieldBlock({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[11px] font-medium text-slate-400">{label}</span>
      {children}
    </label>
  );
}

export function QueueList({
  items,
  emptyTitle,
  emptyDescription,
}: {
  items: QueueRowViewModel[];
  emptyTitle: string;
  emptyDescription: string;
}) {
  if (!items.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AdminSurface
          key={item.id}
          className={cn(
            "relative overflow-hidden rounded-[26px] border-white/70",
            item.attentionNeeded && "ring-1 ring-red-100",
          )}
        >
          <div
            className={cn(
              "absolute inset-y-4 left-0 w-1 rounded-r-full",
              item.attentionNeeded ? "bg-red-400" : toneDotMap[item.tone],
            )}
          />
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3 pl-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge label={item.statusLabel ?? item.status} tone={item.tone} />
                  {item.attentionNeeded ? (
                    <Badge
                      variant="outline"
                      className="rounded-full border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700"
                    >
                      Perlu perhatian
                    </Badge>
                  ) : null}
                </div>
                <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.meta}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="font-medium text-slate-700">{item.subjectName}</span>
                <span>{item.ageHint}</span>
              </div>
            </div>
            <div className="flex min-w-[180px] flex-col items-start gap-3 sm:items-end">
              <div className="space-y-1 text-left sm:text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Umur tiket
                </p>
                <p className="admin-kpi-number text-xl font-semibold text-slate-950">
                  {item.ageLabel}
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-2xl border-slate-200 bg-white/90 text-slate-700 hover:bg-slate-50 hover:text-slate-950"
              >
                <Link href={item.detailHref}>Buka detail</Link>
              </Button>
            </div>
          </CardContent>
        </AdminSurface>
      ))}
    </div>
  );
}

export function HealthFlagList({ items }: { items: HealthFlagViewModel[] }) {
  if (!items.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-200 bg-white/60 p-5 text-sm text-slate-500">
        Tidak ada flag penting saat ini.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.key}
          className="admin-subtle-panel rounded-[22px] border border-white/80 px-4 py-3"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", toneDotMap[item.tone])} />
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              </div>
              {item.detail ? <p className="text-sm text-slate-500">{item.detail}</p> : null}
            </div>
            <StatusBadge label={String(item.total)} tone={item.tone} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecentActivityList({
  items,
}: {
  items: Array<{
    title: string;
    action: string;
    module: string;
    created_at: string;
    target_url: string;
    actor_name?: string | null;
  }>;
}) {
  if (!items.length) {
    return <EmptyState title="Belum ada aktivitas" description="Aktivitas terbaru akan tampil di sini." />;
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <React.Fragment key={`${item.target_url}-${index}`}>
          <Link
            href={item.target_url}
            className="flex items-start justify-between gap-4 rounded-[22px] px-1 py-1 transition hover:bg-slate-50/80"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-500">
                {item.module} · {item.action}
                {item.actor_name ? ` · ${item.actor_name}` : ""}
              </p>
            </div>
            <p className="shrink-0 text-xs text-slate-400">{formatRelativeDate(item.created_at)}</p>
          </Link>
          {index < items.length - 1 ? <Separator className="bg-slate-100" /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

export function SaveState({
  message,
  tone,
}: {
  message?: string | null;
  tone?: AdminStatusTone;
}) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
        toneMap[tone ?? "success"],
      )}
    >
      {tone === "danger" ? <AlertCircle className="size-3.5" /> : <CheckCircle2 className="size-3.5" />}
      {message}
    </div>
  );
}

export function AdminField({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
  disabled = false,
}: {
  label: string;
  value?: string | number | null;
  onChange?: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium text-slate-500">{label}</span>
      <Input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={readOnly || !onChange}
        disabled={disabled}
      />
    </label>
  );
}

export function AdminTextarea({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value?: string | null;
  onChange?: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium text-slate-500">{label}</span>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={!onChange}
        className="min-h-28 w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
      />
    </label>
  );
}

export function AdminCheckbox({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="admin-subtle-panel flex items-center gap-3 rounded-[22px] px-3.5 py-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        disabled={disabled}
        className="size-4 rounded border-slate-300"
      />
      <span>{label}</span>
    </label>
  );
}

export function AdminNotice({
  tone,
  children,
}: {
  tone: "error" | "success" | "info";
  children: React.ReactNode;
}) {
  const mappedTone = tone === "error" ? "danger" : tone === "success" ? "success" : "info";
  return (
    <div className={cn("rounded-[22px] border px-4 py-3 text-sm", toneMap[mappedTone])}>
      {children}
    </div>
  );
}
