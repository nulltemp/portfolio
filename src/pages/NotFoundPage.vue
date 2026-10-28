<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title class="text-wrap">
          <h1 class="page-title">ページが見つかりません</h1>
        </v-card-title>
      </v-card-item>
      <v-card-text class="text-left">
        <p>
          お探しのページは、移動または削除されたか、URLが間違っている可能性があります。
        </p>
      </v-card-text>
      <v-card-actions class="flex-wrap">
        <v-btn to="/" variant="tonal" prepend-icon="$home"
          >トップページへ</v-btn
        >
        <v-btn to="/#service" variant="text">サービス一覧</v-btn>
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
  setup() {
    useHead({
      title: "ページが見つかりません | nulltemp's portfolio",
      meta: [{ name: "robots", content: "noindex" }]
    });
  }
};
</script>
