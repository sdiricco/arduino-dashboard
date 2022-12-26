import { ipcRenderer, MessageBoxOptions, SaveDialogOptions } from "electron";
import { IShowMessageBoxReturnValue, ISaveDialogReturnValue, CH} from "../types";
import { errorHandle } from "./errorHandle"


/* ELECTRON API */
export async function showMessageBox(messageBoxOptions: MessageBoxOptions): Promise<IShowMessageBoxReturnValue> {
  return await errorHandle(async () => ipcRenderer.invoke(CH.ELECTRON.SHOW_MESSAGE_BOX, messageBoxOptions))
}

export async function showSaveDialog(saveDialogOptions: SaveDialogOptions): Promise<ISaveDialogReturnValue> {
  return await errorHandle(async () => ipcRenderer.invoke(CH.ELECTRON.SHOW_SAVE_DIALOG, saveDialogOptions))
}

/* ARDUINO API */
export async function getBoards(): Promise<any>{
  return await errorHandle(async () =>  ipcRenderer.invoke(CH.ARDUINO.GET_BOARDS))
}

/* FIRMATA API */
export async function connect(payload:any): Promise<any>{
  return await errorHandle(async () => ipcRenderer.invoke(CH.FIRMATA.CONNECT, payload))
}

export async function disconnect(): Promise<any>{
  return await errorHandle(async () => ipcRenderer.invoke(CH.FIRMATA.DISCONNECT))
}

export async function pinMode(payload:any): Promise<any>{
  return await errorHandle(async () => ipcRenderer.invoke(CH.FIRMATA.PIN_MODE, payload))
}

export async function digitalWrite(payload:any): Promise<any>{
  return await errorHandle(async () => ipcRenderer.invoke(CH.FIRMATA.DIGITAL_WRITE, payload))
}

export async function getPins(): Promise<any>{
  return await errorHandle(async () => ipcRenderer.invoke(CH.FIRMATA.GET_PINS))
}

export async function invokeChildWin()  {
  return await ipcRenderer.invoke('open-win');
}

export async function onMenuAction(callback: Function){
  ipcRenderer.on(CH.ELECTRON.ON_MENU_ACTION, (_evt:any, data:any)=> {
    callback(data);
  })
}

export async function onListeningUsbDevicesChanges(callback: (evt:any, data:any)=>void){
  ipcRenderer.on(CH.USB_DETECTION.ON_CHANGE, callback)
}

export async function offListeningUsbDevicesChanges(callback: (evt:any, data:any)=>void){
  ipcRenderer.off(CH.USB_DETECTION.ON_CHANGE, callback)
}

