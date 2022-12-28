import { ipcRenderer, MessageBoxOptions, MessageBoxReturnValue } from "electron";
import { CH } from "../types";
import { ElectronError, raiseError } from "./errorHandle";

/* SHOW MESSAGE BOX */
export async function showMessageBox(messageBoxOptions: MessageBoxOptions): Promise<MessageBoxReturnValue> {
  const response = await ipcRenderer.invoke(CH.ELECTRON.SHOW_MESSAGE_BOX, messageBoxOptions);
  if (response.error) {
    throw new ElectronError(response.error)
  }
  return response.data;
}

