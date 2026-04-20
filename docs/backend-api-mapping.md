# Backend API Mapping for Frontend

Dokumen ini jadi konteks kerja cepat untuk frontend dan LLM saat membaca relasi antara page Next.js dan endpoint backend Django Ninja.

## Base API

```txt
/api/v1
```

## Env penting

Frontend sekarang memakai 2 env yang relevan:

```env
API_BASE_URL=http://127.0.0.1:8000/api/v1
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

Aturan praktis:
- `API_BASE_URL` dipakai aman untuk SSR/server component
- `NEXT_PUBLIC_API_BASE_URL` dipakai sebagai fallback/client-safe env
- kalau dua-duanya kosong, client default ke `http://127.0.0.1:8000/api/v1`

## Auth dan sesi

Backend pakai session Django, bukan JWT.

- request harus `credentials: "include"`
- request mutasi `POST`, `PUT`, `DELETE` perlu CSRF bila frontend beda origin dari backend
- endpoint cek sesi:
  - `GET /auth/me`

Catatan kontrak:
- `POST /auth/users/{id}/activate`
- `POST /auth/users/{id}/deactivate`
  - response hanya:
    - `id`
    - `is_active`
  - bukan full `UserDto`

## Struktur client TS

```txt
frontend/my-project/lib/api/
├── client.ts
├── types.ts
├── auth.ts
├── profil.ts
├── publikasi.ts
├── ekonomi.ts
├── surat.ts
├── pengaduan.ts
├── dashboard.ts
├── homepage.ts
└── index.ts
```

## Source of truth homepage

Status terbaru:

- homepage publik sekarang **dynamic-first**
- source utama: `GET /api/v1/homepage`
- frontend wrapper utama:
  - [homepage.ts](/mnt/d/kuliah/joki/radit/desa/frontend/my-project/lib/api/homepage.ts:1)
- render entrypoint:
  - [page.tsx](/mnt/d/kuliah/joki/radit/desa/frontend/my-project/app/page.tsx:1)

Perilaku runtime:
- server component fetch homepage sekali
- hasil dibagikan ke layout desktop/mobile
- bila backend gagal dijangkau, page fallback ke [homepage.data.ts](/mnt/d/kuliah/joki/radit/desa/frontend/my-project/app/(website)/homepage/data/homepage.data.ts:1)

## Mapping halaman frontend ke backend

### Halaman yang sudah aktif sekarang

| Frontend page | Tujuan | Endpoint backend utama | Client TS |
| --- | --- | --- | --- |
| `/` | Homepage website publik | `GET /homepage` | `homepageApi.getPublic()` |
| `/` | Homepage website publik | `GET /profil-wilayah/publik` | dipakai tidak langsung; owner domain tertentu |
| `/` | Homepage website publik | `GET /potensi-ekonomi/mvp/katalog` | digabung backend lewat aggregator homepage |

Catatan:

- homepage tidak lagi perlu gabung 3 endpoint di frontend
- agregasi `profil_wilayah + potensi_ekonomi + homepage_konten` dilakukan di backend
- `homepage.data.ts` sekarang statusnya seed/fallback, bukan source utama render

### Rekomendasi page website publik

| Frontend page | Endpoint backend | Client TS |
| --- | --- | --- |
| `/berita` | `GET /publikasi/mvp/publik` | `publikasiApi.listPublik()` |
| `/berita/[slug]` | `GET /publikasi/mvp/publik/{slug}` | `publikasiApi.detailPublik(slug)` |
| `/pengumuman` | `GET /publikasi/mvp/publik` + filter frontend `jenis=PENGUMUMAN` | `publikasiApi.listPublik()` |
| `/potensi` | `GET /potensi-ekonomi/mvp/katalog` | `ekonomiApi.listPublik()` |
| `/potensi/[id]` | `GET /potensi-ekonomi/mvp/{id}` | `ekonomiApi.detailPublik(id)` |
| `/profil-desa` | `GET /profil-wilayah/publik` | `profilApi.getPublik()` |

### Rekomendasi page portal warga

| Frontend page | Endpoint backend | Client TS |
| --- | --- | --- |
| `/login` | `POST /auth/login` | `authApi.login()` |
| `/akun` | `GET /auth/me` | `authApi.me()` |
| `/akun/password` | `POST /auth/change-password` | `authApi.changePassword()` |
| `/surat` | `GET /layanan-administrasi/mvp/surat` | `suratApi.list()` |
| `/surat/ajukan` | `POST /layanan-administrasi/mvp/surat/ajukan` | `suratApi.ajukan()` |
| `/surat/[id]` | `GET /layanan-administrasi/mvp/surat/{id}` | `suratApi.detail(id)` |
| `/surat/[id]/download` | `GET /layanan-administrasi/mvp/surat/{id}/download` | `suratApi.getDownloadUrl(id)` |
| `/pengaduan` | `GET /pengaduan/mvp` | `pengaduanApi.list()` |
| `/pengaduan/buat` | `POST /pengaduan/mvp/buat` | `pengaduanApi.buat()` |
| `/pengaduan/[id]` | `GET /pengaduan/mvp/{id}` | `pengaduanApi.detail(id)` |

