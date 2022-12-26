import { defineStore } from "pinia";
import {getBoards, connect, pinMode, getPins, onListeningUsbDevicesChanges, offListeningUsbDevicesChanges, showMessageBox, disconnect} from "../electronRenderer"

interface IPort {
  address: string,
  label: string,
  protocol: string,
  protocol_label: string,
  properties: any

}
interface IBoard {
  matching_boards: Array<any>,
  port: IPort
}
interface IState {
  availableBoards: Array<IBoard>,
  selectedPort: IBoard | null,
  pins: Array<any>,
  isConnecting: boolean,
  isFetchingPort: boolean,
  board: {
    versionReceived: boolean,
    isReady: boolean,
    path: string,
    pins: Array<any>,
  }
}

export const useMainStore = defineStore("counter", {
  state: ():IState => ({ 
    availableBoards: [],
    selectedPort: null,
    pins: [],
    isConnecting: false,
    isFetchingPort: false,
    board: {
      versionReceived: false,
      isReady: false,
      path: '',
      pins: [],
    }
  }),

  actions: {
    async fetchAvailableBoards() {
      this.isFetchingPort = true;
      try {
        this.availableBoards = await getBoards();
        this.isFetchingPort = false;
      } catch (e:any) {
        this.isFetchingPort = false;
        console.log(e)
        console.error("--- ERROR FETCHING BOARDS ---");
        console.table({name: e?.name, details: e?.details, type: e?.type, code: e?.code});
        throw(e);
      }
    },
    async connectToBoard(){
      this.isConnecting = true
      try {
        const port = this.selectedPort && this.selectedPort.port && this.selectedPort.port.address || null
        this.board = await connect(port);
        this.pins = this.board.pins;
        this.isConnecting = false
      } catch (e:any) {
        this.isConnecting = false
        console.error("--- ERROR CONNECTING TO BOARD ---");
        console.table({name: e?.name, details: e?.details, type: e?.type, code: e?.code});
        throw(e);
      }
    },
    async disconnectBoard(){
      try {
        await disconnect();
        this.pins = [];
        this.board.isReady = false
        this.board.path = ''
        this.board.versionReceived = false;
        this.board.pins = [];
      } catch (e:any) {
        console.error("--- ERROR DISCONNECTING TO BOARD ---");
        console.table({name: e?.name, details: e?.details, type: e?.type, code: e?.code});
        throw(e);
      }
    },
    async setAllPinsAsOutput(){
      for (let i = 0; i < this.pins.length; i++) {
        try {
          await pinMode({ pin: i, mode: 0x01 });
        } catch (e:any) {
          console.error("--- ERROR SET PIN AS OUTPUT ---");
          console.table({name: e?.name, details: e?.details, type: e?.type, code: e?.code});
          throw(e);
        }
      }
    }
  },
});
