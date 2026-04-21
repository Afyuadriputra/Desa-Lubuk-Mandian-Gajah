import { redirect } from "next/navigation";

export default function AdminSuratAliasPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (typeof value === "string" && value) {
      query.set(key, value);
    }
  }
  redirect(`/admin/surat-queue${query.toString() ? `?${query.toString()}` : ""}`);
}
