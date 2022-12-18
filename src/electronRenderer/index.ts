import * as Electron from "electron";
export { Electron };

import { IShowMessageBoxReturnValue, ElectronChannel } from "../types";

export async function showMessageBox(messageBoxOptions: Electron.MessageBoxOptions): Promise<IShowMessageBoxReturnValue> {
  return await Electron.ipcRenderer.invoke(ElectronChannel.ShowMessageBox, messageBoxOptions);
}

