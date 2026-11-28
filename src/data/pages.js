// ページのパスと、その内容を持つソースファイルの対応。
// src/routes.js（ルート）と vite.config.js（ビルド時の sitemap.xml）で共有する。
// ブラウザと Node（vite.config.js）の両方で読むので、ここでは .vue を import しない。
// サイトマップに載せる URL の基点
export const SITE_URL = "https://nulltemp.com";

// パスからページコンポーネントのファイル名を決める:
// "/" → HomePage.vue、"/about/" → AboutPage.vue、
// "/foo/bar-baz/" → foo/BarBazPage.vue
export function pageFile(path) {
  const segments = path.split("/").filter(Boolean);
  const name = segments.pop() ?? "home";
  const pascal = name
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return [...segments, `${pascal}Page.vue`].join("/");
}

// プリレンダリングする（サイトマップに載せる）ページ
export const pages = ["/", "/about/"];

// ページごとに、sitemap.xml の lastmod（最後に変わったコミットの日付）を調べるファイル（リポジトリ直下からのパス）
export function pageSources(path) {
  const sources = [`src/pages/${pageFile(path)}`];
  // トップページの内容は各セクションのコンポーネントとデータにある
  if (path === "/") sources.push("src/components", "src/data");
  // /about/ の構造化データの運営者情報は person.js、サービスの一覧は services.js、
  // 「技術情報の発信」と sameAs のリンクは links.js から来る
  if (path === "/about/") {
    sources.push(
      "src/data/person.js",
      "src/data/services.js",
      "src/data/links.js"
    );
  }
  return sources;
}
