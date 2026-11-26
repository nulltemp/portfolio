import { test, expect } from "@playwright/test";
import services from "../../src/data/services.js";
import { SITE_URL, pages } from "../../src/data/pages.js";

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

test("sitemap.xml に全ページが載っている", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  for (const path of [...pages, "/privacy/"]) {
    expect(xml).toContain(`<loc>${SITE_URL}${path}</loc>`);
  }
  expect(xml).not.toContain("/404");
  for (const [, date] of xml.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) {
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
});

test.describe("構造化データ", () => {
  for (const [path, type] of [
    ["/", "ProfilePage"],
    ["/about/", "AboutPage"]
  ]) {
    test(`${path} に ${type} の JSON-LD があり、url が canonical と一致する`, async ({
      page
    }) => {
      await page.goto(path);
      const json = await page
        .locator('script[type="application/ld+json"]')
        .textContent();
      const data = JSON.parse(json);
      expect(data["@type"]).toBe(type);
      expect(data.url).toBe(
        await page.locator('link[rel="canonical"]').getAttribute("href")
      );
      expect(data.mainEntity).toMatchObject({
        "@type": "Person",
        name: "nulltemp"
      });
    });
  }
});

test.describe("Google アナリティクス・AdSense", () => {
  const trackers =
    /googletagmanager\.com|google-analytics\.com|googlesyndication\.com|doubleclick\.net/;
  for (const path of ["/", "/about/", "/privacy/"]) {
    test(`本番以外のホスト名では ${path} で読み込まない`, async ({ page }) => {
      const requested = [];
      page.on("request", req => requested.push(req.url()));
      await page.goto(path);
      await page.waitForLoadState("load");
      expect(requested.filter(url => trackers.test(url))).toEqual([]);
      expect(await page.evaluate(() => typeof window.gtag)).toBe("undefined");
    });
  }

  test("本番のホスト名（nulltemp.com）では読み込む", async ({
    page,
    baseURL
  }) => {
    const requested = [];
    // nulltemp.com へのリクエストは手元の dist/ から返し、計測・広告のホストへは送らずに記録だけする
    await page.route("https://nulltemp.com/**", async route => {
      const url = new URL(route.request().url());
      const response = await route.fetch({
        url: new URL(url.pathname + url.search, baseURL).toString()
      });
      await route.fulfill({ response });
    });
    await page.route(trackers, route => {
      requested.push(route.request().url());
      return route.abort();
    });
    await page.goto("https://nulltemp.com/");
    await expect
      .poll(() => requested.map(url => new URL(url).hostname).sort())
      .toEqual(["pagead2.googlesyndication.com", "www.googletagmanager.com"]);
    expect(await page.evaluate(() => typeof window.gtag)).toBe("function");
  });
});
