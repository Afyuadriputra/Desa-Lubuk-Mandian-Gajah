"use client";

import React from "react";
import type { HomepageContentUpdatePayload } from "@/lib/api/types";

type HomepageEditorSectionsProps = {
  form: Partial<HomepageContentUpdatePayload>;
  updateField: (
    key: keyof HomepageContentUpdatePayload,
    value: string | string[] | object,
  ) => void;
  updateBrand: (
    key: keyof HomepageContentUpdatePayload["brand"],
    value: string,
  ) => void;
  updateContact: (
    key: keyof HomepageContentUpdatePayload["contact"],
    value: string,
  ) => void;
};

export function HomepageEditorSections({
  form,
  updateField,
  updateBrand,
  updateContact,
}: HomepageEditorSectionsProps) {
  return (
    <>
      <SectionCard id="hero-brand" title="Hero & Brand Config">
        <div className="grid grid-cols-1 gap-4">
          <Field label="Hero Badge" value={form.heroBadge} onChange={(v) => updateField("heroBadge", v)} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Headline (Nama Desa)" value={form.villageName} onChange={(v) => updateField("villageName", v)} />
            <Field label="Tagline" value={form.tagline} onChange={(v) => updateField("tagline", v)} />
          </div>
          <Field label="Deskripsi Hero" value={form.heroDescription} onChange={(v) => updateField("heroDescription", v)} multiline />
          <Field label="Hero Image URL" value={form.heroImage} onChange={(v) => updateField("heroImage", v)} />

          <div className="mt-2 border-t border-slate-200/80 pt-4">
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Identitas Merek</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Logo URL" value={form.brand?.logoUrl} onChange={(v) => updateBrand("logoUrl", v)} />
              <Field label="Logo Alt Text" value={form.brand?.logoAlt} onChange={(v) => updateBrand("logoAlt", v)} />
              <Field label="Region Label" value={form.brand?.regionLabel} onChange={(v) => updateBrand("regionLabel", v)} />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard id="naming" title="Asal Usul (Naming)">
        <Field label="Judul Asal Usul" value={form.namingTitle} onChange={(v) => updateField("namingTitle", v)} />
        <Field label="Deskripsi Sejarah" value={form.namingDescription} onChange={(v) => updateField("namingDescription", v)} multiline />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Naming Image URL" value={form.namingImage} onChange={(v) => updateField("namingImage", v)} />
          <Field label="Quote Sejarah" value={form.namingQuote} onChange={(v) => updateField("namingQuote", v)} />
        </div>
      </SectionCard>

      <div id="nature" className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

      <SectionCard id="culture-potential" title="Budaya & Potensi">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="border-b border-slate-200/80 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Nilai Budaya
            </h4>
            <Field label="Judul Budaya" value={form.cultureTitle} onChange={(v) => updateField("cultureTitle", v)} />
            <Field label="Deskripsi Budaya" value={form.cultureDescription} onChange={(v) => updateField("cultureDescription", v)} multiline />
          </div>
          <div className="space-y-4">
            <h4 className="border-b border-slate-200/80 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Potensi Desa
            </h4>
            <Field label="Judul Potensi" value={form.potentialTitle} onChange={(v) => updateField("potentialTitle", v)} />
            <Field label="Kutipan Potensi" value={form.potentialQuote} onChange={(v) => updateField("potentialQuote", v)} />
            <Field
              label="Judul Peluang"
              value={form.potentialOpportunitiesTitle}
              onChange={(v) => updateField("potentialOpportunitiesTitle", v)}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4 border-t border-slate-200/80 pt-4">
          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Pemulihan Ekonomi</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Judul Pemulihan" value={form.recoveryTitle} onChange={(v) => updateField("recoveryTitle", v)} />
            <Field label="Deskripsi Pemulihan" value={form.recoveryDescription} onChange={(v) => updateField("recoveryDescription", v)} multiline />
          </div>
        </div>
      </SectionCard>

      <SectionCard id="footer-contact" title="Footer, Gallery & Kontak">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4 md:border-r md:border-slate-200/80 md:pr-4">
            <Field
              label="Deskripsi Statistik Cepat"
              value={form.quickStatsDescription}
              onChange={(v) => updateField("quickStatsDescription", v)}
              multiline
            />
            <Field label="Judul Fasilitas" value={form.facilitiesTitle} onChange={(v) => updateField("facilitiesTitle", v)} />
            <Field label="Judul Galeri" value={form.galleryTitle} onChange={(v) => updateField("galleryTitle", v)} />
            <Field
              label="Deskripsi Galeri"
              value={form.galleryDescription}
              onChange={(v) => updateField("galleryDescription", v)}
              multiline
            />
            <Field
              label="Deskripsi Footer"
              value={form.footerDescription}
              onChange={(v) => updateField("footerDescription", v)}
              multiline
            />
            <Field
              label="Hak Cipta Footer"
              value={form.footerCopyright}
              onChange={(v) => updateField("footerCopyright", v)}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Informasi Kontak</h4>
            <Field label="Judul Kontak" value={form.contactTitle} onChange={(v) => updateField("contactTitle", v)} />
            <Field
              label="Deskripsi Kontak"
              value={form.contactDescription}
              onChange={(v) => updateField("contactDescription", v)}
              multiline
            />
            <Field label="Alamat Fisik" value={form.contact?.address} onChange={(v) => updateContact("address", v)} multiline />
            <Field label="Nomor WhatsApp" value={form.contact?.whatsapp} onChange={(v) => updateContact("whatsapp", v)} />
            <Field label="URL Gambar Peta" value={form.contact?.mapImage} onChange={(v) => updateContact("mapImage", v)} />
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
    </>
  );
}

function SectionCard({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="admin-panel relative scroll-mt-6 overflow-hidden rounded-[28px] border-white/70 p-5 sm:p-6">
      <div className="absolute left-0 top-6 h-10 w-1 rounded-r-full bg-slate-300" />
      <h2 className="mb-5 pl-2 text-sm font-semibold text-slate-900">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
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
    "w-full rounded-2xl border border-slate-200 bg-white/85 px-3 py-2.5 text-xs font-medium text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.18)] transition-colors placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200/70 sm:text-sm";

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</label>
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
      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</label>
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
        className="w-full resize-none rounded-2xl border border-slate-200 bg-white/85 px-3 py-2.5 text-xs font-medium text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.18)] transition-colors placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200/70 sm:text-sm"
      />
      {helper ? <p className="text-[10px] text-slate-500">{helper}</p> : null}
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
      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Jam Operasional</label>
      {(values || []).map((item, index) => (
        <div key={`${item.day}-${index}`} className="admin-subtle-panel grid grid-cols-1 gap-3 rounded-[22px] p-3">
          <Field
            label={`Hari ${index + 1}`}
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
            label="Jam"
            value={item.time}
            onChange={(value) =>
              onChange(
                values.map((entry, entryIndex) =>
                  entryIndex === index ? { ...entry, time: value } : entry,
                ),
              )
            }
          />
          <label className="flex items-center gap-2 text-xs text-slate-500">
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
          className="rounded-full border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white"
        >
          Tambah Jam
        </button>
        {(values || []).length > 0 ? (
          <button
            type="button"
            onClick={() => onChange(values.slice(0, -1))}
            className="rounded-full border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-white"
          >
            Hapus Terakhir
          </button>
        ) : null}
      </div>
    </div>
  );
}
