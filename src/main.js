import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

export const createApp = ViteSSG(App, ({ app }) => {
  app.use(vuetify);
});
