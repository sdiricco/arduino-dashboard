<template>
  <v-sheet v-for="(pin, i) in board.firmata.pins" class="pa-1 mb-1 w-100 d-flex align-center" rounded>
    <v-chip class="mr-2">{{ i }}</v-chip>
    <div class="w200 mr-2">
      <v-select density="compact" variant="outlined" hide-details label="Modes" :items="getModes(pin)"></v-select>
    </div>
    <div class="w200 mr-2">
      <v-text-field :counter="10" label="Value" density="compact" variant="outlined" hide-details></v-text-field>
    </div>
    <v-btn variant="outlined">
      set
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { useBoardStore } from "../store/board"
import { IPin } from "src/types/firmataTypes";


const board = useBoardStore();


const MODES = {
  0x00: 'INPUT',
  0x01: 'OUTPUT',
  0x02: 'ANALOG',
  0x03: 'PWM',
  0x04: 'SERVO',
  0x05: 'SHIFT',
  0x06: 'I2C',
  0x07: 'ONEWIRE',
  0x08: 'STEPPER',
  0x0A: 'SERIAL',
  0x0B: 'PULLUP',
  0x7F: 'IGNORE',
  0x10: 'UNKOWN',
}

function getModes(pin: IPin) {
  return pin.supportedModes.map(m => MODES[m])
}

</script>

<style scoped>
.w200 {
  min-width: 200px;
  width: 200px;
}
</style>
