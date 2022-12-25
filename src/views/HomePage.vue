<template>
  <v-container class="d-flex align-center flex-wrap">
    <v-sheet v-for="(pin, i) in store.pins" class="pa-4 ma-4 d-flex flex-column align-center justify-center" rounded>
      <v-chip>{{ i }}</v-chip>
      <v-switch inset color="secondary" hide-details @click="(evt:any)=>digitalWrite({pin: i, value: evt.target.checked ? 0x01 : 0x00})"></v-switch>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { digitalWrite } from "../electronRenderer";
import { useMainStore } from "../store/main";
import {ref} from "vue"

const open = ref(true)
const store = useMainStore();
</script>

<style scoped></style>
