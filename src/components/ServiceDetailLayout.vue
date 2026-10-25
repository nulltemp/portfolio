<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title class="text-wrap">
          <h1 class="service-title">{{ service.title }}</h1>
        </v-card-title>
        <v-card-subtitle class="text-wrap">{{ service.url }}</v-card-subtitle>
      </v-card-item>
      <v-card-text class="text-left service-body">
        <p>{{ service.description }}</p>
        <v-btn
          :href="service.url"
          target="_blank"
          rel="noopener"
          color="primary"
          append-icon="mdi-open-in-new"
          class="my-2"
          >{{ actionLabel }}</v-btn
        >
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-btn to="/#service" variant="text" prepend-icon="mdi-chevron-left"
          >サービス一覧に戻る</v-btn
        >
      </v-card-actions>
    </v-card>
  </base-layout>
</template>

<script>
import { useHead } from "@unhead/vue";
import BaseLayout from "@/components/BaseLayout.vue";

export default {
  components: {
    BaseLayout
  },
  props: {
    // src/data/services.js の要素
    service: {
      type: Object,
      required: true
    },
    actionLabel: {
      type: String,
      default: "サイトを開く"
    }
  },
  setup(props) {
    const url = "https://nulltemp.com" + props.service.page;
    const title = `${props.service.title} | nulltemp's portfolio`;
    useHead({
      title,
      link: [{ rel: "canonical", href: url }],
      meta: [
        { name: "description", content: props.service.description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: props.service.description },
        { property: "og:url", content: url },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: props.service.description }
      ]
    });
  }
};
</script>

<style scoped>
.service-title {
  font-size: 1.5rem;
  line-height: 1.4;
}

.service-body {
  font-size: 1rem;
  line-height: 1.9;
}

.service-body :deep(h2) {
  font-size: 1.25rem;
  margin: 2rem 0 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.service-body :deep(h3) {
  font-size: 1.05rem;
  margin: 1.25rem 0 0.5rem;
}

.service-body :deep(p),
.service-body :deep(ul),
.service-body :deep(ol),
.service-body :deep(.v-table) {
  margin-bottom: 1rem;
}

.service-body :deep(ul),
.service-body :deep(ol) {
  padding-left: 1.5rem;
}
</style>
