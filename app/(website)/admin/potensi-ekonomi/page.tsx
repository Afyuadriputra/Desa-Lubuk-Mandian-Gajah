"use client";

import React, { useEffect, useState } from "react";
import { buildUnitUsahaFormData, ekonomiApi } from "@/lib/api/ekonomi";
import { Plus, Trash2 } from "lucide-react";
import type { KatalogAdminDto, UnitUsahaDetailDto } from "@/lib/api/types";
import {
  AdminField,
  AdminFormSkeleton,
  AdminListSkeleton,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  StatusBadge,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";
import { adminToastError, adminToastSuccess, getErrorMessage } from "@/app/(website)/admin/_components/admin-feedback";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      adminToastSuccess(successMessage);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Operasi potensi ekonomi gagal."));
      adminToastError(err, "Operasi potensi ekonomi gagal.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <AdminPageHeader
          title="Potensi Ekonomi"
          description="Kelola katalog BUMDes dan wisata secara mudah."
        />
        <div className="flex flex-col gap-6 xl:flex-row items-start">
          <div className="w-full shrink-0 xl:w-[380px]">
            <AdminSectionCard title="Daftar Unit Usaha">
              <AdminListSkeleton rows={5} />
            </AdminSectionCard>
          </div>
          <div className="w-full flex-1">
            <AdminFormSkeleton fields={6} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        title="Potensi Ekonomi"
        description="Kelola katalog BUMDes dan wisata secara mudah."
        actions={
          <Button onClick={resetForm} variant="default" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-sm">
            <Plus className="size-4" />
            Tambah Baru
          </Button>
        }
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="flex flex-col gap-6 xl:flex-row items-start">
        {/* KOLOM KIRI: Daftar Unit (Sticky) */}
        <div className="w-full shrink-0 xl:w-[380px] xl:sticky xl:top-6">
          <AdminSectionCard title="Daftar Unit Usaha">
            <div className="admin-scrollbar max-h-[600px] space-y-2 overflow-y-auto pr-2">
              {items.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">Belum ada data unit usaha.</div>
              ) : (
                items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadDetail(item.id).catch((err: Error) => setError(err.message))}
                    className={`group flex w-full flex-col items-start gap-2.5 rounded-[18px] border px-4 py-3.5 text-left transition-all ${
                      selectedId === item.id
                        ? "border-blue-200 bg-blue-50/50 shadow-sm"
                        : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="w-full">
                      <div className={`text-sm font-semibold ${selectedId === item.id ? "text-blue-900" : "text-slate-900 group-hover:text-slate-950"}`}>
                        {item.nama_usaha}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge label={item.kategori} tone="info" />
                      <StatusBadge label={item.is_published ? "Tayang" : "Draft"} tone={item.is_published ? "success" : "warning"} />
                    </div>
                  </button>
                ))
              )}
            </div>
          </AdminSectionCard>
        </div>

        {/* KOLOM KANAN: Form Edit/Tambah */}
        <div className="w-full flex-1">
          <AdminSectionCard title={selected ? "Edit Unit Usaha" : "Tambah Unit Usaha Baru"}>
            <div className="space-y-8">
              
              {/* BAGIAN 1: Informasi Umum */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-semibold text-slate-800">Informasi Umum</h3>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <AdminField label="Nama Usaha" value={form.nama_usaha} onChange={(value) => setForm((prev) => ({ ...prev, nama_usaha: value }))} />
                  </div>
                  <AdminField label="Kategori" value={form.kategori} onChange={(value) => setForm((prev) => ({ ...prev, kategori: value }))} />
                  <AdminField label="Harga Tiket" value={form.harga_tiket} onChange={(value) => setForm((prev) => ({ ...prev, harga_tiket: value }))} />
                </div>
              </div>

              {/* BAGIAN 2: Detail & Fasilitas */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-semibold text-slate-800">Detail & Fasilitas</h3>
                </div>
                <div className="space-y-5">
                  <AdminTextarea label="Deskripsi" value={form.deskripsi} onChange={(value) => setForm((prev) => ({ ...prev, deskripsi: value }))} rows={6} />
                  <AdminTextarea label="Fasilitas" value={form.fasilitas} onChange={(value) => setForm((prev) => ({ ...prev, fasilitas: value }))} rows={3} />
                </div>
              </div>

              {/* BAGIAN 3: Kontak & Media */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-semibold text-slate-800">Kontak & Media</h3>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AdminField label="Kontak WA" value={form.kontak_wa} onChange={(value) => setForm((prev) => ({ ...prev, kontak_wa: value }))} />
                  
                  <div className="space-y-2">
                    {!selected ? (
                      <label className="block space-y-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Foto Utama</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => setForm((prev) => ({ ...prev, foto_utama: event.target.files?.[0] ?? null }))}
                          className="w-full cursor-pointer rounded-[14px] border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 file:mr-4 file:rounded-full file:border-0 file:bg-slate-200 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-300"
                        />
                      </label>
                    ) : (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Foto Saat Ini</span>
                        <div className="flex items-center rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                          {selected.foto_url ? (
                            <span className="truncate">{selected.foto_url.split('/').pop()}</span>
                          ) : (
                            <span className="italic text-slate-400">Tidak ada foto</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* BAGIAN 4: Visibilitas & Publikasi */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-semibold text-slate-800">Pengaturan Publikasi</h3>
                </div>
                <label className="flex cursor-pointer items-start gap-4 rounded-[18px] border border-slate-200/80 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
                  <div className="flex h-5 items-center mt-0.5">
                    <input
                      type="checkbox"
                      aria-label="Tampilkan di publik"
                      className="size-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      checked={form.is_published}
                      onChange={(event) => setForm((prev) => ({ ...prev, is_published: event.target.checked }))}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-slate-900">Tampilkan di publik</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Centang opsi ini jika Anda ingin unit usaha ini langsung terlihat oleh warga di halaman depan portal desa. Biarkan kosong untuk menyimpannya sebagai draft.
                    </p>
                  </div>
                </label>
              </div>

              {/* TOMBOL AKSI */}
              <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
                {selectedId ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        disabled={saving}
                        variant="outline"
                        className="w-full rounded-full border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 sm:w-auto sm:mr-auto"
                      >
                        <Trash2 className="size-4" />
                        Hapus Unit
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus unit usaha ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Unit usaha yang dihapus tidak bisa dikembalikan. Pastikan data ini memang tidak lagi dipakai di katalog.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          tone="danger"
                          onClick={() =>
                            runAction(
                              async () => {
                                await ekonomiApi.remove(selectedId);
                                resetForm();
                              },
                              "Unit usaha berhasil dihapus."
                            )
                          }
                        >
                          Hapus unit
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : null}

                <Button
                  type="button"
                  onClick={resetForm}
                  variant="ghost"
                  disabled={saving}
                  className="w-full rounded-full sm:w-auto"
                >
                  Batal
                </Button>

                <Button
                  type="button"
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
                  className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto shadow-sm"
                >
                  {saving ? "Menyimpan..." : selectedId ? "Simpan Perubahan" : "Buat Unit Usaha"}
                </Button>
              </div>

            </div>
          </AdminSectionCard>
        </div>
      </div>
    </div>
  );
}
