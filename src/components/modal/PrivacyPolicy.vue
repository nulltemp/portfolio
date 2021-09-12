<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">Privacy Policy</v-btn>
      </template>

      <v-card>
        <v-card-title>Privacy Policy</v-card-title>
        <v-card-text>
          <h3>当サイトが利用しているアクセス解析ツールについて</h3>
          <br />
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
          </p>
          <p>
            このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
          </p>
          <p>
            このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <p>
            この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
          </p>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style></style>
