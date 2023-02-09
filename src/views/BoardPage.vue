<template>
  <h2 class="mb-4">Board Configuration</h2>
  <div class="w200 pb-8">
    <port-select></port-select>
  </div>
  <div class="d-flex">
    <v-btn :style="{ width: '200px' }" class="mr-4" @click="onClickConnect" :disabled="isLoading">Connect</v-btn>
    <v-btn :style="{ width: '200px' }" @click="onClickDisconnect" :disabled="isLoading">Disconnect</v-btn>
  </div>

  <v-divider class="my-8"></v-divider>

  <h2 class="mb-4">Pin Configuration</h2>

  <div class="d-flex align-center flex-wrap">
    <v-sheet v-for="(pin, i) in board.firmata.pins" class="pa-4 mr-4 mb-4 d-flex flex-column align-center justify-center w200" rounded>
      <v-chip>{{ i }}</v-chip>
      <div class="w-100">
        <v-select label="mode" variant="outlined" :items="pin.supportedModes"></v-select>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import PortSelect from "../components/PortSelect.vue";

import { onMounted, computed } from "vue";
import { useBoardStore } from "../store/board";
import { usePortStore } from "../store/port";
import { showMessageBox } from "../api/electronApi";
import { PinMode } from "../types/firmataTypes";
const board = useBoardStore();
const port = usePortStore();

const isLoading = computed(() => board.isConnecting || port.isFetchingPort);

/**************************************************************/
/* AUX FUNCTIONS */
/**************************************************************/
async function setAllPinsAsOutput() {
  for (let i = 0; i < board.firmata.pins.length; i++) {
    await board.pinMode({ pin: i, mode: PinMode.Out });
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

onMounted(async () => {
  try {
    await port.fetchPorts();
  } catch (e: any) {
    showMessageBox({ message: e?.message, title: "Error", detail: e?.details });
  }
});
</script>

<style scoped>
.w200 {
  min-width: 200px;
  width: 200px;
}
</style>
