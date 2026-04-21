import { expect, test, type Locator, type Page } from "@playwright/test";

type AdminMockOptions = {
  loggedIn?: boolean;
  failOverview?: boolean;
  failPublikasiList?: boolean;
  failSuratQueue?: boolean;
  failPengaduanQueue?: boolean;
  failHomepageAdminContent?: boolean;
  publikasiItems?: Array<Record<string, unknown>>;
};

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

async function setupAdminApiMocks(page: Page, options: AdminMockOptions = {}) {
  const state = {
    loggedIn: options.loggedIn ?? false,
    currentUser: {
      id: "actor-superadmin",
      nik: "999",
      nama_lengkap: "Super Admin",
      nomor_hp: "08111",
      role: "SUPERADMIN",
      is_active: true,
    },
    managedUser: {
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
      user_permissions: [
        {
          id: 10,
          app_label: "auth_warga",
          model: "user",
          codename: "change_user",
          name: "Can change user",
        },
      ],
    },
    publikasiItems:
      options.publikasiItems ??
      [
        {
          judul: "Berita Desa",
          slug: "berita-desa",
          konten_html: "<p>Isi lama</p>",
          jenis: "BERITA",
          status: "DRAFT",
          penulis_nama: "Admin Desa",
          created_at: "2026-04-21T12:00:00Z",
          updated_at: "2026-04-21T12:00:00Z",
          published_at: null,
        },
      ],
    suratQueueItems: [
      {
        id: "surat-1",
        title: "SKU Budi Hartono",
        module: "Surat Administrasi",
        subject_name: "Budi Hartono",
        status: "PENDING",
        created_at: "2026-04-21T08:00:00Z",
        updated_at: "2026-04-21T08:30:00Z",
        age_hours: 12,
        aging_bucket: "warning",
        attention_needed: true,
        scope: "today",
      },
      {
        id: "surat-2",
        title: "Domisili Siti Aminah",
        module: "Surat Administrasi",
        subject_name: "Siti Aminah",
        status: "DONE",
        created_at: "2026-04-18T08:00:00Z",
        updated_at: "2026-04-18T09:00:00Z",
        age_hours: 70,
        aging_bucket: "overdue",
        attention_needed: false,
        scope: "week",
      },
    ],
    pengaduanQueueItems: [
      {
        id: "22",
        title: "Lampu jalan mati",
        module: "Pengaduan Warga",
        subject_name: "Warga A",
        status: "OPEN",
        created_at: "2026-04-21T06:00:00Z",
        updated_at: "2026-04-21T07:00:00Z",
        age_hours: 14,
        aging_bucket: "warning",
        attention_needed: true,
        scope: "today",
      },
      {
        id: "23",
        title: "Drainase tersumbat",
        module: "Pengaduan Warga",
        subject_name: "Warga B",
        status: "RESOLVED",
        created_at: "2026-04-19T06:00:00Z",
        updated_at: "2026-04-20T07:00:00Z",
        age_hours: 48,
        aging_bucket: "overdue",
        attention_needed: false,
        scope: "week",
      },
    ],
    surat: {
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
    },
    pengaduan: {
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
    },
    homepageContent: createHomepageContent(),
  };

  const calls = {
    resetPasswordCalled: false,
    homepageSaved: false,
    cultureCardCreated: false,
    lastSuratQueueQuery: "",
    lastPengaduanQueueQuery: "",
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

  await page.route("**/api/v1/**", async (route, request) => {
    const url = new URL(request.url());
    const path = url.pathname;
    const method = request.method().toUpperCase();
    const postData = request.postData();

    const readJsonBody = () => {
      if (!postData) return {};
      try {
        return JSON.parse(postData);
      } catch {
        return {};
      }
    };

    const fulfillJson = (body: unknown, status = 200) =>
      route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify(body),
      });

    const filterQueue = (items: typeof state.suratQueueItems) =>
      items.filter((item) => {
        const scope = url.searchParams.get("scope");
        const status = url.searchParams.get("status");
        const aging = url.searchParams.get("aging");
        if (scope && scope !== "all" && item.scope !== scope) return false;
        if (status && item.status !== status) return false;
        if (aging && item.aging_bucket !== aging) return false;
        return true;
      });

    if (path.endsWith("/auth/csrf") && method === "GET") {
      return fulfillJson({ csrfToken: "playwright-token" });
    }

    if (path.endsWith("/auth/login") && method === "POST") {
      state.loggedIn = true;
      return fulfillJson(state.currentUser);
    }

    if (path.endsWith("/auth/logout") && method === "POST") {
      state.loggedIn = false;
      return fulfillJson({ detail: "ok" });
    }

    if (path.endsWith("/auth/me") && method === "GET") {
      return state.loggedIn
        ? fulfillJson(state.currentUser)
        : fulfillJson({ detail: "Unauthorized" }, 401);
    }

    if (path.endsWith("/dashboard-admin/overview") && method === "GET") {
      if (options.failOverview) {
        return fulfillJson({ detail: "Overview error" }, 500);
      }
      return fulfillJson({
        data: {
          summary: {
            total_pengajuan_surat_hari_ini: 2,
            surat_pending: 1,
            surat_verified: 1,
            surat_processed: 0,
            surat_done: 1,
            surat_rejected: 0,
            pengaduan_aktif: 2,
            pengaduan_selesai: 1,
            total_warga_aktif: 10,
            total_unit_published: 3,
          },
          alerts: [
            {
              key: "surat-warning",
              severity: "warning",
              message: "Surat pending perlu ditinjau hari ini",
              metric: 1,
            },
          ],
          quick_actions: [
            {
              key: "goto-surat",
              label: "Buka antrean surat",
              path: "/surat-queue",
              badge_count: 1,
              category: "Operasional",
            },
          ],
          health: {
            content_flags: [
              {
                key: "homepage-empty",
                label: "Homepage kosong",
                total: 1,
                detail: "Hero perlu dipoles",
                severity: "warning",
              },
            ],
            master_flags: [
              {
                key: "dusun-gap",
                label: "Dusun belum lengkap",
                total: 1,
                detail: "Satu dusun belum ada perangkat",
                severity: "critical",
              },
            ],
          },
          charts: {
            surat_trend: [{ label: "Sen", total: 2 }],
            surat_by_status: [{ label: "Pending", total: 1 }],
            pengaduan_trend: [{ label: "Sen", total: 2 }],
            pengaduan_by_kategori: [{ label: "Infrastruktur", total: 1 }],
          },
        },
      });
    }

    if (path.endsWith("/dashboard-admin/recent-activity") && method === "GET") {
      return fulfillJson({
        data: [
          {
            title: "Publikasi diperbarui",
            action: "update",
            module: "Publikasi",
            created_at: "2026-04-21T10:00:00Z",
            target_url: "/admin/publikasi",
            actor_name: "Super Admin",
          },
        ],
      });
    }

    if (path.endsWith("/dashboard-admin/content-health") && method === "GET") {
      return fulfillJson({
        data: {
          flags: [
            { key: "gallery", label: "Galeri tipis", total: 1, detail: "Tambah item galeri", severity: "warning" },
          ],
        },
      });
    }

    if (path.endsWith("/dashboard-admin/master-health") && method === "GET") {
      return fulfillJson({
        data: {
          flags: [
            { key: "perangkat", label: "Perangkat kurang", total: 1, detail: "Lengkapi data", severity: "critical" },
          ],
        },
      });
    }

    if (path.endsWith("/dashboard-admin/surat-queue") && method === "GET") {
      if (options.failSuratQueue) {
        return fulfillJson({ detail: "Surat queue error" }, 500);
      }
      calls.lastSuratQueueQuery = url.search;
      return fulfillJson({ data: filterQueue(state.suratQueueItems) });
    }

    if (path.endsWith("/dashboard-admin/pengaduan-queue") && method === "GET") {
      if (options.failPengaduanQueue) {
        return fulfillJson({ detail: "Pengaduan queue error" }, 500);
      }
      calls.lastPengaduanQueueQuery = url.search;
      return fulfillJson({ data: filterQueue(state.pengaduanQueueItems) });
    }

    if (path.endsWith("/auth/users") && method === "GET") {
      return fulfillJson([state.currentUser, state.managedUser]);
    }

    if (path.endsWith(`/auth/users/${state.managedUser.id}`) && method === "GET") {
      return fulfillJson(state.managedUser);
    }

    if (path.endsWith(`/auth/users/${state.managedUser.id}`) && method === "PUT") {
      Object.assign(state.managedUser, readJsonBody(), {
        updated_at: "2026-04-21T15:00:00Z",
      });
      return fulfillJson(state.managedUser);
    }

    if (path.endsWith(`/auth/users/${state.managedUser.id}/reset-password`) && method === "POST") {
      calls.resetPasswordCalled = true;
      return fulfillJson(state.managedUser);
    }

    if (path.endsWith("/auth/groups") && method === "GET") {
      return fulfillJson([{ id: 2, name: "Operator Desa" }, { id: 3, name: "Layanan Surat" }]);
    }

    if (path.endsWith("/auth/permissions") && method === "GET") {
      return fulfillJson([
        {
          app_label: "auth_warga",
          model: "user",
          permissions: [
            { id: 10, app_label: "auth_warga", model: "user", codename: "change_user", name: "Can change user" },
          ],
        },
      ]);
    }

    if (path.endsWith("/publikasi/admin") && method === "GET") {
      if (options.failPublikasiList) {
        return fulfillJson({ detail: "Publikasi error" }, 500);
      }
      return fulfillJson(state.publikasiItems);
    }

    if (path.match(/\/publikasi\/admin\/[^/]+$/) && method === "PUT") {
      const payload = readJsonBody();
      const first = state.publikasiItems[0];
      Object.assign(first, payload, {
        updated_at: "2026-04-21T16:00:00Z",
      });
      return fulfillJson(first);
    }

    if (path.match(/\/publikasi\/admin\/[^/]+\/status$/) && method === "PUT") {
      const payload = readJsonBody();
      const first = state.publikasiItems[0];
      Object.assign(first, payload, {
        updated_at: "2026-04-21T16:10:00Z",
      });
      return fulfillJson(first);
    }

    if (path.endsWith(`/layanan-administrasi/mvp/surat/${state.surat.id}`) && method === "GET") {
      return fulfillJson({ data: state.surat });
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
      return fulfillJson({ data: state.surat });
    }

    if (path.endsWith(`/pengaduan/mvp/${state.pengaduan.id}`) && method === "GET") {
      return fulfillJson({ data: state.pengaduan });
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
      return fulfillJson({ data: state.pengaduan });
    }

    if (path.endsWith("/homepage/admin/content") && method === "GET") {
      if (options.failHomepageAdminContent) {
        return fulfillJson({ detail: "Homepage error" }, 500);
      }
      return fulfillJson({ data: state.homepageContent });
    }

    if (path.endsWith("/homepage/admin/content") && method === "PUT") {
      calls.homepageSaved = true;
      const payload = readJsonBody() as Record<string, unknown>;
      Object.assign(state.homepageContent, payload);
      return fulfillJson({ data: state.homepageContent });
    }

    if (path.endsWith("/homepage/admin/culture-cards") && method === "POST") {
      calls.cultureCardCreated = true;
      const payload = readJsonBody() as Record<string, unknown>;
      const nextItem = {
        id: state.homepageContent.cultureCards.length + 1,
        icon: String(payload.icon ?? ""),
        title: String(payload.title ?? ""),
        description: String(payload.description ?? ""),
        sort_order: Number(payload.sort_order ?? state.homepageContent.cultureCards.length),
      };
      state.homepageContent.cultureCards.push(nextItem);
      return fulfillJson({ data: nextItem }, 201);
    }

    return fulfillJson({ detail: `Unhandled mock: ${method} ${path}` }, 404);
  });

  return {
    markLoggedIn() {
      state.loggedIn = true;
    },
    wasResetPasswordCalled() {
      return calls.resetPasswordCalled;
    },
    wasHomepageSaved() {
      return calls.homepageSaved;
    },
    wasCultureCardCreated() {
      return calls.cultureCardCreated;
    },
    getLastSuratQueueQuery() {
      return calls.lastSuratQueueQuery;
    },
    getLastPengaduanQueueQuery() {
      return calls.lastPengaduanQueueQuery;
    },
  };
}

