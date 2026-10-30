# コード確認で見つかった課題

2026-10-28 に、ソースコード・設定ファイル・ビルド結果（`dist/`）を読んで確認した結果です。画面の見た目の課題は [ui-review.md](ui-review.md) にまとめています。

- `npm run lint`・`npm run build`・`npm test` はすべて成功
- `npm audit --omit=dev` は脆弱性 0 件

対応したら、該当項目のチェックを入れるか項目を削除してください。

## 掲載内容・データ

- [ ] **経験年数が古い**
  - 職歴は 2013 年 4 月からなのに、Profile の「バックエンド」と Skill の「Java」が「5年以上」のまま。
  - 場所: [src/components/ProfileComponent.vue](../src/components/ProfileComponent.vue)、[src/components/SkillComponent.vue](../src/components/SkillComponent.vue)
  - 正しい年数は運営者の確認が必要。
- [ ] **Skill 欄と Works 欄で技術名が食い違っている**
  - Works にある Docker・Playwright・Perl・Swagger が Skill 欄にない。
  - Skill は「Vuetify.js」、Works は「Vuetify」と表記が違う。
  - 場所: [src/components/SkillComponent.vue](../src/components/SkillComponent.vue)、[src/components/WorkComponent.vue](../src/components/WorkComponent.vue)
- [ ] **資格名に見えない文字（ゼロ幅スペース U+200B）が入っている**
  - 「OSS-DB Silver (INACTIVE)」「JSTQB Foundation Level」に含まれている。コピーや検索で不具合のもとになる。
  - 場所: [src/components/SkillComponent.vue](../src/components/SkillComponent.vue) の `qualifications`
- [ ] **Twitter の URL が古い**
  - `https://twitter.com/nulltemp1` のまま。`x.com` への更新を検討する（ui-review.md の旧ロゴの件とあわせて対応するとよい）。
  - 場所: [src/components/LinkComponent.vue](../src/components/LinkComponent.vue)、[src/pages/HomePage.vue](../src/pages/HomePage.vue) の JSON-LD

## SEO・メタ情報

- [ ] **`og:image` がどのページにもない**
  - SNS でシェアしたときに画像が出ない。OGP 画像（1200×630）を用意し、`twitter:card` を `summary_large_image` にするとよい。
  - 場所: [index.html](../index.html) と各ページの `useHead`
- [ ] **プロフィールのリンク一覧が 2 か所に重複している**
  - [LinkComponent.vue](../src/components/LinkComponent.vue) の `links` と、[HomePage.vue](../src/pages/HomePage.vue) の JSON-LD の `sameAs` が同じ内容。片方だけ直し忘れやすい。
  - 案: [src/data/services.js](../src/data/services.js) と同じように `src/data/links.js` にまとめる
- [ ] **favicon がない**（2026-10-30 追記）
  - `public/` にも [index.html](../index.html) にも favicon がない。タブに既定のアイコンが出るうえ、ブラウザが `/favicon.ico` を取りに来るたびに 404 ページの HTML が返る。
  - 案: `public/` に `favicon.svg`（または `favicon.ico`）と `apple-touch-icon.png` を置き、index.html に `<link rel="icon">` を追加する
- [ ] **sitemap.xml の `lastmod` を手で更新している**（優先度低）
  - 場所: [public/sitemap.xml](../public/sitemap.xml)

## 表示速度・セキュリティ

- [ ] **Roboto フォントの読み込みが重い**（2026-10-30 追記）
  - [index.html](../index.html) で Roboto を 6 種類の太さ（100〜900）読み込んでいるが、本文はほぼ日本語で、Roboto には日本語の文字がないためほとんど使われない。
  - この CSS は表示を止める読み込み方（render-blocking）で、外部への接続も増える。
  - 案: 使う太さ（400・500・700 程度）だけにする / 削除してシステムフォントに任せる
