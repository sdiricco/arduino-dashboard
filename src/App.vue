<template>
  <v-app>
    <v-app-bar class="px-3" flat density="compact">
      <v-spacer></v-spacer>
      <v-tabs centered color="grey-darken-2">
        <v-tab v-for="link in r.links" :key="link" :to="`/${link}`">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="bg-grey-lighten-3">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { showMessageBox } from "./electronRenderer";

const r = reactive({
  links: ["home", "about"],
});

onMounted(async () => {
  try {
    const response = await showMessageBox({ message: "hello" });
    console.log(response);
  } catch (e) {
    console.error('+++ ERROR ON MOUNTED +++')
    console.table(e)
  }
});
</script>

<style scoped></style>
