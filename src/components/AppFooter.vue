<template>
  <v-footer height="24px" app class="d-flex justify-space-between pa-1 px-4" color="secondary">
    <div class="text-body-1">{{ board.firmata.isReady ? `Connected on ${board.firmata.path}` : `Disconnected` }}</div>
    <div class="d-flex align-center text-body-1" v-if="board.isConnecting">
      <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
      <div>{{ `Connecting to ${port.selectedPort?.port.address}` }}</div>
    </div>
    <div class="d-flex align-center text-body-1" v-else-if="port.isFetchingPort">
      <v-progress-circular indeterminate class="mr-4" size="x-small"></v-progress-circular>
      <div>{{ `Fetching ports..` }}</div>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { useBoardStore } from "../store/board";
import { usePortStore } from "../store/port";
const board = useBoardStore();
const port = usePortStore();

</script>
<style scoped>
</style>
