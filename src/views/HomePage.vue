<template>
  <v-container class="d-flex align-center flex-wrap">
    <PinConfiguration></PinConfiguration>
    <!-- <pin-card></pin-card> -->
  </v-container>
</template>

<script setup lang="ts">
import PinCard from "../components/PinCard.vue";
import PinConfiguration from "../components/PinConfiguration.vue";

</script>

<style scoped>
.w200 {
  min-width: 200px;
  width: 200px;
}
</style>
