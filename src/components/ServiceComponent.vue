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
            <a :href="service.url" target="_blank">{{ service.url }}</a>
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
        }
      ]
    };
  }
};
</script>

<style></style>
