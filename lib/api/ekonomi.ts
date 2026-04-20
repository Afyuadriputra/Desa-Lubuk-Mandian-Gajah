import { apiRequest } from "@/lib/api/client";
import type { ApiEnvelope, UnitUsahaDetailDto, KatalogPublikDto, KatalogAdminDto } from "@/lib/api/types";

type UnitUsahaCreatePayload = FormData;

type UnitUsahaUpdatePayload = {
  nama_usaha: string;
  kategori: "WISATA" | "UMKM" | "JASA" | "PERDAGANGAN" | string;
  deskripsi: string;
  fasilitas?: string | null;
  kontak_wa?: string | null;
  harga_tiket?: string | number | null;
  is_published?: boolean;
};

export function buildUnitUsahaFormData(payload: UnitUsahaUpdatePayload, fotoUtama?: File | null) {
  const formData = new FormData();
  formData.set("nama_usaha", payload.nama_usaha);
  formData.set("kategori", payload.kategori);
  formData.set("deskripsi", payload.deskripsi);

  if (payload.fasilitas) formData.set("fasilitas", payload.fasilitas);
  if (payload.kontak_wa) formData.set("kontak_wa", payload.kontak_wa);
  if (payload.harga_tiket !== undefined && payload.harga_tiket !== null && payload.harga_tiket !== "") {
    formData.set("harga_tiket", String(payload.harga_tiket));
  }
  if (typeof payload.is_published === "boolean") {
    formData.set("is_published", String(payload.is_published));
  }
  if (fotoUtama) {
    formData.set("foto_utama", fotoUtama);
  }

  return formData;
}

export const ekonomiApi = {
  listPublik: () =>
    apiRequest<ApiEnvelope<KatalogPublikDto[]>>("/potensi-ekonomi/mvp/katalog"),

  detailPublik: (unitId: number) =>
    apiRequest<ApiEnvelope<UnitUsahaDetailDto>>(`/potensi-ekonomi/mvp/${unitId}`),

  listAdmin: () =>
    apiRequest<ApiEnvelope<KatalogAdminDto[]>>("/potensi-ekonomi/mvp/admin/list"),

  create: (payload: UnitUsahaCreatePayload) =>
    apiRequest<ApiEnvelope<UnitUsahaDetailDto>>("/potensi-ekonomi/mvp/admin/buat", {
      method: "POST",
      body: payload,
    }),

  update: (unitId: number, payload: UnitUsahaUpdatePayload) =>
    apiRequest<ApiEnvelope<UnitUsahaDetailDto>>(`/potensi-ekonomi/mvp/admin/${unitId}`, {
      method: "PUT",
      body: payload,
    }),

  remove: (unitId: number) =>
    apiRequest<{ detail: string }>(`/potensi-ekonomi/mvp/admin/${unitId}`, {
      method: "DELETE",
    }),
};
