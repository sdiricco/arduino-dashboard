import { defineStore } from "pinia";
import {getBoards, connect, pinMode, getPins, onChangeUsbDevices, showMessageBox} from "../electronRenderer"

interface IPort {
  address: string,
  label: string,
  protocol: string,
  protocol_label: string,
  properties: any

}
interface IBoard {
  matching_boards: Array<string>,
  port: IPort
}
interface IState {
  availableBoards: Array<IBoard>,
  selectedPort: IBoard | null,
  pins: Array<any>,
  loading: any
}

export const useMainStore = defineStore("counter", {
  state: ():IState => ({ 
    availableBoards: [],
    selectedPort: null,
    pins: [],
    loading:{
      connect: false,
      fetchingPorts: false
    }
  }),

  actions: {
    async startUp(){
      await this.fetchAvailableBoards();
      onChangeUsbDevices(this.fetchAvailableBoards)
    },
    async fetchAvailableBoards() {
      this.loading.fetchingPorts = true
      try {
        this.availableBoards = await getBoards();
        this.selectedPort = this.availableBoards && this.availableBoards[0] 
      } catch (e:any) {
        console.error("--- ERROR FETCHING BOARDS ---");
        console.table(e)
        showMessageBox({message: e?.message, title: "Error", detail:e?.details})
      }
      this.loading.fetchingPorts = false

    },
    async connectToBoard(){
      this.loading.connect = true
      try {
        const port = this.selectedPort && this.selectedPort.port && this.selectedPort.port.address || null
        await connect(port);
        this.pins = await getPins();
      } catch (e:any) {
        console.error("--- ERROR CONNECTING TO BOARD ---");
        console.table(e);
        showMessageBox({message: e?.message, title: "Error", detail:e?.details})
      }
      this.loading.connect = false
    },
    async disconnectBoard(){

    },
    async setAllPinsAsOutput(){
      for (let i = 0; i < 14; i++) {
        try {
          await pinMode({ pin: i, mode: 0x01 });
        } catch (e:any) {
          console.error("--- ERROR SET PIN AS OUTPUT ---");
          console.table(e)
          showMessageBox({message: e?.message, title: "Error", detail:e?.details})
        }
      }
      this.pins = await getPins();
      console.log(this.pins)

    }
  },
});
