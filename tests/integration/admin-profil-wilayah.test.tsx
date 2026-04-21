import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../utils/render";
import AdminProfilWilayahPage from "@/app/(website)/admin/profil-wilayah/page";

const { authApiMock, profilApiMock } = vi.hoisted(() => ({
  authApiMock: {
    listUsers: vi.fn(),
  },
  profilApiMock: {
    listDusunAdmin: vi.fn(),
    listPerangkatAdmin: vi.fn(),
    getProfilDesaAdmin: vi.fn(),
    createDusun: vi.fn(),
    updateDusun: vi.fn(),
    deleteDusun: vi.fn(),
    createPerangkat: vi.fn(),
    updatePerangkat: vi.fn(),
    deletePerangkat: vi.fn(),
    updateProfilDesa: vi.fn(),
  },
}));

vi.mock("@/lib/api/auth", () => ({
  authApi: authApiMock,
}));

vi.mock("@/lib/api/profil", () => ({
  profilApi: profilApiMock,
}));

describe("AdminProfilWilayahPage", () => {
  beforeEach(() => {
    profilApiMock.listDusunAdmin.mockResolvedValue([
      { id: 1, nama_dusun: "Dusun Lama", kepala_dusun: "Pak Lama" },
    ]);
    profilApiMock.listPerangkatAdmin.mockResolvedValue([
      { id: 11, user_id: "user-admin", jabatan: "Sekretaris", is_published: true, foto_url: null },
    ]);
    profilApiMock.getProfilDesaAdmin.mockResolvedValue({
      visi: "Visi lama",
      misi: "Misi lama",
      sejarah: "Sejarah lama",
    });
    authApiMock.listUsers.mockResolvedValue([
      { id: "user-admin", nik: "1", nama_lengkap: "Admin Desa", role: "ADMIN", is_active: true },
      { id: "user-bumdes", nik: "2", nama_lengkap: "BUMDes Desa", role: "BUMDES", is_active: true },
    ]);
    profilApiMock.createDusun.mockResolvedValue({ id: 2, nama_dusun: "Dusun Baru", kepala_dusun: "Bu Sari" });
    profilApiMock.updateProfilDesa.mockResolvedValue({
      visi: "Visi baru",
      misi: "Misi lama",
      sejarah: "Sejarah baru",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("tambah dusun lalu simpan profil desa", async () => {
    renderWithProviders(<AdminProfilWilayahPage />);

    expect(await screen.findByDisplayValue("Visi lama")).toBeInTheDocument();

    const namaDusunInputs = screen.getAllByLabelText("Nama Dusun");
    const kepalaDusunInputs = screen.getAllByLabelText("Kepala Dusun");
    await userEvent.type(namaDusunInputs[0], "Dusun Baru");
    await userEvent.type(kepalaDusunInputs[0], "Bu Sari");
    await userEvent.click(screen.getByRole("button", { name: "Tambah Dusun" }));

    await waitFor(() => {
      expect(profilApiMock.createDusun).toHaveBeenCalledWith({
        nama_dusun: "Dusun Baru",
        kepala_dusun: "Bu Sari",
      });
    });

    expect(await screen.findByText("Dusun berhasil ditambahkan.")).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText("Visi"));
    await userEvent.type(screen.getByLabelText("Visi"), "Visi baru");
    await userEvent.clear(screen.getByLabelText("Sejarah"));
    await userEvent.type(screen.getByLabelText("Sejarah"), "Sejarah baru");
    await userEvent.click(screen.getByRole("button", { name: "Simpan Profil Desa" }));

    await waitFor(() => {
      expect(profilApiMock.updateProfilDesa).toHaveBeenCalledWith({
        visi: "Visi baru",
        misi: "Misi lama",
        sejarah: "Sejarah baru",
      });
    });
  });
});
