<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title class="text-wrap">
          <h1 class="page-title">このサイトについて</h1>
        </v-card-title>
      </v-card-item>
      <v-card-text class="text-left prose">
        <p>
          nulltemp.com は、プログラマの nulltemp
          が個人で運営しているサイトです。自分のスキルや職務経歴を紹介するポートフォリオと、個人で開発したWebサービスの公開を目的としています。
        </p>

        <h2>運営者</h2>
        <v-table density="compact">
          <tbody>
            <tr>
              <th>運営者</th>
              <td>nulltemp</td>
            </tr>
            <tr>
              <th>職業</th>
              <td>プログラマ</td>
            </tr>
            <tr>
              <th>主な分野</th>
              <td>
                バックエンド開発（Java・Spring Framework
                など）、フロントエンド開発（Vue.js など）
              </td>
            </tr>
            <tr>
              <th>連絡先</th>
              <td>
                <router-link to="/#contact">お問い合わせフォーム</router-link>
              </td>
            </tr>
          </tbody>
        </v-table>
        <p>
          スキル・資格・職務経歴の詳細は、<router-link to="/#profile"
            >トップページ</router-link
          >に掲載しています。
        </p>

        <h2>公開しているサービス</h2>
        <p>
          nulltemp.com
          のサブドメインで、次のWebサービスを公開しています。どれも登録不要・無料で、ブラウザからすぐに使えます。各サービスの遊び方や使い方、作った理由、使った技術は、それぞれの紹介ページで説明しています。
        </p>
        <ul>
          <li v-for="service in services" :key="service.url">
            <router-link :to="service.page">{{ service.title }}</router-link
            >：{{ service.description }}
          </li>
        </ul>

        <h2>技術情報の発信</h2>
        <p>
          開発で調べたことや作ったものについては、次のサイトで発信しています。
        </p>
        <ul>
          <li>
            ブログ：<a
              href="https://nulltemp.hatenablog.com/"
              target="_blank"
              rel="noopener"
              >nulltemp.hatenablog.com</a
            >
          </li>
          <li>
            Qiita：<a
              href="https://qiita.com/nulltemp"
              target="_blank"
              rel="noopener"
              >qiita.com/nulltemp</a
            >
          </li>
          <li>
            GitHub：<a
              href="https://github.com/nulltemp"
              target="_blank"
              rel="noopener"
              >github.com/nulltemp</a
            >（一部のサービスのソースコードを公開しています）
          </li>
        </ul>

        <h2>このサイトの作り</h2>
        <p>
          このサイトは Vue 3 と Vuetify で作り、vite-ssg
          で各ページを静的なHTMLとして書き出して、Cloudflare Pages
          で公開しています。JavaScript
          を読み込む前からページの内容が表示されるので、表示が速く、検索エンジンにも内容が伝わりやすい構成です。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          サイトや各サービスについてのご質問、不具合のご報告、ご要望は、<router-link
            to="/#contact"
            >お問い合わせフォーム</router-link
          >からお送りください。個人で運営しているため、お返事にお時間をいただく場合や、内容によってはお答えできない場合があります。
        </p>

        <h2>プライバシーポリシー・広告・免責事項</h2>
        <p>
          当サイトおよび各サービスでは、アクセス解析のために Google
          アナリティクスを利用しています。また、一部のサイトでは第三者配信の広告サービス「Google
          AdSense」を利用しています。取得する情報とその扱い、広告の配信、免責事項については、<a
            href="/privacy/"
            >プライバシーポリシー</a
          >をご覧ください。
        </p>
      </v-card-text>
    </v-card>
  </base-layout>
</template>

<script>
import { useHead } from "@unhead/vue";
import BaseLayout from "@/components/BaseLayout.vue";
import services from "@/data/services";

const title = "このサイトについて | nulltemp's portfolio";
const description =
  "nulltemp.com の運営者情報と、このサイトの目的、公開しているWebサービス、お問い合わせ先、プライバシーポリシーについてのご案内です。";
const url = "https://nulltemp.com/about/";

export default {
  components: {
    BaseLayout
  },
  setup() {
    useHead({
      title,
      link: [{ rel: "canonical", href: url }],
      meta: [
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description }
      ]
    });
  },
  data() {
    return {
      services
    };
  }
};
</script>

<style scoped>
th {
  white-space: nowrap;
  width: 8em;
}
</style>
