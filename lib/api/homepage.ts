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
  HomepageStatItemPayload,
} from "@/lib/api/types";
import type { HomepageData } from "@/app/(website)/homepage/data/homepage.types";

function ensureString(value: string | null | undefined) {
  return value ?? "";
}

function ensureStringArray(values: string[] | null | undefined) {
  return Array.isArray(values) ? values.filter((value): value is string => typeof value === "string") : [];
}

function mapHomepageDtoToViewModel(data: HomepageDataDto): HomepageData {
  return {
    villageName: ensureString(data.villageName),
    tagline: ensureString(data.tagline),
    heroDescription: ensureString(data.heroDescription),
    heroImage: ensureString(data.heroImage),
    heroBadge: ensureString(data.heroBadge),
    brand: {
      logoUrl: ensureString(data.brand?.logoUrl),
      logoAlt: ensureString(data.brand?.logoAlt),
      regionLabel: ensureString(data.brand?.regionLabel),
    },
    stats: Array.isArray(data.stats)
      ? data.stats.map((item) => ({
          value: ensureString(item?.value),
          label: ensureString(item?.label),
        }))
      : [],
    quickStatsDescription: ensureString(data.quickStatsDescription),
    contact: {
      address: ensureString(data.contact?.address),
      whatsapp: ensureString(data.contact?.whatsapp),
      mapImage: ensureString(data.contact?.mapImage),
    },
    namingTitle: ensureString(data.namingTitle),
    namingDescription: ensureString(data.namingDescription),
    namingImage: ensureString(data.namingImage),
    namingQuote: ensureString(data.namingQuote),
    cultureTitle: ensureString(data.cultureTitle),
    cultureDescription: ensureString(data.cultureDescription),
    cultureCards: Array.isArray(data.cultureCards)
      ? data.cultureCards.map((item) => ({
          icon: ensureString(item?.icon),
          title: ensureString(item?.title),
          description: ensureString(item?.description),
        }))
      : [],
    sialangTitle: ensureString(data.sialangTitle),
    sialangDescription: ensureString(data.sialangDescription),
    sialangImage: ensureString(data.sialangImage),
    sialangBadge: ensureString(data.sialangBadge),
    sialangStat: ensureString(data.sialangStat),
    sialangQuote: ensureString(data.sialangQuote),
    peatTitle: ensureString(data.peatTitle),
    peatDescription: ensureString(data.peatDescription),
    peatQuote: ensureString(data.peatQuote),
    peatImages: ensureStringArray(data.peatImages),
    recoveryTitle: ensureString(data.recoveryTitle),
    recoveryDescription: ensureString(data.recoveryDescription),
    recoveryItems: Array.isArray(data.recoveryItems)
      ? data.recoveryItems.map((item) => ({
          icon: ensureString(item?.icon),
          title: ensureString(item?.title),
          description: ensureString(item?.description),
          wrapper: ensureString(item?.wrapper),
        }))
      : [],
    potentialTitle: ensureString(data.potentialTitle),
    potentials: Array.isArray(data.potentials)
      ? data.potentials
          .map((item) => ({
            title: ensureString(item?.title),
            image: ensureString(item?.image),
          }))
          .filter((item) => item.image)
      : [],
    potentialQuote: ensureString(data.potentialQuote),
    potentialOpportunitiesTitle: ensureString(data.potentialOpportunitiesTitle),
    potentialOpportunityItems: Array.isArray(data.potentialOpportunityItems)
      ? data.potentialOpportunityItems.map((item) => ({
          icon: ensureString(item?.icon),
          title: ensureString(item?.title),
          description: ensureString(item?.description),
        }))
      : [],
    facilitiesTitle: ensureString(data.facilitiesTitle),
    facilities: Array.isArray(data.facilities)
      ? data.facilities.map((item) => ({
          icon: ensureString(item?.icon),
          label: ensureString(item?.label),
        }))
      : [],
    galleryTitle: ensureString(data.galleryTitle),
    galleryDescription: ensureString(data.galleryDescription),
    gallery: Array.isArray(data.gallery)
      ? data.gallery
          .map((item) => ({
            image: ensureString(item?.image),
            alt: ensureString(item?.alt),
            tall: Boolean(item?.tall),
            caption: ensureString(item?.caption),
          }))
          .filter((item) => item.image)
      : [],
    contactTitle: ensureString(data.contactTitle),
    contactDescription: ensureString(data.contactDescription),
    footerLinks: Array.isArray(data.footerLinks)
      ? data.footerLinks.map((item) => ({
          label: ensureString(item?.label),
          href: ensureString(item?.href),
        }))
      : [],
    footerDescription: ensureString(data.footerDescription),
    officeHours: Array.isArray(data.officeHours)
      ? data.officeHours.map((item) => ({
          day: ensureString(item?.day),
          time: ensureString(item?.time),
          danger: Boolean(item?.danger),
        }))
      : [],
    footerBadges: ensureStringArray(data.footerBadges),
    footerCopyright: ensureString(data.footerCopyright),
  };
}

export const homepageApi = {
  getPublic: () =>
    apiRequest<HomepageDataDto>("/homepage", {
      cache: "no-store",
      next: { revalidate: 0 },
    }),

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
  const data = await homepageApi.getPublic();
  return mapHomepageDtoToViewModel(data);
}
