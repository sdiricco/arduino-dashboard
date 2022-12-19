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
      code: 0,
      message: "Error during opening message box dialog electron API",
      type: "electron",
      channel: Channel.ShowMessageBox,
    };
    return await errorHandle(async () => {
      await dialog.showMessageBox(win, data)
    }, error);
  });

  /* SHOW SAVE DIALOG */
  ipcMain.handle(Channel.ShowSaveDialog, async (_evt, data) => {
    const error: IError = {
      code: 0,
      message: "Error during opening saving dialog electron API",
      type: "electron",
      channel: Channel.ShowSaveDialog,
    };
    return await errorHandle(async () => await dialog.showSaveDialog(win, data), error);
  });

  /* SHOW OPEN DIALOG */
  ipcMain.handle(Channel.ShowOpenDialog, async (_evt, data) => {
    const error: IError = {
      code: 0,
      message: "Error during opening message open dialog electron API",
      type: "electron",
      channel: Channel.ShowOpenDialog,
    };
    return await errorHandle(async () => await dialog.showOpenDialog(win, data), error);
  });
}
