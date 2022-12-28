import { defineStore } from "pinia";
import { getBoards } from "../api/arduinoApi";
import { IPort } from "../types/arduinoTypes";

export interface IState {
  availablePorts: Array<IPort>;
  selectedPort: IPort | null;
  isFetchingPort: boolean;
}

export const usePortStore = defineStore("portStore", {
  state: (): IState => ({
    availablePorts: [],
    selectedPort: null,
    isFetchingPort: false,
  }),

  getters: {
    getBoardName: (state) => (state.selectedPort?.matching_boards?.length ? state.selectedPort.matching_boards[0].name : "Unknown"),
    getBoardPath: (state) => state.selectedPort?.port.address || null,
  },

  actions: {

    /* Fetch ports */
    async fetchPorts() {
      this.isFetchingPort = true;
      try {
        this.availablePorts = await getBoards();
        this.isFetchingPort = false;
      } catch (e: any) {
        this.isFetchingPort = false;
        console.log(e);
        console.error("--- ERROR FETCHING BOARDS ---");
        console.table({ name: e?.name, details: e?.details, type: e?.type, code: e?.code });
        throw e;
      }
    },

  },
});
