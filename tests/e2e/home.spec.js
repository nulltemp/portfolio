import { test, expect } from "@playwright/test";
import services from "../../src/data/services.js";

const sections = ["profile", "link", "skill", "work", "service", "contact"];

test.describe("トップページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("タイトルと canonical が設定されている", async ({ page }) => {
    await expect(page).toHaveTitle(/nulltemp's portfolio/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://nulltemp.com/"
    );
  });

  test("サイト名が h1 になっている", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "nulltemp's Portfolio" })
    ).toBeVisible();
  });

  test("ナビゲーションの各セクションが存在する", async ({ page }) => {
    for (const id of sections) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("Service 欄に全サービスが表示される", async ({ page }) => {
    const serviceSection = page.locator("#service");
    for (const service of services) {
      await expect(
        serviceSection.getByRole("heading", { name: service.title })
      ).toBeVisible();
    }
  });
});

test.describe("ナビゲーション", () => {
  test("デスクトップではアプリバーのリンクでセクションへ移動する", async ({
    page,
    isMobile
  }) => {
    test.skip(isMobile, "デスクトップ幅のみ");
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "メインナビゲーション" })
      .getByRole("link", { name: "Service" })
      .click();
    await expect(page).toHaveURL(/\/#service$/);
    await expect(page.locator("#service")).toBeInViewport();
  });

  test("モバイルではドロワーからセクションへ移動する", async ({
    page,
    isMobile
  }) => {
    test.skip(!isMobile, "モバイル幅のみ");
    await page.goto("/");
    await page.locator(".v-app-bar-nav-icon").click();
    const drawer = page.getByRole("navigation", {
      name: "メインナビゲーション"
    });
    await drawer.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("フッターから「このサイトについて」へ移動する", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "このサイトについて" }).click();
    await expect(page).toHaveURL(/\/about\/$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "このサイトについて" })
    ).toBeVisible();
  });
});

test.describe("レイアウト", () => {
  for (const width of [320, 360]) {
    test(`幅 ${width}px でもサイト名が切れずに表示される`, async ({ page }) => {
      await page.setViewportSize({ width, height: 640 });
      await page.goto("/");
      const title = page.locator(".site-title");
      const { scrollWidth, clientWidth } = await title.evaluate(el => ({
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }

  test("中身の少ないページでもフッターが縦に伸びない", async ({ page }) => {
    await page.goto("/this-page-does-not-exist/");
    const box = await page.locator(".v-footer").boundingBox();
    expect(box.height).toBeLessThan(80);
  });
});
