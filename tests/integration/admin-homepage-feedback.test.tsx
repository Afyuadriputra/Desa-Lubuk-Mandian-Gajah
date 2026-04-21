/* eslint-disable @next/next/no-img-element */
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../utils/render";
import AdminHomepageCMSPage from "@/app/(website)/admin/homepage/page";

const { homepageApiMock, toastMock } = vi.hoisted(() => ({
  homepageApiMock: {
    getAdminContent: vi.fn(),
    updateContent: vi.fn(),
    createCultureCard: vi.fn(),
    updateCultureCard: vi.fn(),
    deleteCultureCard: vi.fn(),
    createRecoveryItem: vi.fn(),
    updateRecoveryItem: vi.fn(),
    deleteRecoveryItem: vi.fn(),
    createPotentialOpportunity: vi.fn(),
    updatePotentialOpportunity: vi.fn(),
    deletePotentialOpportunity: vi.fn(),
    createFacility: vi.fn(),
    updateFacility: vi.fn(),
    deleteFacility: vi.fn(),
    createGalleryItem: vi.fn(),
    updateGalleryItem: vi.fn(),
    deleteGalleryItem: vi.fn(),
    createFooterLink: vi.fn(),
    updateFooterLink: vi.fn(),
    deleteFooterLink: vi.fn(),
    createStat: vi.fn(),
    updateStat: vi.fn(),
    deleteStat: vi.fn(),
  },
  toastMock: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: toastMock,
}));

vi.mock("next/image", () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; unoptimized?: boolean },
  ) => {
    const nextProps = { ...props };
    delete nextProps.fill;
    delete nextProps.unoptimized;
    return <img {...nextProps} alt={nextProps.alt ?? ""} />;
  },
}));

vi.mock("@/lib/api/homepage", () => ({
  homepageApi: homepageApiMock,
}));

function createHomepageContent() {
  return {
    villageName: "Desa Segamai",
    tagline: "Desa wisata gambut",
    heroDescription: "Deskripsi hero awal",
    heroImage: "https://example.com/hero.jpg",
    heroBadge: "Desa inovatif",
    brand: {
      logoUrl: "https://example.com/logo.png",
      logoAlt: "Logo Desa Segamai",
      regionLabel: "Kabupaten Bengkalis",
    },
    quickStatsDescription: "Stat cepat desa",
    contact: {
      address: "Jl. Raya Segamai",
      whatsapp: "08123456789",
      mapImage: "https://example.com/map.jpg",
    },
    namingTitle: "Asal Usul Segamai",
    namingDescription: "Cerita awal desa",
    namingImage: "https://example.com/naming.jpg",
    namingQuote: "Warisan turun-temurun",
    cultureTitle: "Budaya",
    cultureDescription: "Budaya lokal",
    sialangTitle: "Hutan Sialang",
    sialangDescription: "Sialang description",
    sialangImage: "https://example.com/sialang.jpg",
    sialangBadge: "Warisan",
    sialangStat: "12 titik",
    sialangQuote: "Menjaga alam",
    peatTitle: "Gambut",
    peatDescription: "Ekosistem gambut",
    peatQuote: "Pulih bersama",
    peatImages: ["https://example.com/peat-1.jpg"],
    recoveryTitle: "Pemulihan",
    recoveryDescription: "Pemulihan ekonomi",
    potentialTitle: "Potensi",
    potentialQuote: "Potensi tumbuh",
    potentialOpportunitiesTitle: "Peluang",
    facilitiesTitle: "Fasilitas",
    galleryTitle: "Galeri",
    galleryDescription: "Galeri desa",
    contactTitle: "Kontak",
    contactDescription: "Hubungi kami",
    footerDescription: "Footer desa",
    footerBadges: ["Aktif", "Melayani"],
    footerCopyright: "2026 Desa Segamai",
    officeHours: [{ day: "Senin", time: "08:00 - 16:00", danger: false }],
    cultureCards: [
      { id: 1, icon: "leaf", title: "Adat", description: "Budaya adat", sort_order: 0 },
    ],
    recoveryItems: [
      { id: 1, icon: "sparkles", title: "UMKM", description: "Pulih", wrapper: "wrap", sort_order: 0 },
    ],
    potentialOpportunityItems: [
      { id: 1, icon: "briefcase", title: "Wisata", description: "Peluang", sort_order: 0 },
    ],
    facilities: [{ id: 1, icon: "school", label: "Sekolah", sort_order: 0 }],
    gallery: [
      {
        id: 1,
        image: "https://example.com/gallery-1.jpg",
        alt: "Galeri 1",
        caption: "Galeri awal",
        tall: false,
        sort_order: 0,
      },
    ],
    footerLinks: [{ id: 1, label: "Profil", href: "/profil", sort_order: 0 }],
    statsItems: [{ id: 1, label: "Penduduk", value: "1000", sort_order: 0 }],
  };
}

