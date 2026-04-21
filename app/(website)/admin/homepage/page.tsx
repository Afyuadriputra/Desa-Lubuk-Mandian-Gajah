"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type {
  HomepageAdminContentDto,
  HomepageContentUpdatePayload,
} from "@/lib/api/types";
import { homepageApi } from "@/lib/api/homepage";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Image as ImageIcon,
  Leaf,
  Link2,
  Save,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AdminPageHeader,
  AdminFormSkeleton,
  AdminListSkeleton,
  ErrorState,
  SaveState,
  AdminNotice,
} from "../_components/admin-primitives";
import { adminToastError, adminToastSuccess, getErrorMessage } from "../_components/admin-feedback";
import { HomepageEditorSections } from "./homepage-editor-sections";
import {
  HomepageCollectionSections,
  SummaryCard,
} from "./homepage-collection-sections";

const homepageSectionLinks = [
  { href: "#hero-brand", label: "Hero & Brand" },
  { href: "#naming", label: "Asal Usul" },
  { href: "#nature", label: "Sialang & Gambut" },
  { href: "#culture-potential", label: "Budaya & Potensi" },
  { href: "#footer-contact", label: "Footer & Kontak" },
  { href: "#culture-cards", label: "Culture Cards" },
  { href: "#recovery-items", label: "Recovery Items" },
  { href: "#opportunities", label: "Potential Opportunities" },
  { href: "#facilities", label: "Facilities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#footer-links", label: "Footer Links" },
  { href: "#stats-manual", label: "Stats Manual" },
];

