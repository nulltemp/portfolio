<template>
  <base-layout>
    <v-card>
      <v-card-title>
        <h1>Link</h1>
      </v-card-title>
      <v-card-text class="text-xs-left">
        <v-list>
          <v-list-tile v-for="(link, index) in links" :key="index">
            <v-list-tile-content
              ><a :href="link.value">{{ link.title }}</a></v-list-tile-content
            >
          </v-list-tile>
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
      links: [
        { title: "GitHub", value: "https://github.com/nulltemp" },
        { title: "Qiita", value: "https://qiita.com/nulltemp" },
        { title: "Twitter", value: "https://twitter.com/nulltemp1" },
        { title: "Blog", value: "https://nulltemp.hatenablog.com/" }
      ]
    };
  }
};
</script>

<style></style>
