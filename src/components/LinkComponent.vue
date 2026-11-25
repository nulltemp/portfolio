<template>
  <base-layout wide>
    <v-card>
      <v-card-title>
        <h2>Link</h2>
      </v-card-title>
      <v-card-text>
        <!-- アイコンは同じ大きさの丸に収め、名前を下に添えて見た目をそろえる。アイコンのないサービスは共通のリンクアイコンを使う -->
        <ul class="link-list">
          <li v-for="link in links" :key="link.value">
            <a
              :href="link.value"
              target="_blank"
              rel="me noopener noreferrer"
              class="link-item"
            >
              <v-avatar size="56" color="grey-lighten-4" class="link-icon">
                <img v-if="link.image" :src="link.image" alt="" />
                <v-icon v-else icon="$link" size="32" color="grey-darken-2" />
              </v-avatar>
              <span class="link-label">{{ link.title }}</span>
            </a>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/BaseLayout.vue";
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
        { title: "LAPRAS", value: "https://lapras.com/public/KQD5ZUC" },
        { title: "teratail", value: "https://teratail.com/users/nulltemp" }
      ]
    };
  }
};
</script>

<style scoped>
.link-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 8px;
}

.link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 80px;
  padding: 4px 0;
  border-radius: 8px;
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
}

.link-item:hover .link-label,
.link-item:focus-visible .link-label {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
}

.link-icon img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.link-label {
  font-size: 0.875rem;
}
</style>
