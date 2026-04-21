"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api/auth";
import {
  AdminField,
  AdminNotice,
  AdminPageHeader,
  AdminSectionCard,
} from "@/app/(website)/admin/_components/admin-primitives";
import { adminToastError, adminToastSuccess, getErrorMessage } from "@/app/(website)/admin/_components/admin-feedback";

export default function AdminGantiPasswordPage() {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    try {
      await authApi.changePassword(form);
      adminToastSuccess("Password berhasil diperbarui. Silakan gunakan password baru untuk login berikutnya.");
      setForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Gagal mengganti password."));
      adminToastError(err, "Gagal mengganti password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <AdminPageHeader
        eyebrow="Keamanan Akun"
        title="Ganti password admin"
        description="Halaman keamanan akun agar admin bisa mengganti password sendiri tanpa masuk ke backend Django admin."
        actions={
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/admin/akun">Kembali ke kelola akun</Link>
          </Button>
        }
      />

      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}

      <AdminSectionCard
        title="Form ganti password"
        description="Gunakan password lama untuk verifikasi, lalu masukkan password baru dua kali."
      >
        <div className="grid grid-cols-1 gap-4">
          <AdminField
            label="Password saat ini"
            type="password"
            value={form.current_password}
            onChange={(value) => setForm((prev) => ({ ...prev, current_password: value }))}
          />
          <AdminField
            label="Password baru"
            type="password"
            value={form.new_password}
            onChange={(value) => setForm((prev) => ({ ...prev, new_password: value }))}
          />
          <AdminField
            label="Konfirmasi password baru"
            type="password"
            value={form.confirm_password}
            onChange={(value) => setForm((prev) => ({ ...prev, confirm_password: value }))}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSubmit} disabled={saving} className="rounded-full">
              {saving ? "Menyimpan..." : "Simpan password baru"}
            </Button>
            <p className="text-sm text-slate-500">
              Gunakan kombinasi kuat, mudah diingat admin, sulit ditebak pihak lain.
            </p>
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}
