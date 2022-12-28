import { ipcRenderer } from "electron";
import { CH } from "../types/electronTypes";
import { ElectronError } from "./errorHandle";
import { IBoard, IPinModeParams, IDigitalWriteParams, IPin, IDisconnectReturnValue } from "../types/firmataTypes"

/* FIRMATA - CONNECT */
export async function connect(payload: string | null): Promise<IBoard> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.CONNECT, payload);
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

/* FIRMATA - DISCONNECT */
export async function disconnect(): Promise<IDisconnectReturnValue> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.DISCONNECT);
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

/* FIRMATA - PIN MODE */
export async function pinMode(payload: IPinModeParams): Promise<IPin> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.PIN_MODE, payload);
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

/* FIRMATA - DIGITAL WRITE */
export async function digitalWrite(payload: IDigitalWriteParams): Promise<IPin> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.DIGITAL_WRITE, payload);
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

/* FIRMATA - GET PINS */
export async function getPins(): Promise<Array<IPin>> {
  const response = await ipcRenderer.invoke(CH.FIRMATA.GET_PINS);
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}
