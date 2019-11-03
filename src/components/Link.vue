<template>
  <base-layout>
    <v-card>
      <v-card-title>
        <h1>Link</h1>
      </v-card-title>
      <v-card-text class="link-body">
        <span v-for="(link, index) in links" :key="index">
          <a :href="link.value" target="_blank">
            <img
              :src="link.image"
              class="link-image"
              :alt="link.title"
              :title="link.title"
              v-if="link.image"
            />
            <span v-else>{{ link.title }}</span>
          </a>
        </span>
      </v-card-text>
    </v-card>
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/BaseLayout";
import GitHubImage from "@/assets/GitHub-Mark-120px-plus.png";
import QiitaImage from "@/assets/qiita-favicon.png";
import TwitterImage from "@/assets/Twitter_Social_Icon_Circle_Color.svg";
import HatenaImage from "@/assets/hatenablog-logo.svg";

export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      links: [
        {
          title: "GitHub",
          value: "https://github.com/nulltemp",
          image: GitHubImage
        },
        {
          title: "Qiita",
          value: "https://qiita.com/nulltemp",
          image: QiitaImage
        },
        {
          title: "Twitter",
          value: "https://twitter.com/nulltemp1",
          image: TwitterImage
        },
        {
          title: "Blog",
          value: "https://nulltemp.hatenablog.com/",
          image: HatenaImage
        },
        { title: "LAPRAS", value: "https://lapras.com/public/KQD5ZUC" }
      ]
    };
  }
};
</script>

<style>
.link-image {
  width: 4em;
  height: 4em;
}

.link-body {
  justify-content: space-around;
  display: flex;
  align-items: center;
}
</style>