Catatan kontrak `surat`:
- list/proses item ringkas:
  - `id`
  - `jenis_surat`
  - `status`
  - `created_at`
  - `pdf_url`
- detail tambahan:
  - `keperluan`
  - `nomor_surat`
  - `rejection_reason`
  - `updated_at`
  - `histori`
- history item:
  - `status_from`
  - `status_to`
  - `notes`
  - `changed_by_nama`
  - `created_at`

Catatan kontrak `pengaduan`:
- list/proses item ringkas:
  - `id`
  - `judul`
  - `kategori`
  - `status`
  - `pelapor_nama`
  - `created_at`
- detail tambahan:
  - `deskripsi`
  - `foto_bukti_url`
  - `updated_at`
  - `histori`
- history item:
  - `status_to`
  - `notes`
  - `changed_by_nama`
  - `created_at`

### Rekomendasi page admin panel

| Frontend page | Endpoint backend | Client TS |
| --- | --- | --- |
| `/admin` | `GET /dashboard-admin/overview` | `dashboardApi.overview()` |
| `/admin/surat-queue` | `GET /dashboard-admin/surat-queue` | `dashboardApi.suratQueue(filters)` |
| `/admin/pengaduan-queue` | `GET /dashboard-admin/pengaduan-queue` | `dashboardApi.pengaduanQueue(filters)` |
| `/admin/activity` | `GET /dashboard-admin/recent-activity` | `dashboardApi.recentActivity(limit)` |
| `/admin/analytics/surat` | `GET /dashboard-admin/surat-analytics` | `dashboardApi.suratAnalytics(days)` |
| `/admin/analytics/pengaduan` | `GET /dashboard-admin/pengaduan-analytics` | `dashboardApi.pengaduanAnalytics(days)` |
| `/admin/health/content` | `GET /dashboard-admin/content-health` | `dashboardApi.contentHealth()` |
| `/admin/health/master` | `GET /dashboard-admin/master-health` | `dashboardApi.masterHealth()` |
| `/admin/homepage` | `GET /homepage/admin/content` | `homepageApi.getAdminContent()` |
| `/admin/homepage` | `PUT /homepage/admin/content` | `homepageApi.updateContent()` |
| `/admin/homepage/culture-cards` | `POST/PUT/DELETE /homepage/admin/culture-cards/*` | `homepageApi.create/update/deleteCultureCard()` |
| `/admin/homepage/recovery-items` | `POST/PUT/DELETE /homepage/admin/recovery-items/*` | `homepageApi.create/update/deleteRecoveryItem()` |
| `/admin/homepage/potential-opportunities` | `POST/PUT/DELETE /homepage/admin/potential-opportunities/*` | `homepageApi.create/update/deletePotentialOpportunity()` |
| `/admin/homepage/facilities` | `POST/PUT/DELETE /homepage/admin/facilities/*` | `homepageApi.create/update/deleteFacility()` |
| `/admin/homepage/gallery` | `POST/PUT/DELETE /homepage/admin/gallery/*` | `homepageApi.create/update/deleteGalleryItem()` |
| `/admin/homepage/footer-links` | `POST/PUT/DELETE /homepage/admin/footer-links/*` | `homepageApi.create/update/deleteFooterLink()` |
| `/admin/homepage/stats` | `POST/PUT/DELETE /homepage/admin/stats/*` | `homepageApi.create/update/deleteStat()` |

Catatan kontrak `potensi_ekonomi`:
- `POST /potensi-ekonomi/mvp/admin/buat`
  - wajib `multipart/form-data`
  - frontend helper:
    - `buildUnitUsahaFormData()`
- `PUT /potensi-ekonomi/mvp/admin/{id}`
  - JSON biasa
- `DELETE /potensi-ekonomi/mvp/admin/{id}`
  - response plain:
    - `detail`

## Kontrak homepage publik

Endpoint:

```txt
GET /api/v1/homepage
```

Owner data ringkas:

- `profil_wilayah`
  - `stats.Dusun`
- `potensi_ekonomi`
  - `potentials`
