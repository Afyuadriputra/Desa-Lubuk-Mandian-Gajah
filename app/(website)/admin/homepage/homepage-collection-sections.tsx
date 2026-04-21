"use client";

import React, { useEffect, useState } from "react";
import { homepageApi } from "@/lib/api/homepage";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import type {
  HomepageAdminContentDto,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  sectionId?: string;
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

type HomepageCollectionSectionsProps = {
  data: HomepageAdminContentDto;
  refreshAfterMutation: (successMessage: string) => Promise<void>;
};

export function HomepageCollectionSections({
  data,
  refreshAfterMutation,
}: HomepageCollectionSectionsProps) {
  return (
    <>
      <ChildSection<HomepageCultureCardDto>
        sectionId="culture-cards"
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
        onCreate={(payload) =>
          homepageApi.createCultureCard(payload as HomepageCultureCardPayload).then(() =>
            refreshAfterMutation("Culture card ditambahkan."),
          )
        }
        onUpdate={(id, payload) =>
          homepageApi.updateCultureCard(id, payload as HomepageCultureCardPayload).then(() =>
            refreshAfterMutation("Culture card diperbarui."),
          )
        }
        onDelete={(id) =>
          homepageApi.deleteCultureCard(id).then(() =>
            refreshAfterMutation("Culture card dihapus."),
          )
        }
      />

      <ChildSection<HomepageRecoveryItemDto>
        sectionId="recovery-items"
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
        onCreate={(payload) =>
          homepageApi.createRecoveryItem(payload as HomepageRecoveryItemPayload).then(() =>
            refreshAfterMutation("Recovery item ditambahkan."),
          )
        }
        onUpdate={(id, payload) =>
          homepageApi.updateRecoveryItem(id, payload as HomepageRecoveryItemPayload).then(() =>
            refreshAfterMutation("Recovery item diperbarui."),
          )
        }
        onDelete={(id) =>
          homepageApi.deleteRecoveryItem(id).then(() =>
            refreshAfterMutation("Recovery item dihapus."),
          )
        }
      />

      <ChildSection<HomepagePotentialOpportunityItemDto>
        sectionId="opportunities"
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
        onCreate={(payload) =>
          homepageApi
            .createPotentialOpportunity(payload as HomepagePotentialOpportunityItemPayload)
            .then(() => refreshAfterMutation("Opportunity item ditambahkan."))
        }
        onUpdate={(id, payload) =>
          homepageApi
            .updatePotentialOpportunity(id, payload as HomepagePotentialOpportunityItemPayload)
            .then(() => refreshAfterMutation("Opportunity item diperbarui."))
        }
        onDelete={(id) =>
          homepageApi.deletePotentialOpportunity(id).then(() =>
            refreshAfterMutation("Opportunity item dihapus."),
          )
        }
      />

      <ChildSection<HomepageFacilityDto>
        sectionId="facilities"
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
        onCreate={(payload) =>
          homepageApi.createFacility(payload as HomepageFacilityPayload).then(() =>
            refreshAfterMutation("Facility ditambahkan."),
          )
        }
        onUpdate={(id, payload) =>
          homepageApi.updateFacility(id, payload as HomepageFacilityPayload).then(() =>
            refreshAfterMutation("Facility diperbarui."),
          )
        }
        onDelete={(id) =>
          homepageApi.deleteFacility(id).then(() =>
            refreshAfterMutation("Facility dihapus."),
          )
        }
      />

      <ChildSection<HomepageGalleryItemDto>
        sectionId="gallery"
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
        onCreate={(payload) =>
          homepageApi.createGalleryItem(payload as HomepageGalleryItemPayload).then(() =>
            refreshAfterMutation("Gallery item ditambahkan."),
          )
        }
        onUpdate={(id, payload) =>
          homepageApi.updateGalleryItem(id, payload as HomepageGalleryItemPayload).then(() =>
            refreshAfterMutation("Gallery item diperbarui."),
          )
        }
        onDelete={(id) =>
          homepageApi.deleteGalleryItem(id).then(() =>
            refreshAfterMutation("Gallery item dihapus."),
          )
        }
      />

      <ChildSection<HomepageFooterLinkDto>
        sectionId="footer-links"
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
        onCreate={(payload) =>
          homepageApi.createFooterLink(payload as HomepageFooterLinkPayload).then(() =>
            refreshAfterMutation("Footer link ditambahkan."),
          )
        }
        onUpdate={(id, payload) =>
          homepageApi.updateFooterLink(id, payload as HomepageFooterLinkPayload).then(() =>
            refreshAfterMutation("Footer link diperbarui."),
          )
        }
        onDelete={(id) =>
          homepageApi.deleteFooterLink(id).then(() =>
            refreshAfterMutation("Footer link dihapus."),
          )
        }
      />

      <ChildSection<HomepageStatItemDto>
        sectionId="stats-manual"
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
        onCreate={(payload) =>
          homepageApi.createStat(payload as HomepageStatItemPayload).then(() =>
            refreshAfterMutation("Stat manual ditambahkan."),
          )
        }
        onUpdate={(id, payload) =>
          homepageApi.updateStat(id, payload as HomepageStatItemPayload).then(() =>
            refreshAfterMutation("Stat manual diperbarui."),
          )
        }
        onDelete={(id) =>
          homepageApi.deleteStat(id).then(() =>
            refreshAfterMutation("Stat manual dihapus."),
          )
        }
      />
    </>
  );
}

export function SummaryCard({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <div className="admin-subtle-panel flex flex-col items-center justify-center gap-1.5 rounded-[22px] px-3 py-3 text-center transition-colors hover:bg-white">
      <span className="text-slate-500">{icon}</span>
      <div className="flex flex-col items-center">
        <p className="text-lg leading-none font-bold text-slate-900">{count}</p>
        <p className="mt-1 text-[9px] uppercase tracking-widest text-slate-400">{label}</p>
      </div>
    </div>
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

function ChildSection<T extends EditableChildItem>({
  sectionId,
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
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

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
  }, [createDefaults, items, editingId]);

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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menambah item.";
      setError(message);
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal memperbarui item.";
      setError(message);
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menghapus item.";
      setError(message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <SectionCard id={sectionId} title={title}>
      <p className="text-sm text-slate-500">{description}</p>
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      ) : null}

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-5 text-sm text-slate-500">
            {emptyLabel}
          </div>
        ) : (
          items.map((item) => {
            const draft = editingId === item.id ? editingForm : item;
            return (
              <div key={item.id} className="admin-subtle-panel rounded-[24px] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
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
                        className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Save className="size-3.5" />
                          {busy === "update" ? "Menyimpan..." : "Simpan"}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setEditingForm(null);
                        }}
                        className="rounded-full border-slate-200 bg-white/85 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-white"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <X className="size-3.5" />
                          Batal
                        </span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-full border-slate-200 bg-white/85 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-white"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Pencil className="size-3.5" />
                        Edit
                      </span>
                    </button>
                  )}
                  <AlertDialog
                    open={pendingDeleteId === item.id}
                    onOpenChange={(open) => {
                      setPendingDeleteId(open ? (item.id as number) : null);
                    }}
                  >
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        disabled={busy === "delete"}
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 disabled:opacity-50"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Trash2 className="size-3.5" />
                          Hapus
                        </span>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus item ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Data pada section {title.toLowerCase()} akan dihapus permanen. Pastikan item ini memang tidak lagi dipakai di homepage.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          tone="danger"
                          onClick={() => handleDelete(item.id as number)}
                        >
                          Hapus item
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
                      onChange={(value) =>
                        updateDraft(editingId === item.id ? "edit" : "create", field.key, value)
                      }
                      disabled={editingId !== item.id}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="admin-panel rounded-[24px] border-white/70 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Tambah Item Baru
        </h3>
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
          className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          <span className="inline-flex items-center gap-1.5">
            <Plus className="size-3.5" />
            {busy === "create" ? "Menambah..." : "Tambah Item"}
          </span>
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
    "w-full rounded-2xl border border-slate-200 bg-white/85 px-3 py-2.5 text-xs font-medium text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.18)] transition-colors placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200/70 sm:text-sm disabled:opacity-50";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</label>
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
        <label className="flex min-h-[42px] items-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-3 py-2.5 text-sm text-slate-600">
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
