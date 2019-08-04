<template>
  <base-layout>
    <v-card>
      <v-card-title>
        <h1>Skill</h1>
      </v-card-title>
      <v-card-text class="text-xs-left">
        <v-card>
          <v-card-title><h4>使用技術</h4></v-card-title>
          <v-list>
            <v-list-tile v-for="(skill, index) in skills" :key="index">
              <v-list-tile-content>{{ skill.title }}</v-list-tile-content>
              <div class="text-xs-right">
                <v-list-tile-content>
                  {{ skill.value }}
                </v-list-tile-content>
              </div>
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
          <v-card-title><h4>資格</h4></v-card-title>
          <v-list>
            <v-list-tile
              v-for="qualification in qualifications"
              :key="qualification.name"
            >
              <v-list-tile-content>{{
                qualification.name
              }}</v-list-tile-content>
              <div class="text-xs-right">
                <v-list-tile-content>
                  {{ qualification.date }}
                </v-list-tile-content>
              </div>
            </v-list-tile>
          </v-list>
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
        "AWS Lambda",
        "Sequelize",
        "DynamoDB",
        "WebSocket"
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
      qualifications: [
        {
          name: "AWS 認定ソリューションアーキテクト – アソシエイト",
          date: "2019年05月"
        },
        { name: "OSS-DB​ ​Silver", date: "2016年03月" },
        { name: "LPIC-1", date: "2015年11月" },
        { name: "JSTQB​ Foundation​ Level", date: "2014年10月" },
        { name: "基本情報技術者", date: "2008年05月" }
      ]
    };
  }
};
</script>

<style></style>
