<template>
  <div>
    <profile-component id="profile" />
    <link-component id="link" />
    <skill-component id="skill" />
    <work-component id="work" />
    <service-component id="service" />
    <contact-component id="contact" />
  </div>
</template>

<script>
import { useHead } from "@unhead/vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
import SkillComponent from "@/components/SkillComponent.vue";
import WorkComponent from "@/components/WorkComponent.vue";
import ServiceComponent from "@/components/ServiceComponent.vue";
import LinkComponent from "@/components/LinkComponent.vue";
import ContactComponent from "@/components/ContactComponent.vue";

const title = "nulltemp's portfolio | プログラマ nulltemp のポートフォリオ";
const description =
  "プログラマ nulltemp のポートフォリオサイトです。バックエンド・フロントエンド開発のスキル、IT資格、職務経歴、個人開発のWebサービスを掲載しています。";
const ogDescription =
  "プログラマ nulltemp のポートフォリオサイトです。スキル、職務経歴、個人開発のWebサービスを掲載しています。";

export default {
  components: {
    ProfileComponent,
    SkillComponent,
    WorkComponent,
    ServiceComponent,
    LinkComponent,
    ContactComponent
  },
  setup() {
    useHead({
      title,
      link: [{ rel: "canonical", href: "https://nulltemp.com/" }],
      meta: [
        { name: "description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:title", content: "nulltemp's portfolio" },
        { property: "og:description", content: ogDescription },
        { property: "og:url", content: "https://nulltemp.com/" },
        { property: "profile:username", content: "nulltemp" },
        { name: "twitter:title", content: "nulltemp's portfolio" },
        { name: "twitter:description", content: ogDescription }
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: "https://nulltemp.com/",
            name: "nulltemp's portfolio",
            inLanguage: "ja",
            mainEntity: {
              "@type": "Person",
              name: "nulltemp",
              alternateName: "nulltemp1",
              jobTitle: "プログラマ",
              url: "https://nulltemp.com/",
              sameAs: [
                "https://github.com/nulltemp",
                "https://qiita.com/nulltemp",
                "https://twitter.com/nulltemp1",
                "https://nulltemp.hatenablog.com/",
                "https://lapras.com/public/KQD5ZUC",
                "https://teratail.com/users/nulltemp"
              ]
            }
          })
        }
      ]
    });
  }
};
</script>
