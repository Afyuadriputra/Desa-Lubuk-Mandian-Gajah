import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../utils/render";
import AdminPengaduanDetailPage from "@/app/(website)/admin/pengaduan-queue/[id]/page";

const { pengaduanApiMock } = vi.hoisted(() => ({
  pengaduanApiMock: {
    detail: vi.fn(),
    proses: vi.fn(),
  },
}));

vi.mock("@/lib/api/pengaduan", () => ({
  pengaduanApi: pengaduanApiMock,
}));

describe("AdminPengaduanDetailPage", () => {
  beforeEach(() => {
    globalThis.__mockRouterParams = { id: "22" };

    pengaduanApiMock.detail
      .mockResolvedValueOnce({
        data: {
          id: 22,
          judul: "Lampu jalan mati",
          kategori: "Infrastruktur",
          status: "OPEN",
          pelapor_nama: "Warga A",
          deskripsi: "Lampu mati tiga hari.",
          foto_bukti_url: null,
          histori: [],
        },
      })
      .mockResolvedValueOnce({
        data: {
          id: 22,
          judul: "Lampu jalan mati",
          kategori: "Infrastruktur",
          status: "IN_PROGRESS",
          pelapor_nama: "Warga A",
          deskripsi: "Lampu mati tiga hari.",
          foto_bukti_url: null,
          histori: [
            {
              status_to: "IN_PROGRESS",
              changed_by_nama: "Admin Desa",
              created_at: "2026-04-21T14:20:00Z",
              notes: "Sudah diteruskan ke petugas",
            },
          ],
        },
      });
    pengaduanApiMock.proses.mockResolvedValue({ detail: "ok" });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("proses pengaduan lalu tampil riwayat baru", async () => {
    renderWithProviders(<AdminPengaduanDetailPage />);

    expect(await screen.findByText("Lampu jalan mati")).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByLabelText("Status Baru"), "IN_PROGRESS");
    await userEvent.type(screen.getByLabelText("Catatan Tindak Lanjut"), "Sudah diteruskan ke petugas");
    await userEvent.click(screen.getByRole("button", { name: "Simpan Proses" }));

    await waitFor(() => {
      expect(pengaduanApiMock.proses).toHaveBeenCalledWith(22, {
        status: "IN_PROGRESS",
        notes: "Sudah diteruskan ke petugas",
      });
    });

    expect(await screen.findByText("Pengaduan berhasil diproses.")).toBeInTheDocument();
    const historySection = screen.getByRole("heading", { name: "Riwayat Proses" }).closest('[data-slot="card"]');
    expect(historySection).not.toBeNull();
    expect(within(historySection as HTMLElement).getByText("Sedang Ditangani")).toBeInTheDocument();
  });
});
