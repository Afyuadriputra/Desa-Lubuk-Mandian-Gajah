"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import type { PermissionDto, PermissionGroupDto, UserDetailDto, UserRole } from "@/lib/api/types";
import {
  AdminCheckbox,
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
} from "@/app/(website)/admin/_components/admin-primitives";

type UserFormState = {
  nama_lengkap: string;
  nomor_hp: string;
  role: UserRole;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  groups: number[];
  user_permissions: number[];
};

function toFormState(user: UserDetailDto): UserFormState {
  return {
    nama_lengkap: user.nama_lengkap,
    nomor_hp: user.nomor_hp ?? "",
    role: user.role,
    is_active: user.is_active,
    is_staff: user.is_staff,
    is_superuser: user.is_superuser,
    groups: user.groups.map((group) => group.id),
    user_permissions: user.user_permissions.map((permission) => permission.id),
  };
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString("id-ID");
  } catch {
    return value;
  }
}

export default function AdminAkunDetailPage() {
  const params = useParams<{ id: string }>();
  const userId = String(params.id);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<UserDetailDto | null>(null);
  const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroupDto[]>([]);
  const [form, setForm] = useState<UserFormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canManagePermissions = currentUserRole === "SUPERADMIN";

  const permissionLookup = useMemo(() => {
    const map = new Map<number, PermissionDto>();
    permissionGroups.forEach((group) => {
      group.permissions.forEach((permission) => map.set(permission.id, permission));
    });
    return map;
  }, [permissionGroups]);

  useEffect(() => {
    Promise.all([
      authApi.me(),
      authApi.getUserDetail(userId),
      authApi.listGroups(),
      authApi.listPermissions(),
    ])
      .then(([me, detail, groupList, permissions]) => {
        setCurrentUserRole(me.role);
        setUser(detail);
        setGroups(groupList);
        setPermissionGroups(permissions);
        setForm(toFormState(detail));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  const toggleArrayValue = (values: number[], value: number, checked: boolean) => {
    if (checked) return Array.from(new Set([...values, value]));
    return values.filter((item) => item !== value);
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const updated = await authApi.updateUser(userId, {
        ...form,
        nomor_hp: form.nomor_hp || null,
      });
      setUser(updated);
      setForm(toFormState(updated));
      setMessage("Perubahan akun berhasil disimpan.");
    } catch (err: any) {
      setError(err.message ?? "Gagal menyimpan akun.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-zinc-500">Memuat detail akun...</div>;
  }

  if (error || !user || !form) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <AdminNotice tone="error">{error ?? "Data akun tidak ditemukan."}</AdminNotice>
        <Link href="/admin/akun" className="text-sm text-zinc-400 hover:text-white">
          Kembali ke daftar akun
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title={`Edit Akun: ${user.nama_lengkap}`}
        description="Padanan object edit Django admin untuk akun pengguna."
        actions={
          <>
            <Link href="/admin/akun" className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200">
              Kembali
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </>
        }
      />

      {message ? <AdminNotice tone="success">{message}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <AdminSectionCard title="Info Personal">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AdminField label="NIK" value={user.nik} readOnly />
              <AdminField
                label="Nama Lengkap"
                value={form.nama_lengkap}
                onChange={(value) => setForm((prev) => (prev ? { ...prev, nama_lengkap: value } : prev))}
              />
              <AdminField
                label="Nomor HP"
                value={form.nomor_hp}
                onChange={(value) => setForm((prev) => (prev ? { ...prev, nomor_hp: value } : prev))}
              />
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Role</span>
                <select
                  value={form.role}
                  onChange={(event) => setForm((prev) => (prev ? { ...prev, role: event.target.value as UserRole } : prev))}
                  disabled={!canManagePermissions}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none disabled:opacity-60"
                >
                  <option value="WARGA">WARGA</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="BUMDES">BUMDES</option>
                  <option value="SUPERADMIN">SUPERADMIN</option>
                </select>
              </label>
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Role & Status">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <AdminCheckbox
                label="Akun Aktif"
                checked={form.is_active}
                onChange={(checked) => setForm((prev) => (prev ? { ...prev, is_active: checked } : prev))}
              />
              <AdminCheckbox
                label="Is Staff"
                checked={form.is_staff}
                disabled={!canManagePermissions}
                onChange={(checked) => setForm((prev) => (prev ? { ...prev, is_staff: checked } : prev))}
              />
              <AdminCheckbox
                label="Is Superuser"
                checked={form.is_superuser}
                disabled={!canManagePermissions}
                onChange={(checked) => setForm((prev) => (prev ? { ...prev, is_superuser: checked } : prev))}
              />
            </div>
          </AdminSectionCard>

          <AdminSectionCard
            title="Permissions"
            description="Groups dan user permissions tampil seperti pola Django admin."
          >
            {!canManagePermissions ? (
              <AdminNotice tone="info">Hanya SUPERADMIN dapat mengubah groups dan user permissions.</AdminNotice>
            ) : null}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Groups</h3>
                <div className="max-h-72 space-y-2 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                  {groups.map((group) => (
                    <AdminCheckbox
                      key={group.id}
                      label={group.name}
                      checked={form.groups.includes(group.id)}
                      disabled={!canManagePermissions}
                      onChange={(checked) =>
                        setForm((prev) =>
                          prev
                            ? { ...prev, groups: toggleArrayValue(prev.groups, group.id, checked) }
                            : prev
                        )
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">User Permissions</h3>
                <div className="max-h-[32rem] space-y-4 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                  {permissionGroups.map((permissionGroup) => (
                    <div key={`${permissionGroup.app_label}-${permissionGroup.model}`} className="space-y-2">
                      <div className="text-xs font-semibold text-zinc-200">
                        {permissionGroup.app_label} / {permissionGroup.model}
                      </div>
                      <div className="space-y-2">
                        {permissionGroup.permissions.map((permission) => (
                          <AdminCheckbox
                            key={permission.id}
                            label={`${permission.codename} — ${permission.name}`}
                            checked={form.user_permissions.includes(permission.id)}
                            disabled={!canManagePermissions}
                            onChange={(checked) =>
                              setForm((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      user_permissions: toggleArrayValue(prev.user_permissions, permission.id, checked),
                                    }
                                  : prev
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AdminSectionCard>
        </div>

        <div className="space-y-6">
          <AdminSectionCard title="Readonly Meta">
            <div className="space-y-3 text-sm text-zinc-300">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Created At</div>
                <div>{formatDate(user.created_at)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Updated At</div>
                <div>{formatDate(user.updated_at)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Last Login</div>
                <div>{formatDate(user.last_login)}</div>
              </div>
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Summary Permission">
            <div className="space-y-3 text-sm text-zinc-300">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Assigned Groups</div>
                <div>{form.groups.length}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Assigned Permissions</div>
                <div>{form.user_permissions.length}</div>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
                {form.user_permissions.slice(0, 5).map((permissionId) => (
                  <div key={permissionId}>{permissionLookup.get(permissionId)?.codename ?? permissionId}</div>
                ))}
                {form.user_permissions.length > 5 ? <div>+ {form.user_permissions.length - 5} lainnya</div> : null}
              </div>
            </div>
          </AdminSectionCard>
        </div>
      </div>
    </div>
  );
}
