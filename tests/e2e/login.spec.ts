import { test, expect } from "@playwright/test";

test("login page render form dasar", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByText("Desa Admin")).toBeVisible();
  await expect(page.getByLabel("NIK")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Masuk Sistem" })).toBeVisible();
});
