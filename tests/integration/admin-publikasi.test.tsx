import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../utils/render";
import AdminPublikasiPage from "@/app/(website)/admin/publikasi/page";

const { publikasiApiMock } = vi.hoisted(() => ({
  publikasiApiMock: {
    listAdmin: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock("@/lib/api/publikasi", () => ({
  publikasiApi: publikasiApiMock,
}));

describe("AdminPublikasiPage", () => {
  beforeEach(() => {
    publikasiApiMock.listAdmin.mockResolvedValue([
      {
        slug: "berita-desa",
        judul: "Berita Desa",
        konten_html: "<p>Isi lama</p>",
        jenis: "BERITA",
        status: "DRAFT",
        penulis_nama: "Admin Desa",
      },
    ]);
    publikasiApiMock.update.mockResolvedValue({});
    publikasiApiMock.create.mockResolvedValue({});
    publikasiApiMock.updateStatus.mockResolvedValue({});
    publikasiApiMock.remove.mockResolvedValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("pilih publikasi lalu simpan update", async () => {
    renderWithProviders(<AdminPublikasiPage />);

    await userEvent.click(await screen.findByRole("button", { name: /Berita Desa/i }));
    await userEvent.clear(screen.getByLabelText("Judul"));
    await userEvent.type(screen.getByLabelText("Judul"), "Berita Desa Baru");
    await userEvent.selectOptions(screen.getByLabelText("Status"), "PUBLISHED");
    await userEvent.click(screen.getByRole("button", { name: "Simpan Perubahan" }));

    await waitFor(() => {
      expect(publikasiApiMock.update).toHaveBeenCalledWith("berita-desa", {
        judul: "Berita Desa Baru",
        konten_html: "<p>Isi lama</p>",
        jenis: "BERITA",
        status: "PUBLISHED",
      });
    });

    expect(await screen.findByText("Publikasi berhasil diperbarui.")).toBeInTheDocument();
  });
});
