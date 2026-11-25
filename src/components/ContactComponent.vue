<template>
  <base-layout wide>
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
        class="contact-form"
        >読み込んでいます…</iframe
      >
      <v-card-text class="text-body-2">
        フォームが表示されない場合は、<a
          :href="formUrl"
          target="_blank"
          rel="noopener"
          >こちらからお問い合わせフォームを開いてください</a
        >。
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
  },
  computed: {
    src() {
      return `${this.formUrl}?embedded=true`;
    }
  }
};
</script>

<style scoped>
.contact-form {
  display: block;
  border: 0;
  margin: 0;
}
</style>
