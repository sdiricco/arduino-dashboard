import { ipcMain, BrowserWindow, dialog } from "electron";
import { IElectronError, ElectronChannel } from "../types";
import { errorHandle } from "./errorHandle";

/*************************************************************************************/
/* CONSTANTS */
/*************************************************************************************/
export let win: BrowserWindow | null = null;

export function setWin(value: BrowserWindow) {
  win = value;
}

/*************************************************************************************/
/* DIALOGs API */
/*************************************************************************************/

/* SHOW MESSAGE BOX */
ipcMain.handle(ElectronChannel.ShowMessageBox, async (_evt, data) => {
  const error: IElectronError = {
    code: 19,
    message: "Error during opening message box dialog electron API",
    type: "electron",
    channel: ElectronChannel.ShowMessageBox,
  };
  return await errorHandle(async () => await dialog.showMessageBox(win, data), error);
});
