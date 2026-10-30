import { test, expect } from "@playwright/test";
import services from "../../src/data/services.js";

test.describe("サービス詳細ページ", () => {
  for (const service of services.filter(s => s.page)) {
    test(`${service.title} のページが表示される`, async ({ page }) => {
      await page.goto(service.page);
      await expect(page).toHaveTitle(`${service.title} | nulltemp's portfolio`);
      await expect(
        page.getByRole("heading", { level: 1, name: service.title })
      ).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://nulltemp.com" + service.page
      );
      await expect(
        page.locator(`a[href="${service.url}"][target="_blank"]`).first()
      ).toBeVisible();
    });
  }

  test("トップの「詳しく見る」から詳細ページへ移動し、一覧に戻れる", async ({
    page
  }) => {
    const [first] = services.filter(s => s.page);
    await page.goto("/#service");
    await page
      .locator(`#service a[href="${first.page}"]`, { hasText: "詳しく見る" })
      .click();
    await expect(page).toHaveURL(new RegExp(`${first.page}$`));
    await expect(
      page.getByRole("heading", { level: 1, name: first.title })
    ).toBeVisible();

    await page.getByRole("link", { name: "サービス一覧に戻る" }).click();
    await expect(page).toHaveURL(/\/#service$/);
    await expect(page.locator("#service")).toBeInViewport();
  });
});

test.describe("プリレンダリング", () => {
  test("JavaScript なしでも本文が HTML に含まれている", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const [service] = services.filter(s => s.page);
    await page.goto(service.page);
    await expect(
      page.getByRole("heading", { level: 1, name: service.title })
    ).toBeVisible();
    await context.close();
  });

  const paths = ["/", "/about/", ...services.map(s => s.page), "/404.html"];
  for (const path of paths) {
    test(`${path} の HTML の言語が日本語になっている`, async ({ request }) => {
      const html = await (await request.get(path)).text();
      expect(html).toMatch(/<html[^>]*\blang="ja"/);
    });
  }
});

test.describe("404 ページ", () => {
  test("存在しない URL では「ページが見つかりません」を表示する", async ({
    page
  }) => {
    await page.goto("/no-such-page/");
    await expect(
      page.getByRole("heading", { level: 1, name: "ページが見つかりません" })
    ).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex"
    );
  });

  test("dist/404.html が出力されている", async ({ page }) => {
    await page.goto("/404.html");
    await expect(
      page.getByRole("heading", { level: 1, name: "ページが見つかりません" })
    ).toBeVisible();
  });
});
