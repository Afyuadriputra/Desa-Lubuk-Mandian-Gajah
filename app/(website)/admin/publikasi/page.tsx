"use client";

import React, { useEffect, useState } from "react";
import { publikasiApi } from "@/lib/api/publikasi";
import type { PublikasiDetailDto, PublikasiPayload } from "@/lib/api/types";
import {
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";

const emptyForm: PublikasiPayload = {
  judul: "",
  konten_html: "",
  jenis: "BERITA",
  status: "DRAFT",
};

export default function AdminPublikasiPage() {
  const [items, setItems] = useState<PublikasiDetailDto[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<PublikasiPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAll = async () => {
    const result = await publikasiApi.listAdmin();
    setItems(result);
  };

  useEffect(() => {
    loadAll()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (item: PublikasiDetailDto) => {
    setSelectedSlug(item.slug);
    setForm({
      judul: item.judul,
      konten_html: item.konten_html,
      jenis: item.jenis,
      status: item.status,
    });
    setMessage(null);
    setError(null);
  };

  const resetForm = () => {
    setSelectedSlug(null);
    setForm(emptyForm);
  };

  const runAction = async (action: () => Promise<unknown>, successMessage: string) => {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await action();
      await loadAll();
      setMessage(successMessage);
    } catch (err: any) {
      setError(err.message ?? "Operasi publikasi gagal.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-zinc-500">Memuat publikasi...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        title="Publikasi Informasi"
        description="Changelist dan editor publikasi seperti alur Django admin."
        actions={
          <button onClick={resetForm} className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200">
            Tambah Baru
          </button>
        }
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <AdminSectionCard title="Daftar Publikasi">
            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleSelect(item)}
                  className={`w-full rounded-lg border px-4 py-3 text-left ${
                    selectedSlug === item.slug
                      ? "border-white/30 bg-zinc-800 text-white"
                      : "border-zinc-800 bg-zinc-950 text-zinc-200"
                  }`}
                >
                  <div className="text-sm font-semibold">{item.judul}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {item.jenis} • {item.status} • {item.penulis_nama}
                  </div>
                </button>
              ))}
            </div>
          </AdminSectionCard>
        </div>

        <div className="xl:col-span-3">
          <AdminSectionCard title={selectedSlug ? "Edit Publikasi" : "Tambah Publikasi"}>
            <div className="grid grid-cols-1 gap-4">
              <AdminField label="Judul" value={form.judul} onChange={(value) => setForm((prev) => ({ ...prev, judul: value }))} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Jenis</span>
                  <select
                    value={form.jenis}
                    onChange={(event) => setForm((prev) => ({ ...prev, jenis: event.target.value }))}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200"
                  >
                    <option value="BERITA">BERITA</option>
                    <option value="PENGUMUMAN">PENGUMUMAN</option>
                  </select>
                </label>
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Status</span>
                  <select
                    value={form.status}
                    onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as "DRAFT" | "PUBLISHED" }))}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                  </select>
                </label>
              </div>
              <AdminTextarea
                label="Konten HTML"
                value={form.konten_html}
                onChange={(value) => setForm((prev) => ({ ...prev, konten_html: value }))}
                rows={14}
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    runAction(
                      () => (selectedSlug ? publikasiApi.update(selectedSlug, form) : publikasiApi.create(form)),
                      selectedSlug ? "Publikasi berhasil diperbarui." : "Publikasi berhasil dibuat."
                    )
                  }
                  disabled={saving}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : selectedSlug ? "Simpan Perubahan" : "Buat Publikasi"}
                </button>
                {selectedSlug ? (
                  <>
                    <button
                      onClick={() => runAction(() => publikasiApi.updateStatus(selectedSlug, { status: form.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }), "Status publikasi berhasil diperbarui.")}
                      disabled={saving}
                      className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200"
                    >
                      Toggle Publish
                    </button>
                    <button
                      onClick={() =>
                        runAction(async () => {
                          await publikasiApi.remove(selectedSlug);
                          resetForm();
                        }, "Publikasi berhasil dihapus.")
                      }
                      disabled={saving}
                      className="rounded-lg border border-red-900/40 bg-red-950/30 px-4 py-2 text-sm font-semibold text-red-300"
                    >
                      Hapus
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </AdminSectionCard>
        </div>
      </div>
    </div>
  );
}
