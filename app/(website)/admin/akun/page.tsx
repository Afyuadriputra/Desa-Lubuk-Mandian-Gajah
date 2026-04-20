"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api/auth";
import { dashboardApi } from "@/lib/api/dashboard";
import type { DashboardOverviewDto, UserDto, UserRole } from "@/lib/api/types";
import { CheckCircle2, FileText, MessageSquare, Search, ShieldCheck, UserPlus, Users, XCircle } from "lucide-react";

type WargaForm = {
  nik: string;
  nama_lengkap: string;
  password: string;
  nomor_hp: string;
};

type AdminForm = {
  nik: string;
  nama_lengkap: string;
  password: string;
  nomor_hp: string;
  role: "ADMIN" | "SUPERADMIN" | "BUMDES";
};

type UserFilters = {
  q: string;
  role: "" | UserRole;
  status: "all" | "active" | "inactive";
};

const emptyWargaForm: WargaForm = {
  nik: "",
  nama_lengkap: "",
  password: "",
  nomor_hp: "",
};

const emptyAdminForm: AdminForm = {
  nik: "",
  nama_lengkap: "",
  password: "",
  nomor_hp: "",
  role: "ADMIN",
};

const defaultFilters: UserFilters = {
  q: "",
  role: "",
  status: "all",
};

