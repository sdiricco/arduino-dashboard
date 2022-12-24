<template>
  <v-app>
    <v-app-bar density="comfortable" app>
      <v-container fluid class="d-flex align-center">
        <v-btn :disabled="store.loading.connect" icon="mdi-power-plug" variant="outlined" size="small" @click="onClickConnect"></v-btn>
        <v-btn :disabled="store.loading.connect" icon="mdi-power-plug-off" class="mr-2" variant="outlined" size="small"></v-btn>
        <div class="w200">
          <v-select
            :disabled="store.loading.connect"
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
      <router-view></router-view>
    </v-main>

    <v-footer app class="d-flex justify-space-between">
      <code> 0.0.1 </code>
      <code class="d-flex align-center" v-if="store.loading.connect">
        <v-progress-circular indeterminate class="mr-4"></v-progress-circular>
        {{ `Connecting to ${store.selectedPort?.port.address}` }}
      </code>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMainStore } from "./store/main";
const store = useMainStore();

async function onClickConnect() {
  await store.connectToBoard();
  await store.setAllPinsAsOutput();
}


onMounted(async () => {
  await store.startUp();
});
</script>

<style scoped>
.w200 {
  width: 200px;
}
</style>
