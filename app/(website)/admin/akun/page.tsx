"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, ShieldCheck, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import type { UserDto, UserRole } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  AdminFilterToolbar,
  AdminPageHeader,
  AdminSectionCard,
  ErrorState,
  LoadingState,
  MetricCard,
  StatusBadge,
  getStatusTone,
} from "../_components/admin-primitives";
import { localizeUserRole, toneForRole } from "../_components/admin-labels";

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

const columnHelper = createColumnHelper<UserDto>();

export default function AdminKelolaAkunPage() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | UserRole>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createTab, setCreateTab] = useState<"warga" | "admin">("warga");
  const [wargaForm, setWargaForm] = useState<WargaForm>(emptyWargaForm);
  const [adminForm, setAdminForm] = useState<AdminForm>(emptyAdminForm);
  const [submitting, setSubmitting] = useState<"warga" | "admin" | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const loadUsers = async () => {
    setListLoading(true);
    try {
      const result = await authApi.listUsers({
        q: search.trim() || undefined,
        role: roleFilter || undefined,
        is_active: statusFilter === "all" ? undefined : statusFilter === "active",
      });
      setUsers(result);
      setError(null);
    } catch (err: any) {
      setError(err.message ?? "Gagal memuat akun.");
    } finally {
      setListLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleFilter, statusFilter]);

  const filteredSummary = useMemo(() => {
    const active = users.filter((user) => user.is_active).length;
    const warga = users.filter((user) => user.role === "WARGA").length;
    const privileged = users.filter((user) => user.role !== "WARGA").length;
    return { total: users.length, active, warga, privileged };
  }, [users]);

  const handleSearchSubmit = async () => {
    setLoading(false);
    await loadUsers();
  };

  const handleCreateWarga = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting("warga");
    try {
      await authApi.createWarga({
        ...wargaForm,
        nomor_hp: wargaForm.nomor_hp || null,
      });
      toast.success("Akun warga berhasil dibuat.");
      setWargaForm(emptyWargaForm);
      setCreateDialogOpen(false);
      await loadUsers();
    } catch (err: any) {
      toast.error(err.message ?? "Gagal membuat akun warga.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleCreateAdmin = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting("admin");
    try {
      await authApi.createAdmin({
        ...adminForm,
        nomor_hp: adminForm.nomor_hp || null,
      });
      toast.success("Akun admin/BUMDes berhasil dibuat.");
      setAdminForm(emptyAdminForm);
      setCreateDialogOpen(false);
      await loadUsers();
    } catch (err: any) {
      toast.error(err.message ?? "Gagal membuat akun admin/BUMDes.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleToggleActive = async (user: UserDto) => {
    setActionId(user.id);
    try {
      if (user.is_active) {
        await authApi.deactivateUser(user.id);
        toast.success(`Akun ${user.nama_lengkap} dinonaktifkan.`);
      } else {
        await authApi.activateUser(user.id);
        toast.success(`Akun ${user.nama_lengkap} diaktifkan.`);
      }
      await loadUsers();
    } catch (err: any) {
      toast.error(err.message ?? "Gagal mengubah status akun.");
    } finally {
      setActionId(null);
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("nama_lengkap", {
        header: "Nama",
        cell: ({ row }) => (
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">{row.original.nama_lengkap}</p>
            <p className="text-xs text-slate-400">ID {row.original.id.slice(0, 8)}</p>
          </div>
        ),
      }),
      columnHelper.accessor("nik", {
        header: "NIK",
        cell: (info) => <span className="text-sm text-slate-600">{info.getValue()}</span>,
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ getValue }) => (
          <StatusBadge
            label={localizeUserRole(getValue())}
            tone={toneForRole(getValue())}
          />
        ),
      }),
      columnHelper.accessor("is_active", {
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge
            label={row.original.is_active ? "Aktif" : "Nonaktif"}
            tone={getStatusTone(row.original.is_active ? "DONE" : "REJECTED")}
          />
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950"
            >
              <Link href={`/admin/akun/${row.original.id}`}>Edit</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleToggleActive(row.original)}
              disabled={actionId === row.original.id}
              className="rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950"
            >
              {actionId === row.original.id
                ? "Memproses..."
                : row.original.is_active
                  ? "Nonaktifkan"
                  : "Aktifkan"}
            </Button>
          </div>
        ),
      }),
    ],
    [actionId],
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <LoadingState label="Memuat daftar akun..." />;
  }

  if (error && !users.length) {
    return <ErrorState title="Gagal memuat akun" description={error} />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Kontrol Akses"
        title="Kelola akun"
        description="Pantau pengguna aktif, filter akun yang relevan, lalu buat akun baru dari dialog terpisah agar fokus monitoring tetap terjaga."
        actions={
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                <Plus data-icon="inline-start" />
                Tambah akun
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-[28px] border-white/70 bg-white/95 p-0 shadow-[0_36px_90px_-46px_rgba(15,23,42,0.35)]">
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-xl font-semibold text-slate-950">
                  Buat akun baru
                </DialogTitle>
                <DialogDescription className="text-slate-500">
                  Gunakan form yang sesuai dengan tipe pengguna yang akan dibuat.
                </DialogDescription>
              </DialogHeader>
              <div className="px-6 pb-6">
                <Tabs value={createTab} onValueChange={(value) => setCreateTab(value as "warga" | "admin")}>
                  <TabsList className="grid h-11 grid-cols-2 rounded-2xl bg-slate-100">
                    <TabsTrigger value="warga" className="rounded-xl">
                      <UserPlus data-icon="inline-start" />
                      Warga
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="rounded-xl">
                      <ShieldCheck data-icon="inline-start" />
                      Admin / BUMDes
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="warga" className="mt-5">
                    <CreateFormShell onSubmit={handleCreateWarga}>
                      <Field label="NIK">
                        <Input value={wargaForm.nik} onChange={(e) => setWargaForm((prev) => ({ ...prev, nik: e.target.value }))} />
                      </Field>
                      <Field label="Nama lengkap">
                        <Input value={wargaForm.nama_lengkap} onChange={(e) => setWargaForm((prev) => ({ ...prev, nama_lengkap: e.target.value }))} />
                      </Field>
                      <Field label="Password">
                        <Input type="password" value={wargaForm.password} onChange={(e) => setWargaForm((prev) => ({ ...prev, password: e.target.value }))} />
                      </Field>
                      <Field label="Nomor HP">
                        <Input value={wargaForm.nomor_hp} onChange={(e) => setWargaForm((prev) => ({ ...prev, nomor_hp: e.target.value }))} />
                      </Field>
                      <div className="col-span-full flex justify-end">
                        <Button type="submit" disabled={submitting === "warga"} className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                          {submitting === "warga" ? "Menyimpan..." : "Simpan akun warga"}
                        </Button>
                      </div>
                    </CreateFormShell>
                  </TabsContent>

                  <TabsContent value="admin" className="mt-5">
                    <CreateFormShell onSubmit={handleCreateAdmin}>
                      <Field label="NIK">
                        <Input value={adminForm.nik} onChange={(e) => setAdminForm((prev) => ({ ...prev, nik: e.target.value }))} />
                      </Field>
                      <Field label="Nama lengkap">
                        <Input value={adminForm.nama_lengkap} onChange={(e) => setAdminForm((prev) => ({ ...prev, nama_lengkap: e.target.value }))} />
                      </Field>
                      <Field label="Password">
                        <Input type="password" value={adminForm.password} onChange={(e) => setAdminForm((prev) => ({ ...prev, password: e.target.value }))} />
                      </Field>
                      <Field label="Nomor HP">
                        <Input value={adminForm.nomor_hp} onChange={(e) => setAdminForm((prev) => ({ ...prev, nomor_hp: e.target.value }))} />
                      </Field>
                      <Field label="Role" className="col-span-full">
                        <Select
                          value={adminForm.role}
                          onChange={(e) => setAdminForm((prev) => ({ ...prev, role: e.target.value as AdminForm["role"] }))}
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="SUPERADMIN">SUPERADMIN</option>
                          <option value="BUMDES">BUMDES</option>
                        </Select>
                      </Field>
                      <div className="col-span-full flex justify-end">
                        <Button type="submit" disabled={submitting === "admin"} className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                          {submitting === "admin" ? "Menyimpan..." : "Simpan akun admin"}
                        </Button>
                      </div>
                    </CreateFormShell>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total akun" value={String(filteredSummary.total)} icon={<Users className="size-5" />} />
        <MetricCard label="Akun aktif" value={String(filteredSummary.active)} tone="success" icon={<ShieldCheck className="size-5" />} />
        <MetricCard label="Akun warga" value={String(filteredSummary.warga)} tone="neutral" icon={<UserPlus className="size-5" />} />
        <MetricCard label="Admin/BUMDes" value={String(filteredSummary.privileged)} tone="info" icon={<ShieldCheck className="size-5" />} />
      </div>

      <AdminFilterToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama, NIK, atau nomor HP"
        selectLabel="Role"
        selectValue={roleFilter}
        onSelectChange={(value) => setRoleFilter(value as "" | UserRole)}
        selectOptions={[
          { label: "Semua role", value: "" },
          { label: "WARGA", value: "WARGA" },
          { label: "ADMIN", value: "ADMIN" },
          { label: "SUPERADMIN", value: "SUPERADMIN" },
          { label: "BUMDES", value: "BUMDES" },
        ]}
        agingLabel="Status"
        agingValue={statusFilter}
        onAgingChange={(value) => setStatusFilter(value as "all" | "active" | "inactive")}
        agingOptions={[
          { label: "Semua status", value: "all" },
          { label: "Aktif", value: "active" },
          { label: "Nonaktif", value: "inactive" },
        ]}
        rightSlot={
          <Button
            variant="outline"
            onClick={() => void handleSearchSubmit()}
            disabled={listLoading}
            className="rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950"
          >
            {listLoading ? "Memuat..." : "Terapkan filter"}
          </Button>
        }
      />

      <AdminSectionCard
        title="Daftar akun"
        description="Sumber data: daftar akun, aktivasi akun, dan pembuatan akun baru dari modul autentikasi."
      >
        <div className="admin-scrollbar overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 pb-1 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="admin-subtle-panel overflow-hidden rounded-[24px]">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-4 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-slate-500">
                    Tidak ada akun yang cocok dengan filter saat ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminSectionCard>
    </div>
  );
}

function CreateFormShell({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {children}
    </form>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-[11px] font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}
