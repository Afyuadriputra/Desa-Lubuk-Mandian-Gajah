import { apiRequest } from "@/lib/api/client";
import type { ActivationDto, UserDto, UserListQuery } from "@/lib/api/types";

type LoginPayload = {
  nik: string;
  password: string;
};

type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

type CreateWargaPayload = {
  nik: string;
  password: string;
  nama_lengkap: string;
  nomor_hp?: string | null;
  is_active?: boolean;
};

type CreateAdminPayload = {
  nik: string;
  password: string;
  nama_lengkap: string;
  role: "SUPERADMIN" | "ADMIN" | "BUMDES";
  nomor_hp?: string | null;
  is_active?: boolean;
};

export const authApi = {
  login: (payload: LoginPayload) =>
    apiRequest<UserDto>("/auth/login", { method: "POST", body: payload }),

  logout: () =>
    apiRequest<{ detail: string }>("/auth/logout", { method: "POST" }),

  me: () => apiRequest<UserDto>("/auth/me"),

  changePassword: (payload: ChangePasswordPayload) =>
    apiRequest<UserDto>("/auth/change-password", { method: "POST", body: payload }),

  createWarga: (payload: CreateWargaPayload) =>
    apiRequest<UserDto>("/auth/users/warga/create", { method: "POST", body: payload }),

  createAdmin: (payload: CreateAdminPayload) =>
    apiRequest<UserDto>("/auth/users/admin/create", { method: "POST", body: payload }),

  listUsers: (query: UserListQuery = {}) => {
    const params = new URLSearchParams();
    if (query.q) params.set("q", query.q);
    if (query.role) params.set("role", query.role);
    if (typeof query.is_active === "boolean") params.set("is_active", String(query.is_active));
    const suffix = params.toString();
    return apiRequest<UserDto[]>(`/auth/users${suffix ? `?${suffix}` : ""}`);
  },

  activateUser: (userId: string) =>
    apiRequest<ActivationDto>(`/auth/users/${userId}/activate`, { method: "POST" }),

  deactivateUser: (userId: string) =>
    apiRequest<ActivationDto>(`/auth/users/${userId}/deactivate`, { method: "POST" }),
};
