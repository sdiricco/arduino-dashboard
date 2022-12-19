import { ipcRenderer, MessageBoxOptions, SaveDialogOptions } from "electron";
import { IShowMessageBoxReturnValue, ISaveDialogReturnValue, Channel } from "../types";
import { errorHandle } from "./errorHandle"

export async function showMessageBox(messageBoxOptions: MessageBoxOptions): Promise<IShowMessageBoxReturnValue> {
  return await errorHandle(async () => ipcRenderer.invoke(Channel.ShowMessageBox, messageBoxOptions))
}

export async function showSaveDialog(saveDialogOptions: SaveDialogOptions): Promise<ISaveDialogReturnValue> {
  return await ipcRenderer.invoke(Channel.ShowSaveDialog, saveDialogOptions);
}

export async function invokeChildWin()  {
  return await ipcRenderer.invoke('open-win');
}

export async function onMenuAction(callback: Function){
  ipcRenderer.on(Channel.Menu, (_evt, data)=> {
    callback(data);
  })
}

