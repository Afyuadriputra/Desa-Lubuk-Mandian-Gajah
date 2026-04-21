"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { pengaduanApi } from "@/lib/api/pengaduan";
import type { PengaduanDetailDto } from "@/lib/api/types";
import {
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  StatusBadge,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";
import { Button } from "@/components/ui/button";
import { localizePengaduanStatus, toneForPengaduanStatus } from "@/app/(website)/admin/_components/admin-labels";

type ProsesForm = {
  status: "TRIAGED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  notes: string;
};

export default function AdminPengaduanDetailPage() {
  const params = useParams<{ id: string }>();
  const pengaduanId = Number(params.id);
  const [pengaduan, setPengaduan] = useState<PengaduanDetailDto | null>(null);
  const [form, setForm] = useState<ProsesForm>({ status: "TRIAGED", notes: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = async () => {
    const result = await pengaduanApi.detail(pengaduanId);
    setPengaduan(result.data);
  };

  useEffect(() => {
    loadDetail()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [pengaduanId]);

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-slate-500">Memuat detail pengaduan...</div>;
  }

  if (error || !pengaduan) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <AdminNotice tone="error">{error ?? "Pengaduan tidak ditemukan."}</AdminNotice>
        <Link href="/admin/pengaduan-queue" className="text-sm text-slate-500 hover:text-slate-950">Kembali ke antrean pengaduan</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title={pengaduan.judul}
        description={`Kategori ${pengaduan.kategori} • Status ${localizePengaduanStatus(pengaduan.status)}`}
        actions={
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/admin/pengaduan-queue">Kembali</Link>
          </Button>
        }
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <AdminSectionCard title="Metadata Pengaduan">
            <div className="space-y-3 text-sm text-slate-700">
              <div><span className="text-slate-500">ID:</span> {pengaduan.id}</div>
              <div><span className="text-slate-500">Pelapor:</span> {pengaduan.pelapor_nama}</div>
              <div><span className="text-slate-500">Kategori:</span> {pengaduan.kategori}</div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Status:</span>
                <StatusBadge label={localizePengaduanStatus(pengaduan.status)} tone={toneForPengaduanStatus(pengaduan.status)} />
              </div>
              <div><span className="text-slate-500">Deskripsi:</span></div>
              <div className="rounded-[22px] border border-slate-200/80 bg-white/80 p-3 text-sm text-slate-700">{pengaduan.deskripsi}</div>
              {pengaduan.foto_bukti_url ? (
                <div className="rounded-[22px] border border-slate-200/80 bg-white/80 p-3 text-xs text-slate-500">
                  Foto bukti: <a href={pengaduan.foto_bukti_url} className="text-slate-900 underline" target="_blank" rel="noreferrer">{pengaduan.foto_bukti_url}</a>
                </div>
              ) : null}
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Proses Pengaduan">
            <div className="grid grid-cols-1 gap-4">
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Status Baru</span>
                <select
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as ProsesForm["status"] }))}
                  className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                >
                  <option value="TRIAGED">{localizePengaduanStatus("TRIAGED")}</option>
                  <option value="IN_PROGRESS">{localizePengaduanStatus("IN_PROGRESS")}</option>
                  <option value="RESOLVED">{localizePengaduanStatus("RESOLVED")}</option>
                  <option value="CLOSED">{localizePengaduanStatus("CLOSED")}</option>
                </select>
              </label>
              <AdminTextarea label="Catatan Tindak Lanjut" value={form.notes} onChange={(value) => setForm((prev) => ({ ...prev, notes: value }))} rows={5} />
              <div>
                <Button
                  onClick={async () => {
                    setSaving(true);
                    setMessage(null);
                    setError(null);
                    try {
                      await pengaduanApi.proses(pengaduanId, form);
                      await loadDetail();
                      setMessage("Pengaduan berhasil diproses.");
                    } catch (err: any) {
                      setError(err.message ?? "Gagal memproses pengaduan.");
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
            </div>
          </AdminSectionCard>
        </div>

        <div className="space-y-6">
          <AdminSectionCard title="Riwayat Proses">
            <div className="space-y-3">
              {(pengaduan.histori ?? []).length === 0 ? (
                <div className="text-sm text-slate-500">Belum ada histori pengaduan.</div>
              ) : (
                pengaduan.histori?.map((item, index) => (
                  <div key={`${item.created_at}-${index}`} className="rounded-[22px] border border-slate-200/80 bg-white/80 p-3 text-sm text-slate-700">
                    <div className="font-semibold">{localizePengaduanStatus(item.status_to)}</div>
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
