import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://127.0.0.1:8000/api/v1/health", () => {
    return HttpResponse.json({ ok: true });
  }),
];