- `homepage_konten`
  - hero
  - branding
  - naming
  - culture
  - sialang
  - peat
  - recovery
  - gallery
  - footer
  - contact homepage
  - stats manual homepage

Field penting yang sekarang sudah dynamic:

- `villageName`
- `tagline`
- `heroDescription`
- `heroImage`
- `heroBadge`
- `brand.*`
- `stats`
- `quickStatsDescription`
- `contact.*`
- `naming*`
- `culture*`
- `sialang*`
- `peat*`
- `recoveryTitle`
- `recoveryDescription`
- `recoveryItems`
- `potentialTitle`
- `potentials`
- `potentialQuote`
- `potentialOpportunitiesTitle`
- `potentialOpportunityItems`
- `facilitiesTitle`
- `facilities`
- `galleryTitle`
- `galleryDescription`
- `gallery`
- `footerLinks`
- `footerDescription`
- `officeHours`
- `footerBadges`
- `footerCopyright`

## Kontrak homepage admin

Endpoint utama:

```txt
GET /api/v1/homepage/admin/content
PUT /api/v1/homepage/admin/content
```

Update payload sekarang mencakup scalar field berikut:

- hero dan branding
- contact homepage
- quick stats description
- naming
- culture
- sialang
- peat
- `recoveryTitle`
- `recoveryDescription`
- `potentialTitle`
- `potentialQuote`
- `potentialOpportunitiesTitle`
- `facilitiesTitle`
- `galleryTitle`
- `galleryDescription`
- `contactTitle`
- `contactDescription`
- footer
- office hours

## Mapping komponen homepage ke field backend

| Komponen | Field utama |
| --- | --- |
| `HomeNavbar` / `MobileHeader` | `brand.logoUrl`, `brand.logoAlt`, `brand.regionLabel`, `villageName` |
| `HeroSection` / `HeroMobile` | `heroImage`, `heroBadge`, `villageName`, `tagline`, `heroDescription` |
| `QuickStatsSection` / `QuickStatsMobile` | `stats`, `quickStatsDescription` |
| `NamingSection` / `NamingMobile` | `namingTitle`, `namingDescription`, `namingImage`, `namingQuote` |
| `CultureSection` / `CultureMobile` | `cultureTitle`, `cultureDescription`, `cultureCards` |
| `SialangSection` / `SialangMobile` | `sialangTitle`, `sialangDescription`, `sialangImage`, `sialangBadge`, `sialangStat`, `sialangQuote` |
| `PeatSection` / `PeatMobile` | `peatTitle`, `peatDescription`, `peatQuote`, `peatImages` |
| `RecoverySection` / `RecoveryMobile` | `recoveryTitle`, `recoveryDescription`, `recoveryItems` |
| `PotentialSection` / `PotentialMobile` | `potentialTitle`, `potentials`, `potentialQuote`, `potentialOpportunitiesTitle`, `potentialOpportunityItems` |
| `FacilitiesSection` / `FacilitiesMobile` | `facilitiesTitle`, `facilities` |
| `GallerySection` / `GalleryMobile` | `galleryTitle`, `galleryDescription`, `gallery` |
| `ContactSection` / `ContactMobile` | `contactTitle`, `contactDescription`, `contact.address`, `contact.whatsapp`, `contact.mapImage` |
| `HomeFooter` / `FooterMobile` | `footerLinks`, `footerDescription`, `officeHours`, `footerBadges`, `footerCopyright`, `villageName` |

## Guard dan fallback frontend

Status terbaru:

- `app/page.tsx` fetch homepage di server component
- bila API gagal, page fallback ke `homepage.data.ts`
- mapper `mapHomepageDtoToViewModel()` membersihkan field kosong/null
- item `gallery` dan `potentials` dengan `image=""` dibuang dari view model
- komponen image tunggal seperti navbar/hero/naming/sialang/contact sudah di-guard agar tidak render `src=""`

## Contoh pemakaian

### Server component Next.js

```tsx
import { getHomepageBackendData } from "@/lib/api/homepage";

export default async function HomePage() {
  const data = await getHomepageBackendData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### Login action

```ts
import { authApi } from "@/lib/api/auth";

await authApi.login({
  nik: "1234123412341234",
  password: "password123",
});
```

## Catatan implementasi

- homepage frontend sekarang dynamic-first, bukan static-first
- `homepage.data.ts` jangan dipakai langsung di komponen homepage
- kalau SSR gagal fetch backend, cek env `API_BASE_URL`
- dashboard admin sudah punya quick action `kelola homepage` dan content health homepage
- bila nanti admin UI homepage dibangun, pakai `homepageApi` yang sudah ada; jangan buat client baru
