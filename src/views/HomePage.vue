<template>
  <v-container class="d-flex align-center flex-wrap">
    <v-sheet v-for="(pin, i) in store.board.pins" class="pa-4 ma-4 d-flex flex-column align-center justify-center" rounded>
      <v-chip>{{ i }}</v-chip>
      <v-switch inset color="secondary" hide-details @click="onClickSwitch($event, i)"></v-switch>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { digitalWrite } from "../api/firmataApi"
import {showMessageBox} from "../api/electronApi"
import { useMainStore } from "../store/main";

const store = useMainStore();

function onClickSwitch(evt:any, i:number) {
  try {
    digitalWrite({pin: i, value: evt.target.checked ? 0x01 : 0x00})
  } catch (e:any) {
    showMessageBox({message: e?.message, title: "Error", detail:e?.details})
  }
}
</script>

<style scoped></style>
