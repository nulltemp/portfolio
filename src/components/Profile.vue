<template>
  <v-container>
    <v-layout text-xs-center justify-center wrap>
      <v-flex xs8>
        <v-card>
          <v-card-title>
            <h1>Profile</h1>
          </v-card-title>
          <v-card-text class="text-xs-left">
            <p>フリーのエンジニア</p>
            <v-card>
              <v-card-title><h4>主な職歴</h4></v-card-title>
              <v-list>
                <v-list-tile v-for="(work, index) in works" :key="index">
                  <v-list-tile-content>{{ work.title }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    {{ work.value }}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
            <v-card>
              <v-card-title><h4>使用技術</h4></v-card-title>
              <v-list>
                <v-list-tile v-for="(skill, index) in skills" :key="index">
                  <v-list-tile-content>{{ skill.title }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    {{ skill.value }}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-text>
                <div>その他（バックエンド）</div>
                <template v-for="(skill, index) in otherBackendSkills">
                  <v-chip :key="index">{{ skill }}</v-chip>
                </template>
              </v-card-text>
              <v-card-text>
                <div>その他（フロントエンド）</div>
                <template v-for="(skill, index) in otherFrontendSkills">
                  <v-chip :key="index">{{ skill }}</v-chip>
                </template>
              </v-card-text>
            </v-card>
            <v-card>
              <v-card-title><h4>リンク</h4></v-card-title>
              <v-list>
                <v-list-tile v-for="(link, index) in links" :key="index">
                  <v-list-tile-content
                    ><a :href="link.value">{{
                      link.title
                    }}</a></v-list-tile-content
                  >
                </v-list-tile>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      works: [
        { title: "バックエンド", value: "5年程度" },
        { title: "フロントエンド", value: "1年程度" },
        { title: "その他インフラ等", value: "必要に応じて" }
      ],
      skills: [
        { title: "Java", value: "5年程度" },
        { title: "JavaScript", value: "1年程度" },
        { title: "PHP", value: "1年程度" }
      ],
      otherBackendSkills: [
        "Tomcat",
        "PostgreSQL",
        "ShellScript",
        "PDF",
        "JUnit",
        "Jersey",
        "Pacemaker",
        "MySQL",
        "Linux",
        "FFmpeg",
        "Apache",
        "Wowza Streaming Engine",
        "HTTP Live Streaming",
        "Heartbeat",
        "Serverless Framework",
        "Spring Framework",
        "Oracle Database",
        "AWS Lambda"
      ],
      otherFrontendSkills: [
        "Vue.js",
        "jQuery",
        "Bootstrap",
        "Vuex",
        "Vuetify.js",
        "Node.js",
        "Nuxt.js"
      ],
      links: [
        { title: "GitHub", value: "https://github.com/nulltemp" },
        { title: "Qiita", value: "https://qiita.com/nulltemp" },
        { title: "Twitter", value: "https://twitter.com/nulltemp1" },
        { title: "Blog", value: "https://nulltemp.hatenablog.com/" }
      ]
    };
  }
};
</script>

<style></style>
