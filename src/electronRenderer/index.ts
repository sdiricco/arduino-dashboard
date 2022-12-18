import { ipcRenderer, MessageBoxOptions } from "electron";
import { IShowMessageBoxReturnValue, Channel } from "../types";

export async function showMessageBox(messageBoxOptions: MessageBoxOptions): Promise<IShowMessageBoxReturnValue> {
  return await ipcRenderer.invoke(Channel.ShowMessageBox, messageBoxOptions);
}

export async function onMenuAction(callback: Function){
  ipcRenderer.on(Channel.Menu, (_evt, data)=> {
    callback(data);
  })
}

