<template>
  <v-tabs v-model="tab" direction="vertical" color="primary" density="comfortable" grow stacked>
    <v-tab value="dashboard" class="h100 d-flex align-center justify-center" to="/home/dashboard">
      <v-icon class="px-4" size="x-large">mdi-view-dashboard</v-icon>
      <p class="text-caption">Dashboard</p>
    </v-tab>
    <v-tab value="board" class="h100 d-flex align-center justify-center" to="/home/board">
      <v-icon class="px-4" size="x-large">mdi-chip</v-icon>
      <p class="text-caption">Board</p>
    </v-tab>
    <v-tab value="pin-configuration" class="h100 d-flex align-center justify-center" to="/home/pin-configuration">
      <v-icon class="px-4" size="x-large">mdi-tune</v-icon>

      <p class="text-caption">Pin Configuration</p>
    </v-tab>
    <v-tab value="settings" class="h100 d-flex align-center justify-center" to="/home/settings">
      <v-icon class="px-4" size="x-large">mdi-cog</v-icon>
      <p class="text-caption">Settings</p>
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tab = ref(null);


</script>

<style scoped>
.h100 {
  height: 90px;
  max-height: 100px;
}

.hmax {
  height: 100%;
}

.wmax {
  width: 100%;
}

.bg {
  background-color: #222;
}

.bg-opa{
  background-color: #333;
  opacity: 1;
}
</style>
