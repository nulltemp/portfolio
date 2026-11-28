import { test, expect } from "@playwright/test";
import { SITE_URL, pages } from "../../src/data/pages.js";
import services from "../../src/data/services.js";

test.describe("プリレンダリング", () => {
  test("JavaScript なしでも本文が HTML に含まれている", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/about/");
    await expect(
      page.getByRole("heading", { level: 1, name: "このサイトについて" })
    ).toBeVisible();
    await context.close();
  });

  const paths = [...pages, "/404.html"];
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
  expect(xml).not.toContain("/services/");
  for (const [, date] of xml.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) {
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
});

// vite preview は _redirects を解釈しないので、配信される dist/_redirects の中身を確かめる
test("削除したサービス紹介ページの旧 URL を各サービスのサイトへ 301 で転送する", async ({
  request
}) => {
  const response = await request.get("/_redirects");
  expect(response.ok()).toBe(true);
  const rules = (await response.text())
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => line.split(/\s+/));
  const redirects = new Map(
    rules.map(([from, to, status]) => [from, { to, status }])
  );
  const oldPages = {
    "coin-catching-game": "https://coin-catching-game.nulltemp.com/",
    "life-game": "https://life-game-vue.nulltemp.com/",
    "dev-tools": "https://dev-tools.nulltemp.com/",
    jinro: "https://jinro.nulltemp.com/",
    "proc-quest": "https://proc-quest.nulltemp.com/"
  };
  const serviceUrls = services.map(service => service.url);
  for (const [slug, url] of Object.entries(oldPages)) {
    // 転送先は今も services.js に載っているサービスのサイト
    expect(serviceUrls).toContain(url);
    for (const from of [`/services/${slug}/`, `/services/${slug}`]) {
      expect(redirects.get(from)).toEqual({ to: url, status: "301" });
    }
  }
  expect(rules).toHaveLength(Object.keys(oldPages).length * 2);
});

test.describe("OGP 画像", () => {
  for (const path of [...pages, "/privacy/"]) {
    test(`${path} に og:image と twitter:image がある`, async ({ page }) => {
      await page.goto(path);
      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      expect(ogImage).toBe(`${SITE_URL}/og.png`);
      expect(
        await page.locator('meta[name="twitter:image"]').getAttribute("content")
      ).toBe(ogImage);
      expect(
        await page.locator('meta[name="twitter:card"]').getAttribute("content")
      ).toBe("summary_large_image");
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    });
  }

  test("og.png が 1200×630 の PNG として配信される", async ({ request }) => {
    const response = await request.get("/og.png");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toBe("image/png");
    const body = await response.body();
    // PNG の IHDR チャンクにある幅と高さ
    expect(body.readUInt32BE(16)).toBe(1200);
    expect(body.readUInt32BE(20)).toBe(630);
  });
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

  // テストの終わりに処理中のルートが残っていてもエラーにしない
  test.afterEach(({ page }) => page.unrouteAll({ behavior: "ignoreErrors" }));

  // nulltemp.com へのリクエストは手元の dist/ から返し、計測・広告のホストへは送らずに記録だけする
  async function openAsProduction(page, baseURL, url) {
    const requested = [];
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
    await page.goto(url);
    await page.waitForLoadState("load");
    return () => requested.map(url => new URL(url).hostname).sort();
  }

  for (const path of ["/", "/about/"]) {
    test(`本番のホスト名（nulltemp.com）では ${path} で読み込む`, async ({
      page,
      baseURL
    }) => {
      const hosts = await openAsProduction(
        page,
        baseURL,
        `https://nulltemp.com${path}`
      );
      await expect
        .poll(hosts)
        .toEqual(["pagead2.googlesyndication.com", "www.googletagmanager.com"]);
      expect(await page.evaluate(() => typeof window.gtag)).toBe("function");
    });
  }

  // Cloudflare Pages は存在しない URL に dist/404.html を返す。コンテンツのない画面なので広告は読み込まない（#105）
  test("本番のホスト名でも 404 ページでは AdSense を読み込まない", async ({
    page,
    baseURL
  }) => {
    const hosts = await openAsProduction(
      page,
      baseURL,
      "https://nulltemp.com/404.html"
    );
    await expect(
      page.getByRole("heading", { level: 1, name: "ページが見つかりません" })
    ).toBeVisible();
    await expect.poll(hosts).toEqual(["www.googletagmanager.com"]);
    expect(hosts()).not.toContain("pagead2.googlesyndication.com");
  });
});

test.describe("プライバシーポリシー", () => {
  test("お問い合わせフォームと運営者情報（/about/）へのリンクがある", async ({
    page
  }) => {
    // お問い合わせフォームの URL は、トップページの Contact と同じもの
    await page.goto("/");
    const formUrl = await page
      .getByRole("link", { name: "お問い合わせフォームを開く" })
      .getAttribute("href");
    expect(formUrl).toMatch(/^https:\/\/docs\.google\.com\/forms\//);

    await page.goto("/privacy/");
    await expect(
      page.getByRole("link", { name: "お問い合わせフォーム" })
    ).toHaveAttribute("href", formUrl);
    await expect(
      page.getByRole("link", { name: "このサイトについて" })
    ).toHaveAttribute("href", "/about/");
  });
});
