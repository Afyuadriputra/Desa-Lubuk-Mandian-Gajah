"use client";

import React from "react";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminSectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {description ? <p className="mt-1 text-xs text-zinc-500">{description}</p> : null}
      </div>
      {children}
    </section>
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
    <label className="block space-y-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={readOnly || !onChange}
        disabled={disabled}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none transition-colors focus:border-zinc-600 disabled:cursor-not-allowed disabled:opacity-60"
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
    <label className="block space-y-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</span>
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={!onChange}
        rows={rows}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none transition-colors focus:border-zinc-600"
      />
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
  const toneClass =
    tone === "error"
      ? "border-red-900/40 bg-red-950/30 text-red-300"
      : tone === "success"
        ? "border-emerald-900/40 bg-emerald-950/30 text-emerald-300"
        : "border-zinc-800 bg-zinc-900/60 text-zinc-300";

  return <div className={`rounded-xl border px-4 py-3 text-sm ${toneClass}`}>{children}</div>;
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
    <label className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        disabled={disabled}
        className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-white"
      />
      <span>{label}</span>
    </label>
  );
}
