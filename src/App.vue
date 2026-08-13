<template>
  <v-app>
    <v-app-bar color="grey-lighten-4">
      <v-toolbar-title class="text-uppercase">Portfolio</v-toolbar-title>
      <v-spacer />
      <v-btn text href="#profile" class="text-uppercase">profile</v-btn>
      <v-btn text href="#link" class="text-uppercase">link</v-btn>
      <v-btn text href="#skill" class="text-uppercase">skill</v-btn>
      <v-btn text href="#work" class="text-uppercase">work</v-btn>
      <v-btn text href="#service" class="text-uppercase">service</v-btn>
      <v-btn text href="#contact" class="text-uppercase">contact</v-btn>
    </v-app-bar>

    <v-main>
      <profile-component id="profile" />
      <link-component id="link" />
      <skill-component id="skill" />
      <work-component id="work" />
      <service-component id="service" />
      <contact-component id="contact" />
    </v-main>

    <v-footer color="grey-darken-4">
      <v-spacer />
      <privacy-policy />
    </v-footer>
  </v-app>
</template>

<script>
import ProfileComponent from "./components/ProfileComponent.vue";
import SkillComponent from "./components/SkillComponent.vue";
import WorkComponent from "./components/WorkComponent.vue";
import ServiceComponent from "./components/ServiceComponent.vue";
import LinkComponent from "./components/LinkComponent.vue";
import ContactComponent from "./components/ContactComponent.vue";
import PrivacyPolicy from "./components/modal/PrivacyPolicy.vue";

export default {
  name: "App",
  components: {
    ProfileComponent,
    SkillComponent,
    WorkComponent,
    ServiceComponent,
    LinkComponent,
    ContactComponent,
    PrivacyPolicy
  }
};
</script>

<style scope></style>
