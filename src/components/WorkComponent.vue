<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title>
          <h2>Works</h2>
        </v-card-title></v-card-item
      >
      <v-card-text class="text-left" v-for="work in works" :key="work.title">
        <v-card>
          <v-card-title
            ><h4>{{ work.title }}</h4></v-card-title
          >
          <v-card>
            <v-card-item><v-card-title>主な担当内容</v-card-title></v-card-item>
            <v-card-text>
              <v-list :items="work.contents">
                <v-list-item
                  v-for="(content, index) in work.contents"
                  :key="index"
                  :title="content"
                >
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-item><v-card-title>期間</v-card-title></v-card-item>
            <v-card-text>{{ work.period }} </v-card-text>
          </v-card>
          <v-card>
            <v-card-item><v-card-title>主な使用技術</v-card-title></v-card-item>
            <v-card-text
              ><v-chip
                v-for="tech in work.technologies"
                :key="tech"
                input-value="true"
                >{{ tech }}</v-chip
              ></v-card-text
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
          title: "データ連携バッチ新規作成",
          contents: ["Pyhtonによるバッチ処理の新規作成"],
          period: "2025年04月～",
          technologies: ["Python", "Linux"]
        },
        {
          title: "CMSサーバOSアップデート",
          contents: ["EC2からEC2+Dockerへの構成変更"],
          period: "2024年12月～2025年03月",
          technologies: [
            "Docker",
            "Python",
            "Linux",
            "MySQL",
            "PostgreSQL",
            "Perl",
            "Apache HTTP Server"
          ]
        },
        {
          title: "顧客向け業務システム開発支援",
          contents: ["API実装・テスト", "画面実装", "ドキュメント作成"],
          period: "2024年09月～2024年11月",
          technologies: [
            "JavaScript",
            "TypeScript",
            "Java",
            "Vue.js",
            "Spring Framework",
            "PostgreSQL",
            "MyBatis",
            "JUnit"
          ]
        },
        {
          title: "補助金申請システムの開発等業務",
          contents: ["システムのAPI修正", "基本設計書、詳細設計書の作成"],
          period: "2024年06月～2024年07月",
          technologies: [
            "JavaScript",
            "TypeScript",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "Prisma",
            "Swagger"
          ]
        },
        {
          title: "車両検査管理システムの開発",
          contents: ["管理システムのAPI実装"],
          period: "2023年08月～2024年04月",
          technologies: [
            "JavaScript",
            "Node.js",
            "Express.js",
            "MySQL",
            "Sequelize",
            "Jest",
            "express-validator"
          ]
        },
        {
          title: "デリバリーサービスのリプレース及び機能追加",
          contents: ["既存機能の一部をマイクロサービス化"],
          period: "2023年01月～2023年04月",
          technologies: [
            "Kotlin",
            "Spring Framework",
            "Oracle Database",
            "JUnit"
          ]
        },
        {
          title: "デリバリーサービスの新規開発",
          contents: ["マイクロサービスのAPI実装", "バッチ処理の追加"],
          period: "2022年05月～2022年12月",
          technologies: [
            "Java",
            "Spring Framework",
            "MySQL",
            "JPA",
            "JUnit",
            "Apache Pulsar",
            "H2 Database",
            "Screwdriver"
          ]
        },
        {
          title: "特定業種向け会員サイトの開発・運用",
          contents: [
            "会員サイトの機能追加",
            "会員サイトの新規基盤へのリニューアル",
            "会員サイトの運用作業"
          ],
          period: "2021年10月～2022年03月",
          technologies: [
            "Java",
            "JavaScript",
            "Spring Framework",
            "jQuery",
            "JSP",
            "Hibernate",
            "Kotlin",
            "PostgreSQL",
            "Oracle Database",
            "Velocity",
            "ShellScript",
            "Python",
            "Pipenv",
            "Linux"
          ]
        },
        {
          title: "施工現場管理システムの開発",
          contents: [
            "管理画面の改修及び機能追加",
            "管理画面リプレースのための技術調査"
          ],
          period: "2019年10月～2021年09月",
          technologies: [
            "Java",
            "JavaScript",
            "Spring Framework",
            "Vue.js",
            "MyBatis",
            "Spock",
            "SQL Server",
            "Flyway",
            "jQuery",
            "Google Maps API",
            "Thymeleaf",
            "AzureStorage",
            "TypeScript",
            "Nuxt.js",
            "React",
            "Next.js"
          ]
        },
        {
          title: "人材紹介システムの開発",
          contents: [
            "AWS Lambdaを使用したバッチ処理",
            "他社サービスを利用した大量メール配信機能",
            "SMS等を使用した求職者への連絡機能",
            "その他認証機能のリプレースや既存機能の修正等"
          ],
          period: "2018年08月～2019年09月",
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
            "WebSocket",
            "Doma"
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
            "Apache HTTP Server",
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
