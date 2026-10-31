// vite-ssg は、ここに登録したパスごとに静的な HTML を出力する。
// 新しいページを足したら public/sitemap.xml にも追加すること。
export default [
  {
    path: "/",
    component: () => import("./pages/HomePage.vue")
  },
  {
    path: "/about/",
    component: () => import("./pages/AboutPage.vue")
  },
  {
    path: "/services/coin-catching-game/",
    component: () => import("./pages/services/CoinCatchingGamePage.vue")
  },
  {
    path: "/services/life-game/",
    component: () => import("./pages/services/LifeGamePage.vue")
  },
  {
    path: "/services/dev-tools/",
    component: () => import("./pages/services/DevToolsPage.vue")
  },
  {
    path: "/services/jinro/",
    component: () => import("./pages/services/JinroPage.vue")
  },
  {
    path: "/services/proc-quest/",
    component: () => import("./pages/services/ProcQuestPage.vue")
  },
  {
    // ビルド時は /404 として描画し、vite.config.js で dist/404.html に出力する
    path: "/:pathMatch(.*)*",
    component: () => import("./pages/NotFoundPage.vue")
  }
];
