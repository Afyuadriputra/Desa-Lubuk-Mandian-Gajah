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
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";

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
    return <div className="flex h-64 items-center justify-center text-sm text-zinc-500">Memuat detail pengaduan...</div>;
  }

  if (error || !pengaduan) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <AdminNotice tone="error">{error ?? "Pengaduan tidak ditemukan."}</AdminNotice>
        <Link href="/admin/pengaduan-queue" className="text-sm text-zinc-400 hover:text-white">Kembali ke antrean pengaduan</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title={pengaduan.judul}
        description={`Kategori ${pengaduan.kategori} • Status ${pengaduan.status}`}
        actions={<Link href="/admin/pengaduan-queue" className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200">Kembali</Link>}
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <AdminSectionCard title="Metadata Pengaduan">
            <div className="space-y-3 text-sm text-zinc-300">
              <div><span className="text-zinc-500">ID:</span> {pengaduan.id}</div>
              <div><span className="text-zinc-500">Pelapor:</span> {pengaduan.pelapor_nama}</div>
              <div><span className="text-zinc-500">Kategori:</span> {pengaduan.kategori}</div>
              <div><span className="text-zinc-500">Status:</span> {pengaduan.status}</div>
              <div><span className="text-zinc-500">Deskripsi:</span></div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">{pengaduan.deskripsi}</div>
              {pengaduan.foto_bukti_url ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
                  Foto bukti: <a href={pengaduan.foto_bukti_url} className="text-zinc-200 underline" target="_blank" rel="noreferrer">{pengaduan.foto_bukti_url}</a>
                </div>
              ) : null}
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Proses Pengaduan">
            <div className="grid grid-cols-1 gap-4">
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Status Baru</span>
                <select
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as ProsesForm["status"] }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200"
                >
                  <option value="TRIAGED">TRIAGED</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </label>
              <AdminTextarea label="Catatan Tindak Lanjut" value={form.notes} onChange={(value) => setForm((prev) => ({ ...prev, notes: value }))} rows={5} />
              <div>
                <button
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
                  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
                >
                  {saving ? "Memproses..." : "Simpan Proses"}
                </button>
              </div>
            </div>
          </AdminSectionCard>
        </div>

        <div className="space-y-6">
          <AdminSectionCard title="History">
            <div className="space-y-3">
              {(pengaduan.histori ?? []).length === 0 ? (
                <div className="text-sm text-zinc-500">Belum ada history pengaduan.</div>
              ) : (
                pengaduan.histori?.map((item, index) => (
                  <div key={`${item.created_at}-${index}`} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">
                    <div className="font-semibold">{item.status_to}</div>
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
