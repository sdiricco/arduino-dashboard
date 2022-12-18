<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>

      <v-icon icon="mdi:mdi-minus" />
    </v-system-bar>

    <v-app-bar>
      <v-app-bar-nav-icon icon="mdi-menu" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <!--  -->
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <v-container>
        <v-row>
          <template v-for="n in 4" :key="n">
            <v-col class="mt-2" cols="12">
              <strong>Category {{ n }}</strong>
            </v-col>

            <v-col v-for="j in 6" :key="`${n}${j}`" cols="6" md="2">
              <v-sheet height="150"></v-sheet>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {showMessageBox, Electron} from "./electronRenderer"
import { ref, onMounted } from "vue";

let drawer = ref(false);


onMounted(async () => {
  console.log("mounted");
  const messageBoxOptions: Electron.MessageBoxOptions = {
    message: "Hello",
    title: "My Title",
    buttons: [
      'cancel',
      'ok',
    ],
    detail: 'my details'
  };
  const result = await showMessageBox(messageBoxOptions);
  console.log(result);
});
</script>

<style></style>
