<template>
  <v-app>
    <v-app-bar color="grey-lighten-4">
      <v-toolbar-title class="text-uppercase">Portfolio</v-toolbar-title>
      <v-spacer />
      <v-btn text href="#profile">profile</v-btn>
      <v-btn text href="#link">link</v-btn>
      <v-btn text href="#skill">skill</v-btn>
      <v-btn text href="#work">work</v-btn>
      <v-btn text href="#contact">contact</v-btn>
    </v-app-bar>

    <v-main>
      <profile-component id="profile" />
      <link-component id="link" />
      <skill-component id="skill" />
      <work-component id="work" />
      <contact-component id="contact" />
    </v-main>

    <v-footer color="grey-darken-4">
      <v-spacer />
      <privacy-policy />
    </v-footer>
  </v-app>
</template>

<script>
import ProfileComponent from "./components/ProfileComponent";
import SkillComponent from "./components/SkillComponent";
import WorkComponent from "./components/WorkComponent";
import LinkComponent from "./components/LinkComponent";
import ContactComponent from "./components/ContactComponent";
import PrivacyPolicy from "./components/modal/PrivacyPolicy";

export default {
  name: "App",
  components: {
    ProfileComponent,
    SkillComponent,
    WorkComponent,
    LinkComponent,
    ContactComponent,
    PrivacyPolicy
  }
};
</script>

<style scope></style>
