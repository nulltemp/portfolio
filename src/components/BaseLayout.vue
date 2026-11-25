<template>
  <section class="content">
    <v-container>
      <v-row justify="center" class="flex-wrap">
        <v-col cols="12" :lg="wide ? 10 : 8" :xl="wide ? 9 : 8">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  props: {
    // トップページの各欄のように、表や一覧が中心で横幅を使いたいときに付ける。
    // 文章が中心の詳細ページは、読みやすい行の長さを保つため付けない
    wide: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
.content::before {
  content: "";
  display: block;
  height: 5rem;
  margin-top: -5rem;
  visibility: hidden;
}
</style>
