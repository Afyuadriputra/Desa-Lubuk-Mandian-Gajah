"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { suratApi } from "@/lib/api/surat";
import type { SuratDetailDto } from "@/lib/api/types";
import {
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";

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

  const loadDetail = async () => {
    const result = await suratApi.detail(suratId);
    const data = result.data;
    setSurat(data);
    setForm((prev) => ({
      ...prev,
      nomor_surat: data.nomor_surat ?? "",
      rejection_reason: data.rejection_reason ?? "",
    }));
  };

  useEffect(() => {
    loadDetail()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [suratId]);

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-zinc-500">Memuat detail surat...</div>;
  }

  if (error || !surat) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <AdminNotice tone="error">{error ?? "Surat tidak ditemukan."}</AdminNotice>
        <Link href="/admin/surat-queue" className="text-sm text-zinc-400 hover:text-white">Kembali ke antrean surat</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title={surat.jenis_surat}
        description={`Status saat ini: ${surat.status}`}
        actions={<Link href="/admin/surat-queue" className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200">Kembali</Link>}
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <AdminSectionCard title="Metadata Surat">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AdminField label="ID Surat" value={surat.id} readOnly />
              <AdminField label="Jenis Surat" value={surat.jenis_surat} readOnly />
              <AdminField label="Status" value={surat.status} readOnly />
              <AdminField label="Nomor Surat" value={surat.nomor_surat ?? "-"} readOnly />
              <AdminTextarea label="Keperluan" value={surat.keperluan} rows={6} />
              <AdminField label="PDF URL" value={surat.pdf_url ?? "-"} readOnly />
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Proses Surat">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Status Baru</span>
                <select
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as ProsesForm["status"] }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200"
                >
                  <option value="VERIFIED">VERIFIED</option>
                  <option value="PROCESSED">PROCESSED</option>
                  <option value="DONE">DONE</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </label>
              <AdminField label="Nomor Surat" value={form.nomor_surat} onChange={(value) => setForm((prev) => ({ ...prev, nomor_surat: value }))} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <AdminTextarea label="Catatan Proses" value={form.notes} onChange={(value) => setForm((prev) => ({ ...prev, notes: value }))} rows={4} />
              <AdminTextarea label="Alasan Rejection" value={form.rejection_reason} onChange={(value) => setForm((prev) => ({ ...prev, rejection_reason: value }))} rows={3} />
            </div>
            <div className="mt-4">
              <button
                onClick={async () => {
                  setSaving(true);
                  setMessage(null);
                  setError(null);
                  try {
                    await suratApi.proses(suratId, form);
                    await loadDetail();
                    setMessage("Status surat berhasil diperbarui.");
                  } catch (err: any) {
                    setError(err.message ?? "Gagal memproses surat.");
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
              >
                {saving ? "Memproses..." : "Simpan Proses"}
              </button>
            </div>
          </AdminSectionCard>
        </div>

        <div className="space-y-6">
          <AdminSectionCard title="History">
            <div className="space-y-3">
              {(surat.histori ?? []).length === 0 ? (
                <div className="text-sm text-zinc-500">Belum ada histori status.</div>
              ) : (
                surat.histori?.map((item, index) => (
                  <div key={`${item.created_at}-${index}`} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">
                    <div className="font-semibold">{item.status_from ?? "-"} → {item.status_to}</div>
                    <div className="mt-1 text-xs text-zinc-500">{item.changed_by_nama ?? "System"} • {new Date(item.created_at).toLocaleString("id-ID")}</div>
                    {item.notes ? <div className="mt-2 text-xs text-zinc-400">{item.notes}</div> : null}
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
