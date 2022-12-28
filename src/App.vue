<template>
  <v-app class="overfloy-y-auto">
    <v-app-bar density="comfortable" app>
      <div fluid class="d-flex align-center overflow-x-auto px-4">
        <v-btn :disabled="isLoading" icon="mdi-power-plug" variant="outlined" size="small" @click="onClickConnect"></v-btn>
        <v-btn :disabled="isLoading" icon="mdi-power-plug-off" class="mr-2" variant="outlined" size="small" @click="onClickDisconnect"></v-btn>
        <div class="w200">
          <port-select></port-select>
        </div>
      </div>
    </v-app-bar>
    <v-main class="overfloy-y-auto">
      <router-view></router-view>
      <div class="snack">
        <v-sheet v-if="port.isFetchingPort" class="pa-2 mt-2 px-4">Fetching ports..</v-sheet>
      </div>
    </v-main>
    <v-footer height="24px" app class="d-flex justify-space-between pa-1 px-4" color="secondary">
      <div class="text-body-1">0.0.1</div>
      <div class="d-flex align-center text-body-1" v-if="board.isConnecting">
        <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
        <div>{{ `Connecting to ${port.selectedPort?.port.address}` }}</div>
      </div>
      <div class="d-flex align-center text-body-1" v-else-if="port.isFetchingPort">
        <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
        <div>{{ `Fetching ports..` }}</div>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from "vue";
import { useBoardStore } from "./store/board";
import { usePortStore } from "./store/port";
import { onListeningUsbDevicesChanges, offListeningUsbDevicesChanges } from "./api";
import { showMessageBox } from "./api/electronApi";
import PortSelect from "./components/PortSelect.vue";
import { PinMode } from "./types/firmataTypes";
const board = useBoardStore();
const port = usePortStore();

const isLoading = computed(() => board.isConnecting || port.isFetchingPort);

/**************************************************************/
/* AUX FUNCTIONS */
/**************************************************************/
async function setAllPinsAsOutput(){
  for (let i = 0; i < board.firmata.pins.length; i++) {
    await board.pinMode({pin: i, mode: PinMode.Out})
  }
}

function checkIfSelectedPortIsAvailable(){
  return port.availablePorts.find((b) => b.port.address === port.selectedPort?.port.address);
}

async function validateConnection() {
  if (board.firmata.isReady) {
    const available = checkIfSelectedPortIsAvailable();
    if(available){
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
async function onClickConnect() {
  try {
    if (port.getBoardPath) {
      await board.connect(port.getBoardPath);
    }
    await setAllPinsAsOutput();
  } catch (e: any) {
    showMessageBox({ message: e?.message, title: "Error", detail: e?.details });
  }
}

async function onClickDisconnect() {
  try {
    await board.disconnect();
  } catch (e: any) {
    showMessageBox({ message: e?.message, title: "Error", detail: e?.details });
  }
}

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
