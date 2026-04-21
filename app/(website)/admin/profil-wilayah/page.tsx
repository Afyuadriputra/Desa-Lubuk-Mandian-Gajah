"use client";

import React, { useEffect, useMemo, useState } from "react";
import { authApi } from "@/lib/api/auth";
import { profilApi } from "@/lib/api/profil";
import type { DusunDto, PerangkatAdminDto, ProfilDesaDto, UserDto } from "@/lib/api/types";
import {
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  AdminTextarea,
} from "@/app/(website)/admin/_components/admin-primitives";
import { Button } from "@/components/ui/button";
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
    } catch (err: any) {
      setError(err.message ?? "Operasi gagal.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-slate-500">Memuat profil wilayah...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        title="Profil Wilayah"
        description="Kelola dusun, perangkat desa, dan profil desa dari panel admin."
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AdminSectionCard title="Kelola Dusun">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <AdminField label="Nama Dusun" value={newDusun.nama_dusun} onChange={(value) => setNewDusun((prev) => ({ ...prev, nama_dusun: value }))} />
            <AdminField label="Kepala Dusun" value={newDusun.kepala_dusun} onChange={(value) => setNewDusun((prev) => ({ ...prev, kepala_dusun: value }))} />
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
              Tambah Dusun
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {dusunList.map((dusun) => {
              const draft = editingDusun[dusun.id] ?? dusun;
              return (
                <div key={dusun.id} className="rounded-[24px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_14px_30px_-28px_rgba(15,23,42,0.18)]">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <AdminField
                      label="Nama Dusun"
                      value={draft.nama_dusun}
                      onChange={(value) =>
                        setEditingDusun((prev) => ({ ...prev, [dusun.id]: { ...draft, nama_dusun: value } }))
                      }
                    />
                    <AdminField
                      label="Kepala Dusun"
                      value={draft.kepala_dusun}
                      onChange={(value) =>
                        setEditingDusun((prev) => ({ ...prev, [dusun.id]: { ...draft, kepala_dusun: value } }))
                      }
                    />
                    <div className="flex items-end gap-2">
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
                        Simpan
                      </Button>
                      <Button
                        onClick={() =>
                          runAction(() => profilApi.deleteDusun(dusun.id), `Dusun ${dusun.nama_dusun} berhasil dihapus.`)
                        }
                        disabled={saving}
                        variant="outline"
                        className="rounded-full border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Kelola Perangkat Desa">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <label className="block space-y-1.5 md:col-span-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">User</span>
              <select
                value={newPerangkat.user_id}
                onChange={(event) => setNewPerangkat((prev) => ({ ...prev, user_id: event.target.value }))}
                className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
              >
                <option value="">Pilih user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.nama_lengkap} ({localizeUserRole(user.role)})</option>
                ))}
              </select>
            </label>
            <AdminField label="Jabatan" value={newPerangkat.jabatan} onChange={(value) => setNewPerangkat((prev) => ({ ...prev, jabatan: value }))} />
            <label className="flex items-center gap-2 rounded-[22px] border border-slate-200/80 bg-white/85 px-3 py-2.5 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={newPerangkat.is_published}
                onChange={(event) => setNewPerangkat((prev) => ({ ...prev, is_published: event.target.checked }))}
              />
              Tampilkan di publik
            </label>
            <Button
              onClick={() =>
                runAction(async () => {
                  await profilApi.createPerangkat(newPerangkat);
                  setNewPerangkat(emptyPerangkat);
                }, "Perangkat berhasil ditambahkan.")
              }
              disabled={saving}
              className="rounded-full md:col-span-4"
            >
              Tambah Perangkat
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {perangkatList.map((perangkat) => {
              const draft = editingPerangkat[perangkat.id] ?? {
                user_id: perangkat.user_id,
                jabatan: perangkat.jabatan,
                is_published: perangkat.is_published,
              };
              return (
                <div key={perangkat.id} className="rounded-[24px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_14px_30px_-28px_rgba(15,23,42,0.18)]">
                  <div className="mb-2 text-xs text-slate-500">
                    User aktif: {userNameMap.get(perangkat.user_id) ?? perangkat.user_id}
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <label className="block space-y-1.5 md:col-span-2">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">User</span>
                      <select
                        value={draft.user_id}
                        onChange={(event) =>
                          setEditingPerangkat((prev) => ({ ...prev, [perangkat.id]: { ...draft, user_id: event.target.value } }))
                        }
                        className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70"
                      >
                        <option value="">Pilih user</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>{user.nama_lengkap} ({localizeUserRole(user.role)})</option>
                        ))}
                      </select>
                    </label>
                    <AdminField
                      label="Jabatan"
                      value={draft.jabatan}
                      onChange={(value) =>
                        setEditingPerangkat((prev) => ({ ...prev, [perangkat.id]: { ...draft, jabatan: value } }))
                      }
                    />
                    <label className="flex items-center gap-2 rounded-[22px] border border-slate-200/80 bg-white/85 px-3 py-2.5 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={draft.is_published}
                        onChange={(event) =>
                          setEditingPerangkat((prev) => ({ ...prev, [perangkat.id]: { ...draft, is_published: event.target.checked } }))
                        }
                      />
                      Tampilkan di publik
                    </label>
                    <div className="flex gap-2 md:col-span-4">
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
                        Simpan
                      </Button>
                      <Button
                        onClick={() =>
                          runAction(
                            () => profilApi.deletePerangkat(perangkat.id),
                            `Perangkat ${draft.jabatan} berhasil dihapus.`
                          )
                        }
                        disabled={saving}
                        variant="outline"
                        className="rounded-full border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AdminSectionCard>
      </div>

      <AdminSectionCard title="Profil Desa">
        <div className="grid grid-cols-1 gap-4">
          <AdminTextarea label="Visi" value={profil.visi} onChange={(value) => setProfil((prev) => ({ ...prev, visi: value }))} rows={4} />
          <AdminTextarea label="Misi" value={profil.misi} onChange={(value) => setProfil((prev) => ({ ...prev, misi: value }))} rows={6} />
          <AdminTextarea label="Sejarah" value={profil.sejarah} onChange={(value) => setProfil((prev) => ({ ...prev, sejarah: value }))} rows={8} />
          <div>
            <Button
              onClick={() => runAction(() => profilApi.updateProfilDesa(profil), "Profil desa berhasil diperbarui.")}
              disabled={saving}
              className="rounded-full"
            >
              Simpan Profil Desa
            </Button>
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}
