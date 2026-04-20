import type { ApiError } from "@/lib/api/types";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  method?: RequestMethod;
  body?: BodyInit | Record<string, unknown> | null;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  csrfToken?: string;
  next?: NextFetchRequestConfig;
};

const CSRF_SAFE_METHODS = new Set<RequestMethod>(["GET"]);
let csrfBootstrapPromise: Promise<string | undefined> | null = null;

function getApiBaseUrl() {
  return (
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://127.0.0.1:8000/api/v1"
  );
}

export class ApiClientError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.payload = payload;
  }
}

function getCsrfToken(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]*)/);
  return match?.[1];
}

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function isMutatingMethod(method: RequestMethod) {
  return !CSRF_SAFE_METHODS.has(method);
}

function isCsrfFailure(response: Response, payload: unknown) {
  if (response.status !== 403) return false;
  if (typeof payload === "string") {
    return payload.toLowerCase().includes("csrf");
  }
  if (typeof payload === "object" && payload && "detail" in payload) {
    return String((payload as ApiError).detail).toLowerCase().includes("csrf");
  }
  return false;
}

async function ensureCsrfCookie(forceRefresh = false): Promise<string | undefined> {
  if (!isBrowser()) return undefined;

  const existing = getCsrfToken();
  if (existing && !forceRefresh) return existing;

  if (!csrfBootstrapPromise || forceRefresh) {
    csrfBootstrapPromise = (async () => {
      const response = await fetch(`${getApiBaseUrl()}/auth/csrf`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new ApiClientError("Gagal mengambil CSRF token.", response.status);
      }

      const token = getCsrfToken();
      if (token) return token;

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const payload = (await response.json()) as { csrfToken?: string };
        return payload.csrfToken;
      }

      return undefined;
    })().finally(() => {
      csrfBootstrapPromise = null;
    });
  }

  return csrfBootstrapPromise;
}

function buildHeaders(
  method: RequestMethod,
  body: RequestOptions["body"],
  csrfToken?: string,
  headers?: HeadersInit
) {
  const result = new Headers(headers);
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (!isFormData && body && !result.has("Content-Type")) {
    result.set("Content-Type", "application/json");
  }

  // Auto-inject CSRF token for mutating requests
  if (!result.has("X-CSRFToken") && (method === "POST" || method === "PUT" || method === "DELETE")) {
    const token = csrfToken || getCsrfToken();
    if (token) {
      result.set("X-CSRFToken", token);
    }
  }

  return result;
}

function serializeBody(body: RequestOptions["body"]) {
  if (!body) return undefined;
  const isNativeBody =
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    typeof body === "string";

  if (isNativeBody) {
    return body;
  }

  return JSON.stringify(body);
}

async function performRequest(
  path: string,
  options: RequestOptions,
  forceFreshCsrf = false
) {
  const method = options.method ?? "GET";
  if (isBrowser() && isMutatingMethod(method)) {
    await ensureCsrfCookie(forceFreshCsrf);
  }

  const url = `${getApiBaseUrl()}${path}`;
  try {
    return await fetch(url, {
      method,
      credentials: options.credentials ?? "include",
      cache: options.cache,
      headers: buildHeaders(method, options.body, options.csrfToken, options.headers),
      body: serializeBody(options.body),
      next: options.next,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown fetch error";
    throw new ApiClientError(
      `Network error while requesting ${url}. Set API_BASE_URL/NEXT_PUBLIC_API_BASE_URL correctly and ensure backend is running. Original error: ${message}`,
      0,
      error
    );
  }
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  let response = await performRequest(path, options);

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (isBrowser() && isMutatingMethod(options.method ?? "GET") && isCsrfFailure(response, payload)) {
    response = await performRequest(path, options, true);
    const retryContentType = response.headers.get("content-type") ?? "";
    const retryIsJson = retryContentType.includes("application/json");
    const retryPayload = retryIsJson ? await response.json() : await response.text();

    if (!response.ok) {
      const retryMessage =
        typeof retryPayload === "object" && retryPayload && "detail" in retryPayload
          ? String((retryPayload as ApiError).detail)
          : response.statusText;
      throw new ApiClientError(retryMessage, response.status, retryPayload);
    }

    return retryPayload as T;
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "detail" in payload
        ? String((payload as ApiError).detail)
        : response.statusText;
    throw new ApiClientError(message, response.status, payload);
  }

  return payload as T;
}

export { getApiBaseUrl };
