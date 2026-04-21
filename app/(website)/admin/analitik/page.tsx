"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AdminDataPanel,
  AdminPageHeader,
  AdminShellSection,
  MetricCard,
} from "@/app/(website)/admin/_components/admin-primitives";

export default function AdminAnalitikIndexPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Pusat Analitik"
        title="Analitik layanan desa"
        description="Satu pintu untuk membaca tren surat dan pengaduan, lalu masuk ke panel detail yang paling relevan."
      />

      <AdminShellSection className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetricCard
          label="Analitik surat"
          value="Lihat tren"
          hint="Pantau distribusi jenis surat, waktu selesai, dan dokumen yang masih kurang."
          tone="info"
          icon={<FileText className="size-5" />}
          actionLabel="Buka analitik surat"
          actionHref="/admin/analitik/surat"
        />
        <MetricCard
          label="Analitik pengaduan"
          value="Lihat tren"
          hint="Pantau kategori dominan, waktu respon, dan laporan aktif paling tua."
          tone="warning"
          icon={<MessageSquare className="size-5" />}
          actionLabel="Buka analitik pengaduan"
          actionHref="/admin/analitik/pengaduan"
        />
      </AdminShellSection>

      <AdminDataPanel
        title="Arah baca"
        description="Mulai dari panel yang sesuai tujuan kerja hari ini."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="admin-subtle-panel rounded-[24px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-950">Masalah layanan surat</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Cocok untuk melihat bottleneck verifikasi, beban jenis surat, dan pengajuan yang masih kurang berkas.
                </p>
              </div>
              <BarChart3 className="size-5 text-slate-400" />
            </div>
            <Button asChild variant="outline" className="mt-4 rounded-full">
              <Link href="/admin/analitik/surat">
                Buka panel surat
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <div className="admin-subtle-panel rounded-[24px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-950">Masalah pengaduan warga</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Cocok untuk membaca kategori dominan, kecepatan respon, dan daftar laporan aktif paling lama.
                </p>
              </div>
              <BarChart3 className="size-5 text-slate-400" />
            </div>
            <Button asChild variant="outline" className="mt-4 rounded-full">
              <Link href="/admin/analitik/pengaduan">
                Buka panel pengaduan
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </AdminDataPanel>
    </div>
  );
}
