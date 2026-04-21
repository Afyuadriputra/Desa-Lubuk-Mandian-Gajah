import type { AdminStatusTone } from "./admin-primitives";
import type { UserRole } from "@/lib/api/types";

const roleLabels: Record<UserRole, string> = {
  WARGA: "Warga",
  ADMIN: "Admin Desa",
  SUPERADMIN: "Superadmin",
  BUMDES: "BUMDes",
};

const suratStatusLabels: Record<string, string> = {
  PENDING: "Menunggu Verifikasi",
  VERIFIED: "Terverifikasi",
  PROCESSED: "Sedang Diproses",
  DONE: "Selesai",
  REJECTED: "Ditolak",
};

const pengaduanStatusLabels: Record<string, string> = {
  OPEN: "Baru Masuk",
  TRIAGED: "Sudah Ditinjau",
  IN_PROGRESS: "Sedang Ditangani",
  RESOLVED: "Sudah Diselesaikan",
  CLOSED: "Ditutup",
};

const publikasiStatusLabels: Record<string, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Terbit",
};

const publikasiJenisLabels: Record<string, string> = {
  BERITA: "Berita",
  PENGUMUMAN: "Pengumuman",
};

const suratJenisLabels: Record<string, string> = {
  SKU: "Surat Keterangan Usaha",
  SKTM: "Surat Keterangan Tidak Mampu",
  DOMISILI: "Surat Keterangan Domisili",
};

const genericStatusLabels: Record<string, string> = {
  ACTIVE: "Aktif",
  INACTIVE: "Nonaktif",
  TRUE: "Aktif",
  FALSE: "Nonaktif",
};

export function localizeUserRole(role: string) {
  return roleLabels[role as UserRole] ?? role;
}

export function localizeSuratStatus(status: string) {
  return suratStatusLabels[status] ?? status;
}

export function localizePengaduanStatus(status: string) {
  return pengaduanStatusLabels[status] ?? status;
}

export function localizePublikasiStatus(status: string) {
  return publikasiStatusLabels[status] ?? status;
}

export function localizePublikasiJenis(jenis: string) {
  return publikasiJenisLabels[jenis] ?? jenis;
}

export function localizeSuratJenis(jenis: string) {
  return suratJenisLabels[jenis] ?? jenis;
}

export function localizeBooleanStatus(value: boolean) {
  return value ? "Aktif" : "Nonaktif";
}

export function localizeGenericStatus(status: string) {
  return genericStatusLabels[status.toUpperCase()] ?? status;
}

export function toneForSuratStatus(status: string): AdminStatusTone {
  if (status === "DONE") return "success";
  if (status === "REJECTED") return "danger";
  if (status === "VERIFIED" || status === "PROCESSED") return "info";
  if (status === "PENDING") return "warning";
  return "neutral";
}

export function toneForPengaduanStatus(status: string): AdminStatusTone {
  if (status === "CLOSED" || status === "RESOLVED") return "success";
  if (status === "IN_PROGRESS" || status === "TRIAGED") return "info";
  if (status === "OPEN") return "warning";
  return "neutral";
}

export function toneForPublikasiStatus(status: string): AdminStatusTone {
  return status === "PUBLISHED" ? "success" : "warning";
}

export function toneForRole(role: string): AdminStatusTone {
  if (role === "SUPERADMIN") return "danger";
  if (role === "ADMIN" || role === "BUMDES") return "info";
  return "neutral";
}