describe("AdminHomepageCMSPage feedback", () => {
  beforeEach(() => {
    toastMock.success.mockReset();
    toastMock.error.mockReset();
    homepageApiMock.updateContent.mockReset();
    homepageApiMock.deleteCultureCard.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("menandai dirty state lalu simpan sukses dengan toast", async () => {
    const initialData = createHomepageContent();
    const updatedData = {
      ...initialData,
      villageName: "Desa Segamai Baru",
    };

    homepageApiMock.getAdminContent
      .mockResolvedValueOnce({ data: initialData })
      .mockResolvedValueOnce({ data: updatedData });
    homepageApiMock.updateContent.mockResolvedValue({ data: updatedData });

    renderWithProviders(<AdminHomepageCMSPage />);

    const villageNameInput = await screen.findByDisplayValue("Desa Segamai");
    await userEvent.clear(villageNameInput);
    await userEvent.type(villageNameInput, "Desa Segamai Baru");

    expect(screen.getByText("Belum disimpan")).toBeInTheDocument();

    await userEvent.click(screen.getAllByRole("button", { name: /Publish konten/i })[0]);

    await waitFor(() => {
      expect(homepageApiMock.updateContent).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findAllByText("Perubahan konten utama berhasil disimpan.")).not.toHaveLength(0);
    expect(toastMock.success).toHaveBeenCalledWith("Perubahan konten utama berhasil disimpan.");

    await waitFor(() => {
      expect(screen.queryByText("Belum disimpan")).not.toBeInTheDocument();
    });
  });

  it("menampilkan dialog konfirmasi sebelum hapus culture card", async () => {
    const initialData = {
      ...createHomepageContent(),
      recoveryItems: [],
      potentialOpportunityItems: [],
      facilities: [],
      gallery: [],
      footerLinks: [],
      statsItems: [],
    };
    const afterDelete = {
      ...initialData,
      cultureCards: [],
    };

    homepageApiMock.getAdminContent
      .mockResolvedValueOnce({ data: initialData })
      .mockResolvedValueOnce({ data: afterDelete });
    homepageApiMock.deleteCultureCard.mockResolvedValue({ detail: "ok" });

    renderWithProviders(<AdminHomepageCMSPage />);

    expect(await screen.findAllByText("Culture Cards")).not.toHaveLength(0);

    await userEvent.click(screen.getByRole("button", { name: "Hapus" }));

    expect(await screen.findByText("Hapus item ini?")).toBeInTheDocument();
    expect(homepageApiMock.deleteCultureCard).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: "Hapus item" }));

    await waitFor(() => {
      expect(homepageApiMock.deleteCultureCard).toHaveBeenCalledWith(1);
    });

    expect(await screen.findAllByText("Culture card dihapus.")).not.toHaveLength(0);
    expect(toastMock.success).toHaveBeenCalledWith("Culture card dihapus.");
  });
});
