<template>
  <v-app class="overfloy-y-auto">
    <v-main class="overfloy-y-auto">
      <router-view></router-view>
      <div class="snack">
        <v-sheet v-if="port.isFetchingPort" class="pa-2 mt-2 px-4">Fetching ports..</v-sheet>
      </div>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script setup lang="ts">
import AppFooter from "./components/AppFooter.vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useBoardStore } from "./store/board";
import { usePortStore } from "./store/port";
import { onListeningUsbDevicesChanges, offListeningUsbDevicesChanges } from "./api";
import { showMessageBox } from "./api/electronApi";
const board = useBoardStore();
const port = usePortStore();


/**************************************************************/
/* AUX FUNCTIONS */
/**************************************************************/


function checkIfSelectedPortIsAvailable() {
  return port.availablePorts.find((b) => b.port.address === port.selectedPort?.port.address);
}

async function validateConnection() {
  if (board.firmata.isReady) {
    const available = checkIfSelectedPortIsAvailable();
    if (available) {
      return;
    }
    await board.disconnect();
    port.selectedPort = null;
    showMessageBox({ message: "The board is disconnected!", title: "Error" });
  }
}

async function onChangeUsbDevicesCallback() {
  try {
    await port.fetchPorts();
    await validateConnection();
  } catch (e: any) {
    showMessageBox({ message: e?.message, title: "Error", detail: e?.details });
  }
}

/**************************************************************/
/* TEMPLATE METHODS */
/**************************************************************/



/**************************************************************/
/* LIFE CYCLE HOOKS */
/**************************************************************/
onBeforeUnmount(async () => {
  try {
    offListeningUsbDevicesChanges(onChangeUsbDevicesCallback);
    await board.disconnect();
  } catch (e: any) {
    showMessageBox({ message: e?.message, title: "Error", detail: e?.details });
  }
});

onMounted(async () => {
  try {
    await port.fetchPorts();
    onListeningUsbDevicesChanges(onChangeUsbDevicesCallback);
  } catch (e: any) {
    showMessageBox({ message: e?.message, title: "Error", detail: e?.details });
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