export default function AdminKelolaAkunPage() {
  const [dashboard, setDashboard] = useState<DashboardOverviewDto | null>(null);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wargaForm, setWargaForm] = useState<WargaForm>(emptyWargaForm);
  const [adminForm, setAdminForm] = useState<AdminForm>(emptyAdminForm);
  const [filters, setFilters] = useState<UserFilters>(defaultFilters);
  const [submitState, setSubmitState] = useState<{
    loading: boolean;
    target: "warga" | "admin" | null;
    message: string | null;
    error: string | null;
  }>({
    loading: false,
    target: null,
    message: null,
    error: null,
  });
  const [actionState, setActionState] = useState<{
    loadingId: string | null;
    message: string | null;
    error: string | null;
  }>({
    loadingId: null,
    message: null,
    error: null,
  });

  const loadOverview = async () => {
    const result = await dashboardApi.overview();
    setDashboard(result.data);
  };

  const loadUsers = async (nextFilters: UserFilters) => {
    setListLoading(true);
    try {
      const result = await authApi.listUsers({
        q: nextFilters.q.trim() || undefined,
        role: nextFilters.role || undefined,
        is_active:
          nextFilters.status === "all"
            ? undefined
            : nextFilters.status === "active",
      });
      setUsers(result);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([loadOverview(), loadUsers(defaultFilters)])
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setActionState({ loadingId: null, message: null, error: null });
    try {
      await loadUsers(filters);
    } catch (err: any) {
      setActionState({
        loadingId: null,
        message: null,
        error: err.message ?? "Gagal memuat daftar akun.",
      });
    }
  };

  const refreshAll = async () => {
    await Promise.all([loadOverview(), loadUsers(filters)]);
  };

  const handleCreateWarga = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitState({ loading: true, target: "warga", message: null, error: null });
    try {
      await authApi.createWarga({
        ...wargaForm,
        nomor_hp: wargaForm.nomor_hp || null,
      });
      setWargaForm(emptyWargaForm);
      await refreshAll();
      setSubmitState({
        loading: false,
        target: "warga",
        message: "Akun warga berhasil dibuat.",
        error: null,
      });
    } catch (err: any) {
      setSubmitState({
        loading: false,
        target: "warga",
        message: null,
        error: err.message ?? "Gagal membuat akun warga.",
      });
    }
  };

  const handleCreateAdmin = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitState({ loading: true, target: "admin", message: null, error: null });
    try {
      await authApi.createAdmin({
        ...adminForm,
        nomor_hp: adminForm.nomor_hp || null,
      });
      setAdminForm(emptyAdminForm);
      await refreshAll();
      setSubmitState({
        loading: false,
        target: "admin",
        message: "Akun admin berhasil dibuat.",
        error: null,
      });
    } catch (err: any) {
      setSubmitState({
        loading: false,
        target: "admin",
        message: null,
        error: err.message ?? "Gagal membuat akun admin.",
      });
    }
  };

  const handleToggleActive = async (user: UserDto) => {
    setActionState({ loadingId: user.id, message: null, error: null });
    try {
      if (user.is_active) {
        await authApi.deactivateUser(user.id);
      } else {
        await authApi.activateUser(user.id);
      }
      await refreshAll();
      setActionState({
        loadingId: null,
        message: `Akun ${user.nama_lengkap} berhasil ${user.is_active ? "dinonaktifkan" : "diaktifkan"}.`,
        error: null,
      });
    } catch (err: any) {
      setActionState({
        loadingId: null,
        message: null,
        error: err.message ?? "Gagal mengubah status akun.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
        <span className="text-xs text-zinc-500">Memuat data akun...</span>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="mx-auto mt-16 flex max-w-lg items-start gap-3 rounded-xl border border-red-900/40 bg-red-950/30 p-6">
        <XCircle size={20} className="mt-0.5 shrink-0 text-red-400" />
        <div>
          <h3 className="text-sm font-semibold text-red-300">Gagal Memuat Data</h3>
          <p className="mt-1 text-xs text-red-400/80">{error}</p>
        </div>
      </div>
    );
  }

  const { summary } = dashboard;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Kelola Akun</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Buat akun baru, cari akun yang ada, lalu aktifkan atau nonaktifkan langsung dari tabel user.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/50 px-4 py-2 text-[11px] text-zinc-500">
          Source: `GET /auth/users`, `POST /auth/users/*`, `POST /auth/users/{`id`}/activate|deactivate`
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          icon={<Users size={18} />}
          label="Warga Aktif"
          value={summary.total_warga_aktif.toLocaleString("id-ID")}
        />
        <MetricCard
          icon={<FileText size={18} />}
          label="Surat Pending"
          value={String(summary.surat_pending)}
          accent={summary.surat_pending > 0}
        />
        <MetricCard
          icon={<MessageSquare size={18} />}
          label="Pengaduan Aktif"
          value={String(summary.pengaduan_aktif)}
          accent={summary.pengaduan_aktif > 0}
        />
      </div>

      <section className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-black">
            <Search size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Daftar Akun</h2>
            <p className="text-xs text-zinc-500">Cari berdasarkan nama, NIK, nomor HP, role, dan status aktif.</p>
          </div>
        </div>

        <form className="grid grid-cols-1 gap-4 lg:grid-cols-4" onSubmit={handleSearch}>
          <InlineField
            label="Cari"
            value={filters.q}
            onChange={(value) => setFilters((prev) => ({ ...prev, q: value }))}
            placeholder="Nama, NIK, nomor HP"
          />
          <SelectField
            label="Role"
            value={filters.role}
            onChange={(value) => setFilters((prev) => ({ ...prev, role: value as UserFilters["role"] }))}
            options={[
              { value: "", label: "Semua Role" },
              { value: "WARGA", label: "WARGA" },
              { value: "ADMIN", label: "ADMIN" },
              { value: "SUPERADMIN", label: "SUPERADMIN" },
              { value: "BUMDES", label: "BUMDES" },
            ]}
          />
          <SelectField
            label="Status"
            value={filters.status}
            onChange={(value) => setFilters((prev) => ({ ...prev, status: value as UserFilters["status"] }))}
            options={[
              { value: "all", label: "Semua Status" },
              { value: "active", label: "Aktif" },
              { value: "inactive", label: "Nonaktif" },
            ]}
          />
          <div className="flex items-end">
            <button
              type="submit"
              disabled={listLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              <Search size={14} />
              {listLoading ? "Memuat..." : "Cari Akun"}
            </button>
          </div>
        </form>

        {(actionState.message || actionState.error) && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              actionState.error
                ? "border-red-900/40 bg-red-950/30 text-red-300"
                : "border-emerald-900/40 bg-emerald-950/30 text-emerald-300"
            }`}
          >
            {actionState.error ?? actionState.message}
          </div>
        )}

        <div className="mt-5 overflow-x-auto rounded-xl border border-zinc-800/60">
          <table className="min-w-full divide-y divide-zinc-800 text-sm">
            <thead className="bg-zinc-950/80">
              <tr className="text-left text-[10px] uppercase tracking-widest text-zinc-500">
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">NIK</th>
                <th className="px-4 py-3">No. HP</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70 bg-zinc-900/30">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500">
                    Tidak ada akun yang cocok dengan filter saat ini.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-900/80">
                    <td className="px-4 py-3">
                      <div className="font-medium text-zinc-100">{user.nama_lengkap}</div>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">{user.nik}</td>
                    <td className="px-4 py-3 text-zinc-400">{user.nomor_hp || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-zinc-700 bg-zinc-950 px-2 py-1 text-[10px] font-semibold tracking-wide text-zinc-300">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-2 py-1 text-[10px] font-semibold tracking-wide ${
                          user.is_active
                            ? "border-emerald-900/40 bg-emerald-950/30 text-emerald-300"
                            : "border-zinc-700 bg-zinc-950 text-zinc-400"
                        }`}
                      >
                        {user.is_active ? "AKTIF" : "NONAKTIF"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/akun/${user.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-zinc-900"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(user)}
                          disabled={actionState.loadingId === user.id}
                          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors disabled:opacity-50 ${
                            user.is_active
                              ? "border border-red-900/40 bg-red-950/30 text-red-300 hover:bg-red-950/50"
                              : "border border-emerald-900/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50"
                          }`}
                        >
                          {user.is_active ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                          {actionState.loadingId === user.id
                            ? "Memproses..."
                            : user.is_active
                              ? "Nonaktifkan"
                              : "Aktifkan"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="space-y-5 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <UserPlus size={16} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">Buat Akun Warga</h2>
              <p className="text-xs text-zinc-500">Endpoint: `POST /auth/users/warga/create`</p>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleCreateWarga}>
            <InlineField label="NIK" value={wargaForm.nik} onChange={(value) => setWargaForm((prev) => ({ ...prev, nik: value }))} />
            <InlineField label="Nama Lengkap" value={wargaForm.nama_lengkap} onChange={(value) => setWargaForm((prev) => ({ ...prev, nama_lengkap: value }))} />
            <InlineField label="Password" type="password" value={wargaForm.password} onChange={(value) => setWargaForm((prev) => ({ ...prev, password: value }))} />
            <InlineField label="Nomor HP" value={wargaForm.nomor_hp} onChange={(value) => setWargaForm((prev) => ({ ...prev, nomor_hp: value }))} />
            <button
              type="submit"
              disabled={submitState.loading && submitState.target === "warga"}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              <Users size={14} />
              {submitState.loading && submitState.target === "warga" ? "Menyimpan..." : "Simpan Warga"}
            </button>
          </form>
        </section>

        <section className="space-y-5 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-black">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">Buat Akun Admin / BUMDes</h2>
              <p className="text-xs text-zinc-500">Endpoint: `POST /auth/users/admin/create`</p>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleCreateAdmin}>
            <InlineField label="NIK" value={adminForm.nik} onChange={(value) => setAdminForm((prev) => ({ ...prev, nik: value }))} />
            <InlineField label="Nama Lengkap" value={adminForm.nama_lengkap} onChange={(value) => setAdminForm((prev) => ({ ...prev, nama_lengkap: value }))} />
            <InlineField label="Password" type="password" value={adminForm.password} onChange={(value) => setAdminForm((prev) => ({ ...prev, password: value }))} />
            <InlineField label="Nomor HP" value={adminForm.nomor_hp} onChange={(value) => setAdminForm((prev) => ({ ...prev, nomor_hp: value }))} />
            <SelectField
              label="Role"
              value={adminForm.role}
              onChange={(value) => setAdminForm((prev) => ({ ...prev, role: value as AdminForm["role"] }))}
              options={[
                { value: "ADMIN", label: "ADMIN" },
                { value: "SUPERADMIN", label: "SUPERADMIN" },
                { value: "BUMDES", label: "BUMDES" },
              ]}
            />
            <button
              type="submit"
              disabled={submitState.loading && submitState.target === "admin"}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              <ShieldCheck size={14} />
              {submitState.loading && submitState.target === "admin" ? "Menyimpan..." : "Simpan Admin"}
            </button>
          </form>
        </section>
      </div>

      {(submitState.message || submitState.error) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            submitState.error
              ? "border-red-900/40 bg-red-950/30 text-red-300"
              : "border-emerald-900/40 bg-emerald-950/30 text-emerald-300"
          }`}
        >
          {submitState.error ?? submitState.message}
        </div>
      )}
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5">
      <div className="flex items-center justify-between">
        <span className={accent ? "text-amber-400" : "text-zinc-500"}>{icon}</span>
        {accent && (
          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
            Perlu Aksi
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
        <p className="mt-0.5 text-xs text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

function InlineField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-zinc-600"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-zinc-600"
      >
        {options.map((option) => (
          <option key={option.value || option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
