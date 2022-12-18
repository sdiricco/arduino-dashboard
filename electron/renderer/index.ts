import { MessageBoxOptions, ipcRenderer } from "electron";
import { IShowMessageBoxReturnValue, ElectronChannel } from "../types";

export async function showMessageBox(messageBoxOptions: MessageBoxOptions): Promise<IShowMessageBoxReturnValue> {
  return await ipcRenderer.invoke(ElectronChannel.ShowMessageBox, messageBoxOptions);
}
