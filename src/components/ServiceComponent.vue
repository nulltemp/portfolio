<template>
  <base-layout>
    <v-card>
      <v-card-item>
        <v-card-title>
          <h2>Service</h2>
        </v-card-title>
      </v-card-item>
      <v-card-text
        class="text-left"
        v-for="service in services"
        :key="service.title"
      >
        <v-card>
          <v-card-title
            ><h4>{{ service.title }}</h4></v-card-title
          >
          <v-card-text>{{ service.description }}</v-card-text>
          <v-card-actions class="flex-wrap">
            <a :href="service.url" target="_blank" rel="noopener">{{
              service.url
            }}</a>
            <v-spacer />
            <v-btn
              v-if="service.page"
              :to="service.page"
              variant="tonal"
              append-icon="mdi-chevron-right"
              >詳しく見る</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/BaseLayout.vue";
import services from "@/data/services";

export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      services
    };
  }
};
</script>

<style></style>
