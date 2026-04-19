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

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${getApiBaseUrl()}${path}`;
  let response: Response;

  try {
    response = await fetch(url, {
      method: options.method ?? "GET",
      credentials: options.credentials ?? "include",
      cache: options.cache,
      headers: buildHeaders(options.method ?? "GET", options.body, options.csrfToken, options.headers),
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

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

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