async function loginAsAdmin(page: Page, session: { markLoggedIn: () => void }) {
  session.markLoggedIn();
  await page.goto("/admin");
  await expect(page.getByText("Overview operasional desa")).toBeVisible();
}

async function waitForLoadingToSettle(page: Page, loadingText: string) {
  await expect(page.getByText(loadingText)).toHaveCount(0, { timeout: 10000 });
}

function fieldControl(scope: Page | Locator, label: string) {
  return scope
    .locator("div")
    .filter({ has: scope.getByText(label, { exact: true }) })
    .locator("input, textarea");
}

test("admin auth guard: guest redirect ke login", async ({ page }) => {
  await setupAdminApiMocks(page);

  await page.goto("/admin");

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("button", { name: "Masuk Sistem" })).toBeVisible();
});

test("admin overview render KPI, alert, activity", async ({ page }) => {
  const state = await setupAdminApiMocks(page);
  await loginAsAdmin(page, state);

  await expect(page.getByText("Surat pending", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Pengaduan aktif", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Perlu perhatian")).toBeVisible();
  await expect(page.getByText("Publikasi diperbarui")).toBeVisible();
  await expect(page.getByRole("link", { name: "Buka antrean surat" })).toBeVisible();
});

test("admin flow akun: login, edit user, reset password", async ({ page }) => {
  const state = await setupAdminApiMocks(page);
  await loginAsAdmin(page, state);

  await page.goto("/admin/akun/target-user");
  await waitForLoadingToSettle(page, "Memuat detail akun...");
  await page.getByLabel("Nama Lengkap").fill("Budi Update");
  await page.getByLabel("Nomor HP").fill("08999");
  await page.getByLabel("Role").selectOption("ADMIN");
  await page.getByLabel("Staf Admin").check();
  await page.getByRole("button", { name: "Simpan Perubahan" }).click();
  await expect(page.getByText("Perubahan akun berhasil disimpan.")).toBeVisible();

  await page.getByLabel(/^Password baru$/).fill("PasswordBaru123!");
  await page.getByLabel(/^Konfirmasi password baru$/).fill("PasswordBaru123!");
  await page.getByRole("button", { name: "Reset password akun ini" }).click();
  await expect(page.getByText("Password akun berhasil direset.")).toBeVisible();
  await expect.poll(() => state.wasResetPasswordCalled()).toBeTruthy();
});

