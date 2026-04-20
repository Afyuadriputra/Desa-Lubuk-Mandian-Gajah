// --- CORE & ENVELOPES ---
export type ApiEnvelope<T> = {
  data: T;
};

export type ApiError = {
  detail: string;
};

// --- MODUL: AUTH WARGA (`auth_warga`) ---
export type UserRole = "SUPERADMIN" | "ADMIN" | "BUMDES" | "WARGA";

export type UserDto = {
  id: string;
  nik: string;
  nama_lengkap: string;
  nomor_hp?: string | null;
  role: UserRole;
  is_active: boolean;
};

export type GroupDto = {
  id: number;
  name: string;
};

export type PermissionDto = {
  id: number;
  app_label: string;
  model: string;
  codename: string;
  name: string;
};

export type PermissionGroupDto = {
  app_label: string;
  model: string;
  permissions: PermissionDto[];
};

export type UserDetailDto = UserDto & {
  is_staff: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string | null;
  groups: GroupDto[];
  user_permissions: PermissionDto[];
};

export type ActivationDto = {
  id: string;
  is_active: boolean;
};

export type UserListQuery = {
  q?: string;
  role?: UserRole | "";
  is_active?: boolean;
};

// --- MODUL: PROFIL WILAYAH (`profil_wilayah`) ---
export type ProfilDesaDto = {
  visi: string;
  misi: string;
  sejarah: string;
};

export type DusunDto = {
  id: number;
  nama_dusun: string;
  kepala_dusun: string;
};

export type PerangkatPublikDto = {
  jabatan: string;
  nama: string;
  foto_url?: string | null;
};

export type PerangkatAdminDto = {
  id: number;
  user_id: string;
  jabatan: string;
  is_published: boolean;
  foto_url?: string | null;
};

export type PerangkatAdminPayload = {
  user_id: string;
  jabatan: string;
  is_published: boolean;
  foto?: File | null;
};

export type ProfilPublikDto = {
  profil: ProfilDesaDto;
  perangkat: PerangkatPublikDto[];
};

// --- MODUL: PUBLIKASI INFORMASI (`publikasi_informasi`) ---
export type PublikasiListItemDto = {
  judul: string;
  slug: string;
  jenis: "BERITA" | "PENGUMUMAN" | string;
  penulis_nama: string;
  published_at?: string | null;
};

