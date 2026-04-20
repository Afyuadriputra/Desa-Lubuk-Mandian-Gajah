"use client";

import React, { useEffect, useState } from "react";
import { homepageApi } from "@/lib/api/homepage";
import type {
  HomepageAdminContentDto,
  HomepageContentUpdatePayload,
  HomepageCultureCardDto,
  HomepageCultureCardPayload,
  HomepageFacilityDto,
  HomepageFacilityPayload,
  HomepageFooterLinkDto,
  HomepageFooterLinkPayload,
  HomepageGalleryItemDto,
  HomepageGalleryItemPayload,
  HomepagePotentialOpportunityItemDto,
  HomepagePotentialOpportunityItemPayload,
  HomepageRecoveryItemDto,
  HomepageRecoveryItemPayload,
  HomepageStatItemDto,
  HomepageStatItemPayload,
} from "@/lib/api/types";
import { BarChart3, Building2, Image, Leaf, Save, Sparkles, XCircle } from "lucide-react";

type ChildFieldType = "text" | "textarea" | "checkbox" | "number";

type ChildFieldConfig = {
  key: string;
  label: string;
  type?: ChildFieldType;
  placeholder?: string;
};

type EditableChildItem = {
  id?: number;
  [key: string]: string | number | boolean | undefined;
};

