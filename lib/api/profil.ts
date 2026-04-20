import { apiRequest } from "@/lib/api/client";
import type { DusunDto, PerangkatAdminDto, PerangkatAdminPayload, ProfilDesaDto, ProfilPublikDto } from "@/lib/api/types";

type UpsertDusunPayload = {
  nama_dusun: string;
  kepala_dusun: string;
};

type UpdateProfilPayload = ProfilDesaDto;

export const profilApi = {
  getPublik: () => apiRequest<ProfilPublikDto>("/profil-wilayah/publik"),

  listDusunAdmin: () => apiRequest<DusunDto[]>("/profil-wilayah/admin/dusun"),

  createDusun: (payload: UpsertDusunPayload) =>
    apiRequest<DusunDto>("/profil-wilayah/admin/dusun", { method: "POST", body: payload }),

  updateDusun: (dusunId: number, payload: UpsertDusunPayload) =>
    apiRequest<DusunDto>(`/profil-wilayah/admin/dusun/${dusunId}`, {
      method: "PUT",
      body: payload,
    }),

  deleteDusun: (dusunId: number) =>
    apiRequest<{ detail: string }>(`/profil-wilayah/admin/dusun/${dusunId}`, {
      method: "DELETE",
    }),

  listPerangkatAdmin: () =>
    apiRequest<PerangkatAdminDto[]>("/profil-wilayah/admin/perangkat"),

  createPerangkat: (payload: PerangkatAdminPayload) => {
    const formData = new FormData();
    formData.set("user_id", payload.user_id);
    formData.set("jabatan", payload.jabatan);
    formData.set("is_published", String(payload.is_published));
    if (payload.foto) formData.set("foto", payload.foto);
    return apiRequest<{ detail: string; id: number }>("/profil-wilayah/admin/perangkat", {
      method: "POST",
      body: formData,
    });
  },

  updatePerangkat: (perangkatId: number, payload: Omit<PerangkatAdminPayload, "foto">) =>
    apiRequest<{ detail: string; id: number }>(`/profil-wilayah/admin/perangkat/${perangkatId}`, {
      method: "PUT",
      body: payload,
    }),

  deletePerangkat: (perangkatId: number) =>
    apiRequest<{ detail: string }>(`/profil-wilayah/admin/perangkat/${perangkatId}`, {
      method: "DELETE",
    }),

  getProfilDesaAdmin: () =>
    apiRequest<ProfilDesaDto>("/profil-wilayah/admin/profil"),

  updateProfilDesa: (payload: UpdateProfilPayload) =>
    apiRequest<ProfilDesaDto>("/profil-wilayah/admin/profil", {
      method: "PUT",
      body: payload,
    }),
};
