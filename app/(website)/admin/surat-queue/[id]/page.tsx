"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { suratApi } from "@/lib/api/surat";
import type { SuratDetailDto } from "@/lib/api/types";
import {
  AdminDetailSkeleton,
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  StatusBadge,
  AdminTextarea,
  ErrorState,
} from "@/app/(website)/admin/_components/admin-primitives";
import { adminToastError, adminToastSuccess, getErrorMessage } from "@/app/(website)/admin/_components/admin-feedback";
import { Button } from "@/components/ui/button";
import { localizeSuratJenis, localizeSuratStatus, toneForSuratStatus } from "@/app/(website)/admin/_components/admin-labels";

type ProsesForm = {
  status: "VERIFIED" | "PROCESSED" | "DONE" | "REJECTED";
  notes: string;
  nomor_surat: string;
  rejection_reason: string;
};

export default function AdminSuratDetailPage() {
  const params = useParams<{ id: string }>();
  const suratId = String(params.id);
  const [surat, setSurat] = useState<SuratDetailDto | null>(null);
  const [form, setForm] = useState<ProsesForm>({
    status: "VERIFIED",
    notes: "",
    nomor_surat: "",
    rejection_reason: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = React.useCallback(async () => {
    const result = await suratApi.detail(suratId);
    const data = result.data;
    setSurat(data);
    setForm((prev) => ({
      ...prev,
      nomor_surat: data.nomor_surat ?? "",
      rejection_reason: data.rejection_reason ?? "",
    }));
  }, [suratId]);

  useEffect(() => {
    loadDetail()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [loadDetail]);

  if (loading) {
    return <AdminDetailSkeleton />;
  }

  if (error || !surat) {
    return (
      <ErrorState
        title="Gagal memuat detail surat"
        description={error ?? "Surat tidak ditemukan."}
        action={<Link href="/admin/surat-queue" className="text-sm text-slate-600 hover:text-slate-950">Kembali ke antrean surat</Link>}
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title={localizeSuratJenis(surat.jenis_surat)}
        description={`Status saat ini: ${localizeSuratStatus(surat.status)}`}
        actions={
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/admin/surat-queue">Kembali</Link>
          </Button>
        }
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <AdminSectionCard title="Metadata Surat">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AdminField label="ID Surat" value={surat.id} readOnly />
              <AdminField label="Jenis Surat" value={localizeSuratJenis(surat.jenis_surat)} readOnly />
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-slate-500">Status</span>
                <div className="pt-1">
                  <StatusBadge label={localizeSuratStatus(surat.status)} tone={toneForSuratStatus(surat.status)} />
                </div>
              </div>
              <AdminField label="Nomor Surat" value={surat.nomor_surat ?? "-"} readOnly />
              <AdminTextarea label="Keperluan" value={surat.keperluan} rows={6} />
              <AdminField label="PDF URL" value={surat.pdf_url ?? "-"} readOnly />
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Proses Surat">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Status Baru</span>
                <select
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as ProsesForm["status"] }))}
                  className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                >
                  <option value="VERIFIED">{localizeSuratStatus("VERIFIED")}</option>
                  <option value="PROCESSED">{localizeSuratStatus("PROCESSED")}</option>
                  <option value="DONE">{localizeSuratStatus("DONE")}</option>
                  <option value="REJECTED">{localizeSuratStatus("REJECTED")}</option>
                </select>
              </label>
              <AdminField label="Nomor Surat" value={form.nomor_surat} onChange={(value) => setForm((prev) => ({ ...prev, nomor_surat: value }))} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <AdminTextarea label="Catatan Proses" value={form.notes} onChange={(value) => setForm((prev) => ({ ...prev, notes: value }))} rows={4} />
              <AdminTextarea label="Alasan Penolakan" value={form.rejection_reason} onChange={(value) => setForm((prev) => ({ ...prev, rejection_reason: value }))} rows={3} />
            </div>
            <div className="mt-4">
              <Button
                onClick={async () => {
                  setSaving(true);
                  setMessage(null);
                  setError(null);
                  try {
                    await suratApi.proses(suratId, form);
                    await loadDetail();
                    setMessage("Status surat berhasil diperbarui.");
                    adminToastSuccess("Status surat berhasil diperbarui.");
                  } catch (err: unknown) {
                    setError(getErrorMessage(err, "Gagal memproses surat."));
                    adminToastError(err, "Gagal memproses surat.");
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
                className="rounded-full"
              >
                {saving ? "Memproses..." : "Simpan Proses"}
              </Button>
            </div>
          </AdminSectionCard>
        </div>

        <div className="space-y-6">
          <AdminSectionCard title="Riwayat Proses">
            <div className="space-y-3">
              {(surat.histori ?? []).length === 0 ? (
                <div className="text-sm text-slate-500">Belum ada histori status.</div>
              ) : (
                surat.histori?.map((item, index) => (
                  <div key={`${item.created_at}-${index}`} className="rounded-[22px] border border-slate-200/80 bg-white/80 p-3 text-sm text-slate-700">
                    <div className="font-semibold">{localizeSuratStatus(item.status_from ?? "-")} → {localizeSuratStatus(item.status_to)}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.changed_by_nama ?? "Sistem"} • {new Date(item.created_at).toLocaleString("id-ID")}</div>
                    {item.notes ? <div className="mt-2 text-xs text-slate-500">{item.notes}</div> : null}
                  </div>
                ))
              )}
            </div>
          </AdminSectionCard>
        </div>
      </div>
    </div>
  );
}
