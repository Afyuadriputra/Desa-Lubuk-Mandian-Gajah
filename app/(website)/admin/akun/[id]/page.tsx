"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import type { PermissionDto, PermissionGroupDto, UserDetailDto, UserRole } from "@/lib/api/types";
import {
  AdminCheckbox,
  AdminDetailSkeleton,
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
  ErrorState,
} from "@/app/(website)/admin/_components/admin-primitives";
import { adminToastError, adminToastSuccess, getErrorMessage } from "@/app/(website)/admin/_components/admin-feedback";
import { Button } from "@/components/ui/button";
import { localizeUserRole } from "@/app/(website)/admin/_components/admin-labels";

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
  const [currentActorId, setCurrentActorId] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<UserDetailDto | null>(null);
  const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroupDto[]>([]);
  const [form, setForm] = useState<UserFormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetSaving, setResetSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resetPasswordForm, setResetPasswordForm] = useState({
    new_password: "",
    confirm_password: "",
  });

  const canManagePermissions = currentUserRole === "SUPERADMIN";
  const canResetManagedPassword = currentActorId !== null && currentActorId !== userId && currentUserRole !== "WARGA";

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
        setCurrentActorId(me.id);
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

  const handleResetPassword = async () => {
    setResetSaving(true);
    setMessage(null);
    setError(null);
    try {
      await authApi.resetUserPassword(userId, resetPasswordForm);
      setResetPasswordForm({ new_password: "", confirm_password: "" });
      setMessage("Password akun berhasil direset. Pengguna bisa login memakai password baru.");
      adminToastSuccess("Password akun berhasil direset. Pengguna bisa login memakai password baru.");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Gagal mereset password akun."));
      adminToastError(err, "Gagal mereset password akun.");
    } finally {
      setResetSaving(false);
    }
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
      adminToastSuccess("Perubahan akun berhasil disimpan.");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Gagal menyimpan akun."));
      adminToastError(err, "Gagal menyimpan akun.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminDetailSkeleton />;
  }

  if (error || !user || !form) {
    return (
      <ErrorState
        title="Gagal memuat detail akun"
        description={error ?? "Data akun tidak ditemukan."}
        action={
          <Link href="/admin/akun" className="text-sm text-slate-600 hover:text-slate-950">
            Kembali ke daftar akun
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title={`Edit Akun: ${user.nama_lengkap}`}
        description="Padanan object edit Django admin untuk akun pengguna."
        actions={
          <>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/admin/akun">Kembali</Link>
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
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
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Role</span>
                <select
                  value={form.role}
                  onChange={(event) => setForm((prev) => (prev ? { ...prev, role: event.target.value as UserRole } : prev))}
                  disabled={!canManagePermissions}
                  className="w-full rounded-[22px] border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70 disabled:opacity-60"
                >
                    <option value="WARGA">{localizeUserRole("WARGA")}</option>
                    <option value="ADMIN">{localizeUserRole("ADMIN")}</option>
                    <option value="BUMDES">{localizeUserRole("BUMDES")}</option>
                    <option value="SUPERADMIN">{localizeUserRole("SUPERADMIN")}</option>
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
                label="Staf Admin"
                checked={form.is_staff}
                disabled={!canManagePermissions}
                onChange={(checked) => setForm((prev) => (prev ? { ...prev, is_staff: checked } : prev))}
              />
              <AdminCheckbox
                label="Hak Superadmin"
                checked={form.is_superuser}
                disabled={!canManagePermissions}
                onChange={(checked) => setForm((prev) => (prev ? { ...prev, is_superuser: checked } : prev))}
              />
            </div>
          </AdminSectionCard>

          <AdminSectionCard
            title="Hak Akses"
            description="Kelola group dan izin pengguna mengikuti pola Django admin."
          >
            {!canManagePermissions ? (
              <AdminNotice tone="info">Hanya superadmin yang dapat mengubah group dan izin pengguna.</AdminNotice>
            ) : null}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Group</h3>
                <div className="max-h-72 space-y-2 overflow-y-auto rounded-[22px] border border-slate-200/80 bg-white/80 p-3">
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
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Izin Pengguna</h3>
                <div className="max-h-[32rem] space-y-4 overflow-y-auto rounded-[22px] border border-slate-200/80 bg-white/80 p-3">
                  {permissionGroups.map((permissionGroup) => (
                    <div key={`${permissionGroup.app_label}-${permissionGroup.model}`} className="space-y-2">
                      <div className="text-xs font-semibold text-slate-900">
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
          <AdminSectionCard title="Metadata">
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Dibuat</div>
                <div>{formatDate(user.created_at)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Diperbarui</div>
                <div>{formatDate(user.updated_at)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Login Terakhir</div>
                <div>{formatDate(user.last_login)}</div>
              </div>
            </div>
          </AdminSectionCard>

          <AdminSectionCard
            title="Reset Password"
            description="Dipakai saat warga atau pegawai lupa password dan perlu dibantu admin."
          >
            {canResetManagedPassword ? (
              <div className="space-y-4">
                <AdminField
                  label="Password baru"
                  type="password"
                  value={resetPasswordForm.new_password}
                  onChange={(value) =>
                    setResetPasswordForm((prev) => ({ ...prev, new_password: value }))
                  }
                />
                <AdminField
                  label="Konfirmasi password baru"
                  type="password"
                  value={resetPasswordForm.confirm_password}
                  onChange={(value) =>
                    setResetPasswordForm((prev) => ({ ...prev, confirm_password: value }))
                  }
                />
                <Button
                  onClick={handleResetPassword}
                  disabled={resetSaving}
                  variant="outline"
                  className="rounded-full border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                >
                  {resetSaving ? "Mereset..." : "Reset password akun ini"}
                </Button>
                <div className="text-xs text-slate-500">
                  Gunakan fitur ini hanya untuk akun lain. Untuk akun sendiri, pakai halaman ganti password.
                </div>
              </div>
            ) : (
              <AdminNotice tone="info">
                Reset password akun ini tidak tersedia. Jika ini akun Anda sendiri, gunakan halaman ganti password. Jika ini akun admin lain, hanya superadmin yang boleh mereset.
              </AdminNotice>
            )}
          </AdminSectionCard>

          <AdminSectionCard title="Ringkasan Akses">
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Group Aktif</div>
                <div>{form.groups.length}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Izin Aktif</div>
                <div>{form.user_permissions.length}</div>
              </div>
              <div className="rounded-[22px] border border-slate-200/80 bg-white/80 p-3 text-xs text-slate-500">
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
