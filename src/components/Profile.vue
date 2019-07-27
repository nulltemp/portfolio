<template>
  <base-layout>
    <v-card>
      <v-card-title>
        <h1>Profile</h1>
      </v-card-title>
      <v-card-text class="text-xs-left">
        <p>フリーのエンジニアのnulltempです</p>
        <v-card>
          <v-card-title><h4>主な職歴</h4></v-card-title>
          <v-list>
            <v-list-tile v-for="(work, index) in works" :key="index">
              <v-list-tile-content>{{ work.title }}</v-list-tile-content>
              <div class="text-xs-right">
                <v-list-tile-content>
                  {{ work.value }}
                </v-list-tile-content>
              </div>
            </v-list-tile>
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
        { title: "バックエンド", value: "5年程度" },
        { title: "フロントエンド", value: "1年程度" },
        { title: "その他インフラ等", value: "必要に応じて" }
      ]
    };
  }
};
</script>

<style></style>
