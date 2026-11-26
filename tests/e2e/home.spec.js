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

  test("見出しのレベルが飛んでいない", async ({ page }) => {
    const levels = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll(els => els.map(el => Number(el.tagName.slice(1))));
    expect(levels.length).toBeGreaterThan(0);
    let previous = 0;
    for (const level of levels) {
      expect(level, `h${previous} の次が h${level}`).toBeLessThanOrEqual(
        previous + 1
      );
      previous = level;
    }
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
      await expect(
        serviceSection.locator(`a[href="${service.url}"][target="_blank"]`)
      ).toBeVisible();
    }
    // サービスごとの紹介ページは廃止した（#97）
    await expect(serviceSection.locator('a[href^="/services/"]')).toHaveCount(
      0
    );
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
    await page.getByRole("button", { name: "メニューを開く" }).click();
    const drawer = page.getByRole("navigation", {
      name: "メインナビゲーション"
    });
    await drawer.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("Contact はフォームを埋め込まず、新しいタブで開くリンクを置く", async ({
    page
  }) => {
    await page.goto("/");
    const link = page
      .locator("#contact")
      .getByRole("link", { name: /お問い合わせフォームを開く/ });
    await expect(link).toHaveAttribute(
      "href",
      /^https:\/\/docs\.google\.com\/forms\/.+\/viewform$/
    );
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(page.locator("iframe")).toHaveCount(0);
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

test.describe("アイコン", () => {
  test("外部のアイコンフォントに頼らず、ハンバーガーメニューが SVG で表示される", async ({
    page,
    isMobile
  }) => {
    test.skip(!isMobile, "モバイル幅のみ");
    const requested = [];
    page.on("request", req => requested.push(req.url()));
    await page.goto("/");
    await expect(page.locator(".v-app-bar-nav-icon svg path")).toHaveAttribute(
      "d",
      /\S/
    );
    expect(
      requested.filter(url => url.includes("materialdesignicons"))
    ).toEqual([]);
  });

  test("プリレンダリングした HTML にアイコンの SVG が含まれている", async ({
    request
  }) => {
    const html = await (await request.get("/404.html")).text();
    expect(html).toContain("<svg");
    expect(html).not.toContain("materialdesignicons");
  });

  test("favicon と apple-touch-icon が設定され、取得できる", async ({
    page,
    request
  }) => {
    await page.goto("/");
    for (const [rel, contentType] of [
      ["icon", "image/svg+xml"],
      ["apple-touch-icon", "image/png"]
    ]) {
      const href = await page
        .locator(`link[rel="${rel}"]`)
        .getAttribute("href");
      const res = await request.get(href);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain(contentType);
    }
  });
});

test.describe("スキップリンク", () => {
  test("最初の Tab で「本文へスキップ」にフォーカスし、押すと本文へ移る", async ({
    page
  }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: "本文へスキップ" });
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });
});
