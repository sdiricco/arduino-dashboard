<template>
  <div class="d-flex flex-row hmax">
    <div class="d-flex border hmax bg">
      <v-tabs v-model="tab" direction="vertical" color="primary" density="comfortable" grow stacked>
        <v-tab value="option-1" class="h100 d-flex align-center justify-center">
          <v-icon class="px-4" size="x-large">mdi-chip</v-icon>
          <p class="text-caption">Board</p>
        </v-tab>
        <v-tab value="option-2" class="h100 d-flex align-center justify-center">
          <v-icon class="px-4" size="x-large">mdi-tune</v-icon>

          <p class="text-caption">Pin Configuration</p>
        </v-tab>
        <v-tab value="option-3" class="h100 d-flex align-center justify-center">
          <v-icon class="px-4" size="x-large">mdi-cog</v-icon>
          <p class="text-caption">Settings</p>
        </v-tab>
      </v-tabs>
    </div>

    <div class="d-flex align-center flex-wrap">
      <v-sheet v-for="(pin, i) in board.firmata.pins" class="pa-4 ma-4 d-flex flex-column align-center justify-center" rounded>
        <v-chip>{{ i }}</v-chip>
        <v-switch inset color="secondary" hide-details @click="onClickSwitch($event, i)" :model-value="Boolean(pin.value)"></v-switch>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { InputEvent } from "../types/htmlTypes";
import { showMessageBox } from "../api/electronApi";
import { useBoardStore } from "../store/board";
import { PinValue } from "../types/firmataTypes";
const board = useBoardStore();

const tab = ref(null);

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
.h100 {
  height: 100px;
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
