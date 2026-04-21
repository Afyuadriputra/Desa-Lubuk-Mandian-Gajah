import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { ApiClientError, apiRequest } from "@/lib/api/client";

describe("apiRequest", () => {
  it("return JSON payload for GET request", async () => {
    server.use(
      http.get("http://127.0.0.1:8000/api/v1/demo", () => {
        return HttpResponse.json({ ok: true, feature: "admin" });
      }),
    );

    await expect(apiRequest<{ ok: boolean; feature: string }>("/demo")).resolves.toEqual({
      ok: true,
      feature: "admin",
    });
  });

  it("bootstrap csrf cookie before mutating request", async () => {
    server.use(
      http.get("http://127.0.0.1:8000/api/v1/auth/csrf", () => {
        document.cookie = "csrftoken=test-token; path=/";
        return HttpResponse.json({ csrfToken: "test-token" });
      }),
      http.post("http://127.0.0.1:8000/api/v1/demo", ({ request }) => {
        return HttpResponse.json({
          token: request.headers.get("x-csrftoken"),
        });
      }),
    );

    await expect(apiRequest<{ token: string | null }>("/demo", { method: "POST", body: { ok: true } })).resolves.toEqual({
      token: "test-token",
    });
  });

  it("retry once when backend reject stale csrf token", async () => {
    let csrfCallCount = 0;
    let postCallCount = 0;

    server.use(
      http.get("http://127.0.0.1:8000/api/v1/auth/csrf", () => {
        csrfCallCount += 1;
        const token = csrfCallCount === 1 ? "stale-token" : "fresh-token";
        document.cookie = `csrftoken=${token}; path=/`;
        return HttpResponse.json({ csrfToken: token });
      }),
      http.post("http://127.0.0.1:8000/api/v1/demo-retry", ({ request }) => {
        postCallCount += 1;
        const token = request.headers.get("x-csrftoken");

        if (token === "stale-token") {
          document.cookie = "csrftoken=stale-token; path=/";
          return HttpResponse.json({ detail: "CSRF token missing or incorrect." }, { status: 403 });
        }

        return HttpResponse.json({ ok: true, token, postCallCount });
      }),
    );

    await expect(apiRequest<{ ok: boolean; token: string; postCallCount: number }>("/demo-retry", {
      method: "POST",
      body: { ok: true },
    })).resolves.toEqual({
      ok: true,
      token: "fresh-token",
      postCallCount: 2,
    });
  });

  it("throw ApiClientError on non-csrf backend failure", async () => {
    server.use(
      http.get("http://127.0.0.1:8000/api/v1/fail", () => {
        return HttpResponse.json({ detail: "Gagal total." }, { status: 400 });
      }),
    );

    await expect(apiRequest("/fail")).rejects.toMatchObject({
      name: "ApiClientError",
      status: 400,
      message: "Gagal total.",
    } satisfies Partial<ApiClientError>);
  });
});
