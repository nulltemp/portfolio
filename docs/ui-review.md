# UI 確認で見つかった課題

2026-10-28 に、ビルド済みのサイト（`npm run build` → `npm run serve`）を Playwright で開き、スクリーンショットを撮って目視で確認した結果です。

- 対象ページ: `/`、`/about/`、`/services/jinro/`、`/services/dev-tools/`、存在しない URL（404）
- 画面幅: デスクトップ 1280px、Pixel 7（412px）、360px、320px
- 横スクロールの発生と JS エラーはなし

対応したら、該当項目のチェックを入れるか項目を削除してください。

## 優先度: 高

- [x] **スマホでサイト名が途中で切れる**
  - ヘッダーのサイト名が「NULLTEMP'S PORT」（360px では「NULLTEMP'S P」）で切れ、省略記号も出ない。全ページの最上部なので目立つ。
  - 場所: [src/App.vue](../src/App.vue) の `v-toolbar-title`
  - 案: スマホ幅だけ文字サイズを下げる / 2 行を許す / 短い表記（例: 「nulltemp」）にする
  - 対応: `v-spacer` がタイトルと余白を分け合ってタイトル幅が半分になっていたので削除。幅 400px 以下は文字サイズを下げ、収まらない場合は省略記号を出すようにした。
- [x] **中身の少ないページでフッターが縦に大きく広がる**
  - 404 ページ（デスクトップ）でフッターの高さが約 280px になり、画面下半分が黒い帯になる（トップページでは 52px）。フッターが余った高さを埋めるように伸びている（computed style の `flex: 1 1 auto`）。
  - 場所: [src/App.vue](../src/App.vue) の `v-footer`
  - 案: フッターの高さを固定する（`flex: 0 0 auto` など）か、`v-main` 側を伸ばす
  - 対応: `v-footer` に `flex-grow-0` を付け、余った高さは `v-main` だけが埋めるようにした。
- [ ] **リンクがブラウザ標準の青＋下線のまま**
  - Link 欄の「LAPRAS」「teratail」と、Service 欄の各サービス URL が `rgb(0, 0, 238)` の素のリンク色で、Vuetify の配色から浮いている。
  - 場所: [src/components/LinkComponent.vue](../src/components/LinkComponent.vue)、[src/components/ServiceComponent.vue](../src/components/ServiceComponent.vue)
- [ ] **Link 欄のアイコンの大きさ・見た目がそろっていない**
  - GitHub・Qiita・Twitter は大きい塗りつぶしアイコン、はてなブログは細い線画で小さく見え、LAPRAS と teratail はアイコンなしの文字だけ。
  - 360px 幅では 6 つが詰まり、アイコン同士がほぼ接する。
  - Twitter のアイコンが旧ロゴのまま。
  - 場所: [src/components/LinkComponent.vue](../src/components/LinkComponent.vue)、`src/assets/`

## 優先度: 中（デザインの好みの範囲）

- [ ] **デスクトップでコンテンツ幅が狭い**
  - 1280px 幅でも本文は約 620px で、左右の半分以上が余白。`v-container` の内側でさらに `v-col lg="8"` にしているため。文章中心の詳細ページには適度な幅だが、トップの Skill・Works はもう少し広くてもよい。
  - 場所: [src/components/BaseLayout.vue](../src/components/BaseLayout.vue)
- [ ] **カードの入れ子が深い**
  - Skill 欄が「カード＞カード＞カード」の 3 重で、枠線と影が重なる。
  - 場所: [src/components/SkillComponent.vue](../src/components/SkillComponent.vue)
- [ ] **見出しの大きさが逆転している**
  - Works の各案件で「主な担当内容」「期間」「主な使用技術」が案件名（太字）と同等以上の大きさで表示される。
  - Skill の見出しと「使用技術」の間の余白が大きい。
  - 場所: [src/components/WorkComponent.vue](../src/components/WorkComponent.vue)、[src/components/SkillComponent.vue](../src/components/SkillComponent.vue)
- [ ] **表記ゆれ・ラベル**
  - 「製品CMS改修」の使用技術チップに `java`（小文字）がある。ほかは `Java`。
  - Profile の「主な職歴」の下は「バックエンド 5年以上」などの経験分野なので、見出しは「経験」などのほうが合う。
  - 場所: [src/components/WorkComponent.vue](../src/components/WorkComponent.vue)、[src/components/ProfileComponent.vue](../src/components/ProfileComponent.vue)

## アクセシビリティ・堅牢性

- [ ] **アイコンフォントが外部 CDN 頼み**
  - `@mdi/font` を jsdelivr から読み込んでいる（[index.html](../index.html)）。CDN が落ちる・遅いと、スマホのハンバーガーメニューが白丸だけになり、メニューの場所がわからなくなる（CDN を遮断して再現を確認）。
  - 案: `@mdi/font` を npm パッケージとして同梱する / 使うアイコンだけ `@mdi/js` の SVG で入れる
- [ ] **Contact 欄が読み込み中・失敗時に空白になる**
  - Google フォームの iframe が表示されるまでの間や、読み込めなかったとき（広告ブロッカー等）は、高さ 620px の真っ白な領域になる。iframe 内の「読み込んでいます…」は現在のブラウザでは表示されない。
  - 場所: [src/components/ContactComponent.vue](../src/components/ContactComponent.vue)
  - 案: 「フォームが表示されない場合はこちら」として、フォームへの直接リンクを iframe の下に置く

## 問題なかった点

- サービス詳細ページの本文・見出し・表・リストは、デスクトップでもスマホでも読みやすい。
- 404 ページの内容と導線（トップページへ・サービス一覧）。
- スマホのドロワーメニューの開閉と遷移。

## 未確認

確認環境のネットワーク制限で、次の点は見られていません。

- Google フォームの中身
- Google Analytics・AdSense の表示
