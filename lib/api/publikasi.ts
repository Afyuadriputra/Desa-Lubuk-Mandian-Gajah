import { apiRequest } from "@/lib/api/client";
import type { ApiEnvelope, PublikasiDetailDto, PublikasiListItemDto, PublikasiPayload } from "@/lib/api/types";

type PublikasiStatusPayload = {
  status: "DRAFT" | "PUBLISHED";
};

export const publikasiApi = {
  listPublik: () =>
    apiRequest<ApiEnvelope<PublikasiListItemDto[]>>("/publikasi/mvp/publik"),

  detailPublik: (slug: string) =>
    apiRequest<ApiEnvelope<PublikasiDetailDto>>(`/publikasi/mvp/publik/${slug}`),

  listAdmin: () =>
    apiRequest<PublikasiDetailDto[]>("/publikasi/admin"),

  create: (payload: PublikasiPayload) =>
    apiRequest<PublikasiDetailDto>("/publikasi/admin/buat", {
      method: "POST",
      body: payload,
    }),

  update: (slug: string, payload: PublikasiPayload) =>
    apiRequest<PublikasiDetailDto>(`/publikasi/admin/${slug}`, {
      method: "PUT",
      body: payload,
    }),

  updateStatus: (slug: string, payload: PublikasiStatusPayload) =>
    apiRequest<PublikasiDetailDto>(`/publikasi/admin/${slug}/status`, {
      method: "PUT",
      body: payload,
    }),

  remove: (slug: string) =>
    apiRequest<{ detail: string }>(`/publikasi/admin/${slug}`, {
      method: "DELETE",
    }),
};
