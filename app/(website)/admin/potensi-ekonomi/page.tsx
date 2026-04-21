"use client";

import React, { useEffect, useState } from "react";
import { buildUnitUsahaFormData, ekonomiApi } from "@/lib/api/ekonomi";
import type { KatalogAdminDto, UnitUsahaDetailDto } from "@/lib/api/types";
import {
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  StatusBadge,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";
import { Button } from "@/components/ui/button";

type UnitFormState = {
  nama_usaha: string;
  kategori: string;
  deskripsi: string;
  fasilitas: string;
  kontak_wa: string;
  harga_tiket: string;
  is_published: boolean;
  foto_utama: File | null;
};

const emptyForm: UnitFormState = {
  nama_usaha: "",
  kategori: "UMKM",
  deskripsi: "",
  fasilitas: "",
  kontak_wa: "",
  harga_tiket: "",
  is_published: false,
  foto_utama: null,
};

export default function AdminPotensiEkonomiPage() {
  const [items, setItems] = useState<KatalogAdminDto[]>([]);
  const [selected, setSelected] = useState<UnitUsahaDetailDto | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState<UnitFormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadList = async () => {
    const result = await ekonomiApi.listAdmin();
    setItems(result.data);
  };

  useEffect(() => {
    loadList()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const loadDetail = async (unitId: number) => {
    const detail = await ekonomiApi.detailPublik(unitId);
    const data = detail.data;
    setSelected(data);
    setSelectedId(unitId);
    setForm({
      nama_usaha: data.nama_usaha,
      kategori: data.kategori,
      deskripsi: data.deskripsi,
      fasilitas: data.fasilitas ?? "",
      kontak_wa: data.kontak_wa ?? "",
      harga_tiket: data.harga_tiket != null ? String(data.harga_tiket) : "",
      is_published: data.is_published,
      foto_utama: null,
    });
  };

  const resetForm = () => {
    setSelected(null);
    setSelectedId(null);
    setForm(emptyForm);
  };

  const runAction = async (action: () => Promise<unknown>, successMessage: string) => {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await action();
      await loadList();
      if (selectedId) {
        try {
          await loadDetail(selectedId);
        } catch {
          // ignore detail refresh if unpublished access different
        }
      }
      setMessage(successMessage);
    } catch (err: any) {
      setError(err.message ?? "Operasi potensi ekonomi gagal.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-slate-500">Memuat potensi ekonomi...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        title="Potensi Ekonomi"
        description="Kelola katalog BUMDes dan wisata seperti changelist admin."
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
          <AdminSectionCard title="Daftar Unit">
            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadDetail(item.id).catch((err: Error) => setError(err.message))}
                  className={`w-full rounded-[24px] border px-4 py-3 text-left transition ${
                    selectedId === item.id
                      ? "border-slate-300 bg-white text-slate-950 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.3)]"
                      : "border-slate-200/80 bg-white/80 text-slate-900 hover:bg-white"
                  }`}
                >
                  <div className="text-sm font-semibold">{item.nama_usaha}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <StatusBadge label={item.kategori} tone="info" />
                    <StatusBadge label={item.is_published ? "Sudah Tayang" : "Draft"} tone={item.is_published ? "success" : "warning"} />
                  </div>
                </button>
              ))}
            </div>
          </AdminSectionCard>
        </div>

        <div className="xl:col-span-3">
          <AdminSectionCard title={selected ? "Edit Unit Usaha" : "Tambah Unit Usaha"}>
            <div className="grid grid-cols-1 gap-4">
              <AdminField label="Nama Usaha" value={form.nama_usaha} onChange={(value) => setForm((prev) => ({ ...prev, nama_usaha: value }))} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <AdminField label="Kategori" value={form.kategori} onChange={(value) => setForm((prev) => ({ ...prev, kategori: value }))} />
                <AdminField label="Kontak WA" value={form.kontak_wa} onChange={(value) => setForm((prev) => ({ ...prev, kontak_wa: value }))} />
              </div>
              <AdminField label="Harga Tiket" value={form.harga_tiket} onChange={(value) => setForm((prev) => ({ ...prev, harga_tiket: value }))} />
              <AdminTextarea label="Deskripsi" value={form.deskripsi} onChange={(value) => setForm((prev) => ({ ...prev, deskripsi: value }))} rows={8} />
              <AdminTextarea label="Fasilitas" value={form.fasilitas} onChange={(value) => setForm((prev) => ({ ...prev, fasilitas: value }))} rows={4} />
              <label className="flex items-center gap-2 rounded-[22px] border border-slate-200/80 bg-white/85 px-3 py-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(event) => setForm((prev) => ({ ...prev, is_published: event.target.checked }))}
                />
                Tampilkan di publik
              </label>
              {!selected ? (
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Foto Utama</span>
                  <input
                    type="file"
                    onChange={(event) => setForm((prev) => ({ ...prev, foto_utama: event.target.files?.[0] ?? null }))}
                    className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3 py-2.5 text-sm text-slate-700"
                  />
                </label>
              ) : null}

              {selected?.foto_url ? (
                <div className="rounded-[22px] border border-slate-200/80 bg-white/80 p-3 text-xs text-slate-500">
                  Foto saat ini: {selected.foto_url}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() =>
                    runAction(
                      () =>
                        selectedId
                          ? ekonomiApi.update(selectedId, {
                              nama_usaha: form.nama_usaha,
                              kategori: form.kategori,
                              deskripsi: form.deskripsi,
                              fasilitas: form.fasilitas || null,
                              kontak_wa: form.kontak_wa || null,
                              harga_tiket: form.harga_tiket || null,
                              is_published: form.is_published,
                            }).then(() => undefined)
                          : ekonomiApi.create(
                              buildUnitUsahaFormData(
                                {
                                  nama_usaha: form.nama_usaha,
                                  kategori: form.kategori,
                                  deskripsi: form.deskripsi,
                                  fasilitas: form.fasilitas || null,
                                  kontak_wa: form.kontak_wa || null,
                                  harga_tiket: form.harga_tiket || null,
                                  is_published: form.is_published,
                                },
                                form.foto_utama
                              )
                            ).then(() => undefined),
                      selectedId ? "Unit usaha berhasil diperbarui." : "Unit usaha berhasil dibuat."
                    )
                  }
                  disabled={saving}
                  className="rounded-full"
                >
                  {saving ? "Menyimpan..." : selectedId ? "Simpan Perubahan" : "Buat Unit Usaha"}
                </Button>
                {selectedId ? (
                  <Button
                    onClick={() =>
                      runAction(
                        async () => {
                          await ekonomiApi.remove(selectedId);
                          resetForm();
                        },
                        "Unit usaha berhasil dihapus."
                      )
                    }
                    disabled={saving}
                    variant="outline"
                    className="rounded-full border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                  >
                    Hapus
                  </Button>
                ) : null}
              </div>
            </div>
          </AdminSectionCard>
        </div>
      </div>
    </div>
  );
}
