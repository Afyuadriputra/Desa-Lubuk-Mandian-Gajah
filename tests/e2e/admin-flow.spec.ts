import { expect, test, type Page } from "@playwright/test";

async function setupAdminApiMocks(page: Page) {
  let resetPasswordCalled = false;

  const currentUser = {
    id: "actor-superadmin",
    nik: "999",
    nama_lengkap: "Super Admin",
    nomor_hp: "08111",
    role: "SUPERADMIN",
    is_active: true,
  };

  const managedUser = {
    id: "target-user",
    nik: "1200120012001200",
    nama_lengkap: "Budi Hartono",
    nomor_hp: "08123",
    role: "WARGA",
    is_active: true,
    is_staff: false,
    is_superuser: false,
    created_at: "2026-04-21T12:00:00Z",
    updated_at: "2026-04-21T12:00:00Z",
    last_login: "2026-04-21T13:00:00Z",
    groups: [{ id: 2, name: "Operator Desa" }],
    user_permissions: [{ id: 10, app_label: "auth_warga", model: "user", codename: "change_user", name: "Can change user" }],
  };

  const publikasi = {
    judul: "Berita Desa",
    slug: "berita-desa",
    konten_html: "<p>Isi lama</p>",
    jenis: "BERITA",
    status: "DRAFT",
    penulis_nama: "Admin Desa",
    created_at: "2026-04-21T12:00:00Z",
    updated_at: "2026-04-21T12:00:00Z",
    published_at: null,
  };

  const surat = {
    id: "surat-1",
    jenis_surat: "SKU",
    status: "PENDING",
    created_at: "2026-04-21T12:00:00Z",
    updated_at: "2026-04-21T12:10:00Z",
    keperluan: "Urus usaha",
    nomor_surat: null,
    rejection_reason: null,
    pdf_url: null,
    histori: [] as Array<Record<string, unknown>>,
  };

  const pengaduan = {
    id: 22,
    kategori: "Infrastruktur",
    judul: "Lampu jalan mati",
    status: "OPEN",
    pelapor_nama: "Warga A",
    created_at: "2026-04-21T12:00:00Z",
    updated_at: "2026-04-21T12:15:00Z",
    deskripsi: "Lampu mati tiga hari.",
    foto_bukti_url: null,
    histori: [] as Array<Record<string, unknown>>,
  };

  await page.context().addCookies([
    {
      name: "csrftoken",
      value: "playwright-token",
      domain: "127.0.0.1",
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);

  await page.addInitScript(
    ({ currentUser, managedUser, publikasi, surat, pengaduan }) => {
      const state = {
        loggedIn: false,
        currentUser,
        managedUser,
        publikasi,
        surat,
        pengaduan,
      };

      // @ts-expect-error test-only global
      window.__adminMockState = state;

      const originalFetch = window.fetch.bind(window);

      window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const requestUrl =
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.toString()
              : input.url;

        if (!requestUrl.includes("/api/v1/")) {
          return originalFetch(input, init);
        }

        const url = new URL(requestUrl, window.location.origin);
        const path = url.pathname;
        const method =
          (init?.method ??
            (typeof input !== "string" && !(input instanceof URL) ? input.method : "GET") ??
            "GET").toUpperCase();

        const readJsonBody = () => {
          if (!init?.body || typeof init.body !== "string") return {};
          try {
            return JSON.parse(init.body);
          } catch {
            return {};
          }
        };

        const response = (body: unknown, status = 200) =>
          new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json" },
          });

        if (path.endsWith("/auth/csrf") && method === "GET") {
          return response({ csrfToken: "playwright-token" });
        }

        if (path.endsWith("/auth/login") && method === "POST") {
          state.loggedIn = true;
          return response(state.currentUser);
        }

        if (path.endsWith("/auth/logout") && method === "POST") {
          state.loggedIn = false;
          return response({ detail: "ok" });
        }

        if (path.endsWith("/auth/me") && method === "GET") {
          return state.loggedIn
            ? response(state.currentUser)
            : response({ detail: "Unauthorized" }, 401);
        }

        if (path.endsWith("/dashboard-admin/overview") && method === "GET") {
          return response({
            data: {
              summary: {
                total_pengajuan_surat_hari_ini: 1,
                surat_pending: 1,
                surat_verified: 0,
                surat_processed: 0,
                surat_done: 0,
                surat_rejected: 0,
                pengaduan_aktif: 1,
                pengaduan_selesai: 0,
                total_warga_aktif: 10,
                total_unit_published: 3,
              },
              alerts: [],
              quick_actions: [],
              health: {
                content_flags: [],
                master_flags: [],
              },
              charts: {
                surat_status: [],
                pengaduan_status: [],
                surat_trend: [],
                pengaduan_trend: [],
              },
            },
          });
        }

        if (path.endsWith("/dashboard-admin/recent-activity") && method === "GET") {
          return response({ data: [] });
        }

        if (path.endsWith("/dashboard-admin/content-health") && method === "GET") {
          return response({ data: { flags: [] } });
        }

        if (path.endsWith("/dashboard-admin/master-health") && method === "GET") {
          return response({ data: { flags: [] } });
        }

        if (path.endsWith("/auth/users") && method === "GET") {
          return response([state.currentUser, state.managedUser]);
        }

        if (path.endsWith(`/auth/users/${state.managedUser.id}`) && method === "GET") {
          return response(state.managedUser);
        }

        if (path.endsWith(`/auth/users/${state.managedUser.id}`) && method === "PUT") {
          Object.assign(state.managedUser, readJsonBody(), {
            updated_at: "2026-04-21T15:00:00Z",
          });
          return response(state.managedUser);
        }

        if (path.endsWith(`/auth/users/${state.managedUser.id}/reset-password`) && method === "POST") {
          // @ts-expect-error test-only global
          window.__resetPasswordCalled = true;
          return response(state.managedUser);
        }

        if (path.endsWith("/auth/groups") && method === "GET") {
          return response([{ id: 2, name: "Operator Desa" }, { id: 3, name: "Layanan Surat" }]);
        }

        if (path.endsWith("/auth/permissions") && method === "GET") {
          return response([
            {
              app_label: "auth_warga",
              model: "user",
              permissions: [{ id: 10, app_label: "auth_warga", model: "user", codename: "change_user", name: "Can change user" }],
            },
          ]);
        }

        if (path.endsWith("/publikasi/admin") && method === "GET") {
          return response([state.publikasi]);
        }

        if (path.endsWith(`/publikasi/admin/${state.publikasi.slug}`) && method === "PUT") {
          Object.assign(state.publikasi, readJsonBody(), {
            updated_at: "2026-04-21T16:00:00Z",
          });
          return response(state.publikasi);
        }

        if (path.endsWith(`/publikasi/admin/${state.publikasi.slug}/status`) && method === "PUT") {
          Object.assign(state.publikasi, readJsonBody(), {
            updated_at: "2026-04-21T16:10:00Z",
          });
          return response(state.publikasi);
        }

        if (path.endsWith(`/layanan-administrasi/mvp/surat/${state.surat.id}`) && method === "GET") {
          return response({ data: state.surat });
        }

        if (path.endsWith(`/layanan-administrasi/mvp/surat/${state.surat.id}/proses`) && method === "POST") {
          const payload = readJsonBody() as Record<string, string>;
          state.surat.histori.push({
            status_from: state.surat.status,
            status_to: payload.status,
            notes: payload.notes,
            changed_by_nama: "Admin Desa",
            created_at: "2026-04-21T17:00:00Z",
          });
          state.surat.status = payload.status;
          state.surat.nomor_surat = payload.nomor_surat ?? null;
          state.surat.rejection_reason = payload.rejection_reason ?? null;
          return response({ data: state.surat });
        }

        if (path.endsWith(`/pengaduan/mvp/${state.pengaduan.id}`) && method === "GET") {
          return response({ data: state.pengaduan });
        }

        if (path.endsWith(`/pengaduan/mvp/${state.pengaduan.id}/proses`) && method === "POST") {
          const payload = readJsonBody() as Record<string, string>;
          state.pengaduan.histori.push({
            status_to: payload.status,
            notes: payload.notes,
            changed_by_nama: "Admin Desa",
            created_at: "2026-04-21T18:00:00Z",
          });
          state.pengaduan.status = payload.status;
          return response({ data: state.pengaduan });
        }

        return response({ detail: `Unhandled mock: ${method} ${path}` }, 404);
      };
    },
    { currentUser, managedUser, publikasi, surat, pengaduan },
  );

  return {
    markLoggedIn() {
      resetPasswordCalled = false;
    },
  };
}

