<template>
  <div class="content">
    <v-container>
      <v-layout text-xs-center justify-center wrap>
        <v-flex xs8>
          <slot />
        </v-flex>
      </v-layout>
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
