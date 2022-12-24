<template>
  <v-app>
    <v-app-bar density="comfortable">
      <v-container fluid class="d-flex align-center">
        <v-btn icon="mdi-power-plug" variant="outlined" size="small" @click="onClickConnect"></v-btn>
        <v-btn icon="mdi-power-plug-off" class="mr-2" variant="outlined" size="small"></v-btn>
        <div class="w200">
          <v-select
            v-model="store.selectedPort"
            density="compact"
            variant="outlined"
            hide-details
            item-title="port.address"
            item-value="port"
            return-object
            :items="store.availableBoards"></v-select>
        </div>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-snackbar location="bottom right" v-model="store.loading.connect">
        Connecting to selected board..
      </v-snackbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "./store/main";
const store = useMainStore();

async function onClickConnect(){
  await store.connectToBoard()
  await store.setAllPinsAsOutput();
}

onMounted(async () => {
  await store.fetchAvailableBoards();

});
</script>

<style scoped>
.w200 {
  width: 200px;
}
</style>
