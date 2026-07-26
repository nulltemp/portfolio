# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page personal portfolio site for nulltemp (hosted at https://nulltemp.com/), built with Vue 3 + Vuetify 3 and Vite. The entire site is one scrolling page assembled from section components.

## Commands

Package manager is **npm** (yarn was removed in commit `3c1cd2c`; ignore any yarn references in README.md, which is stale).

```
npm install       # install dependencies
npm run dev       # start Vite dev server with HMR
npm run build     # production build to dist/
npm run serve     # preview the production build
npm run lint      # eslint --fix over src (.js, .vue)
```

There is no test suite and no `test` script, despite what README.md says.

## Architecture

- **Entry point**: [src/main.js](src/main.js) creates the Vue app, installs the Vuetify plugin ([src/plugins/vuetify.js](src/plugins/vuetify.js)), and mounts to `#app`.
- **[src/App.vue](src/App.vue)** is the entire page shell: an app bar with anchor-link nav (`#profile`, `#link`, `#skill`, `#work`, `#contact`) and a `v-main` that stacks one section component per nav target, in order.
- **Section components** (`src/components/ProfileComponent.vue`, `LinkComponent.vue`, `SkillComponent.vue`, `WorkComponent.vue`, `ContactComponent.vue`) each wrap their content in **[src/components/BaseLayout.vue](src/components/BaseLayout.vue)**, a shared container that also handles anchor-scroll offset (via the `.content::before` spacer, so fixed app-bar doesn't cover the anchor target).
- Section content is **hardcoded data** in each component's `data()` — skills, work history, and links are plain arrays/objects in the `.vue` files themselves, not fetched from an API or CMS. To update resume/work history content, edit the `works`/`skills`/`qualifications` arrays directly in [SkillComponent.vue](src/components/SkillComponent.vue) and [WorkComponent.vue](src/components/WorkComponent.vue).
- **ContactComponent.vue** embeds a Google Form via iframe; there is no backend/API in this repo.
- **modal/PrivacyPolicy.vue** is a `v-dialog`-based privacy notice, rendered in the app footer in App.vue.
- Content is Japanese; keep new user-facing text consistent with that.
- Vuetify components are auto-imported (`vite-plugin-vuetify` with `autoImport: true` in [vite.config.js](vite.config.js)), so no manual per-component Vuetify imports are needed.
- Path alias `@` maps to `src/` (configured in vite.config.js).
- Google Analytics (gtag.js) is wired directly into [index.html](index.html).

## Code style

- Enforced via ESLint (`plugin:vue/vue3-essential`, `eslint:recommended`, `plugin:prettier/recommended`) + Prettier.
- Prettier config ([.prettierrc](.prettierrc)): no trailing commas, `arrowParens: avoid`, `endOfLine: auto`.
- Run `npm run lint` before committing to auto-fix style issues.
