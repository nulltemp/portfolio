<template>
  <v-app>
    <v-toolbar app class="toolbar">
      <v-toolbar-title class="headline text-uppercase toolbar-title">
        <span>Portfolio</span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn flat href="#profile">profile</v-btn>
        <v-btn flat href="#skill">skill</v-btn>
        <v-btn flat href="#work">work</v-btn>
        <v-btn flat href="#link">link</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <profile id="profile" />
      <skill id="skill" />
      <work id="work" />
      <Link id="link" />
    </v-content>
  </v-app>
</template>

<script>
import Profile from "./components/Profile";
import Skill from "./components/Skill";
import Work from "./components/Work";
import Link from "./components/Link";

export default {
  name: "App",
  components: {
    Profile,
    Skill,
    Work,
    Link
  }
};
</script>

<style scope>
.toolbar {
  display: flex;
  justify-content: center;
}

.toolbar-title {
  margin-right: 5em;
}
</style>
