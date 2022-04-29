<template>
  <base-layout>
    <v-card>
      <v-card-title>
        <h2>Profile</h2>
      </v-card-title>
      <v-card-text class="text-left">
        <p>フリーのエンジニアのnulltempです</p>
        <v-card>
          <v-card-title><h4>主な職歴</h4></v-card-title>
          <v-list>
            <v-list-item v-for="(work, index) in works" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ work.title }}</v-list-item-title>
              </v-list-item-content>
              {{ work.value }}
            </v-list-item>
          </v-list>
        </v-card>
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
