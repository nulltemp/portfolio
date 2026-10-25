import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import routes from "./routes";
import vuetify from "./plugins/vuetify";

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash };
      return { top: 0 };
    }
  },
  ({ app }) => {
    app.use(vuetify);
  }
);