export type PublikasiDetailDto = {
  judul: string;
  slug: string;
  konten_html: string;
  jenis: "BERITA" | "PENGUMUMAN" | string;
  status: "DRAFT" | "PUBLISHED" | string;
  penulis_nama: string;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type PublikasiPayload = {
  judul: string;
  konten_html: string;
  jenis: "BERITA" | "PENGUMUMAN" | string;
  status?: "DRAFT" | "PUBLISHED" | string;
};

// --- MODUL: POTENSI EKONOMI (`potensi_ekonomi`) ---
export type KatalogPublikDto = {
  id: number;
  nama_usaha: string;
  kategori: string;
  deskripsi: string;
  harga_tiket?: number | null;
  foto_url?: string | null;
};

export type KatalogAdminDto = {
  id: number;
  nama_usaha: string;
  kategori: string;
  is_published: boolean;
  created_at: string;
};

export type UnitUsahaDetailDto = {
  id: number;
  nama_usaha: string;
  kategori: string;
  deskripsi: string;
  fasilitas?: string | null;
  kontak_wa?: string | null;
  harga_tiket?: number | null;
  is_published: boolean;
  foto_url?: string | null;
  created_at: string;
  updated_at: string;
};

// --- MODUL: LAYANAN ADMINISTRASI (`layanan_administrasi`) ---
export type SuratDto = {
  id: string;
  jenis_surat: "SKU" | "SKTM" | "DOMISILI";
  status: "PENDING" | "VERIFIED" | "PROCESSED" | "DONE" | "REJECTED";
  created_at: string;
  pdf_url?: string | null;
};

export type SuratHistoryDto = {
  status_from?: string | null;
  status_to: string;
  notes?: string | null;
  changed_by_nama?: string | null;
  created_at: string;
};

export type SuratDetailDto = SuratDto & {
  keperluan: string;
  nomor_surat?: string | null;
  rejection_reason?: string | null;
  updated_at: string;
  histori?: SuratHistoryDto[];
};

// --- MODUL: PENGADUAN WARGA (`pengaduan_warga`) ---
export type PengaduanDto = {
  id: number;
  kategori: string;
  judul: string;
  status: "OPEN" | "TRIAGED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  pelapor_nama: string;
  created_at: string;
};

export type PengaduanHistoryDto = {
  status_to: string;
  notes?: string | null;
  changed_by_nama?: string | null;
  created_at: string;
};

export type PengaduanDetailDto = PengaduanDto & {
  deskripsi: string;
  foto_bukti_url?: string | null;
  updated_at: string;
  histori?: PengaduanHistoryDto[];
};

// --- MODUL: DASHBOARD ADMIN (`dashboard_admin`) ---
export type DashboardSummaryDto = {
  total_pengajuan_surat_hari_ini: number;
  surat_pending: number;
  surat_verified: number;
  surat_processed: number;
  surat_done: number;
  surat_rejected: number;
  pengaduan_aktif: number;
  pengaduan_selesai: number;
  total_warga_aktif: number;
  total_unit_published: number;
};

export type DashboardAlertDto = {
  key: string;
  message: string;
  severity: "info" | "warning" | "critical";
  metric: number;
};

export type DashboardChartItemDto = {
  label: string;
  total: number;
};

export type DashboardTrendPointDto = {
  date: string;
  total: number;
};

export type DashboardHealthFlagDto = {
  key: string;
  label: string;
  total: number;
  severity: string;
  detail?: string | null;
};

export type DashboardQuickActionDto = {
  key: string;
  label: string;
  route_name: string;
  path: string;
  badge_count: number;
  category: string;
};

export type DashboardOverviewDto = {
  summary: DashboardSummaryDto;
  alerts: DashboardAlertDto[];
  charts: {
    surat_by_status: DashboardChartItemDto[];
    pengaduan_by_kategori: DashboardChartItemDto[];
    surat_trend: DashboardTrendPointDto[];
    pengaduan_trend: DashboardTrendPointDto[];
  };
  health: {
    content_flags: DashboardHealthFlagDto[];
    master_flags: DashboardHealthFlagDto[];
  };
  quick_actions: DashboardQuickActionDto[];
};

export type DashboardQueueItemDto = {
  id: string;
  module: string;
  title: string;
  subject_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  age_hours: number;
  aging_bucket: string;
  attention_needed: boolean;
  detail_url: string;
};

export type DashboardQueueDto = {
  data: DashboardQueueItemDto[];
  meta: {
    scope: string;
    status?: string | null;
    aging?: string | null;
    total: number;
  };
};

export type DashboardActivityItemDto = {
  module: string;
  action: string;
  title: string;
  actor_name?: string | null;
  created_at: string;
  target_id: string;
  target_url: string;
};

export type DashboardActivityDto = {
  data: DashboardActivityItemDto[];
  meta: {
    limit: number;
    returned: number;
  };
};

export type DashboardAnalyticsDto = {
  data: Record<string, unknown>;
};

export type DashboardHealthDto = {
  data: Record<string, unknown>;
};

// --- MODUL: HOMEPAGE KONTEN (`homepage_konten`) ---
export type HomepageStatDto = {
  value: string;
  label: string;
};

export type HomepageStatItemDto = HomepageStatDto & {
  id: number;
  sort_order: number;
};

export type HomepageBrandDto = {
  logoUrl: string;
  logoAlt: string;
  regionLabel: string;
};

export type HomepageContactDto = {
  address: string;
  whatsapp: string;
  mapImage: string;
};

export type HomepageCultureCardDto = {
  id: number;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
};

export type HomepageRecoveryItemDto = {
  id: number;
  icon: string;
  title: string;
  description: string;
  wrapper: string;
  sort_order: number;
};

export type HomepagePotentialOpportunityItemDto = {
  id: number;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
};

export type HomepageFacilityDto = {
  id: number;
  icon: string;
  label: string;
  sort_order: number;
};

export type HomepageGalleryItemDto = {
  id: number;
  image: string;
  alt: string;
  tall: boolean;
  caption: string;
  sort_order: number;
};

export type HomepageFooterLinkDto = {
  id: number;
  label: string;
  href: string;
  sort_order: number;
};

export type HomepageOfficeHourDto = {
  day: string;
  time: string;
  danger: boolean;
};

export type HomepagePotentialDto = {
  title: string;
  image: string;
};

export type HomepageDataDto = {
  villageName: string;
  tagline: string;
  heroDescription: string;
  heroImage: string;
  heroBadge: string;
  brand: HomepageBrandDto;
  stats: HomepageStatDto[];
  quickStatsDescription: string;
  contact: HomepageContactDto;
  namingTitle: string;
  namingDescription: string;
  namingImage: string;
  namingQuote: string;
  cultureTitle: string;
  cultureDescription: string;
  cultureCards: HomepageCultureCardDto[];
  sialangTitle: string;
  sialangDescription: string;
  sialangImage: string;
  sialangBadge: string;
  sialangStat: string;
  sialangQuote: string;
  peatTitle: string;
  peatDescription: string;
  peatQuote: string;
  peatImages: string[];
  recoveryTitle: string;
  recoveryDescription: string;
  recoveryItems: HomepageRecoveryItemDto[];
  potentialTitle: string;
  potentials: HomepagePotentialDto[];
  potentialQuote: string;
  potentialOpportunitiesTitle: string;
  potentialOpportunityItems: HomepagePotentialOpportunityItemDto[];
  facilitiesTitle: string;
  facilities: HomepageFacilityDto[];
  galleryTitle: string;
  galleryDescription: string;
  gallery: HomepageGalleryItemDto[];
  contactTitle: string;
  contactDescription: string;
  footerLinks: HomepageFooterLinkDto[];
  footerDescription: string;
  officeHours: HomepageOfficeHourDto[];
  footerBadges: string[];
  footerCopyright: string;
};

export type HomepageAdminContentDto = HomepageDataDto & {
  statsItems: HomepageStatItemDto[];
  contactAddressSource: string;
  villageNameSource: string;
};

export type HomepageContentUpdatePayload = {
  villageName: string;
  tagline: string;
  heroDescription: string;
  heroImage: string;
  heroBadge: string;
  brand: HomepageBrandDto;
  quickStatsDescription: string;
  contact: HomepageContactDto;
  namingTitle: string;
  namingDescription: string;
  namingImage: string;
  namingQuote: string;
  cultureTitle: string;
  cultureDescription: string;
  sialangTitle: string;
  sialangDescription: string;
  sialangImage: string;
  sialangBadge: string;
  sialangStat: string;
  sialangQuote: string;
  peatTitle: string;
  peatDescription: string;
  peatQuote: string;
  peatImages: string[];
  recoveryTitle: string;
  recoveryDescription: string;
  potentialTitle: string;
  potentialQuote: string;
  potentialOpportunitiesTitle: string;
  facilitiesTitle: string;
  galleryTitle: string;
  galleryDescription: string;
  contactTitle: string;
  contactDescription: string;
  footerDescription: string;
  footerBadges: string[];
  footerCopyright: string;
  officeHours: HomepageOfficeHourDto[];
};

export type HomepageCultureCardPayload = {
  icon?: string;
  title: string;
  description: string;
  sort_order?: number;
};

export type HomepageRecoveryItemPayload = {
  icon?: string;
  title: string;
  description: string;
  wrapper?: string;
  sort_order?: number;
};

export type HomepagePotentialOpportunityItemPayload = {
  icon?: string;
  title: string;
  description: string;
  sort_order?: number;
};

export type HomepageFacilityPayload = {
  icon?: string;
  label: string;
  sort_order?: number;
};

export type HomepageGalleryItemPayload = {
  image: string;
  alt: string;
  tall?: boolean;
  caption?: string;
  sort_order?: number;
};

export type HomepageFooterLinkPayload = {
  label: string;
  href: string;
  sort_order?: number;
};

export type HomepageStatItemPayload = {
  label: string;
  value: string;
  sort_order?: number;
};
