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
    () => new Map(users.map((user) => [user.id, `${user.nama_lengkap} (${user.role})`])),
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
    return <div className="flex h-64 items-center justify-center text-sm text-zinc-500">Memuat profil wilayah...</div>;
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
            <button
              onClick={() =>
                runAction(async () => {
                  await profilApi.createDusun(newDusun);
                  setNewDusun(emptyDusun);
                }, "Dusun berhasil ditambahkan.")
              }
              disabled={saving}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              Tambah Dusun
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {dusunList.map((dusun) => {
              const draft = editingDusun[dusun.id] ?? dusun;
              return (
                <div key={dusun.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
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
                      <button
                        onClick={() =>
                          runAction(
                            () => profilApi.updateDusun(dusun.id, draft),
                            `Dusun ${draft.nama_dusun} berhasil diperbarui.`
                          )
                        }
                        disabled={saving}
                        className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() =>
                          runAction(() => profilApi.deleteDusun(dusun.id), `Dusun ${dusun.nama_dusun} berhasil dihapus.`)
                        }
                        disabled={saving}
                        className="rounded-lg border border-red-900/40 bg-red-950/30 px-4 py-2 text-sm font-semibold text-red-300"
                      >
                        Hapus
                      </button>
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
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">User</span>
              <select
                value={newPerangkat.user_id}
                onChange={(event) => setNewPerangkat((prev) => ({ ...prev, user_id: event.target.value }))}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200"
              >
                <option value="">Pilih user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.nama_lengkap} ({user.role})</option>
                ))}
              </select>
            </label>
            <AdminField label="Jabatan" value={newPerangkat.jabatan} onChange={(value) => setNewPerangkat((prev) => ({ ...prev, jabatan: value }))} />
            <label className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200">
              <input
                type="checkbox"
                checked={newPerangkat.is_published}
                onChange={(event) => setNewPerangkat((prev) => ({ ...prev, is_published: event.target.checked }))}
              />
              Published
            </label>
            <button
              onClick={() =>
                runAction(async () => {
                  await profilApi.createPerangkat(newPerangkat);
                  setNewPerangkat(emptyPerangkat);
                }, "Perangkat berhasil ditambahkan.")
              }
              disabled={saving}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50 md:col-span-4"
            >
              Tambah Perangkat
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {perangkatList.map((perangkat) => {
              const draft = editingPerangkat[perangkat.id] ?? {
                user_id: perangkat.user_id,
                jabatan: perangkat.jabatan,
                is_published: perangkat.is_published,
              };
              return (
                <div key={perangkat.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <div className="mb-2 text-xs text-zinc-500">
                    User aktif: {userNameMap.get(perangkat.user_id) ?? perangkat.user_id}
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <label className="block space-y-1.5 md:col-span-2">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">User</span>
                      <select
                        value={draft.user_id}
                        onChange={(event) =>
                          setEditingPerangkat((prev) => ({ ...prev, [perangkat.id]: { ...draft, user_id: event.target.value } }))
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200"
                      >
                        <option value="">Pilih user</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>{user.nama_lengkap} ({user.role})</option>
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
                    <label className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200">
                      <input
                        type="checkbox"
                        checked={draft.is_published}
                        onChange={(event) =>
                          setEditingPerangkat((prev) => ({ ...prev, [perangkat.id]: { ...draft, is_published: event.target.checked } }))
                        }
                      />
                      Published
                    </label>
                    <div className="flex gap-2 md:col-span-4">
                      <button
                        onClick={() =>
                          runAction(
                            () => profilApi.updatePerangkat(perangkat.id, draft),
                            `Perangkat ${draft.jabatan} berhasil diperbarui.`
                          )
                        }
                        disabled={saving}
                        className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() =>
                          runAction(
                            () => profilApi.deletePerangkat(perangkat.id),
                            `Perangkat ${draft.jabatan} berhasil dihapus.`
                          )
                        }
                        disabled={saving}
                        className="rounded-lg border border-red-900/40 bg-red-950/30 px-4 py-2 text-sm font-semibold text-red-300"
                      >
                        Hapus
                      </button>
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
            <button
              onClick={() => runAction(() => profilApi.updateProfilDesa(profil), "Profil desa berhasil diperbarui.")}
              disabled={saving}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              Simpan Profil Desa
            </button>
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}
