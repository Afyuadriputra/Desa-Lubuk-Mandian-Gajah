import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../utils/render";
import AdminPotensiEkonomiPage from "@/app/(website)/admin/potensi-ekonomi/page";

const { ekonomiApiMock } = vi.hoisted(() => ({
  ekonomiApiMock: {
    listAdmin: vi.fn(),
    detailPublik: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock("@/lib/api/ekonomi", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api/ekonomi")>("@/lib/api/ekonomi");
  return {
    ...actual,
    ekonomiApi: ekonomiApiMock,
  };
});

describe("AdminPotensiEkonomiPage", () => {
  beforeEach(() => {
    ekonomiApiMock.listAdmin.mockResolvedValue({
      data: [
        {
          id: 1,
          nama_usaha: "Kopi Desa",
          kategori: "UMKM",
          is_published: false,
          created_at: "2026-04-21T12:00:00Z",
        },
      ],
    });
    ekonomiApiMock.create.mockResolvedValue({ data: { id: 99 } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("buat unit usaha baru via FormData", async () => {
    renderWithProviders(<AdminPotensiEkonomiPage />);

    expect(await screen.findByText("Kopi Desa")).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText("Nama Usaha"));
    await userEvent.type(screen.getByLabelText("Nama Usaha"), "Wisata Sungai");
    await userEvent.clear(screen.getByLabelText("Kategori"));
    await userEvent.type(screen.getByLabelText("Kategori"), "WISATA");
    await userEvent.type(screen.getByLabelText("Kontak WA"), "08123456789");
    await userEvent.type(screen.getByLabelText("Harga Tiket"), "15000");
    await userEvent.type(screen.getByLabelText("Deskripsi"), "Wisata alam tepi sungai.");
    await userEvent.type(screen.getByLabelText("Fasilitas"), "Gazebo dan parkir");
    await userEvent.click(screen.getByLabelText("Tampilkan di publik"));
    await userEvent.click(screen.getByRole("button", { name: "Buat Unit Usaha" }));

    await waitFor(() => {
      expect(ekonomiApiMock.create).toHaveBeenCalledTimes(1);
    });

    const payload = ekonomiApiMock.create.mock.calls[0][0] as FormData;
    expect(payload.get("nama_usaha")).toBe("Wisata Sungai");
    expect(payload.get("kategori")).toBe("WISATA");
    expect(payload.get("kontak_wa")).toBe("08123456789");
    expect(payload.get("harga_tiket")).toBe("15000");
    expect(payload.get("is_published")).toBe("true");
    expect(await screen.findByText("Unit usaha berhasil dibuat.")).toBeInTheDocument();
  });
});
