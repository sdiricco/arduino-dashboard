import { ipcRenderer } from "electron";
import { CH } from "../types";
import { ElectronError, raiseError } from "./errorHandle"

/* ARDUINO API */
export async function getBoards(): Promise<any>{
  const response = await ipcRenderer.invoke(CH.ARDUINO.GET_BOARDS);
  response.error && raiseError(new ElectronError(response.error));
  return response.data;
}