async function loginAsAdmin(page: Page, session: { markLoggedIn: () => void }) {
  session.markLoggedIn();
  await page.goto("/login");
  await page.evaluate(() => {
    // @ts-expect-error test-only global
    window.__adminMockState.loggedIn = true;
  });
  await page.goto("/admin");
  await expect(page.getByText("Overview operasional desa")).toBeVisible();
}

test("admin flow akun: login, edit user, reset password", async ({ page }) => {
  const state = await setupAdminApiMocks(page);
  await loginAsAdmin(page, state);

  await page.goto("/admin/akun/target-user");
  await page.getByLabel("Nama Lengkap").fill("Budi Update");
  await page.getByLabel("Nomor HP").fill("08999");
  await page.getByLabel("Role").selectOption("ADMIN");
  await page.getByLabel("Staf Admin").check();
  await page.getByRole("button", { name: "Simpan Perubahan" }).click();
  await expect(page.getByText("Perubahan akun berhasil disimpan.")).toBeVisible();

  await page.getByLabel("Password baru").fill("PasswordBaru123!");
  await page.getByLabel("Konfirmasi password baru").fill("PasswordBaru123!");
  await page.getByRole("button", { name: "Reset password akun ini" }).click();
  await expect(page.getByText("Password akun berhasil direset.")).toBeVisible();
  await expect.poll(() =>
    page.evaluate(() => {
      // @ts-expect-error test-only global
      return Boolean(window.__resetPasswordCalled);
    }),
  ).toBeTruthy();
});