type ChildSectionProps<T extends EditableChildItem> = {
  title: string;
  description: string;
  items: T[];
  fields: ChildFieldConfig[];
  createDefaults: Omit<T, "id">;
  emptyLabel: string;
  onCreate: (payload: Omit<T, "id">) => Promise<void>;
  onUpdate: (id: number, payload: Omit<T, "id">) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

type ChildDraft<T extends EditableChildItem> = Omit<T, "id">;

export default function AdminHomepageCMSPage() {
  const [data, setData] = useState<HomepageAdminContentDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
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

  const refreshAfterMutation = async (successMessage: string) => {
    await loadAdminContent();
    setSaveMsg(successMessage);
  };

  const handlePublish = async () => {
    if (!data) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      await homepageApi.updateContent(form as HomepageContentUpdatePayload);
      await refreshAfterMutation("Perubahan konten utama berhasil disimpan.");
    } catch (err: any) {
      setSaveMsg(`Gagal: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: keyof HomepageContentUpdatePayload, value: string | string[] | object) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateBrand = (key: keyof HomepageContentUpdatePayload["brand"], value: string) => {
    setForm((prev) => ({
      ...prev,
      brand: { ...prev.brand!, [key]: value },
    }));
  };

  const updateContact = (key: keyof HomepageContentUpdatePayload["contact"], value: string) => {
    setForm((prev) => ({
      ...prev,
      contact: { ...prev.contact!, [key]: value },
    }));
  };

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
        <span className="text-xs text-zinc-500">Memuat konten homepage...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto mt-16 flex max-w-lg items-start gap-3 rounded-xl border border-red-900/40 bg-red-950/30 p-6">
        <XCircle size={20} className="mt-0.5 shrink-0 text-red-400" />
        <div>
          <h3 className="text-sm font-semibold text-red-300">Gagal Memuat Data</h3>
          <p className="mt-1 text-xs text-red-400/80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      <div className="sticky top-0 z-20 flex flex-col gap-4 border-b border-zinc-800/50 bg-[#09090b]/90 pt-5 pb-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Kelola Homepage</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Scalar content, daftar dinamis, dan statistik manual sekarang dikelola dari satu panel.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {saveMsg && (
            <span
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                saveMsg.startsWith("Gagal")
                  ? "border-red-900/40 bg-red-950/30 text-red-400"
                  : "border-emerald-900/40 bg-emerald-950/30 text-emerald-400"
              }`}
            >
              {saveMsg}
            </span>
          )}
          <button
            onClick={handlePublish}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Menyimpan..." : "Publish Konten Utama"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <SectionCard title="Hero & Brand Config">
            <div className="grid grid-cols-1 gap-4">
              <Field label="Hero Badge" value={form.heroBadge} onChange={(v) => updateField("heroBadge", v)} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Headline (Nama Desa)" value={form.villageName} onChange={(v) => updateField("villageName", v)} />
                <Field label="Tagline" value={form.tagline} onChange={(v) => updateField("tagline", v)} />
              </div>
              <Field label="Deskripsi Hero" value={form.heroDescription} onChange={(v) => updateField("heroDescription", v)} multiline />
              <Field label="Hero Image URL" value={form.heroImage} onChange={(v) => updateField("heroImage", v)} />

              <div className="mt-2 border-t border-zinc-800/50 pt-4">
                <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Brand Info</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Logo URL" value={form.brand?.logoUrl} onChange={(v) => updateBrand("logoUrl", v)} />
                  <Field label="Logo Alt Text" value={form.brand?.logoAlt} onChange={(v) => updateBrand("logoAlt", v)} />
                  <Field label="Region Label" value={form.brand?.regionLabel} onChange={(v) => updateBrand("regionLabel", v)} />
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Asal Usul (Naming)">
            <Field label="Judul Asal Usul" value={form.namingTitle} onChange={(v) => updateField("namingTitle", v)} />
            <Field label="Deskripsi Sejarah" value={form.namingDescription} onChange={(v) => updateField("namingDescription", v)} multiline />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Naming Image URL" value={form.namingImage} onChange={(v) => updateField("namingImage", v)} />
              <Field label="Quote Sejarah" value={form.namingQuote} onChange={(v) => updateField("namingQuote", v)} />
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SectionCard title="Hutan Sialang">
              <Field label="Judul" value={form.sialangTitle} onChange={(v) => updateField("sialangTitle", v)} />
              <Field label="Deskripsi" value={form.sialangDescription} onChange={(v) => updateField("sialangDescription", v)} multiline />
              <Field label="Image URL" value={form.sialangImage} onChange={(v) => updateField("sialangImage", v)} />
              <Field label="Badge" value={form.sialangBadge} onChange={(v) => updateField("sialangBadge", v)} />
              <Field label="Stat" value={form.sialangStat} onChange={(v) => updateField("sialangStat", v)} />
              <Field label="Quote" value={form.sialangQuote} onChange={(v) => updateField("sialangQuote", v)} />
            </SectionCard>

            <SectionCard title="Ekosistem Gambut">
              <Field label="Judul" value={form.peatTitle} onChange={(v) => updateField("peatTitle", v)} />
              <Field label="Deskripsi" value={form.peatDescription} onChange={(v) => updateField("peatDescription", v)} multiline />
              <Field label="Quote" value={form.peatQuote} onChange={(v) => updateField("peatQuote", v)} />
              <TagArrayField
                label="Peat Images"
                values={(form.peatImages as string[]) || []}
                onChange={(values) => updateField("peatImages", values)}
                helper="Satu URL per baris."
              />
            </SectionCard>
          </div>

          <SectionCard title="Budaya & Potensi">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="border-b border-zinc-800/50 pb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Nilai Budaya
                </h4>
                <Field label="Culture Title" value={form.cultureTitle} onChange={(v) => updateField("cultureTitle", v)} />
                <Field label="Culture Description" value={form.cultureDescription} onChange={(v) => updateField("cultureDescription", v)} multiline />
              </div>
              <div className="space-y-4">
                <h4 className="border-b border-zinc-800/50 pb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Potensi Desa
                </h4>
                <Field label="Potential Title" value={form.potentialTitle} onChange={(v) => updateField("potentialTitle", v)} />
                <Field label="Potential Quote" value={form.potentialQuote} onChange={(v) => updateField("potentialQuote", v)} />
                <Field
                  label="Opportunities Title"
                  value={form.potentialOpportunitiesTitle}
                  onChange={(v) => updateField("potentialOpportunitiesTitle", v)}
                />
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-zinc-800/50 pt-4">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Pemulihan Ekonomi</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Recovery Title" value={form.recoveryTitle} onChange={(v) => updateField("recoveryTitle", v)} />
                <Field label="Recovery Description" value={form.recoveryDescription} onChange={(v) => updateField("recoveryDescription", v)} multiline />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Footer, Gallery & Kontak">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4 md:border-r md:border-zinc-800/50 md:pr-4">
                <Field
                  label="Quick Stats Description"
                  value={form.quickStatsDescription}
                  onChange={(v) => updateField("quickStatsDescription", v)}
                  multiline
                />
                <Field label="Facilities Title" value={form.facilitiesTitle} onChange={(v) => updateField("facilitiesTitle", v)} />
                <Field label="Gallery Title" value={form.galleryTitle} onChange={(v) => updateField("galleryTitle", v)} />
                <Field
                  label="Gallery Description"
                  value={form.galleryDescription}
                  onChange={(v) => updateField("galleryDescription", v)}
                  multiline
                />
                <Field
                  label="Footer Description"
                  value={form.footerDescription}
                  onChange={(v) => updateField("footerDescription", v)}
                  multiline
                />
                <Field
                  label="Footer Copyright"
                  value={form.footerCopyright}
                  onChange={(v) => updateField("footerCopyright", v)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Contact Info</h4>
                <Field label="Contact Section Title" value={form.contactTitle} onChange={(v) => updateField("contactTitle", v)} />
                <Field
                  label="Contact Section Desc"
                  value={form.contactDescription}
                  onChange={(v) => updateField("contactDescription", v)}
                  multiline
                />
                <Field label="Alamat Fisik" value={form.contact?.address} onChange={(v) => updateContact("address", v)} multiline />
                <Field label="Nomor WhatsApp" value={form.contact?.whatsapp} onChange={(v) => updateContact("whatsapp", v)} />
                <Field label="Google Map Image URL" value={form.contact?.mapImage} onChange={(v) => updateContact("mapImage", v)} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <TagArrayField
                label="Footer Badges"
                values={(form.footerBadges as string[]) || []}
                onChange={(values) => updateField("footerBadges", values)}
                helper="Satu badge per baris."
              />
              <OfficeHoursField
                values={form.officeHours || []}
                onChange={(values) => updateField("officeHours", values)}
              />
            </div>
          </SectionCard>

          <ChildSection<HomepageCultureCardDto>
            title="Culture Cards"
            description="Mengelola kartu budaya yang tampil di section nilai lokal."
            items={data.cultureCards}
            fields={[
              { key: "icon", label: "Icon" },
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "sort_order", label: "Sort Order", type: "number" },
            ]}
            createDefaults={{ icon: "", title: "", description: "", sort_order: data.cultureCards.length }}
            emptyLabel="Belum ada culture card."
            onCreate={(payload) => homepageApi.createCultureCard(payload as HomepageCultureCardPayload).then(() => refreshAfterMutation("Culture card ditambahkan."))}
            onUpdate={(id, payload) => homepageApi.updateCultureCard(id, payload as HomepageCultureCardPayload).then(() => refreshAfterMutation("Culture card diperbarui."))}
            onDelete={(id) => homepageApi.deleteCultureCard(id).then(() => refreshAfterMutation("Culture card dihapus."))}
          />

          <ChildSection<HomepageRecoveryItemDto>
            title="Recovery Items"
            description="Daftar item pemulihan ekonomi pasca-gambut."
            items={data.recoveryItems}
            fields={[
              { key: "icon", label: "Icon" },
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "wrapper", label: "Wrapper" },
              { key: "sort_order", label: "Sort Order", type: "number" },
            ]}
            createDefaults={{ icon: "", title: "", description: "", wrapper: "", sort_order: data.recoveryItems.length }}
            emptyLabel="Belum ada recovery item."
            onCreate={(payload) => homepageApi.createRecoveryItem(payload as HomepageRecoveryItemPayload).then(() => refreshAfterMutation("Recovery item ditambahkan."))}
            onUpdate={(id, payload) => homepageApi.updateRecoveryItem(id, payload as HomepageRecoveryItemPayload).then(() => refreshAfterMutation("Recovery item diperbarui."))}
            onDelete={(id) => homepageApi.deleteRecoveryItem(id).then(() => refreshAfterMutation("Recovery item dihapus."))}
          />

          <ChildSection<HomepagePotentialOpportunityItemDto>
            title="Potential Opportunities"
            description="Opportunitas turunan yang tampil setelah daftar potensi usaha publik."
            items={data.potentialOpportunityItems}
            fields={[
              { key: "icon", label: "Icon" },
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "sort_order", label: "Sort Order", type: "number" },
            ]}
            createDefaults={{ icon: "", title: "", description: "", sort_order: data.potentialOpportunityItems.length }}
            emptyLabel="Belum ada opportunity item."
            onCreate={(payload) => homepageApi.createPotentialOpportunity(payload as HomepagePotentialOpportunityItemPayload).then(() => refreshAfterMutation("Opportunity item ditambahkan."))}
            onUpdate={(id, payload) => homepageApi.updatePotentialOpportunity(id, payload as HomepagePotentialOpportunityItemPayload).then(() => refreshAfterMutation("Opportunity item diperbarui."))}
            onDelete={(id) => homepageApi.deletePotentialOpportunity(id).then(() => refreshAfterMutation("Opportunity item dihapus."))}
          />

          <ChildSection<HomepageFacilityDto>
            title="Facilities"
            description="Fasilitas cepat di section publik."
            items={data.facilities}
            fields={[
              { key: "icon", label: "Icon" },
              { key: "label", label: "Label" },
              { key: "sort_order", label: "Sort Order", type: "number" },
            ]}
            createDefaults={{ icon: "", label: "", sort_order: data.facilities.length }}
            emptyLabel="Belum ada fasilitas."
            onCreate={(payload) => homepageApi.createFacility(payload as HomepageFacilityPayload).then(() => refreshAfterMutation("Facility ditambahkan."))}
            onUpdate={(id, payload) => homepageApi.updateFacility(id, payload as HomepageFacilityPayload).then(() => refreshAfterMutation("Facility diperbarui."))}
            onDelete={(id) => homepageApi.deleteFacility(id).then(() => refreshAfterMutation("Facility dihapus."))}
          />

          <ChildSection<HomepageGalleryItemDto>
            title="Gallery"
            description="Gambar galeri homepage. `tall` untuk layout tinggi."
            items={data.gallery}
            fields={[
              { key: "image", label: "Image URL" },
              { key: "alt", label: "Alt" },
              { key: "caption", label: "Caption", type: "textarea" },
              { key: "tall", label: "Tall", type: "checkbox" },
              { key: "sort_order", label: "Sort Order", type: "number" },
            ]}
            createDefaults={{ image: "", alt: "", caption: "", tall: false, sort_order: data.gallery.length }}
            emptyLabel="Belum ada gallery item."
            onCreate={(payload) => homepageApi.createGalleryItem(payload as HomepageGalleryItemPayload).then(() => refreshAfterMutation("Gallery item ditambahkan."))}
            onUpdate={(id, payload) => homepageApi.updateGalleryItem(id, payload as HomepageGalleryItemPayload).then(() => refreshAfterMutation("Gallery item diperbarui."))}
            onDelete={(id) => homepageApi.deleteGalleryItem(id).then(() => refreshAfterMutation("Gallery item dihapus."))}
          />

          <ChildSection<HomepageFooterLinkDto>
            title="Footer Links"
            description="Link cepat di footer publik."
            items={data.footerLinks}
            fields={[
              { key: "label", label: "Label" },
              { key: "href", label: "Href" },
              { key: "sort_order", label: "Sort Order", type: "number" },
            ]}
            createDefaults={{ label: "", href: "", sort_order: data.footerLinks.length }}
            emptyLabel="Belum ada footer link."
            onCreate={(payload) => homepageApi.createFooterLink(payload as HomepageFooterLinkPayload).then(() => refreshAfterMutation("Footer link ditambahkan."))}
            onUpdate={(id, payload) => homepageApi.updateFooterLink(id, payload as HomepageFooterLinkPayload).then(() => refreshAfterMutation("Footer link diperbarui."))}
            onDelete={(id) => homepageApi.deleteFooterLink(id).then(() => refreshAfterMutation("Footer link dihapus."))}
          />

          <ChildSection<HomepageStatItemDto>
            title="Stats Manual"
            description="Stat manual untuk homepage. `Dusun` tetap otomatis dari profil wilayah dan tidak perlu dibuat di sini."
            items={data.statsItems}
            fields={[
              { key: "label", label: "Label" },
              { key: "value", label: "Value" },
              { key: "sort_order", label: "Sort Order", type: "number" },
            ]}
            createDefaults={{ label: "", value: "", sort_order: data.statsItems.length }}
            emptyLabel="Belum ada stat manual."
            onCreate={(payload) => homepageApi.createStat(payload as HomepageStatItemPayload).then(() => refreshAfterMutation("Stat manual ditambahkan."))}
            onUpdate={(id, payload) => homepageApi.updateStat(id, payload as HomepageStatItemPayload).then(() => refreshAfterMutation("Stat manual diperbarui."))}
            onDelete={(id) => homepageApi.deleteStat(id).then(() => refreshAfterMutation("Stat manual dihapus."))}
          />
        </div>

        <div className="space-y-6 lg:col-span-4">
          <div className="group relative min-h-[220px] overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/50">
            {form.heroImage ? (
              <img
                alt="Preview"
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-70"
                src={form.heroImage as string}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center border border-zinc-700/50 bg-zinc-800 text-zinc-600">
                No Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 z-10 w-full p-5">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Hero Preview</span>
              <h3 className="truncate text-xl font-bold text-white">{form.villageName || "Nama Desa"}</h3>
              <p className="mt-0.5 truncate text-xs text-zinc-300">{form.tagline || "Tagline"}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              <BarChart3 size={12} /> Item Aktif
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard icon={<Sparkles size={14} />} label="Culture" count={data.cultureCards.length} />
              <SummaryCard icon={<Leaf size={14} />} label="Recovery" count={data.recoveryItems.length} />
              <SummaryCard icon={<Image size={14} />} label="Gallery" count={data.gallery.length} />
              <SummaryCard icon={<Building2 size={14} />} label="Fasilitas" count={data.facilities.length} />
            </div>
            <p className="mt-2 text-center text-[10px] text-zinc-500">Semua list di bawah sudah terkoneksi ke endpoint CRUD backend.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5 shadow-lg sm:p-6">
      <div className="absolute top-0 left-0 h-full w-1 bg-white opacity-10" />
      <h2 className="mb-5 text-sm font-semibold text-zinc-200">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value = "",
  onChange,
  multiline = false,
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2.5 text-xs font-medium text-zinc-200 transition-colors placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none sm:text-sm";

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{label}</label>
      {multiline ? (
        <textarea className={`${cls} resize-none`} rows={3} value={value || ""} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={cls} type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function TagArrayField({
  label,
  values,
  onChange,
  helper,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  helper?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{label}</label>
      <textarea
        rows={5}
        value={values.join("\n")}
        onChange={(event) =>
          onChange(
            event.target.value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
        className="w-full resize-none rounded-lg border border-zinc-800 bg-black/40 px-3 py-2.5 text-xs font-medium text-zinc-200 transition-colors placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none sm:text-sm"
      />
      {helper && <p className="text-[10px] text-zinc-500">{helper}</p>}
    </div>
  );
}

function OfficeHoursField({
  values,
  onChange,
}: {
  values: HomepageContentUpdatePayload["officeHours"];
  onChange: (values: HomepageContentUpdatePayload["officeHours"]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Office Hours</label>
      {(values || []).map((item, index) => (
        <div key={`${item.day}-${index}`} className="grid grid-cols-1 gap-3 rounded-lg border border-zinc-800/70 bg-black/30 p-3">
          <Field
            label={`Day ${index + 1}`}
            value={item.day}
            onChange={(value) =>
              onChange(
                values.map((entry, entryIndex) =>
                  entryIndex === index ? { ...entry, day: value } : entry,
                ),
              )
            }
          />
          <Field
            label="Time"
            value={item.time}
            onChange={(value) =>
              onChange(
                values.map((entry, entryIndex) =>
                  entryIndex === index ? { ...entry, time: value } : entry,
                ),
              )
            }
          />
          <label className="flex items-center gap-2 text-xs text-zinc-400">
            <input
              type="checkbox"
              checked={Boolean(item.danger)}
              onChange={(event) =>
                onChange(
                  values.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, danger: event.target.checked } : entry,
                  ),
                )
              }
            />
            Tandai sebagai baris penting / libur
          </label>
        </div>
      ))}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange([...(values || []), { day: "", time: "", danger: false }])}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-200"
        >
          Tambah Jam
        </button>
        {(values || []).length > 0 && (
          <button
            type="button"
            onClick={() => onChange(values.slice(0, -1))}
            className="rounded-lg border border-zinc-800 bg-black/30 px-3 py-2 text-xs font-semibold text-zinc-400"
          >
            Hapus Terakhir
          </button>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-zinc-800/80 bg-[#09090b] px-3 py-3 text-center transition-colors hover:bg-zinc-800/50">
      <span className="text-zinc-400">{icon}</span>
      <div className="flex flex-col items-center">
        <p className="text-lg leading-none font-bold text-zinc-200">{count}</p>
        <p className="mt-1 text-[9px] uppercase tracking-widest text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

function ChildSection<T extends EditableChildItem>({
  title,
  description,
  items,
  fields,
  createDefaults,
  emptyLabel,
  onCreate,
  onUpdate,
  onDelete,
}: ChildSectionProps<T>) {
  const [createForm, setCreateForm] = useState<ChildDraft<T>>(createDefaults);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingForm, setEditingForm] = useState<ChildDraft<T> | null>(null);
  const [busy, setBusy] = useState<"create" | "update" | "delete" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mergeDraftValue = (
    draft: ChildDraft<T>,
    key: string,
    value: string | number | boolean,
  ): ChildDraft<T> => {
    return {
      ...draft,
      [key]: value,
    } as ChildDraft<T>;
  };

  useEffect(() => {
    setCreateForm(createDefaults);
    if (editingId !== null) {
      const nextItem = items.find((item) => item.id === editingId);
      if (!nextItem) {
        setEditingId(null);
        setEditingForm(null);
      }
    }
  }, [items, editingId]);

  const updateDraft = (
    target: "create" | "edit",
    key: string,
    value: string | number | boolean,
  ) => {
    if (target === "create") {
      setCreateForm((prev) => mergeDraftValue(prev, key, value));
      return;
    }
    setEditingForm((prev) => (prev ? mergeDraftValue(prev, key, value) : prev));
  };

  const startEdit = (item: T) => {
    const nextForm = { ...item } as T;
    delete nextForm.id;
    setEditingId(item.id ?? null);
    setEditingForm(nextForm as ChildDraft<T>);
    setError(null);
  };

  const handleCreate = async () => {
    setBusy("create");
    setError(null);
    try {
      await onCreate(createForm);
    } catch (err: any) {
      setError(err.message ?? "Gagal menambah item.");
    } finally {
      setBusy(null);
    }
  };

  const handleUpdate = async () => {
    if (editingId === null || !editingForm) return;
    setBusy("update");
    setError(null);
    try {
      await onUpdate(editingId, editingForm);
      setEditingId(null);
      setEditingForm(null);
    } catch (err: any) {
      setError(err.message ?? "Gagal memperbarui item.");
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (id: number) => {
    setBusy("delete");
    setError(null);
    try {
      await onDelete(id);
      if (editingId === id) {
        setEditingId(null);
        setEditingForm(null);
      }
    } catch (err: any) {
      setError(err.message ?? "Gagal menghapus item.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <SectionCard title={title}>
      <p className="text-sm text-zinc-500">{description}</p>
      {error && (
        <div className="rounded-lg border border-red-900/40 bg-red-950/30 px-3 py-2 text-xs text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 bg-black/20 px-4 py-5 text-sm text-zinc-500">
            {emptyLabel}
          </div>
        ) : (
          items.map((item) => {
            const draft = editingId === item.id ? editingForm : item;
            return (
              <div key={item.id} className="rounded-xl border border-zinc-800/70 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                      Item #{item.id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {editingId === item.id ? (
                      <>
                        <button
                          type="button"
                          onClick={handleUpdate}
                          disabled={busy === "update"}
                          className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black disabled:opacity-50"
                        >
                          {busy === "update" ? "Menyimpan..." : "Simpan"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditingForm(null);
                          }}
                          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-300"
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-300"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id as number)}
                      disabled={busy === "delete"}
                      className="rounded-lg border border-red-900/40 bg-red-950/30 px-3 py-2 text-xs font-semibold text-red-300 disabled:opacity-50"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {fields.map((field) => (
                    <ChildField
                      key={`${item.id}-${field.key}`}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={draft?.[field.key]}
                      onChange={(value) => updateDraft(editingId === item.id ? "edit" : "create", field.key, value)}
                      disabled={editingId !== item.id}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">Tambah Item Baru</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <ChildField
              key={`create-${field.key}`}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={createForm[field.key]}
              onChange={(value) => updateDraft("create", field.key, value)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleCreate}
          disabled={busy === "create"}
          className="mt-4 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black disabled:opacity-50"
        >
          {busy === "create" ? "Menambah..." : "Tambah Item"}
        </button>
      </div>
    </SectionCard>
  );
}

function ChildField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
  type?: ChildFieldType;
  placeholder?: string;
  disabled?: boolean;
}) {
  const baseClass =
    "w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2.5 text-xs font-medium text-zinc-200 transition-colors placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none sm:text-sm disabled:opacity-50";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={3}
          value={String(value ?? "")}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseClass} resize-none`}
        />
      ) : type === "checkbox" ? (
        <label className="flex min-h-[42px] items-center gap-2 rounded-lg border border-zinc-800 bg-black/40 px-3 py-2.5 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={Boolean(value)}
            disabled={disabled}
            onChange={(event) => onChange(event.target.checked)}
          />
          Aktif
        </label>
      ) : (
        <input
          type={type === "number" ? "number" : "text"}
          value={type === "number" ? Number(value ?? 0) : String(value ?? "")}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) =>
            onChange(type === "number" ? Number(event.target.value || 0) : event.target.value)
          }
          className={baseClass}
        />
      )}
    </div>
  );
}
