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
- [ ] **Profile の本文が 1 行だけ**（2026-10-30 追記）
  - 本文が「プログラマのnulltempです」だけで、最初に読まれる欄なのに得意分野や強みが伝わらない。
  - 場所: [src/components/ProfileComponent.vue](../src/components/ProfileComponent.vue)
  - 案: 2〜3 行の自己紹介と代表的な実績を書く。内容は運営者の確認が必要。

## SEO・メタ情報

- [x] **全ページの HTML が `lang="en"` になっていた**（2026-10-30 追記）
  - [index.html](../index.html) は `lang="ja"` なのに、ビルド時に unhead の既定値で上書きされ、Vue の全ページが `<html lang="en">` で出力されていた。読み上げが英語の発音になる、ブラウザが翻訳を勧めるなどの影響がある。
  - 対応: [src/App.vue](../src/App.vue) の `useHead` で `lang` を `ja` に指定し、[tests/e2e/pages.spec.js](../tests/e2e/pages.spec.js) に確認するテストを追加した。

- [ ] **`og:image` がどのページにもない**
  - SNS でシェアしたときに画像が出ない。OGP 画像（1200×630）を用意し、`twitter:card` を `summary_large_image` にするとよい。
  - 場所: [index.html](../index.html) と各ページの `useHead`
- [ ] **プロフィールのリンク一覧が 3 か所に重複している**
  - [LinkComponent.vue](../src/components/LinkComponent.vue) の `links` と、[HomePage.vue](../src/pages/HomePage.vue) の JSON-LD の `sameAs` が同じ内容。さらに [AboutPage.vue](../src/pages/AboutPage.vue) の「技術情報の発信」にも一部（ブログ・Qiita・GitHub）がある。どれかを直し忘れやすい。
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
- [ ] **CSS と JS が重い**（2026-10-30 追記）
  - 全ページで読み込む `app-*.css` が 248KB（gzip 後 37KB）、`app-*.js` が 282KB（gzip 後 100KB）ある。動きが必要なのはほぼドロワーだけで、ほかは静的な内容。
  - 案: [ui-review.md](ui-review.md) のトップページの情報量の課題を片付けたあとで、Vuetify の不要なスタイルを減らせるか試す。

## アクセシビリティ

- [x] **スマホのメニューボタンに名前がなかった**（2026-10-30 追記）
  - `v-app-bar-nav-icon` に `aria-label` がなく、スクリーンリーダーでは何のボタンか分からなかった。
  - 対応: [src/App.vue](../src/App.vue) で `aria-label="メニューを開く"` を付け、[tests/e2e/home.spec.js](../tests/e2e/home.spec.js) のドロワーのテストをこの名前でボタンを探す形に変えた。
- [ ] **本文へのスキップリンクがない**（2026-10-30 追記）
  - キーボードで操作すると、ページを開くたびにナビゲーションを通過することになる。
  - 場所: [src/App.vue](../src/App.vue)
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
- [ ] **依存パッケージの更新に気づく仕組みがない**（2026-10-30 追記）
  - `.github/dependabot.yml` がなく、更新や脆弱性の修正に手動で気づくしかない。
  - 案: Dependabot を追加する。`@unhead/vue` の v3 は上の方針に合わせて対象から外す。
- [ ] **Node のバージョンが指定されていない**（2026-10-30 追記）
  - `.nvmrc` も package.json の `engines` もない。CI は Node 22 だが、開発環境は別のバージョンのことがあり、Cloudflare Pages 側のバージョンはリポジトリからは確認できない。
  - 案: `.nvmrc` を追加し、CI（`node-version-file`）と Cloudflare Pages で同じバージョンを使う。
- [ ] **アクセシビリティの自動テストがない**（2026-10-30 追記）
  - メニューボタンの名前がないような問題を、今の UI テストでは一般的に検出できない。
  - 案: `@axe-core/playwright` を追加し、主なページを検査する。
