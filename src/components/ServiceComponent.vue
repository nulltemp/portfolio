<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title>
          <h2>Service</h2>
        </v-card-title>
      </v-card-item>
      <v-card-text
        class="text-left"
        v-for="service in services"
        :key="service.title"
      >
        <v-card>
          <v-card-title
            ><h4>{{ service.title }}</h4></v-card-title
          >
          <v-card-text>{{ service.description }}</v-card-text>
          <v-card-actions>
            <a :href="service.url" target="_blank" rel="noopener">{{
              service.url
            }}</a>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/BaseLayout.vue";

export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      services: [
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
          title: "人狼ゲーム",
          url: "https://jinro.nulltemp.com/",
          description:
            "自由入力のチャットを使わず、ボタンで選ぶ「定型宣言」（CO・占い結果の報告など）だけで遊ぶ、ブラウザ向けのオンライン人狼ゲームです。"
        }
      ]
    };
  }
};
</script>

<style></style>