test("admin flow operasional: publikasi, surat, pengaduan", async ({ page }) => {
  const state = await setupAdminApiMocks(page);
  await loginAsAdmin(page, state);

  await page.goto("/admin/publikasi");
  await waitForLoadingToSettle(page, "Memuat publikasi...");
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

test("admin surat queue: filter lalu buka detail", async ({ page }) => {
  const state = await setupAdminApiMocks(page);
  await loginAsAdmin(page, state);

  await page.goto("/admin/surat-queue");
  await waitForLoadingToSettle(page, "Memuat antrean surat...");
  await expect(page.getByText("SKU Budi Hartono")).toBeVisible();
  await page.getByLabel("Status").selectOption("PENDING");
  await expect.poll(() => state.getLastSuratQueueQuery()).toContain("status=PENDING");
  await page.getByLabel("Aging").selectOption("warning");
  await expect.poll(() => state.getLastSuratQueueQuery()).toContain("aging=warning");
  await page.getByRole("tab", { name: "Hari ini" }).click();
  await expect.poll(() => state.getLastSuratQueueQuery()).toContain("scope=today");
  await page.getByLabel("Cari").fill("Budi");
  await page.getByRole("link", { name: "Buka detail" }).click();
  await expect(page).toHaveURL(/\/admin\/surat-queue\/surat-1$/);
});

test("admin pengaduan queue: filter lalu buka detail", async ({ page }) => {
  const state = await setupAdminApiMocks(page);
  await loginAsAdmin(page, state);

  await page.goto("/admin/pengaduan-queue");
  await waitForLoadingToSettle(page, "Memuat antrean pengaduan...");
  await expect(page.getByText("Lampu jalan mati")).toBeVisible();
  await page.getByLabel("Status").selectOption("OPEN");
  await expect.poll(() => state.getLastPengaduanQueueQuery()).toContain("status=OPEN");
  await page.getByLabel("Aging").selectOption("warning");
  await expect.poll(() => state.getLastPengaduanQueueQuery()).toContain("aging=warning");
  await page.getByRole("tab", { name: "Hari ini" }).click();
  await expect.poll(() => state.getLastPengaduanQueueQuery()).toContain("scope=today");
  await page.getByLabel("Cari").fill("Lampu");
  await page.getByRole("link", { name: "Buka detail" }).click();
  await expect(page).toHaveURL(/\/admin\/pengaduan-queue\/22$/);
});

test("admin publikasi empty state render", async ({ page }) => {
  const state = await setupAdminApiMocks(page, { publikasiItems: [] });
  await loginAsAdmin(page, state);

  await page.goto("/admin/publikasi");
  await waitForLoadingToSettle(page, "Memuat publikasi...");
  await expect(page.getByText("Tambah Publikasi")).toBeVisible();
  await expect(page.getByRole("button", { name: "Tambah Baru" })).toBeVisible();
});

test("admin publikasi error state render", async ({ page }) => {
  const state = await setupAdminApiMocks(page, { failPublikasiList: true });
  await loginAsAdmin(page, state);

  await page.goto("/admin/publikasi");
  await waitForLoadingToSettle(page, "Memuat publikasi...");
  await expect(page.getByText("Publikasi error")).toBeVisible();
});

test("admin homepage editor: save section dan tambah culture card", async ({ page }) => {
  const state = await setupAdminApiMocks(page);
  await loginAsAdmin(page, state);

  await page.goto("/admin/homepage");
  await waitForLoadingToSettle(page, "Memuat konten homepage...");
  await fieldControl(page, "Headline (Nama Desa)").first().fill("Desa Segamai Maju");
  await page.getByRole("button", { name: "Publish konten" }).click();
  await expect(page.getByText("Perubahan konten utama berhasil disimpan.")).toBeVisible();
  await expect.poll(() => state.wasHomepageSaved()).toBeTruthy();

  const cultureSection = page
    .getByText("Culture Cards", { exact: true })
    .locator("xpath=ancestor::div[contains(@class,'admin-panel')][1]");
  await cultureSection.locator("input:not([disabled])").nth(0).fill("sparkles");
  await cultureSection.locator("input:not([disabled])").nth(1).fill("Festival Desa");
  await cultureSection.locator("textarea:not([disabled])").nth(0).fill("Agenda budaya tahunan");
  await cultureSection.locator("input[type='number']:not([disabled])").nth(0).fill("1");
  await cultureSection.getByRole("button", { name: "Tambah Item" }).click();
  await expect(page.getByText("Culture card ditambahkan.")).toBeVisible();
  await expect.poll(() => state.wasCultureCardCreated()).toBeTruthy();
});
