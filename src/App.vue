<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase">Portfolio</v-toolbar-title>
      <v-spacer />
      <v-btn text href="#profile">profile</v-btn>
      <v-btn text href="#link">link</v-btn>
      <v-btn text href="#skill">skill</v-btn>
      <v-btn text href="#work">work</v-btn>
      <v-btn text href="#contact">contact</v-btn>
    </v-app-bar>

    <v-main>
      <profile id="profile" />
      <Link id="link" />
      <skill id="skill" />
      <work id="work" />
      <contact id="contact" />
    </v-main>

    <v-footer dark>
      <v-spacer />
      <privacy-policy />
    </v-footer>
  </v-app>
</template>

<script>
import Profile from "./components/Profile";
import Skill from "./components/Skill";
import Work from "./components/Work";
import Link from "./components/Link";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/modal/PrivacyPolicy";

export default {
  name: "App",
  components: {
    Profile,
    Skill,
    Work,
    Link,
    Contact,
    PrivacyPolicy
  }
};
</script>

<style scope></style>
