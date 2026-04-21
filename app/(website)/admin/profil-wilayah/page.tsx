"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Building2, MapPinned, ShieldCheck, Users2, Plus, Save, Trash2 } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { profilApi } from "@/lib/api/profil";
import type { DusunDto, PerangkatAdminDto, ProfilDesaDto, UserDto } from "@/lib/api/types";
import {
  AdminField,
  AdminNotice,
  AdminFormSkeleton,
  AdminListSkeleton,
  AdminPageHeader,
  AdminSectionCard,
  AdminStatsSkeleton,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";
import { adminToastError, adminToastSuccess, getErrorMessage } from "@/app/(website)/admin/_components/admin-feedback";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { localizeUserRole } from "@/app/(website)/admin/_components/admin-labels";

const emptyDusun = { nama_dusun: "", kepala_dusun: "" };
const emptyPerangkat = { user_id: "", jabatan: "", is_published: false };

export default function AdminProfilWilayahPage() {
  const [dusunList, setDusunList] = useState<DusunDto[]>([]);
  const [perangkatList, setPerangkatList] = useState<PerangkatAdminDto[]>([]);
  const [profil, setProfil] = useState<ProfilDesaDto>({ visi: "", misi: "", sejarah: "" });
  const [users, setUsers] = useState<UserDto[]>([]);
  const [newDusun, setNewDusun] = useState(emptyDusun);
  const [editingDusun, setEditingDusun] = useState<Record<number, typeof emptyDusun>>({});
  const [newPerangkat, setNewPerangkat] = useState(emptyPerangkat);
  const [editingPerangkat, setEditingPerangkat] = useState<Record<number, typeof emptyPerangkat>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userNameMap = useMemo(
    () => new Map(users.map((user) => [user.id, `${user.nama_lengkap} (${localizeUserRole(user.role)})`])),
    [users]
  );

  const loadAll = async () => {
    const [dusun, perangkat, profilAdmin, userList] = await Promise.all([
      profilApi.listDusunAdmin(),
      profilApi.listPerangkatAdmin(),
      profilApi.getProfilDesaAdmin(),
      authApi.listUsers(),
    ]);
    setDusunList(dusun);
    setPerangkatList(perangkat);
    setProfil(profilAdmin);
    setUsers(userList.filter((user) => user.role !== "WARGA"));
  };

  useEffect(() => {
    loadAll()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const runAction = async (action: () => Promise<unknown>, successMessage: string) => {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await action();
      await loadAll();
      setMessage(successMessage);
      adminToastSuccess(successMessage);
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Operasi gagal.");
      setError(message);
      adminToastError(err, "Operasi gagal.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <AdminPageHeader
          title="Profil Wilayah"
          description="Kelola dusun, perangkat desa, dan narasi profil desa dalam satu workspace yang rapi dan mudah digunakan."
        />
        <AdminStatsSkeleton />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className="space-y-6">
            <AdminFormSkeleton fields={4} />
            <AdminFormSkeleton fields={4} />
          </div>
          <div className="space-y-6">
            <AdminSectionCard title="Daftar Dusun">
              <AdminListSkeleton rows={4} />
            </AdminSectionCard>
            <AdminSectionCard title="Daftar Perangkat Desa">
              <AdminListSkeleton rows={4} />
            </AdminSectionCard>
          </div>
        </div>
        <AdminFormSkeleton fields={3} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        title="Profil Wilayah"
        description="Kelola dusun, perangkat desa, dan narasi profil desa dalam satu workspace yang rapi dan mudah digunakan."
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<MapPinned className="size-5" />}
          label="Total Dusun"
          value={String(dusunList.length)}
          hint="Wilayah dusun yang sudah tercatat."
        />
        <SummaryCard
          icon={<Building2 className="size-5" />}
          label="Perangkat Desa"
          value={String(perangkatList.length)}
          hint="Personel yang aktif di modul ini."
        />
        <SummaryCard
          icon={<ShieldCheck className="size-5" />}
          label="Tampil Publik"
          value={String(perangkatList.filter((item) => item.is_published).length)}
          hint="Data perangkat yang tampil di halaman publik."
        />
        <SummaryCard
          icon={<Users2 className="size-5" />}
          label="Admin Tersedia"
          value={String(users.length)}
          hint="Akun non-warga yang bisa dipilih."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="space-y-6">
          <AdminSectionCard
            title="Tambah Dusun"
            description="Tambahkan wilayah dusun baru sebelum dikelola lebih lanjut di daftar."
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <AdminField
                  label="Nama Dusun"
                  value={newDusun.nama_dusun}
                  onChange={(value) => setNewDusun((prev) => ({ ...prev, nama_dusun: value }))}
                />
                <AdminField
                  label="Kepala Dusun"
                  value={newDusun.kepala_dusun}
                  onChange={(value) => setNewDusun((prev) => ({ ...prev, kepala_dusun: value }))}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() =>
                    runAction(async () => {
                      await profilApi.createDusun(newDusun);
                      setNewDusun(emptyDusun);
                    }, "Dusun berhasil ditambahkan.")
                  }
                  disabled={saving}
                  className="rounded-full"
                >
                  <Plus className="mr-2 size-4" />
                  Tambah Dusun
                </Button>
              </div>
            </div>
          </AdminSectionCard>

          <AdminSectionCard
            title="Tambah Perangkat Desa"
            description="Hubungkan user yang tersedia dengan jabatan resmi perangkat desa."
          >
            <div className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  User
                </span>
                <select
                  value={newPerangkat.user_id}
                  onChange={(event) =>
                    setNewPerangkat((prev) => ({ ...prev, user_id: event.target.value }))
                  }
                  className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-3 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                >
                  <option value="">Pilih user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nama_lengkap} ({localizeUserRole(user.role)})
                    </option>
                  ))}
                </select>
              </label>

              <AdminField
                label="Jabatan"
                value={newPerangkat.jabatan}
                onChange={(value) => setNewPerangkat((prev) => ({ ...prev, jabatan: value }))}
              />

              <label className="flex items-center gap-2 rounded-[22px] border border-slate-200/80 bg-white/85 px-3 py-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={newPerangkat.is_published}
                  onChange={(event) =>
                    setNewPerangkat((prev) => ({
                      ...prev,
                      is_published: event.target.checked,
                    }))
                  }
                />
                Tampilkan di publik
              </label>

              <div className="flex justify-end">
                <Button
                  onClick={() =>
                    runAction(async () => {
                      await profilApi.createPerangkat(newPerangkat);
                      setNewPerangkat(emptyPerangkat);
                    }, "Perangkat berhasil ditambahkan.")
                  }
                  disabled={saving}
                  className="rounded-full"
                >
                  <Plus className="mr-2 size-4" />
                  Tambah Perangkat
                </Button>
              </div>
            </div>
          </AdminSectionCard>
        </div>

        <div className="space-y-6">
          <AdminSectionCard
            title="Daftar Dusun"
            description="Edit data dusun secara langsung dari daftar yang sudah ada."
          >
            {dusunList.length === 0 ? (
              <EmptyState text="Belum ada data dusun." />
            ) : (
              <ScrollArea className="h-[540px] pr-2">
                <div className="space-y-4">
                  {dusunList.map((dusun) => {
                    const draft = editingDusun[dusun.id] ?? dusun;

                    return (
                      <div
                        key={dusun.id}
                        className="rounded-[24px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_14px_30px_-28px_rgba(15,23,42,0.18)]"
                      >
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {draft.nama_dusun || dusun.nama_dusun}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Perbarui nama dusun dan penanggung jawab wilayah.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <AdminField
                            label="Nama Dusun"
                            value={draft.nama_dusun}
                            onChange={(value) =>
                              setEditingDusun((prev) => ({
                                ...prev,
                                [dusun.id]: { ...draft, nama_dusun: value },
                              }))
                            }
                          />
                          <AdminField
                            label="Kepala Dusun"
                            value={draft.kepala_dusun}
                            onChange={(value) =>
                              setEditingDusun((prev) => ({
                                ...prev,
                                [dusun.id]: { ...draft, kepala_dusun: value },
                              }))
                            }
                          />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button
                            onClick={() =>
                              runAction(
                                () => profilApi.updateDusun(dusun.id, draft),
                                `Dusun ${draft.nama_dusun} berhasil diperbarui.`
                              )
                            }
                            disabled={saving}
                            variant="outline"
                            className="rounded-full"
                          >
                            <Save className="mr-2 size-4" />
                            Simpan
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
                                  <AlertDialogTitle>Hapus dusun ini?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Dusun &quot;{dusun.nama_dusun}&quot; akan dihapus permanen dari profil wilayah.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    tone="danger"
                                    onClick={() =>
                                      runAction(
                                        () => profilApi.deleteDusun(dusun.id),
                                        `Dusun ${dusun.nama_dusun} berhasil dihapus.`
                                      )
                                    }
                                  >
                                    Hapus dusun
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </AdminSectionCard>

          <AdminSectionCard
            title="Daftar Perangkat Desa"
            description="Kelola user, jabatan, dan status publikasi perangkat desa."
          >
            {perangkatList.length === 0 ? (
              <EmptyState text="Belum ada data perangkat desa." />
            ) : (
              <ScrollArea className="h-[620px] pr-2">
                <div className="space-y-4">
                  {perangkatList.map((perangkat) => {
                    const draft = editingPerangkat[perangkat.id] ?? {
                      user_id: perangkat.user_id,
                      jabatan: perangkat.jabatan,
                      is_published: perangkat.is_published,
                    };

                    return (
                      <div
                        key={perangkat.id}
                        className="rounded-[24px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_14px_30px_-28px_rgba(15,23,42,0.18)]"
                      >
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {draft.jabatan || perangkat.jabatan}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            User aktif: {userNameMap.get(perangkat.user_id) ?? perangkat.user_id}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <label className="block space-y-1.5">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                              User
                            </span>
                            <select
                              value={draft.user_id}
                              onChange={(event) =>
                                setEditingPerangkat((prev) => ({
                                  ...prev,
                                  [perangkat.id]: { ...draft, user_id: event.target.value },
                                }))
                              }
                              className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-3 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                            >
                              <option value="">Pilih user</option>
                              {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.nama_lengkap} ({localizeUserRole(user.role)})
                                </option>
                              ))}
                            </select>
                          </label>

                          <AdminField
                            label="Jabatan"
                            value={draft.jabatan}
                            onChange={(value) =>
                              setEditingPerangkat((prev) => ({
                                ...prev,
                                [perangkat.id]: { ...draft, jabatan: value },
                              }))
                            }
                          />
                        </div>

                        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                          <label className="flex items-center gap-2 rounded-[22px] border border-slate-200/80 bg-white/85 px-3 py-3 text-sm text-slate-700">
                            <input
                              type="checkbox"
                              checked={draft.is_published}
                              onChange={(event) =>
                                setEditingPerangkat((prev) => ({
                                  ...prev,
                                  [perangkat.id]: {
                                    ...draft,
                                    is_published: event.target.checked,
                                  },
                                }))
                              }
                            />
                            Tampilkan di publik
                          </label>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              onClick={() =>
                                runAction(
                                  () => profilApi.updatePerangkat(perangkat.id, draft),
                                  `Perangkat ${draft.jabatan} berhasil diperbarui.`
                                )
                              }
                              disabled={saving}
                              variant="outline"
                              className="rounded-full"
                            >
                              <Save className="mr-2 size-4" />
                              Simpan
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
                                  <AlertDialogTitle>Hapus perangkat desa ini?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Perangkat &quot;{draft.jabatan || perangkat.jabatan}&quot; akan dihapus permanen dari daftar perangkat desa.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    tone="danger"
                                    onClick={() =>
                                      runAction(
                                        () => profilApi.deletePerangkat(perangkat.id),
                                        `Perangkat ${draft.jabatan} berhasil dihapus.`
                                      )
                                    }
                                  >
                                    Hapus perangkat
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </AdminSectionCard>
        </div>
      </div>

      <AdminSectionCard
        title="Profil Desa"
        description="Kelola narasi utama desa agar sumber data publik dan admin tetap konsisten."
        actions={
          <Button
            onClick={() =>
              runAction(() => profilApi.updateProfilDesa(profil), "Profil desa berhasil diperbarui.")
            }
            disabled={saving}
            className="rounded-full"
          >
            <Save className="mr-2 size-4" />
            Simpan Profil Desa
          </Button>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <AdminTextarea
              label="Visi"
              value={profil.visi}
              onChange={(value) => setProfil((prev) => ({ ...prev, visi: value }))}
              rows={5}
            />
            <AdminTextarea
              label="Misi"
              value={profil.misi}
              onChange={(value) => setProfil((prev) => ({ ...prev, misi: value }))}
              rows={5}
            />
          </div>

          <div>
            <AdminTextarea
              label="Sejarah"
              value={profil.sejarah}
              onChange={(value) => setProfil((prev) => ({ ...prev, sejarah: value }))}
              rows={8}
            />
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="admin-panel rounded-[26px] border-white/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{hint}</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-2.5 text-slate-700 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-200 bg-white/70 px-4 py-8 text-center">
      <p className="text-sm font-medium text-slate-700">{text}</p>
      <p className="mt-1 text-sm text-slate-500">Tambahkan data dari panel input di sebelah kiri.</p>
    </div>
  );
}
