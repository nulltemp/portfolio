<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title>
          <h2>Skill</h2>
        </v-card-title>
      </v-card-item>
      <v-card-text class="text-left">
        <v-card>
          <v-card-item
            ><v-card-title><h4>使用技術</h4></v-card-title></v-card-item
          >
          <v-list>
            <v-list-item
              v-for="(skill, index) in skills"
              :key="index"
              :title="skill.title"
            >
              <template v-slot:append>{{ skill.value }}</template>
            </v-list-item>
          </v-list>
          <v-card-text>
            <div>その他（バックエンド）</div>
            <template
              v-for="(backend, index) in otherBackendSkills"
              :key="index"
            >
              <v-card>
                <v-card-text>
                  <div>{{ backend.title }}</div>
                  <v-chip
                    :key="index"
                    v-for="(skill, index) in backend.skills"
                    input-value="true"
                    >{{ skill }}</v-chip
                  >
                </v-card-text>
              </v-card>
            </template>
          </v-card-text>
          <v-card-text>
            <div>その他（フロントエンド）</div>
            <template
              v-for="(skill, index) in otherFrontendSkills"
              :key="index"
            >
              <v-chip input-value="true">{{ skill }}</v-chip>
            </template>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-item
            ><v-card-title><h4>IT資格</h4></v-card-title></v-card-item
          >
          <v-list>
            <v-list-item
              v-for="qualification in qualifications"
              :key="qualification.name"
              :title="qualification.name"
            >
              <template v-slot:append>{{ qualification.date }}</template>
            </v-list-item>
          </v-list>
          <v-card-text>
            <div>その他資格</div>
            <template
              v-for="(qualification, index) in otherQualifications"
              :key="index"
            >
              <v-chip input-value="true"
                >{{ qualification.name }} {{ qualification.date }}</v-chip
              >
            </template>
          </v-card-text>
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
        { title: "Java", value: "5年以上" },
        { title: "JavaScript", value: "2年程度" },
        { title: "PHP", value: "1年程度" },
        { title: "Kotlin", value: "若干程度" }
      ],
      otherBackendSkills: [
        {
          title: "DB",
          skills: [
            "PostgreSQL",
            "MySQL",
            "DynamoDB",
            "SQL Server",
            "Oracle Database",
            "H2 Database"
          ]
        },
        {
          title: "Framework",
          skills: [
            "Spring Framework",
            "Jersey",
            "Serverless Framework",
            "Express.js"
          ]
        },
        {
          title: "Test",
          skills: ["JUnit", "Spock", "Jest"]
        },
        {
          title: "OS",
          skills: ["Linux"]
        },
        {
          title: "ORM",
          skills: ["Sequelize", "MyBatis", "Doma", "Hibernate", "JPA", "Prisma"]
        },
        {
          title: "Others",
          skills: [
            "ShellScript",
            "PDF",
            "Pacemaker",
            "FFmpeg",
            "Apache HTTP Server",
            "Wowza Streaming Engine",
            "HTTP Live Streaming",
            "Heartbeat",
            "Tomcat",
            "AWS Lambda",
            "WebSocket",
            "Flyway",
            "AzureStorage",
            "Python",
            "Pipenv",
            "Apache Pulsar",
            "Screwdriver",
            "Node.js",
            "express-validator",
            "TypeScript"
          ]
        }
      ],
      otherFrontendSkills: [
        "Vue.js",
        "jQuery",
        "Bootstrap",
        "Vuex",
        "Vuetify.js",
        "Node.js",
        "Nuxt.js",
        "Google Maps API",
        "Thymeleaf",
        "React",
        "Next.js",
        "TypeScript",
        "JSP",
        "Velocity"
      ],
      qualifications: [
        {
          name: "AWS 認定ソリューションアーキテクト – アソシエイト",
          date: "2022年04月"
        },
        { name: "LPIC-2", date: "2020年10月" },
        { name: "OSS-DB​ ​Silver (INACTIVE)", date: "2016年03月" },
        { name: "JSTQB​ Foundation​ Level", date: "2014年10月" },
        { name: "基本情報技術者", date: "2008年05月" }
      ],
      otherQualifications: [
        { name: "危険物取扱者乙種1類", date: "2007/04" },
        { name: "危険物取扱者乙種2類", date: "2006/08" },
        { name: "危険物取扱者乙種3類", date: "2006/08" },
        { name: "危険物取扱者乙種4類", date: "2005/02" },
        { name: "危険物取扱者乙種5類", date: "2006/02" },
        { name: "危険物取扱者乙種6類", date: "2005/08" },
        { name: "第2種電気工事士", date: "2005/10" },
        { name: "ボイラー技士2級", date: "2006/09" }
      ]
    };
  }
};
</script>

<style></style>
