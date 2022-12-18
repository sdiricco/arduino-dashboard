import { ipcMain, BrowserWindow, dialog } from "electron";
import { IError, Channel } from "../types";
import { errorHandle } from "./errorHandle";

export function sendToClient(win: BrowserWindow, channel = "", data) {
  win.webContents.send(channel, data);
}

/*************************************************************************************/
/* DIALOGs API */
/*************************************************************************************/
export function handleDialogs(win: BrowserWindow) {
  
  /* SHOW MESSAGE BOX */
  ipcMain.handle(Channel.ShowMessageBox, async (_evt, data) => {
    const error: IError = {
      code: 19,
      message: "Error during opening message box dialog electron API",
      type: "electron",
      channel: Channel.ShowMessageBox,
    };
    return await errorHandle(async () => await dialog.showMessageBox(win, data), error);
  });
}
