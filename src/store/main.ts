import { defineStore } from "pinia";
import {getBoards, connect, pinMode} from "../electronRenderer"

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
  pins: Array<any>
}

export const useMainStore = defineStore("counter", {
  state: ():IState => ({ 
    availableBoards: [],
    selectedPort: null,
    pins: []
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
      try {
        const port = this.selectedPort && this.selectedPort.port && this.selectedPort.port.address || null
        await connect(port)
      } catch (e) {
        console.error("--- ERROR CONNECTING TO BOARD ---");
        console.table(e)
      }
    },
    async setAllPinsAsOutput(){
      for (let i = 0; i < 14; i++) {
        try {
          await pinMode({ pin: i, mode: 0x01 });
          this.pins.push({
            value: 0,
          });
        } catch (e) {
          console.error("--- ERROR SET PIN AS OUTPUT ---");
          console.table(e)
        }

      }
    }
  },
});
