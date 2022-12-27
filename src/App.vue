<template>
  <v-app class="overfloy-y-auto">
    <v-app-bar density="comfortable" app>
      <div fluid class="d-flex align-center overflow-x-auto px-4">
        <v-btn :disabled="store.isConnecting || store.isFetchingPort" icon="mdi-power-plug" variant="outlined" size="small" @click="onClickConnect"></v-btn>
        <v-btn :disabled="store.isConnecting || store.isFetchingPort" icon="mdi-power-plug-off" class="mr-2" variant="outlined" size="small" @click="onClickDisconnect"></v-btn>
        <div class="w200">
          <port-select></port-select>
        </div>
      </div>
    </v-app-bar>
    <v-main class="overfloy-y-auto">
      <router-view></router-view>
      <div class="snack">
        <v-sheet v-if="store.isFetchingPort" class="pa-2 mt-2 px-4">Fetching ports..</v-sheet>
      </div>
    </v-main>
    <v-footer height="24px" app class="d-flex justify-space-between pa-1 px-4" color="secondary">
      <div class="text-body-1">0.0.1</div>
      <div class="d-flex align-center text-body-1" v-if="store.isConnecting">
        <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
        <div>{{ `Connecting to ${store.selectedPort?.port.address}` }}</div>
      </div>
      <div class="d-flex align-center text-body-1" v-else-if="store.isFetchingPort">
        <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
        <div>{{ `Fetching ports..` }}</div>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useMainStore } from "./store/main";
import { onListeningUsbDevicesChanges, offListeningUsbDevicesChanges} from "./api"
import {showMessageBox} from "./api/electronApi"
import PortSelect from "./components/PortSelect.vue"
const store = useMainStore();


async function onClickConnect() {
  try {
    await store.connectToBoard();
    await store.setAllPinsAsOutput();
  } catch (e:any) {
    showMessageBox({message: e?.message, title: "Error", detail:e?.details})
  }
}

async function onClickDisconnect() {
  try {
    await store.disconnectBoard();
  } catch (e:any) {
    showMessageBox({message: e?.message, title: "Error", detail:e?.details})
  }
}

async function onChangeUsbDevicesCallback(){
  try {
    await store.fetchAvailableBoards();
    if (store.board.isReady) {
      const isValid = store.availableBoards.find(b => b.port.address === store.selectedPort?.port.address);
      if (!isValid) {
        await store.disconnectBoard();
        store.selectedPort = null;
        showMessageBox({message: 'The board is disconnected!', title: "Error"})
      }
    }
  } catch (e:any) {
    showMessageBox({message: e?.message, title: "Error", detail:e?.details})
  }
}

onBeforeUnmount(async() => {
  try {
    offListeningUsbDevicesChanges(onChangeUsbDevicesCallback);
    await store.disconnectBoard()
  } catch (e:any) {
    showMessageBox({message: e?.message, title: "Error", detail:e?.details})
  }
})

onMounted(async() => {
  try {
    await store.fetchAvailableBoards()
    onListeningUsbDevicesChanges(onChangeUsbDevicesCallback);
  } catch (e:any) {
    showMessageBox({message: e?.message, title: "Error", detail:e?.details})
  }

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
