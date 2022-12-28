import { IPinModeParams, IDigitalWriteParams } from "./../types/firmataTypes";
import { defineStore } from "pinia";
import * as firmataApi from "../api/firmataApi";
import { IBoard } from "../types/firmataTypes";

export interface IState {
  isConnecting: boolean;
  firmata: IBoard;
}

export const useBoardStore = defineStore("boardStore", {
  state: (): IState => ({
    isConnecting: false,
    firmata: {
      versionReceived: false,
      isReady: false,
      path: "",
      pins: [],
    },
  }),

  actions: {

    /* Connect to board */
    async connect(port: string) {
      this.isConnecting = true;
      try {
        this.firmata = await firmataApi.connect(port);
        this.isConnecting = false;
      } catch (e: any) {
        this.isConnecting = false;
        console.error("--- ERROR CONNECTING TO BOARD ---");
        console.table({ name: e?.name, details: e?.details, type: e?.type, code: e?.code });
        throw e;
      }
    },

    /* Disconnect board */
    async disconnect() {
      try {
        await firmataApi.disconnect();
        this.resetFirmata()
      } catch (e: any) {
        console.error("--- ERROR DISCONNECTING TO BOARD ---");
        console.table({ name: e?.name, details: e?.details, type: e?.type, code: e?.code });
        throw e;
      }
    },

    /* Reset firmata */
    resetFirmata(){
      this.firmata = {
        versionReceived: false,
        isReady: false,
        path: "",
        pins: [],
      }
    },

    /* Call firmata.pinMode() */
    async pinMode(params: IPinModeParams) {
      try {
        const updatedPin = await firmataApi.pinMode(params);
        this.firmata.pins[params.pin] = updatedPin;
      } catch (e: any) {
        console.error("--- ERROR SET PIN AS OUTPUT ---");
        console.table({ name: e?.name, details: e?.details, type: e?.type, code: e?.code });
        throw e;
      }
    },

    /* Call firmata.digitalWrite() */
    async digitalWrite(params: IDigitalWriteParams) {
      try {
        const updatedPin = await firmataApi.digitalWrite(params);
        console.log('updated pin: ', updatedPin)
        this.firmata.pins[params.pin] = updatedPin;
      } catch (e: any) {
        console.error("--- ERROR SET PIN AS OUTPUT ---");
        console.table({ name: e?.name, details: e?.details, type: e?.type, code: e?.code });
        throw e;
      }
    },
  },
});
