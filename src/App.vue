<template>
  <v-app>
    <v-app-bar color="grey-lighten-4">
      <v-app-bar-nav-icon class="d-flex d-md-none" @click="drawer = !drawer" />
      <v-toolbar-title>
        <!-- 詳細ページでは各ページの見出しが h1 になるので、サイト名はトップだけ h1 にする -->
        <component :is="isHome ? 'h1' : 'div'" class="site-title">
          <router-link to="/" class="text-uppercase"
            >nulltemp's Portfolio</router-link
          >
        </component>
      </v-toolbar-title>
      <v-spacer />
      <nav class="d-none d-md-flex" aria-label="メインナビゲーション">
        <v-btn
          v-for="item in navItems"
          :key="item.hash"
          variant="text"
          :to="'/' + item.hash"
          :active="false"
          class="text-uppercase"
          >{{ item.title }}</v-btn
        >
      </nav>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      class="d-md-none"
      aria-label="メインナビゲーション"
    >
      <v-list nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.hash"
          :to="'/' + item.hash"
          :active="false"
          :title="item.title"
          @click="drawer = false"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer color="grey-darken-4">
      <v-spacer />
      <v-btn variant="text" to="/about/">このサイトについて</v-btn>
      <v-btn variant="text" href="/privacy/">Privacy Policy</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      navItems: [
        { hash: "#profile", title: "Profile" },
        { hash: "#link", title: "Link" },
        { hash: "#skill", title: "Skill" },
        { hash: "#work", title: "Work" },
        { hash: "#service", title: "Service" },
        { hash: "#contact", title: "Contact" }
      ]
    };
  },
  computed: {
    isHome() {
      return this.$route.path === "/";
    }
  }
};
</script>

<style scoped>
.site-title {
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.site-title a {
  color: inherit;
  text-decoration: none;
}
</style>

<style>
/* 詳細ページなど、文章が中心のページで共通に使うスタイル */
.page-title {
  font-size: 1.5rem;
  line-height: 1.4;
}

.prose {
  font-size: 1rem;
  line-height: 1.9;
}

.prose h2 {
  font-size: 1.25rem;
  margin: 2rem 0 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.prose h3 {
  font-size: 1.05rem;
  margin: 1.25rem 0 0.5rem;
}

.prose p,
.prose ul,
.prose ol,
.prose .v-table {
  margin-bottom: 1rem;
}

.prose ul,
.prose ol {
  padding-left: 1.5rem;
}
</style>