test("admin flow operasional: publikasi, surat, pengaduan", async ({ page }) => {
  const state = await setupAdminApiMocks(page);
  await loginAsAdmin(page, state);

  await page.goto("/admin/publikasi");
  await page.getByRole("button", { name: /Berita Desa/i }).click();
  await page.getByLabel("Judul").fill("Berita Desa Baru");
  await page.getByLabel("Status").selectOption("PUBLISHED");
  await page.getByRole("button", { name: "Simpan Perubahan" }).click();
  await expect(page.getByText("Publikasi berhasil diperbarui.")).toBeVisible();

  await page.goto("/admin/surat-queue/surat-1");
  await page.getByLabel("Status Baru").selectOption("VERIFIED");
  await page.getByLabel("Nomor Surat").nth(1).fill("470/SKU/2026");
  await page.getByLabel("Catatan Proses").fill("Berkas lengkap");
  await page.getByRole("button", { name: "Simpan Proses" }).click();
  await expect(page.getByText("Status surat berhasil diperbarui.")).toBeVisible();

  await page.goto("/admin/pengaduan-queue/22");
  await page.getByLabel("Status Baru").selectOption("IN_PROGRESS");
  await page.getByLabel("Catatan Tindak Lanjut").fill("Sudah diteruskan ke petugas");
  await page.getByRole("button", { name: "Simpan Proses" }).click();
  await expect(page.getByText("Pengaduan berhasil diproses.")).toBeVisible();
});
