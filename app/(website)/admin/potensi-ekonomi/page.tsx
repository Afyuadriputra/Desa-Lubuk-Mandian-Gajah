"use client";

import React, { useEffect, useState } from "react";
import { buildUnitUsahaFormData, ekonomiApi } from "@/lib/api/ekonomi";
import type { KatalogAdminDto, UnitUsahaDetailDto } from "@/lib/api/types";
import {
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";

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
    return <div className="flex h-64 items-center justify-center text-sm text-zinc-500">Memuat potensi ekonomi...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        title="Potensi Ekonomi"
        description="Kelola katalog BUMDes dan wisata seperti changelist admin."
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
          <AdminSectionCard title="Daftar Unit">
            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadDetail(item.id).catch((err: Error) => setError(err.message))}
                  className={`w-full rounded-lg border px-4 py-3 text-left ${
                    selectedId === item.id
                      ? "border-white/30 bg-zinc-800 text-white"
                      : "border-zinc-800 bg-zinc-950 text-zinc-200"
                  }`}
                >
                  <div className="text-sm font-semibold">{item.nama_usaha}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {item.kategori} • {item.is_published ? "PUBLISHED" : "DRAFT"}
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
              <label className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(event) => setForm((prev) => ({ ...prev, is_published: event.target.checked }))}
                />
                Published
              </label>
              {!selected ? (
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Foto Utama</span>
                  <input
                    type="file"
                    onChange={(event) => setForm((prev) => ({ ...prev, foto_utama: event.target.files?.[0] ?? null }))}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200"
                  />
                </label>
              ) : null}

              {selected?.foto_url ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
                  Foto saat ini: {selected.foto_url}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                <button
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
                  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : selectedId ? "Simpan Perubahan" : "Buat Unit Usaha"}
                </button>
                {selectedId ? (
                  <button
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
                    className="rounded-lg border border-red-900/40 bg-red-950/30 px-4 py-2 text-sm font-semibold text-red-300"
                  >
                    Hapus
                  </button>
                ) : null}
              </div>
            </div>
          </AdminSectionCard>
        </div>
      </div>
    </div>
  );
}
