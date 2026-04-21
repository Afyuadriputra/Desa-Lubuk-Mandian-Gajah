import {
  localizePengaduanStatus,
  localizePublikasiJenis,
  localizePublikasiStatus,
  localizeSuratJenis,
  localizeSuratStatus,
  localizeUserRole,
  toneForPengaduanStatus,
  toneForPublikasiStatus,
  toneForRole,
  toneForSuratStatus,
} from "@/app/(website)/admin/_components/admin-labels";

describe("admin label helpers", () => {
  it("translate role and status labels to Indonesian", () => {
    expect(localizeUserRole("SUPERADMIN")).toBe("Superadmin");
    expect(localizeSuratStatus("PROCESSED")).toBe("Sedang Diproses");
    expect(localizePengaduanStatus("IN_PROGRESS")).toBe("Sedang Ditangani");
    expect(localizePublikasiStatus("PUBLISHED")).toBe("Terbit");
    expect(localizePublikasiJenis("PENGUMUMAN")).toBe("Pengumuman");
    expect(localizeSuratJenis("SKU")).toBe("Surat Keterangan Usaha");
  });

  it("fallback to raw value when label unknown", () => {
    expect(localizeSuratStatus("CUSTOM")).toBe("CUSTOM");
    expect(localizeUserRole("CUSTOM")).toBe("CUSTOM");
  });

  it("map tones consistently", () => {
    expect(toneForRole("SUPERADMIN")).toBe("danger");
    expect(toneForSuratStatus("DONE")).toBe("success");
    expect(toneForSuratStatus("PENDING")).toBe("warning");
    expect(toneForPengaduanStatus("RESOLVED")).toBe("success");
    expect(toneForPublikasiStatus("DRAFT")).toBe("warning");
  });
});
