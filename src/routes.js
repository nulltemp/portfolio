// vite-ssg は、ここに登録したパスごとに静的な HTML を出力する。
// ページの一覧は src/data/pages.js にあり、サービスの詳細ページは
// src/data/services.js の page から作る（コンポーネントは pageFile の命名規則で決まる）。
// sitemap.xml もビルド時に同じ一覧から出力する（vite.config.js）。
import { pages, pageFile } from "./data/pages.js";

const components = import.meta.glob("./pages/**/*Page.vue");

function pageComponent(path) {
  const component = components[`./pages/${pageFile(path)}`];
  if (!component) {
    throw new Error(
      `${path} のページ src/pages/${pageFile(path)} がありません`
    );
  }
  return component;
}

export default [
  ...pages.map(path => ({ path, component: pageComponent(path) })),
  {
    // ビルド時は /404 として描画し、vite.config.js で dist/404.html に出力する
    path: "/:pathMatch(.*)*",
    component: () => import("./pages/NotFoundPage.vue")
  }
];
