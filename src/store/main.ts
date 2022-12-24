import { defineStore } from "pinia";
import {getBoards, connect, pinMode, getPins} from "../electronRenderer"

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
      connect: false
    }
  }),

  actions: {
    async fetchAvailableBoards() {
      try {
        const response = await getBoards();
        this.availableBoards = response.data;
      } catch (e) {
        console.error("--- ERROR FETCHING BOARDS ---");
        console.table(e)
      }
    },
    async connectToBoard(){
      this.loading.connect = true
      try {
        const port = this.selectedPort && this.selectedPort.port && this.selectedPort.port.address || null
        await connect(port);
        const response = await getPins();
        this.pins = response.data;
      } catch (e) {
        console.error("--- ERROR CONNECTING TO BOARD ---");
        console.table(e)
      }
      this.loading.connect = false

    },
    async setAllPinsAsOutput(){
      for (let i = 0; i < 14; i++) {
        try {
          await pinMode({ pin: i, mode: 0x01 });
          const response = await getPins();
          this.pins = response.data;
        } catch (e) {
          console.error("--- ERROR SET PIN AS OUTPUT ---");
          console.table(e)
        }

      }
      console.log(this.pins)

    }
  },
});
