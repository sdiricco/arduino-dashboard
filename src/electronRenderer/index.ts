import { ipcRenderer, MessageBoxOptions, SaveDialogOptions } from "electron";
import { IShowMessageBoxReturnValue, ISaveDialogReturnValue, CH} from "../types";
import { errorHandle } from "./errorHandle"

export async function showMessageBox(messageBoxOptions: MessageBoxOptions): Promise<IShowMessageBoxReturnValue> {
  return await errorHandle(async () => ipcRenderer.invoke(CH.ELECTRON.SHOW_MESSAGE_BOX, messageBoxOptions))
}

export async function showSaveDialog(saveDialogOptions: SaveDialogOptions): Promise<ISaveDialogReturnValue> {
  return await ipcRenderer.invoke(CH.ELECTRON.SHOW_SAVE_DIALOG, saveDialogOptions);
}

export async function getBoards(): Promise<any>{
  return await ipcRenderer.invoke(CH.ARDUINO.GET_BOARDS)
}

export async function connect(payload:any): Promise<any>{
  return await ipcRenderer.invoke(CH.FIRMATA.CONNECT, payload)
}

export async function pinMode(payload:any): Promise<any>{
  return await ipcRenderer.invoke(CH.FIRMATA.PIN_MODE, payload)
}

export async function digitalWrite(payload:any): Promise<any>{
  return await ipcRenderer.invoke(CH.FIRMATA.DIGITAL_WRITE, payload)
}

export async function getPins(): Promise<any>{
  return await ipcRenderer.invoke(CH.FIRMATA.GET_PINS)
}

export async function invokeChildWin()  {
  return await ipcRenderer.invoke('open-win');
}

export async function onMenuAction(callback: Function){
  ipcRenderer.on(CH.ELECTRON.ON_MENU_ACTION, (_evt, data)=> {
    callback(data);
  })
}

