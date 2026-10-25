import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath, URL } from "node:url";

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
      filename === "404/index.html" ? "404.html" : undefined
  }
});
