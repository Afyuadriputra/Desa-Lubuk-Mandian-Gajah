import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "../mocks/server";

declare global {
  var __mockRouterParams: Record<string, string> | undefined;
  var __mockPathname: string | undefined;
  var __mockSearchParams: URLSearchParams | undefined;
}

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  globalThis.__mockRouterParams = undefined;
  globalThis.__mockPathname = undefined;
  globalThis.__mockSearchParams = undefined;
});

afterAll(() => {
  server.close();
});

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => globalThis.__mockPathname ?? "/",
    useSearchParams: () => globalThis.__mockSearchParams ?? new URLSearchParams(),
    useParams: () => globalThis.__mockRouterParams ?? {},
  };
});
