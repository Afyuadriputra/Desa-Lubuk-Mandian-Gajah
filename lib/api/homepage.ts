import { apiRequest } from "@/lib/api/client";
import type {
  ApiEnvelope,
  HomepageAdminContentDto,
  HomepageContentUpdatePayload,
  HomepageCultureCardDto,
  HomepageCultureCardPayload,
  HomepageDataDto,
  HomepageFacilityDto,
  HomepageFacilityPayload,
  HomepageFooterLinkDto,
  HomepageFooterLinkPayload,
  HomepageGalleryItemDto,
  HomepageGalleryItemPayload,
  HomepagePotentialOpportunityItemDto,
  HomepagePotentialOpportunityItemPayload,
  HomepageRecoveryItemDto,
  HomepageRecoveryItemPayload,
  HomepageStatDto,
  HomepageStatItemPayload,
} from "@/lib/api/types";

export const homepageApi = {
  getPublic: () => apiRequest<HomepageDataDto>("/homepage"),

  getAdminContent: () =>
    apiRequest<ApiEnvelope<HomepageAdminContentDto>>("/homepage/admin/content"),

  updateContent: (payload: HomepageContentUpdatePayload) =>
    apiRequest<ApiEnvelope<HomepageAdminContentDto>>("/homepage/admin/content", {
      method: "PUT",
      body: payload,
    }),

  createCultureCard: (payload: HomepageCultureCardPayload) =>
    apiRequest<ApiEnvelope<HomepageCultureCardDto>>("/homepage/admin/culture-cards", {
      method: "POST",
      body: payload,
    }),

  updateCultureCard: (itemId: number, payload: HomepageCultureCardPayload) =>
    apiRequest<ApiEnvelope<HomepageCultureCardDto>>(`/homepage/admin/culture-cards/${itemId}`, {
      method: "PUT",
      body: payload,
    }),

  deleteCultureCard: (itemId: number) =>
    apiRequest<{ detail: string }>(`/homepage/admin/culture-cards/${itemId}`, {
      method: "DELETE",
    }),

  createRecoveryItem: (payload: HomepageRecoveryItemPayload) =>
    apiRequest<ApiEnvelope<HomepageRecoveryItemDto>>("/homepage/admin/recovery-items", {
      method: "POST",
      body: payload,
    }),

  updateRecoveryItem: (itemId: number, payload: HomepageRecoveryItemPayload) =>
    apiRequest<ApiEnvelope<HomepageRecoveryItemDto>>(`/homepage/admin/recovery-items/${itemId}`, {
      method: "PUT",
      body: payload,
    }),

  deleteRecoveryItem: (itemId: number) =>
    apiRequest<{ detail: string }>(`/homepage/admin/recovery-items/${itemId}`, {
      method: "DELETE",
    }),

  createPotentialOpportunity: (payload: HomepagePotentialOpportunityItemPayload) =>
    apiRequest<ApiEnvelope<HomepagePotentialOpportunityItemDto>>("/homepage/admin/potential-opportunities", {
      method: "POST",
      body: payload,
    }),

  updatePotentialOpportunity: (itemId: number, payload: HomepagePotentialOpportunityItemPayload) =>
    apiRequest<ApiEnvelope<HomepagePotentialOpportunityItemDto>>(`/homepage/admin/potential-opportunities/${itemId}`, {
      method: "PUT",
      body: payload,
    }),

  deletePotentialOpportunity: (itemId: number) =>
    apiRequest<{ detail: string }>(`/homepage/admin/potential-opportunities/${itemId}`, {
      method: "DELETE",
    }),

  createFacility: (payload: HomepageFacilityPayload) =>
    apiRequest<ApiEnvelope<HomepageFacilityDto>>("/homepage/admin/facilities", {
      method: "POST",
      body: payload,
    }),

  updateFacility: (itemId: number, payload: HomepageFacilityPayload) =>
    apiRequest<ApiEnvelope<HomepageFacilityDto>>(`/homepage/admin/facilities/${itemId}`, {
      method: "PUT",
      body: payload,
    }),

  deleteFacility: (itemId: number) =>
    apiRequest<{ detail: string }>(`/homepage/admin/facilities/${itemId}`, {
      method: "DELETE",
    }),

  createGalleryItem: (payload: HomepageGalleryItemPayload) =>
    apiRequest<ApiEnvelope<HomepageGalleryItemDto>>("/homepage/admin/gallery", {
      method: "POST",
      body: payload,
    }),

  updateGalleryItem: (itemId: number, payload: HomepageGalleryItemPayload) =>
    apiRequest<ApiEnvelope<HomepageGalleryItemDto>>(`/homepage/admin/gallery/${itemId}`, {
      method: "PUT",
      body: payload,
    }),

  deleteGalleryItem: (itemId: number) =>
    apiRequest<{ detail: string }>(`/homepage/admin/gallery/${itemId}`, {
      method: "DELETE",
    }),

  createFooterLink: (payload: HomepageFooterLinkPayload) =>
    apiRequest<ApiEnvelope<HomepageFooterLinkDto>>("/homepage/admin/footer-links", {
      method: "POST",
      body: payload,
    }),

  updateFooterLink: (itemId: number, payload: HomepageFooterLinkPayload) =>
    apiRequest<ApiEnvelope<HomepageFooterLinkDto>>(`/homepage/admin/footer-links/${itemId}`, {
      method: "PUT",
      body: payload,
    }),

  deleteFooterLink: (itemId: number) =>
    apiRequest<{ detail: string }>(`/homepage/admin/footer-links/${itemId}`, {
      method: "DELETE",
    }),

  createStat: (payload: HomepageStatItemPayload) =>
    apiRequest<ApiEnvelope<{ id: number; label: string; value: string; sort_order: number }>>("/homepage/admin/stats", {
      method: "POST",
      body: payload,
    }),

  updateStat: (itemId: number, payload: HomepageStatItemPayload) =>
    apiRequest<ApiEnvelope<{ id: number; label: string; value: string; sort_order: number }>>(`/homepage/admin/stats/${itemId}`, {
      method: "PUT",
      body: payload,
    }),

  deleteStat: (itemId: number) =>
    apiRequest<{ detail: string }>(`/homepage/admin/stats/${itemId}`, {
      method: "DELETE",
    }),
};

export async function getHomepageBackendData() {
  return homepageApi.getPublic();
}
