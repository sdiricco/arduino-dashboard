import { defineStore } from "pinia";
import { connect, pinMode, disconnect } from "../api/firmataApi";
import { getBoards } from "../api/arduinoApi";
import { IPort } from "../types/arduinoTypes";

export interface IState {
  availablePorts: Array<IPort>;
  selectedPort: IPort | null;
  isConnecting: boolean;
  isFetchingPort: boolean;
  board: {
    versionReceived: boolean;
    isReady: boolean;
    path: string;
    pins: Array<any>;
  };
}

export const useMainStore = defineStore("counter", {
  state: (): IState => ({
    availablePorts: [],
    selectedPort: null,
    isConnecting: false,
    isFetchingPort: false,
    board: {
      versionReceived: false,
      isReady: false,
      path: "",
      pins: [],
    },
  }),

  getters: {
    getBoardName: (state) => (state.selectedPort?.matching_boards?.length ? state.selectedPort.matching_boards[0].name : "Unknown"),
    getBoardPath: (state) => state.selectedPort?.port.address,
  },

  actions: {
    async fetchavailablePorts() {
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
    async connectToBoard() {
      this.isConnecting = true;
      try {
        const port = (this.selectedPort && this.selectedPort.port && this.selectedPort.port.address) || null;
        this.board = await connect(port);
        this.isConnecting = false;
      } catch (e: any) {
        this.isConnecting = false;
        console.error("--- ERROR CONNECTING TO BOARD ---");
        console.table({ name: e?.name, details: e?.details, type: e?.type, code: e?.code });
        throw e;
      }
    },
    async disconnectBoard() {
      try {
        await disconnect();
        this.board.isReady = false;
        this.board.path = "";
        this.board.versionReceived = false;
        this.board.pins = [];
      } catch (e: any) {
        console.error("--- ERROR DISCONNECTING TO BOARD ---");
        console.table({ name: e?.name, details: e?.details, type: e?.type, code: e?.code });
        throw e;
      }
    },
    async setAllPinsAsOutput() {
      for (let i = 0; i < this.board.pins.length; i++) {
        try {
          await pinMode({ pin: i, mode: 0x01 });
        } catch (e: any) {
          console.error("--- ERROR SET PIN AS OUTPUT ---");
          console.table({ name: e?.name, details: e?.details, type: e?.type, code: e?.code });
          throw e;
        }
      }
    },
  },
});
