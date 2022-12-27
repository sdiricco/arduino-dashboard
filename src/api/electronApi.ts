import { ipcRenderer, MessageBoxOptions } from "electron";
import { IShowMessageBoxReturnValue, CH } from "../types";
import { ElectronError } from "./errorHandle";

function raiseError(e: ElectronError): ElectronError {
  throw(new ElectronError(e));
}

/* SHOW MESSAGE BOX */
export async function showMessageBox(messageBoxOptions: MessageBoxOptions): Promise<IShowMessageBoxReturnValue | undefined> {
  try {
    const response = await ipcRenderer.invoke(CH.ELECTRON.SHOW_MESSAGE_BOX, messageBoxOptions);
    response.error && raiseError(response.error);
    return response.data;
  } catch (e:any) {
    raiseError(e);
  }
}

/* ON MENU ACTION */
export async function onMenuAction(callback: Function) {
  ipcRenderer.on(CH.ELECTRON.ON_MENU_ACTION, (_evt: any, data: any) => {
    callback(data);
  });
}
