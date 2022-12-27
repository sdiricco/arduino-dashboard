import { ipcRenderer } from "electron";
import { CH } from "../types";
import { errorHandle } from "./errorHandle"

/* ARDUINO API */
export async function getBoards(): Promise<any>{
  return await errorHandle(async () =>  ipcRenderer.invoke(CH.ARDUINO.GET_BOARDS))
}