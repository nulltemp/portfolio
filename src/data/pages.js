// ページのパスと、その内容を持つソースファイルの対応。
// src/routes.js（ルート）と vite.config.js（ビルド時の sitemap.xml）で共有する。
// ブラウザと Node（vite.config.js）の両方で読むので、ここでは .vue を import しない。
import services from "./services.js";

// サイトマップに載せる URL の基点
export const SITE_URL = "https://nulltemp.com";

// パスからページコンポーネントのファイル名を決める:
// "/" → HomePage.vue、"/about/" → AboutPage.vue、
// "/services/coin-catching-game/" → services/CoinCatchingGamePage.vue
export function pageFile(path) {
  const segments = path.split("/").filter(Boolean);
  const name = segments.pop() ?? "home";
  const pascal = name
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return [...segments, `${pascal}Page.vue`].join("/");
}

// プリレンダリングする（サイトマップに載せる）ページ。
// サービスの詳細ページは services.js の page から作るので、ここに書き足す必要はない。
export const pages = [
  "/",
  "/about/",
  ...services.filter(service => service.page).map(service => service.page)
];

// ページごとに、sitemap.xml の lastmod（最後に変わったコミットの日付）を調べるファイル（リポジトリ直下からのパス）
export function pageSources(path) {
  const sources = [`src/pages/${pageFile(path)}`];
  // トップページの内容は各セクションのコンポーネントとデータにある
  if (path === "/") sources.push("src/components", "src/data");
  // /about/ の構造化データの運営者情報は person.js から来る
  if (path === "/about/") sources.push("src/data/person.js");
  // 詳細ページのタイトル・説明は services.js から来る
  if (path.startsWith("/services/")) {
    sources.push(
      "src/data/services.js",
      "src/components/ServiceDetailLayout.vue"
    );
  }
  return sources;
}
