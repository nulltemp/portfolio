# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A personal portfolio site for nulltemp (hosted at https://nulltemp.com/), built with Vue 3 + Vuetify 4, vue-router and Vite. The top page is one scrolling page assembled from section components; additional pages (currently per-service detail pages under `/services/`) are separate routes. `npm run build` statically prerenders every route to HTML via `vite-ssg` (SSG, not a live SSR server) for deployment as static assets on Cloudflare Pages.

## Commands

Package manager is **npm** (yarn was removed in commit `3c1cd2c`; ignore any yarn references in README.md, which is stale).

```
npm install       # install dependencies
npm run dev       # start Vite dev server with HMR
npm run build     # vite-ssg build: builds + prerenders every route to static HTML under dist/
npm run serve     # preview the production build
npm run lint      # eslint --fix over src, tests and playwright.config.js
npm test          # Playwright UI tests (builds, then serves dist/ via vite preview)
npm run test:ui   # same, in Playwright's interactive UI mode
```

UI tests use Playwright ([playwright.config.js](playwright.config.js), specs in `tests/e2e/`). The `webServer` runs `npm run build && npm run serve` on port 4173, so tests hit the prerendered static output, not the dev server; tests run in a desktop and a mobile (Pixel 7) project. On a fresh machine run `npx playwright install chromium` once to download the browser. Specs import [src/data/services.js](src/data/services.js) so new service pages get covered automatically. README.md's test instructions are stale.

CI is GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)): on PRs and pushes to `master` it runs `npm ci`, ESLint without `--fix` (`npx eslint src tests playwright.config.js`), then `npm test` (which also covers the build). Failing runs upload `test-results/` (traces) as an artifact.

## Architecture

- **Entry point**: [src/main.js](src/main.js) uses `vite-ssg`'s `ViteSSG(App, { routes, scrollBehavior }, setup)` to create the app with vue-router, install the Vuetify plugin ([src/plugins/vuetify.js](src/plugins/vuetify.js)), and mount to `#app`. Routes live in [src/routes.js](src/routes.js); `ssgOptions.dirStyle: "nested"` in vite.config.js makes `/services/jinro/` output as `dist/services/jinro/index.html`. When adding a route, also add it to [public/sitemap.xml](public/sitemap.xml). A catch-all route renders [src/pages/NotFoundPage.vue](src/pages/NotFoundPage.vue); at build time `ssgOptions.includedRoutes` renders it as `/404` and `htmlFileName` writes it to `dist/404.html`, which Cloudflare Pages serves with status 404 for unknown URLs (without it, Pages falls back to serving `index.html` with 200 for every path). This same entry runs both in the browser (dev/HMR, and hydration of the prerendered HTML) and in Node at build time (`vite-ssg build` renders it to static HTML with `@vue/server-renderer`, then the client bundle hydrates it).
- Vuetify is created with `ssr: true` ([src/plugins/vuetify.js](src/plugins/vuetify.js)) so its components render safely in vite-ssg's Node build pass; `vite.config.js` sets `ssr: { noExternal: ["vuetify"] }` so Vuetify's per-component `.css` imports get bundled instead of left as raw `import`s Node can't load.
- Deploy target is **Cloudflare Pages**: build command `npm run build`, output directory `dist/`. It's a fully static deploy (no Cloudflare Worker/Pages Function) — each route's HTML already contains the fully rendered page, and Vue hydrates it client-side.
- **[src/App.vue](src/App.vue)** is the shell shared by all pages: an app bar whose nav links point at the top page's sections (`/#profile`, `/#link`, `/#skill`, `/#work`, `/#service`, `/#contact`), a `<router-view>` in `v-main`, and the footer. The site name is the `h1` only on the top page; detail pages use their own title as `h1`.
- **[src/pages/HomePage.vue](src/pages/HomePage.vue)** is the top page: it stacks one section component per nav target, in order.
- **Per-page `<head>`**: title, description, canonical, OGP and JSON-LD are set per page with `useHead` from `@unhead/vue` (kept at v2 to match the copy vite-ssg uses; a different major would be a separate instance). [index.html](index.html) only holds site-wide tags (GA, AdSense, the Roboto font, `og:site_name`, etc.) — don't put per-page tags back there, or every page would claim the top page's canonical.
- **Service detail pages** (`src/pages/services/*Page.vue`) wrap their prose in [src/components/ServiceDetailLayout.vue](src/components/ServiceDetailLayout.vue), which renders the title/link/back button and sets the page's head from the service entry. Service data (title, URL, description, optional `page` path) lives in [src/data/services.js](src/data/services.js), shared with `ServiceComponent.vue`, which shows a 「詳しく見る」 link for entries that have `page`.
- **Section components** (`src/components/ProfileComponent.vue`, `LinkComponent.vue`, `SkillComponent.vue`, `WorkComponent.vue`, `ServiceComponent.vue`, `ContactComponent.vue`) each wrap their content in **[src/components/BaseLayout.vue](src/components/BaseLayout.vue)**, a shared container that also handles anchor-scroll offset (via the `.content::before` spacer, so fixed app-bar doesn't cover the anchor target).
- Section content is **hardcoded data** in each component's `data()` — skills, work history, and links are plain arrays/objects in the `.vue` files themselves, not fetched from an API or CMS. To update resume/work history content, edit the `works`/`skills`/`qualifications` arrays directly in [SkillComponent.vue](src/components/SkillComponent.vue) and [WorkComponent.vue](src/components/WorkComponent.vue).
- **ContactComponent.vue** embeds a Google Form via iframe; there is no backend/API in this repo.
- **[public/privacy/index.html](public/privacy/index.html)** is a standalone static privacy policy page served at `https://nulltemp.com/privacy/`, shared by the portfolio and the subdomain sites (coin-catching-game, life-game-vue, dev-tools, jinro, proc-quest). It's copied as-is to `dist/` (not part of the Vue app or the router), and the App.vue footer links to it with a plain `href`.
- Content is Japanese; keep new user-facing text consistent with that.
- Icons are inline SVG from `@mdi/js` via Vuetify's `mdi-svg` iconset (no icon font/CDN). Register each icon as an alias in [src/plugins/vuetify.js](src/plugins/vuetify.js) and reference it as `"$name"` in templates; plain `mdi-xxx` class strings won't render.
- Vuetify components are auto-imported (`vite-plugin-vuetify` with `autoImport: true` in [vite.config.js](vite.config.js)), so no manual per-component Vuetify imports are needed.
- Path alias `@` maps to `src/` (configured in vite.config.js).
- Google Analytics (gtag.js) and the Google AdSense script are wired directly into [index.html](index.html); [public/ads.txt](public/ads.txt) holds the AdSense publisher ID.

## Code style

- Enforced via ESLint flat config ([eslint.config.js](eslint.config.js): `@eslint/js` recommended + `eslint-plugin-vue` `flat/essential` + `@vue/eslint-config-prettier`) + Prettier.
- Prettier config ([.prettierrc](.prettierrc)): no trailing commas, `arrowParens: avoid`, `endOfLine: auto`.
- Run `npm run lint` before committing to auto-fix style issues.
