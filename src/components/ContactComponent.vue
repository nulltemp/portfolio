<template>
  <base-layout wide>
    <v-card>
      <v-card-item>
        <v-card-title>
          <h2>Contact</h2>
        </v-card-title>
      </v-card-item>
      <v-card-text>
        <p>お問い合わせは、Google フォームからお送りください。</p>
        <v-btn
          :href="formUrl"
          target="_blank"
          rel="noopener"
          color="primary"
          append-icon="$openInNew"
          class="mt-4"
          >お問い合わせフォームを開く</v-btn
        >
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
      formUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSdDA-fXdX0pxWWJZY6KDD15joN2WCk6xoF1G3VnKciYL3uVKA/viewform"
    };
  }
};
</script>
