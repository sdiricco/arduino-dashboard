<template>
  <v-select
    :disabled="port.isFetchingPort"
    v-model="port.selectedPort"
    density="compact"
    variant="outlined"
    hide-details
    item-title="port.address"
    item-value="port"
    return-object
    :items="port.availablePorts"
    :menu="showMenu"
    @update:menu="() => (showMenu = !showMenu)"
  >
    <template #selection="{ item }">
      {{ (item && item.raw && item.raw.matching_boards && item.raw.matching_boards[0] && item.raw.matching_boards[0].name) || "unknown" }}
    </template>
    <template #item="{ item }">
      <v-list-item
        :value="item && item.raw"
        :title="(item && item.raw && item.raw.matching_boards && item.raw.matching_boards[0] && item.raw.matching_boards[0].name) || 'unknown'"
        @click="() => (port.selectedPort = item.raw, showMenu = !showMenu)"
      >
        <template #title="{ title }">
          {{ title }}
        </template>
        <div class="d-flex align-center">
          <v-icon icon="mdi-usb" size="x-small" class="mr-1"></v-icon>
          <div class="text-body-2">
            <code>{{ item && item.raw && item.raw.port && item.raw.port.address }}</code>
          </div>
        </div>
      </v-list-item>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePortStore } from "../store/port";
const port = usePortStore();

const showMenu = ref(false);
</script>

<style></style>
