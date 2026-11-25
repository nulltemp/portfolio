import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath, URL } from "node:url";
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { SITE_URL, pages, pageSources } from "./src/data/pages.js";

// ルートと同じページ一覧に、Vue アプリの外にある静的ページを足したもの
const sitemapEntries = [
  ...pages.map(path => ({ path, sources: pageSources(path) })),
  { path: "/privacy/", sources: ["public/privacy/index.html"] }
];

// ファイルが最後に変わったコミットの日付（YYYY-MM-DD）。git が使えなければビルドした日
function lastModified(sources) {
  try {
    const date = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", ...sources],
      {
        encoding: "utf8"
      }
    ).trim();
    if (date) return date;
  } catch {
    // git がない・リポジトリでない場合は下の日付にする
  }
  return new Date().toISOString().slice(0, 10);
}

function writeSitemap() {
  const urls = sitemapEntries
    .map(
      ({ path, sources }) =>
        `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastModified(sources)}</lastmod>\n  </url>`
    )
    .join("\n");
  writeFileSync(
    fileURLToPath(new URL("./dist/sitemap.xml", import.meta.url)),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  ssr: {
    noExternal: ["vuetify"]
  },
  ssgOptions: {
    // /services/jinro/ を services/jinro/index.html として出力する
    dirStyle: "nested",
    // 動的ルート（404 用の catch-all）は除き、代わりに /404 を描画する
    includedRoutes: paths =>
      paths
        .filter(path => !path.includes(":") && !path.includes("*"))
        .concat("/404"),
    // Cloudflare Pages は dist/404.html があると、存在しない URL にステータス 404 で返す
    htmlFileName: filename =>
      filename === "404/index.html" ? "404.html" : undefined,
    // sitemap.xml はページ一覧（src/data/pages.js）から出力する
    onFinished: writeSitemap
  }
});
