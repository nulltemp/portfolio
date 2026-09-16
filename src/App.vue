<template>
  <v-app>
    <v-app-bar color="grey-lighten-4">
      <v-app-bar-nav-icon class="d-flex d-md-none" @click="drawer = !drawer" />
      <v-toolbar-title class="text-uppercase">Portfolio</v-toolbar-title>
      <v-spacer />
      <div class="d-none d-md-flex">
        <v-btn text href="#profile" class="text-uppercase">profile</v-btn>
        <v-btn text href="#link" class="text-uppercase">link</v-btn>
        <v-btn text href="#skill" class="text-uppercase">skill</v-btn>
        <v-btn text href="#work" class="text-uppercase">work</v-btn>
        <v-btn text href="#service" class="text-uppercase">service</v-btn>
        <v-btn text href="#contact" class="text-uppercase">contact</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary class="d-md-none">
      <v-list nav>
        <v-list-item href="#profile" title="Profile" @click="drawer = false" />
        <v-list-item href="#link" title="Link" @click="drawer = false" />
        <v-list-item href="#skill" title="Skill" @click="drawer = false" />
        <v-list-item href="#work" title="Work" @click="drawer = false" />
        <v-list-item href="#service" title="Service" @click="drawer = false" />
        <v-list-item href="#contact" title="Contact" @click="drawer = false" />
      </v-list>
    </v-navigation-drawer>

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
  },
  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style scope></style>
