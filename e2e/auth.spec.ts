import { expect, test } from "@playwright/test";

test.describe("Sign-in page", () => {
  test("should display sign-in form", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("should show social login buttons", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page.getByRole("button", { name: /google/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /github/i })).toBeVisible();
  });

  test("should have link to sign-up", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible();
  });
});

test.describe("Sign-up page", () => {
  test("should display sign-up form", async ({ page }) => {
    await page.goto("/sign-up");
    await expect(page.getByLabel(/^name/i)).toBeVisible();
    await expect(page.getByLabel(/^email/i)).toBeVisible();
    await expect(page.getByLabel(/^password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  });

  test("should have link to sign-in", async ({ page }) => {
    await page.goto("/sign-up");
    await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
  });
});

test.describe("Protected routes", () => {
  test("should redirect to sign-in when accessing dashboard unauthenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/sign-in/);
  });
});