export default function AdminHomepageCMSPage() {
  const router = useRouter();
  const [data, setData] = useState<HomepageAdminContentDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [pendingNavigationHref, setPendingNavigationHref] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<HomepageContentUpdatePayload>>({});

  const loadAdminContent = async () => {
    const res = await homepageApi.getAdminContent();
    const d = res.data;
    setData(d);
    setForm({
      villageName: d.villageName || "",
      tagline: d.tagline || "",
      heroDescription: d.heroDescription || "",
      heroImage: d.heroImage || "",
      heroBadge: d.heroBadge || "",
      brand: {
        logoUrl: d.brand?.logoUrl || "",
        logoAlt: d.brand?.logoAlt || "",
        regionLabel: d.brand?.regionLabel || "",
      },
      quickStatsDescription: d.quickStatsDescription || "",
      contact: {
        address: d.contact?.address || "",
        whatsapp: d.contact?.whatsapp || "",
        mapImage: d.contact?.mapImage || "",
      },
      namingTitle: d.namingTitle || "",
      namingDescription: d.namingDescription || "",
      namingImage: d.namingImage || "",
      namingQuote: d.namingQuote || "",
      cultureTitle: d.cultureTitle || "",
      cultureDescription: d.cultureDescription || "",
      sialangTitle: d.sialangTitle || "",
      sialangDescription: d.sialangDescription || "",
      sialangImage: d.sialangImage || "",
      sialangBadge: d.sialangBadge || "",
      sialangStat: d.sialangStat || "",
      sialangQuote: d.sialangQuote || "",
      peatTitle: d.peatTitle || "",
      peatDescription: d.peatDescription || "",
      peatQuote: d.peatQuote || "",
      peatImages: d.peatImages || [],
      recoveryTitle: d.recoveryTitle || "",
      recoveryDescription: d.recoveryDescription || "",
      potentialTitle: d.potentialTitle || "",
      potentialQuote: d.potentialQuote || "",
      potentialOpportunitiesTitle: d.potentialOpportunitiesTitle || "",
      facilitiesTitle: d.facilitiesTitle || "",
      galleryTitle: d.galleryTitle || "",
      galleryDescription: d.galleryDescription || "",
      contactTitle: d.contactTitle || "",
      contactDescription: d.contactDescription || "",
      footerDescription: d.footerDescription || "",
      footerBadges: d.footerBadges || [],
      footerCopyright: d.footerCopyright || "",
      officeHours: d.officeHours || [],
    });
  };

  useEffect(() => {
    loadAdminContent()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const refreshAfterMutation = async (
    successMessage: string,
    options?: { toast?: boolean },
  ) => {
    await loadAdminContent();
    setSaveMsg(successMessage);
    if (options?.toast !== false) {
      adminToastSuccess(successMessage);
    }
  };

  const handlePublish = async () => {
    if (!data) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      await homepageApi.updateContent(form as HomepageContentUpdatePayload);
      await refreshAfterMutation("Perubahan konten utama berhasil disimpan.", {
        toast: false,
      });
      adminToastSuccess("Perubahan konten utama berhasil disimpan.");
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Operasi gagal.");
      setSaveMsg(`Gagal: ${message}`);
      adminToastError(err, "Gagal menyimpan perubahan homepage.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (
    key: keyof HomepageContentUpdatePayload,
    value: string | string[] | object,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateBrand = (
    key: keyof HomepageContentUpdatePayload["brand"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      brand: { ...prev.brand!, [key]: value },
    }));
  };

  const updateContact = (
    key: keyof HomepageContentUpdatePayload["contact"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      contact: { ...prev.contact!, [key]: value },
    }));
  };

  const isDirty = React.useMemo(() => {
    if (!data) return false;
    return JSON.stringify(form) !== JSON.stringify({
      villageName: data.villageName || "",
      tagline: data.tagline || "",
      heroDescription: data.heroDescription || "",
      heroImage: data.heroImage || "",
      heroBadge: data.heroBadge || "",
      brand: {
        logoUrl: data.brand?.logoUrl || "",
        logoAlt: data.brand?.logoAlt || "",
        regionLabel: data.brand?.regionLabel || "",
      },
      quickStatsDescription: data.quickStatsDescription || "",
      contact: {
        address: data.contact?.address || "",
        whatsapp: data.contact?.whatsapp || "",
        mapImage: data.contact?.mapImage || "",
      },
      namingTitle: data.namingTitle || "",
      namingDescription: data.namingDescription || "",
      namingImage: data.namingImage || "",
      namingQuote: data.namingQuote || "",
      cultureTitle: data.cultureTitle || "",
      cultureDescription: data.cultureDescription || "",
      sialangTitle: data.sialangTitle || "",
      sialangDescription: data.sialangDescription || "",
      sialangImage: data.sialangImage || "",
      sialangBadge: data.sialangBadge || "",
      sialangStat: data.sialangStat || "",
      sialangQuote: data.sialangQuote || "",
      peatTitle: data.peatTitle || "",
      peatDescription: data.peatDescription || "",
      peatQuote: data.peatQuote || "",
      peatImages: data.peatImages || [],
      recoveryTitle: data.recoveryTitle || "",
      recoveryDescription: data.recoveryDescription || "",
      potentialTitle: data.potentialTitle || "",
      potentialQuote: data.potentialQuote || "",
      potentialOpportunitiesTitle: data.potentialOpportunitiesTitle || "",
      facilitiesTitle: data.facilitiesTitle || "",
      galleryTitle: data.galleryTitle || "",
      galleryDescription: data.galleryDescription || "",
      contactTitle: data.contactTitle || "",
      contactDescription: data.contactDescription || "",
      footerDescription: data.footerDescription || "",
      footerBadges: data.footerBadges || [],
      footerCopyright: data.footerCopyright || "",
      officeHours: data.officeHours || [],
    });
  }, [data, form]);

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  React.useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!isDirty || saving) return;
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.origin !== currentUrl.origin) return;
      if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) {
        return;
      }

      event.preventDefault();
      setPendingNavigationHref(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [isDirty, saving]);

  const handleConfirmLeave = () => {
    if (!pendingNavigationHref) return;
    const destination = pendingNavigationHref;
    setPendingNavigationHref(null);
    router.push(destination);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[1600px] space-y-6 pb-6">
        <AdminPageHeader
          eyebrow="Homepage CMS"
          title="Kelola Homepage"
          description="Editor difokuskan untuk kerja panjang: panel konten di kiri, rail aksi dan preview di kanan, tanpa mengubah kontrak API yang sudah ada."
        />
        <div className="grid grid-cols-1 gap-6 xl:h-[calc(100vh-13rem)] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <AdminFormSkeleton fields={6} />
            <AdminListSkeleton rows={5} />
          </div>
          <div className="space-y-6">
            <AdminFormSkeleton fields={3} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <ErrorState title="Gagal memuat data homepage" description={error ?? undefined} />;
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 pb-6">
      <AlertDialog
        open={pendingNavigationHref !== null}
        onOpenChange={(open) => {
          if (!open) setPendingNavigationHref(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Perubahan belum disimpan</AlertDialogTitle>
            <AlertDialogDescription>
              Anda sedang mengubah konten homepage. Jika tetap pindah halaman, perubahan yang belum disimpan akan hilang.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tetap di halaman ini</AlertDialogCancel>
            <AlertDialogAction tone="danger" onClick={handleConfirmLeave}>
              Lanjutkan tanpa simpan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="admin-glass rounded-[30px] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <AdminPageHeader
            eyebrow="Homepage CMS"
            title="Kelola Homepage"
            description="Editor difokuskan untuk kerja panjang: panel konten di kiri, rail aksi dan preview di kanan, tanpa mengubah kontrak API yang sudah ada."
          />
          <div className="flex w-full flex-col gap-3 xl:w-[320px] xl:items-end">
            {isDirty ? (
              <AdminNotice tone="info">
                <span className="inline-flex items-center gap-2">
                  <TriangleAlert className="size-4" />
                  Belum disimpan
                </span>
              </AdminNotice>
            ) : null}
            <SaveState
              message={saveMsg}
              tone={saveMsg?.startsWith("Gagal") ? "danger" : "success"}
            />
            <Button
              onClick={handlePublish}
              disabled={saving}
              className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800 xl:w-auto xl:min-w-[220px]"
            >
              <Save size={16} />
              {saving ? "Menyimpan..." : "Publish konten"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:h-[calc(100vh-13rem)] xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="admin-scrollbar min-h-0 space-y-6 xl:overflow-y-auto xl:pr-2">
          <HomepageEditorSections
            form={form}
            updateField={updateField}
            updateBrand={updateBrand}
            updateContact={updateContact}
          />
          <HomepageCollectionSections
            data={data}
            refreshAfterMutation={refreshAfterMutation}
          />
        </div>

        <aside className="admin-scrollbar min-h-0 space-y-6 xl:overflow-y-auto xl:pr-1">
          <div className="admin-glass rounded-[28px] px-5 py-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Aksi halaman
                </p>
                <h2 className="text-base font-semibold text-slate-950">
                  Simpan perubahan utama
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  Gunakan panel ini saat selesai merapikan section besar. Fokus edit tetap penuh di area kiri.
                </p>
              </div>

              <SaveState
                message={saveMsg}
                tone={saveMsg?.startsWith("Gagal") ? "danger" : "success"}
              />

              <Button
                onClick={handlePublish}
                disabled={saving}
                className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800"
              >
                <Save size={16} />
                {saving ? "Menyimpan..." : "Publish konten"}
              </Button>
            </div>
          </div>

          <div className="admin-panel rounded-[28px] border-white/70 p-5">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Navigasi section
                </p>
                <h2 className="text-base font-semibold text-slate-950">
                  Lompat ke bagian editor
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  Pakai navigator ini untuk berpindah cepat antar blok tanpa kehilangan konteks.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {homepageSectionLinks.map((section) => (
                  <a
                    key={section.href}
                    href={section.href}
                    className="inline-flex items-center justify-between rounded-[20px] border border-slate-200/80 bg-white/80 px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-950"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Link2 className="size-4" />
                      {section.label}
                    </span>
                    <ArrowRight className="size-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-panel group relative min-h-[220px] overflow-hidden rounded-[28px] border-white/70">
            {form.heroImage ? (
              <Image
                alt="Preview"
                fill
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-70"
                src={form.heroImage as string}
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
                No Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-0 left-0 z-10 w-full p-5">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-wider text-slate-300">
                Hero Preview
              </span>
              <h3 className="truncate text-xl font-bold text-white">
                {form.villageName || "Nama Desa"}
              </h3>
              <p className="mt-0.5 truncate text-xs text-slate-200/80">
                {form.tagline || "Tagline"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              <BarChart3 size={12} /> Item Aktif
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard icon={<Sparkles size={14} />} label="Culture" count={data.cultureCards.length} />
              <SummaryCard icon={<Leaf size={14} />} label="Recovery" count={data.recoveryItems.length} />
              <SummaryCard icon={<ImageIcon size={14} />} label="Gallery" count={data.gallery.length} />
              <SummaryCard icon={<Building2 size={14} />} label="Fasilitas" count={data.facilities.length} />
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-500">
              Semua list di bawah sudah terkoneksi ke endpoint CRUD backend.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
