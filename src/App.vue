<template>
  <v-app class="overfloy-y-auto">
    <v-app-bar density="comfortable" app>
      <div fluid class="d-flex align-center overflow-x-auto px-4">
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
      </div>
    </v-app-bar>
    <v-main class="overfloy-y-auto">
      <router-view></router-view>
      <div class="snack">
        <v-sheet v-if="store.loading.fetchingPorts" class="pa-2 mt-2 px-4">Fetching ports..</v-sheet>
      </div>

    </v-main>
    <v-footer height="24px" app class="d-flex justify-space-between pa-1 px-4" color="secondary">

      <div class="text-caption"><code>0.0.1</code></div>
      <div class="d-flex align-center text-caption" v-if="store.loading.connect">
        <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
        <code>{{ `Connecting to ${store.selectedPort?.port.address}` }}</code>
      </div>
      <div class="d-flex align-center text-caption" v-else-if="store.loading.fetchingPorts">
        <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
        <code>{{ `Fetching ports..` }}</code>
      </div>
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

const open = ref(true);

onMounted(async () => {
  await store.startUp();
});
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>

<style scoped>
.snack{
  position: absolute;
  bottom: 32px;
  right: 8px
}
.w200 {
  min-width: 200px;
  width: 200px;
}
</style>
