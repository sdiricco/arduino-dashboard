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
            :items="store.availableBoards"
            :menu="showMenu"
            @update:menu="() => showMenu = !showMenu"
          >
            <template #selection="{item}" @click="()=> log('hey')">
              {{ item && item.raw && item.raw.matching_boards && item.raw.matching_boards[0] && item.raw.matching_boards[0].name || 'unknown' }}
            </template>
            <template #item="{ item }">
              <v-list-item
                :value="item && item.raw"
                :title="(item && item.raw && item.raw.matching_boards && item.raw.matching_boards[0] && item.raw.matching_boards[0].name) || 'unknown'"
                @click="() => (store.selectedPort= item.raw)"
              >
                <template #title="{ title }">
                  {{ title }}
                </template>
                <div class="d-flex align-center">
                  <v-icon icon="mdi-usb" size="x-small" class="mr-1"></v-icon>
                  <div class="text-body-2"><code>{{ item && item.raw && item.raw.port && item.raw.port.address }}</code></div>
                
                </div>
              </v-list-item>
            </template>
          </v-select>
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
      <div class="text-body-1">0.0.1</div>
      <div class="d-flex align-center text-body-1" v-if="store.loading.connect">
        <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
        <div>{{ `Connecting to ${store.selectedPort?.port.address}` }}</div>
      </div>
      <div class="d-flex align-center text-body-1" v-else-if="store.loading.fetchingPorts">
        <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
        <div>{{ `Fetching ports..` }}</div>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useMainStore } from "./store/main";
const store = useMainStore();

async function onClickConnect() {
  await store.connectToBoard();
  await store.setAllPinsAsOutput();
}

const open = ref(true);
const showMenu = ref(false);

function log(message: any) {
  console.log(message);
}

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
.snack {
  position: absolute;
  bottom: 32px;
  right: 8px;
}
.w200 {
  min-width: 200px;
  width: 200px;
}
</style>