- [ ] **セキュリティ・キャッシュ用のヘッダーがない**（2026-10-30 追記）
  - Cloudflare Pages はレスポンスヘッダーを `public/_headers` で設定できるが、このファイルがない。
  - 案: `X-Content-Type-Options: nosniff`・`Referrer-Policy`・`X-Frame-Options`（または CSP の `frame-ancestors`）を付ける。ファイル名にハッシュが付く `/assets/*` には `Cache-Control: public, max-age=31536000, immutable` を付ける。
  - GA・AdSense・Google フォームを使っているので、CSP 全体の設定は手間がかかる。まずは簡単なヘッダーから始めるとよい。

## アクセシビリティ

- [ ] **見出しのレベルが飛んでいる**
  - Service・Skill・Works 欄で `h2` の次が `h4` になっていて `h3` がない。スクリーンリーダーで見出しをたどると構造がわかりにくい。
  - 場所: [src/components/ServiceComponent.vue](../src/components/ServiceComponent.vue)、[src/components/SkillComponent.vue](../src/components/SkillComponent.vue)、[src/components/WorkComponent.vue](../src/components/WorkComponent.vue)
- [ ] **iframe に非推奨の属性が残っている**
  - `frameborder`・`marginheight`・`marginwidth` は CSS で置き換えられる。
  - 場所: [src/components/ContactComponent.vue](../src/components/ContactComponent.vue)

## コード・設定の整理

- [ ] **package.json の依存の分け方と指定がずれている**
  - 実行時に使う `vue-router`・`@unhead/vue`・`@mdi/js` が `devDependencies` にある（ビルドでバンドルされるので動作はするが、意味としては `dependencies`）。
  - `vue` の指定が `^3.0.0` とゆるすぎる。
  - `sass` は src で使われていないので、不要なら削除できる。
- [ ] **使われていない設定ファイルが残っている**
  - `.browserslistrc` と中身が空の `postcss.config.js` は Vue CLI 時代の名残で、今の Vite 構成では使われていない。
- [ ] **サービスページの追加で 3 か所を直す必要がある**（2026-10-30 追記）
  - [src/routes.js](../src/routes.js) のサービス詳細ルートは、[src/data/services.js](../src/data/services.js) の `page` と同じ内容。さらに [public/sitemap.xml](../public/sitemap.xml) も手で追記している。
  - 案: ルートを services.js から作る（`page` からコンポーネントを決める）。sitemap.xml はビルド時に routes から出力する（vite-ssg の `onFinished` フック）。上の「sitemap.xml の `lastmod` を手で更新している」もあわせて解消できる。
- [ ] **同じスタイルが 2 か所にある**
  - `.wrap-list` のスタイルが [SkillComponent.vue](../src/components/SkillComponent.vue) と [WorkComponent.vue](../src/components/WorkComponent.vue) で重複している。
- [ ] **グローバルなスタイルが漏れやすい**
  - [LinkComponent.vue](../src/components/LinkComponent.vue) と [BaseLayout.vue](../src/components/BaseLayout.vue) のスタイルに `scoped` がない。特に BaseLayout の `.content::before` は、`content` というよくあるクラス名で全体に効く。
  - 空の `<style></style>` が複数のファイルに残っている。
- [ ] **README.md の情報が少ない**
  - テストの手順と Cloudflare Pages へのデプロイの説明がない（CLAUDE.md にはある）。

## 開発の流れ

- [x] **CI がない**
  - `.github/workflows` がなく、PR ごとに lint・ビルド・Playwright テストが自動で走らない。GitHub Actions の追加を推奨。
  - 対応: [.github/workflows/ci.yml](../.github/workflows/ci.yml) を追加。PR と master への push で、lint（修正せず検査のみ）・ビルド・Playwright テストを実行する。
- [ ] **依存パッケージの更新**
  - `vuetify`・`vite`・`@playwright/test` などに小さなバージョンの更新が出ている。
  - `vue-router` v5 は大きなバージョンアップなので、上げる場合は動作確認が必要。
  - `@unhead/vue` は vite-ssg が使っている v2 に合わせる方針なので、v3 には上げない。
