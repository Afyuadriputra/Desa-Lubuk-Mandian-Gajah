import { apiRequest } from "@/lib/api/client";
import type {
  ActivationDto,
  GroupDto,
  PermissionGroupDto,
  UserDetailDto,
  UserDto,
  UserListQuery,
} from "@/lib/api/types";

type LoginPayload = {
  nik: string;
  password: string;
};

type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

type ResetUserPasswordPayload = {
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

type UpdateUserPayload = {
  nama_lengkap: string;
  nomor_hp?: string | null;
  role: "SUPERADMIN" | "ADMIN" | "BUMDES" | "WARGA";
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  groups: number[];
  user_permissions: number[];
};

export const authApi = {
  login: (payload: LoginPayload) =>
    apiRequest<UserDto>("/auth/login", { method: "POST", body: payload }),

  logout: () =>
    apiRequest<{ detail: string }>("/auth/logout", { method: "POST" }),

  me: () => apiRequest<UserDto>("/auth/me"),

  changePassword: (payload: ChangePasswordPayload) =>
    apiRequest<UserDto>("/auth/change-password", { method: "POST", body: payload }),

  resetUserPassword: (userId: string, payload: ResetUserPasswordPayload) =>
    apiRequest<UserDto>(`/auth/users/${userId}/reset-password`, {
      method: "POST",
      body: payload,
    }),

  createWarga: (payload: CreateWargaPayload) =>
    apiRequest<UserDto>("/auth/users/warga/create", {
      method: "POST",
      body: {
        ...payload,
        nomor_hp: payload.nomor_hp ?? undefined,
      },
    }),

  createAdmin: (payload: CreateAdminPayload) =>
    apiRequest<UserDto>("/auth/users/admin/create", {
      method: "POST",
      body: {
        ...payload,
        nomor_hp: payload.nomor_hp ?? undefined,
      },
    }),

  listUsers: (query: UserListQuery = {}) => {
    const params = new URLSearchParams();
    if (query.q) params.set("q", query.q);
    if (query.role) params.set("role", query.role);
    if (typeof query.is_active === "boolean") params.set("is_active", String(query.is_active));
    const suffix = params.toString();
    return apiRequest<UserDto[]>(`/auth/users${suffix ? `?${suffix}` : ""}`);
  },

  getUserDetail: (userId: string) =>
    apiRequest<UserDetailDto>(`/auth/users/${userId}`),

  updateUser: (userId: string, payload: UpdateUserPayload) =>
    apiRequest<UserDetailDto>(`/auth/users/${userId}`, {
      method: "PUT",
      body: {
        ...payload,
        nomor_hp: payload.nomor_hp ?? null,
      },
    }),

  listGroups: () =>
    apiRequest<GroupDto[]>("/auth/groups"),

  listPermissions: () =>
    apiRequest<PermissionGroupDto[]>("/auth/permissions"),

  activateUser: (userId: string) =>
    apiRequest<ActivationDto>(`/auth/users/${userId}/activate`, { method: "POST" }),

  deactivateUser: (userId: string) =>
    apiRequest<ActivationDto>(`/auth/users/${userId}/deactivate`, { method: "POST" }),
};
