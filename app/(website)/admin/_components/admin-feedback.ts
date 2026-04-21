"use client";

import { toast } from "sonner";

export type AdminToastOptions = {
  successMessage: string;
  errorMessage?: string;
};

export type AdminPendingActionState =
  | "idle"
  | "loading"
  | "saving"
  | "deleting"
  | "processing";

export function getErrorMessage(error: unknown, fallback = "Operasi gagal.") {
  return error instanceof Error ? error.message : fallback;
}

export function adminToastSuccess(message: string) {
  toast.success(message);
}

export function adminToastError(error: unknown, fallback = "Operasi gagal.") {
  toast.error(getErrorMessage(error, fallback));
}
