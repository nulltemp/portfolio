<template>
  <div class="content">
    <v-container>
      <v-row justify="center" class="flex-wrap">
        <v-col md="12" lg="8">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.content::before {
  content: "";
  display: block;
  height: 5rem;
  margin-top: -5rem;
  visibility: hidden;
}
</style>
