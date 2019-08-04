<template>
  <base-layout>
    <v-card>
      <v-card-title>
        <h1>Works</h1>
      </v-card-title>
      <v-card-text class="text-xs-left" v-for="work in works" :key="work.title">
        <v-card>
          <v-card-title
            ><h4>{{ work.title }}</h4></v-card-title
          >
          <v-card>
            <v-card-title>主な担当内容</v-card-title>
            <v-card-text>
              <ul>
                <li v-for="(content, index) in work.contents" :key="index">
                  {{ content }}
                </li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>期間</v-card-title>
            <v-card-text>{{ work.period }} </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>主な使用技術</v-card-title>
            <v-card-text
              ><v-chip v-for="tech in work.technologies" :key="tech">{{
                tech
              }}</v-chip></v-card-text
            >
          </v-card>
        </v-card>
      </v-card-text>
    </v-card>
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
      works: [
        {
          title: "人材紹介システムの開発",
          contents: [
            "AWS Lambdaを使用したバッチ処理",
            "他社サービスを利用した大量メール配信機能",
            "SMS等を使用した求職者への連絡機能",
            "その他認証機能のリプレースや既存機能の修正等"
          ],
          period: "2018年08月～現在",
          technologies: [
            "Java",
            "JavaScript",
            "Spring Framework",
            "AWS Lambda",
            "Vue.js",
            "Nuxt.js",
            "Node.js",
            "Serverless Framework",
            "PostgreSQL",
            "Sequelize",
            "Oracle Database",
            "Vuex",
            "DynamoDB",
            "WebSocket"
          ]
        },
        {
          title: "ライブ動画配信サービスおよび動画再生プレイヤーの開発",
          contents: [
            "ライブ配信サービスへの機能追加",
            "動画再生プレイヤーへの機能追加"
          ],
          period: "2016年07月～2018年07月",
          technologies: [
            "Linux",
            "Java",
            "JavaScript",
            "ShellScript",
            "PHP",
            "jQuery",
            "Bootstrap",
            "JUnit",
            "Vue.js",
            "Vuex",
            "Vuetify",
            "FFmpeg",
            "MySQL",
            "Pacemaker",
            "Apache",
            "Wowza Streaming Engine",
            "HTTP Live Streaming",
            "Heartbeat"
          ]
        },
        {
          title: "帳票管理ソフトの開発",
          contents: ["PDF編集機能の拡張", "帳票管理ソフトの機能追加"],
          period: "2013年04月～2016年06月",
          technologies: [
            "Java",
            "ShellScript",
            "JUnit",
            "Jersey",
            "PostgreSQL",
            "Tomcat",
            "PDF",
            "Linux"
          ]
        }
      ]
    };
  }
};
</script>

<style></style>
