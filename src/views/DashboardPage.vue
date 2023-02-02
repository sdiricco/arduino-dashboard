<template>
    <div class="d-flex align-center flex-wrap">
      <v-sheet v-for="(pin, i) in board.firmata.pins" class="pa-4 ma-4 d-flex flex-column align-center justify-center" rounded>
        <v-chip>{{ i }}</v-chip>
        <v-switch inset color="secondary" hide-details @click="onClickSwitch($event, i)" :model-value="Boolean(pin.value)"></v-switch>
      </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { InputEvent } from "../types/htmlTypes";
import { showMessageBox } from "../api/electronApi";
import { useBoardStore } from "../store/board";
import { PinValue } from "../types/firmataTypes";
const board = useBoardStore();

async function onClickSwitch(evt: InputEvent, i: number) {
  try {
    const value = evt.target.checked ? PinValue.High : PinValue.Low;
    await board.digitalWrite({ pin: i, value });
  } catch (e: any) {
    showMessageBox({ message: e?.message, title: "Error", detail: e?.details });
  }
}
</script>

<style scoped>
</style>
