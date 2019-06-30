<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Portfolio</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <profile />
    </v-content>
  </v-app>
</template>

<script>
import Profile from "./components/Profile";

export default {
  name: "App",
  components: {
    Profile
  }
};
</script>
