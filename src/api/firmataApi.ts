import { ipcRenderer } from "electron";
import { CH } from "../types";
import { ElectronError, raiseError } from "./errorHandle";

/* FIRMATA - CONNECT */
export async function connect(payload: any): Promise<any> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.CONNECT, payload);
  response.error && raiseError(new ElectronError(response.error));
  return response.data;
}

/* FIRMATA - DISCONNECT */
export async function disconnect(): Promise<any> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.DISCONNECT);
  response.error && raiseError(new ElectronError(response.error));
  return response.data;
}

/* FIRMATA - PIN MODE */
export async function pinMode(payload: { pin: number; mode: number }): Promise<any> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.PIN_MODE, payload);
  response.error && raiseError(new ElectronError(response.error));
  return response.data;
}

/* FIRMATA - DIGITAL WRITE */
export async function digitalWrite(payload: any): Promise<any> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.DIGITAL_WRITE, payload);
  response.error && raiseError(new ElectronError(response.error));
  return response.data;
}

/* FIRMATA - GET PINS */
export async function getPins(): Promise<Array<any>> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.GET_PINS);
  response.error && raiseError(new ElectronError(response.error));
  return response.data;
}
