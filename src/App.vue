<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Portfolio</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <profile />
      <skill />
      <work />
    </v-content>
  </v-app>
</template>

<script>
import Profile from "./components/Profile";
import Skill from "./components/Skill";
import Work from "./components/Work";

export default {
  name: "App",
  components: {
    Profile,
    Skill,
    Work
  }
};
</script>
