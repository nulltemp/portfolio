// vite-ssg は、ここに登録したパスごとに静的な HTML を出力する。
// 新しいページを足したら public/sitemap.xml にも追加すること。
export default [
  {
    path: "/",
    component: () => import("./pages/HomePage.vue")
  },
  {
    path: "/services/jinro/",
    component: () => import("./pages/services/JinroPage.vue")
  }
];
