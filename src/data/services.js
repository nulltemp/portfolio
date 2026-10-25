// トップの Service 欄と各サービスの詳細ページで共有するデータ。
// page は詳細ページのパス（src/routes.js に登録）。page があるサービスだけ「詳しく見る」を出す。
export default [
  {
    title: "コインキャッチゲーム",
    url: "https://coin-catching-game.nulltemp.com/",
    page: "/services/coin-catching-game/",
    description:
      "矢印キーやタッチでプレイヤーを操作し、上から降ってくるコインをキャッチしてスコアを競う、Phaser製のシンプルなアクションゲームです。"
  },
  {
    title: "ライフゲーム",
    url: "https://life-game-vue.nulltemp.com/",
    page: "/services/life-game/",
    description:
      "Conwayのライフゲーム（セルオートマトン）をVue 3 + Vuetifyで実装したシミュレーターです。グリッドサイズやシミュレーション速度を自由に調整できます。"
  },
  {
    title: "デベロッパーツール",
    url: "https://dev-tools.nulltemp.com/",
    page: "/services/dev-tools/",
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
