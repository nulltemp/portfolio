<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title>
          <h2>Contact</h2>
        </v-card-title>
      </v-card-item>
      <iframe
        :src="src"
        title="お問い合わせフォーム"
        loading="lazy"
        width="100%"
        height="620"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        >読み込んでいます…</iframe
      >
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
      src: "https://docs.google.com/forms/d/e/1FAIpQLSdDA-fXdX0pxWWJZY6KDD15joN2WCk6xoF1G3VnKciYL3uVKA/viewform?embedded=true"
    };
  }
};
</script>

<style></style>
