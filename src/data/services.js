// トップの Service 欄と各サービスの詳細ページで共有するデータ。
// page があるサービスだけ、詳細ページ（src/routes.js に登録）へのリンクを出す。
export default [
  {
    title: "コインキャッチゲーム",
    url: "https://coin-catching-game.nulltemp.com/",
    description:
      "矢印キーでプレイヤーを操作し、上から降ってくるコインをキャッチしてスコアを競う、Phaser製のシンプルなアクションゲームです。"
  },
  {
    title: "ライフゲーム",
    url: "https://life-game-vue.nulltemp.com/",
    description:
      "Conwayのライフゲーム（セルオートマトン）をVue 3 + Vuetifyで実装したシミュレーターです。グリッドサイズやシミュレーション速度を自由に調整できます。"
  },
  {
    title: "デベロッパーツール",
    url: "https://dev-tools.nulltemp.com/",
    description:
      "文字数カウンター、JSON整形、JWTデコーダーなど、開発時に役立つツールをまとめたNext.js製のWebアプリです。"
  },
  {
    title: "だまって人狼",
    url: "https://jinro.nulltemp.com/",
    page: "/services/jinro/",
    description:
      "自由入力のチャットを使わず、ボタンで選ぶ「定型宣言」（CO・占い結果の報告など）だけで遊ぶ、ブラウザ向けのオンライン人狼ゲームです。"
  }
];
