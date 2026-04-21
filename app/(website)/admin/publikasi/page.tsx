"use client";

import React, { useEffect, useState } from "react";
import { publikasiApi } from "@/lib/api/publikasi";
import type { PublikasiDetailDto, PublikasiPayload } from "@/lib/api/types";
import {
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  StatusBadge,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";
import { Button } from "@/components/ui/button";
import {
  localizePublikasiJenis,
  localizePublikasiStatus,
  toneForPublikasiStatus,
} from "@/app/(website)/admin/_components/admin-labels";

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
    return <div className="flex h-64 items-center justify-center text-sm text-slate-500">Memuat publikasi...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        title="Publikasi Informasi"
        description="Changelist dan editor publikasi seperti alur Django admin."
        actions={
          <Button onClick={resetForm} variant="outline" className="rounded-full">
            Tambah Baru
          </Button>
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
                  className={`w-full rounded-[24px] border px-4 py-3 text-left transition ${
                    selectedSlug === item.slug
                      ? "border-slate-300 bg-white text-slate-950 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.3)]"
                      : "border-slate-200/80 bg-white/80 text-slate-900 hover:bg-white"
                  }`}
                >
                  <div className="text-sm font-semibold">{item.judul}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <StatusBadge label={localizePublikasiJenis(item.jenis)} tone="info" />
                    <StatusBadge label={localizePublikasiStatus(item.status)} tone={toneForPublikasiStatus(item.status)} />
                    <span>{item.penulis_nama}</span>
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
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Jenis</span>
                  <select
                    value={form.jenis}
                    onChange={(event) => setForm((prev) => ({ ...prev, jenis: event.target.value }))}
                    className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                  >
                    <option value="BERITA">Berita</option>
                    <option value="PENGUMUMAN">Pengumuman</option>
                  </select>
                </label>
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Status</span>
                  <select
                    value={form.status}
                    onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as "DRAFT" | "PUBLISHED" }))}
                    className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Terbit</option>
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
                <Button
                  onClick={() =>
                    runAction(
                      () => (selectedSlug ? publikasiApi.update(selectedSlug, form) : publikasiApi.create(form)),
                      selectedSlug ? "Publikasi berhasil diperbarui." : "Publikasi berhasil dibuat."
                    )
                  }
                  disabled={saving}
                  className="rounded-full"
                >
                  {saving ? "Menyimpan..." : selectedSlug ? "Simpan Perubahan" : "Buat Publikasi"}
                </Button>
                {selectedSlug ? (
                  <>
                    <Button
                      onClick={() => runAction(() => publikasiApi.updateStatus(selectedSlug, { status: form.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }), "Status publikasi berhasil diperbarui.")}
                      disabled={saving}
                      variant="outline"
                      className="rounded-full"
                    >
                      {form.status === "PUBLISHED" ? "Ubah ke Draft" : "Terbitkan"}
                    </Button>
                    <Button
                      onClick={() =>
                        runAction(async () => {
                          await publikasiApi.remove(selectedSlug);
                          resetForm();
                        }, "Publikasi berhasil dihapus.")
                      }
                      disabled={saving}
                      variant="outline"
                      className="rounded-full border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                    >
                      Hapus
                    </Button>
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
