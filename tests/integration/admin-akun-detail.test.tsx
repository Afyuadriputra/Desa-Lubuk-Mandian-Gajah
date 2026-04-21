import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../utils/render";
import AdminAkunDetailPage from "@/app/(website)/admin/akun/[id]/page";

const { authApiMock } = vi.hoisted(() => ({
  authApiMock: {
    me: vi.fn(),
    getUserDetail: vi.fn(),
    listGroups: vi.fn(),
    listPermissions: vi.fn(),
    updateUser: vi.fn(),
    resetUserPassword: vi.fn(),
  },
}));

vi.mock("@/lib/api/auth", () => ({
  authApi: authApiMock,
}));

describe("AdminAkunDetailPage", () => {
  beforeEach(() => {
    globalThis.__mockRouterParams = { id: "target-user" };

    authApiMock.me.mockResolvedValue({
      id: "actor-superadmin",
      role: "SUPERADMIN",
    });
    authApiMock.getUserDetail.mockResolvedValue({
      id: "target-user",
      nik: "1200120012001200",
      nama_lengkap: "Budi Hartono",
      nomor_hp: "08123",
      role: "WARGA",
      is_active: true,
      is_staff: false,
      is_superuser: false,
      created_at: "2026-04-21T12:00:00Z",
      updated_at: "2026-04-21T12:30:00Z",
      last_login: "2026-04-21T13:00:00Z",
      groups: [{ id: 2, name: "Operator Desa" }],
      user_permissions: [{ id: 10, codename: "change_user", name: "Can change user" }],
    });
    authApiMock.listGroups.mockResolvedValue([
      { id: 2, name: "Operator Desa" },
      { id: 3, name: "Layanan Surat" },
    ]);
    authApiMock.listPermissions.mockResolvedValue([
      {
        app_label: "auth_warga",
        model: "user",
        permissions: [{ id: 10, codename: "change_user", name: "Can change user" }],
      },
    ]);
    authApiMock.updateUser.mockResolvedValue({
      id: "target-user",
      nik: "1200120012001200",
      nama_lengkap: "Budi Update",
      nomor_hp: "08999",
      role: "ADMIN",
      is_active: true,
      is_staff: true,
      is_superuser: false,
      created_at: "2026-04-21T12:00:00Z",
      updated_at: "2026-04-21T12:45:00Z",
      last_login: "2026-04-21T13:00:00Z",
      groups: [{ id: 2, name: "Operator Desa" }, { id: 3, name: "Layanan Surat" }],
      user_permissions: [{ id: 10, codename: "change_user", name: "Can change user" }],
    });
    authApiMock.resetUserPassword.mockResolvedValue({ detail: "ok" });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("load detail akun, simpan perubahan, reset password", async () => {
    renderWithProviders(<AdminAkunDetailPage />);

    expect(await screen.findByDisplayValue("Budi Hartono")).toBeInTheDocument();

    await userEvent.clear(screen.getByDisplayValue("Budi Hartono"));
    await userEvent.type(screen.getByLabelText("Nama Lengkap"), "Budi Update");
    await userEvent.clear(screen.getByDisplayValue("08123"));
    await userEvent.type(screen.getByLabelText("Nomor HP"), "08999");
    await userEvent.selectOptions(screen.getByLabelText("Role"), "ADMIN");
    await userEvent.click(screen.getByLabelText("Staf Admin"));
    await userEvent.click(screen.getByLabelText("Layanan Surat"));
    await userEvent.click(screen.getByRole("button", { name: "Simpan Perubahan" }));

    await waitFor(() => {
      expect(authApiMock.updateUser).toHaveBeenCalledWith("target-user", {
        nama_lengkap: "Budi Update",
        nomor_hp: "08999",
        role: "ADMIN",
        is_active: true,
        is_staff: true,
        is_superuser: false,
        groups: [2, 3],
        user_permissions: [10],
      });
    });

    expect(await screen.findByText("Perubahan akun berhasil disimpan.")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Password baru"), "PasswordBaru123!");
    await userEvent.type(screen.getByLabelText("Konfirmasi password baru"), "PasswordBaru123!");
    await userEvent.click(screen.getByRole("button", { name: "Reset password akun ini" }));

    await waitFor(() => {
      expect(authApiMock.resetUserPassword).toHaveBeenCalledWith("target-user", {
        new_password: "PasswordBaru123!",
        confirm_password: "PasswordBaru123!",
      });
    });
  });
});
