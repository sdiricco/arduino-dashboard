import { ipcRenderer } from "electron";
import { CH } from "../types";
import { ElectronError } from "./errorHandle"

/* ARDUINO API */
export async function getBoards(): Promise<any>{
  const response = await ipcRenderer.invoke(CH.ARDUINO.GET_BOARDS);
  if (response.error) {
    throw new ElectronError(response.error)
  }
  return response.data;
}