<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title>
          <h2>Profile</h2>
        </v-card-title></v-card-item
      >
      <v-card-text>
        フリーのエンジニアのnulltempです
        <v-list :items="works">
          <v-list-subheader>主な職歴</v-list-subheader>
          <v-list-item
            v-for="(work, index) in works"
            :key="index"
            :title="work.title"
          >
            <template v-slot:append>{{ work.value }}</template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/BaseLayout";

export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      works: [
        { title: "バックエンド", value: "5年以上" },
        { title: "フロントエンド", value: "2年程度" },
        { title: "その他インフラ等", value: "必要に応じて" }
      ]
    };
  }
};
</script>

<style></style>
