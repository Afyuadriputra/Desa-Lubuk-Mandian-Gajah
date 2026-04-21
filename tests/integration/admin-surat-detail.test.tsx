import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../utils/render";
import AdminSuratDetailPage from "@/app/(website)/admin/surat-queue/[id]/page";

const { suratApiMock } = vi.hoisted(() => ({
  suratApiMock: {
    detail: vi.fn(),
    proses: vi.fn(),
  },
}));

vi.mock("@/lib/api/surat", () => ({
  suratApi: suratApiMock,
}));

describe("AdminSuratDetailPage", () => {
  beforeEach(() => {
    globalThis.__mockRouterParams = { id: "surat-1" };

    suratApiMock.detail
      .mockResolvedValueOnce({
        data: {
          id: "surat-1",
          jenis_surat: "SKU",
          status: "PENDING",
          nomor_surat: null,
          keperluan: "Urus usaha",
          pdf_url: null,
          rejection_reason: null,
          histori: [],
        },
      })
      .mockResolvedValueOnce({
        data: {
          id: "surat-1",
          jenis_surat: "SKU",
          status: "VERIFIED",
          nomor_surat: "470/SKU/2026",
          keperluan: "Urus usaha",
          pdf_url: null,
          rejection_reason: null,
          histori: [
            {
              status_from: "PENDING",
              status_to: "VERIFIED",
              changed_by_nama: "Admin Desa",
              created_at: "2026-04-21T14:00:00Z",
              notes: "Berkas lengkap",
            },
          ],
        },
      });
    suratApiMock.proses.mockResolvedValue({ detail: "ok" });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("proses surat lalu muat ulang riwayat", async () => {
    renderWithProviders(<AdminSuratDetailPage />);

    expect(await screen.findByText("Surat Keterangan Usaha")).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByLabelText("Status Baru"), "VERIFIED");
    await userEvent.type(screen.getAllByLabelText("Nomor Surat")[1], "470/SKU/2026");
    await userEvent.type(screen.getByLabelText("Catatan Proses"), "Berkas lengkap");
    await userEvent.click(screen.getByRole("button", { name: "Simpan Proses" }));

    await waitFor(() => {
      expect(suratApiMock.proses).toHaveBeenCalledWith("surat-1", {
        status: "VERIFIED",
        notes: "Berkas lengkap",
        nomor_surat: "470/SKU/2026",
        rejection_reason: "",
      });
    });

    expect(await screen.findByText("Status surat berhasil diperbarui.")).toBeInTheDocument();
    const historySection = screen.getByRole("heading", { name: "Riwayat Proses" }).closest('[data-slot="card"]');
    expect(historySection).not.toBeNull();
    const history = within(historySection as HTMLElement);
    expect(history.getByText(/Menunggu Verifikasi/i)).toBeInTheDocument();
    expect(history.getByText(/Terverifikasi/i)).toBeInTheDocument();
  });
});
