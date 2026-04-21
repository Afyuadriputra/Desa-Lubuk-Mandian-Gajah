"use client";

import React, { useEffect, useMemo, useState } from "react";
import { publikasiApi } from "@/lib/api/publikasi";
import type { PublikasiDetailDto, PublikasiPayload } from "@/lib/api/types";
import {
  AdminField,
  AdminNotice,
  AdminFormSkeleton,
  AdminListSkeleton,
  AdminPageHeader,
  AdminSectionCard,
  SaveState,
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
import {
  localizePublikasiJenis,
  localizePublikasiStatus,
  toneForPublikasiStatus,
} from "@/app/(website)/admin/_components/admin-labels";
import { FileText, PencilLine, Plus, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
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
    setSaveMessage(null);
    setError(null);
  };

  const resetForm = () => {
    setSelectedSlug(null);
    setForm(emptyForm);
    setSaveMessage(null);
    setError(null);
  };

  const runAction = async (action: () => Promise<unknown>, successMessage: string) => {
    setSaving(true);
    setSaveMessage(null);
    setError(null);

    try {
      await action();
      await loadAll();
      setSaveMessage(successMessage);
      adminToastSuccess(successMessage);
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Operasi publikasi gagal.");
      setError(message);
      adminToastError(err, "Operasi publikasi gagal.");
    } finally {
      setSaving(false);
    }
  };

  const selectedItem = useMemo(
    () => items.find((item) => item.slug === selectedSlug) ?? null,
    [items, selectedSlug]
  );

  const pageTitle = selectedSlug ? "Edit Publikasi" : "Tambah Publikasi";
  const pageDescription = selectedSlug
    ? "Perbarui isi, status, dan metadata publikasi yang dipilih."
    : "Buat publikasi baru dengan alur kerja yang rapi dan mudah dikelola.";

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <AdminPageHeader
          title="Publikasi Informasi"
          description="Kelola berita dan pengumuman dalam tampilan kerja yang lebih fokus, rapi, dan mudah digunakan."
        />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <AdminSectionCard title="Daftar Publikasi">
            <AdminListSkeleton rows={5} />
          </AdminSectionCard>
          <AdminFormSkeleton fields={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        title="Publikasi Informasi"
        description="Kelola berita dan pengumuman dalam tampilan kerja yang lebih fokus, rapi, dan mudah digunakan."
        actions={
          <Button onClick={resetForm} variant="outline" className="rounded-full">
            <Plus className="mr-2 size-4" />
            Tambah Baru
          </Button>
        }
      />

      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        {/* Left panel: list / navigator */}
        <div className="space-y-6">
  <AdminSectionCard title="Daftar Publikasi">
    <div className="space-y-4">
      <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/70 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Total Data
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
              {items.length}
            </p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-[0_10px_25px_-18px_rgba(15,23,42,0.35)]">
            <FileText className="size-5" />
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-slate-200 bg-white/70 px-4 py-8 text-center">
          <p className="text-sm font-medium text-slate-700">Belum ada publikasi</p>
          <p className="mt-1 text-sm text-slate-500">
            Mulai dengan membuat berita atau pengumuman baru.
          </p>
        </div>
      ) : (
        <div className="max-h-[700px] overflow-y-auto pr-2 space-y-3">
          {items.map((item) => {
            const isActive = selectedSlug === item.slug;

            return (
              <button
                key={item.slug}
                onClick={() => handleSelect(item)}
                className={cn(
                  "w-full rounded-[24px] border px-4 py-4 text-left transition-all",
                  isActive
                    ? "border-slate-300 bg-white text-slate-950 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.28)]"
                    : "border-slate-200/80 bg-white/80 text-slate-900 hover:border-slate-200 hover:bg-white",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl transition-colors",
                      isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500",
                    )}
                  >
                    <PencilLine className="size-4.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 text-sm font-semibold leading-5">
                      {item.judul}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <StatusBadge
                        label={localizePublikasiJenis(item.jenis)}
                        tone="info"
                      />
                      <StatusBadge
                        label={localizePublikasiStatus(item.status)}
                        tone={toneForPublikasiStatus(item.status)}
                      />
                    </div>

                    <div className="mt-3 text-xs text-slate-500">
                      Penulis:{" "}
                      <span className="font-medium text-slate-700">
                        {item.penulis_nama}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  </AdminSectionCard>
</div>

        {/* Right panel: editor */}
        <div className="space-y-6">
          <AdminSectionCard title={pageTitle}>
            <div className="space-y-6">
              <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Workspace Editor
                    </p>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                      {pageTitle}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{pageDescription}</p>
                  </div>

                  {selectedItem ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge
                        label={localizePublikasiJenis(selectedItem.jenis)}
                        tone="info"
                      />
                      <StatusBadge
                        label={localizePublikasiStatus(selectedItem.status)}
                        tone={toneForPublikasiStatus(selectedItem.status)}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <SaveState
                    message={saveMessage}
                    tone={saveMessage?.startsWith("Gagal") ? "danger" : "success"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Informasi Utama
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <AdminField
                        label="Judul"
                        value={form.judul}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, judul: value }))
                        }
                      />

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="block space-y-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                            Jenis
                          </span>
                          <select
                            value={form.jenis}
                            onChange={(event) =>
                              setForm((prev) => ({
                                ...prev,
                                jenis: event.target.value,
                              }))
                            }
                            className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-3 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                          >
                            <option value="BERITA">Berita</option>
                            <option value="PENGUMUMAN">Pengumuman</option>
                          </select>
                        </label>

                        <label className="block space-y-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                            Status
                          </span>
                          <select
                            value={form.status}
                            onChange={(event) =>
                              setForm((prev) => ({
                                ...prev,
                                status: event.target.value as "DRAFT" | "PUBLISHED",
                              }))
                            }
                            className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-3 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                          >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Terbit</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Isi Publikasi
                    </p>
                    <AdminTextarea
                      label="Konten HTML"
                      value={form.konten_html}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, konten_html: value }))
                      }
                      rows={16}
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      Gunakan struktur HTML yang rapi agar tampilan publikasi lebih konsisten saat ditampilkan.
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200/80 bg-white/70 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Aksi Publikasi
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Simpan perubahan, ubah status publikasi, atau hapus data bila diperlukan.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() =>
                          runAction(
                            () =>
                              selectedSlug
                                ? publikasiApi.update(selectedSlug, form)
                                : publikasiApi.create(form),
                            selectedSlug
                              ? "Publikasi berhasil diperbarui."
                              : "Publikasi berhasil dibuat.",
                          )
                        }
                        disabled={saving}
                        className="rounded-full"
                      >
                        <Upload className="mr-2 size-4" />
                        {saving
                          ? "Menyimpan..."
                          : selectedSlug
                          ? "Simpan Perubahan"
                          : "Buat Publikasi"}
                      </Button>

                      {selectedSlug ? (
                        <>
                          <Button
                            onClick={() =>
                              runAction(
                                () =>
                                  publikasiApi.updateStatus(selectedSlug, {
                                    status:
                                      form.status === "PUBLISHED"
                                        ? "DRAFT"
                                        : "PUBLISHED",
                                  }),
                                "Status publikasi berhasil diperbarui.",
                              )
                            }
                            disabled={saving}
                            variant="outline"
                            className="rounded-full"
                          >
                            {form.status === "PUBLISHED"
                              ? "Ubah ke Draft"
                              : "Terbitkan"}
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                disabled={saving}
                                variant="outline"
                                className="rounded-full border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                              >
                                <Trash2 className="mr-2 size-4" />
                                Hapus
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus publikasi ini?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Publikasi yang dihapus tidak bisa dikembalikan. Pastikan data ini memang tidak lagi diperlukan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  tone="danger"
                                  onClick={() =>
                                    runAction(async () => {
                                      await publikasiApi.remove(selectedSlug);
                                      resetForm();
                                    }, "Publikasi berhasil dihapus.")
                                  }
                                >
                                  Hapus publikasi
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AdminSectionCard>
        </div>
      </div>
    </div>
  );
}
