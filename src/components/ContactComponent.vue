<template>
  <base-layout>
    <iframe
      :src="src"
      width="100%"
      height="620"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      >読み込んでいます…</iframe
    >
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
      src: "https://docs.google.com/forms/d/e/1FAIpQLSdDA-fXdX0pxWWJZY6KDD15joN2WCk6xoF1G3VnKciYL3uVKA/viewform?embedded=true"
    };
  }
};
</script>

<style></style>
