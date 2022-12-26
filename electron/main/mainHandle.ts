import { ipcMain, BrowserWindow, dialog } from "electron";
import { IError, CH } from "../types";
import { errorHandle } from "./errorHandle";
import { getBoards } from "../../electron/modules/arduino";
import { connect, disconnect, pinMode, digitalWrite, getPins } from "../../electron/modules/firmata";
import * as usbDetection from "../../electron/modules/usb-detection"

export function sendToClient(win: BrowserWindow, channel = "", data) {
  win.webContents.send(channel, data);
}

/*************************************************************************************/
/* DIALOGs API */
/*************************************************************************************/
export function handleDialogs(win: BrowserWindow) {
  /* SHOW MESSAGE BOX */
  ipcMain.handle(CH.ELECTRON.SHOW_MESSAGE_BOX, async (_evt, data) => {
    const error: IError = {
      code: 0,
      message: "Error during opening message box dialog electron API",
      type: "electron",
      channel: CH.ELECTRON.SHOW_MESSAGE_BOX,
    };
    return await errorHandle(async () => {
      await dialog.showMessageBox(win, data);
    }, error);
  });

  /* SHOW SAVE DIALOG */
  ipcMain.handle(CH.ELECTRON.SHOW_SAVE_DIALOG, async (_evt, data) => {
    const error: IError = {
      code: 0,
      message: "Error during opening saving dialog electron API",
      type: "electron",
      channel: CH.ELECTRON.SHOW_SAVE_DIALOG,
    };
    return await errorHandle(async () => await dialog.showSaveDialog(win, data), error);
  });

  /* SHOW OPEN DIALOG */
  ipcMain.handle(CH.ELECTRON.SHOW_OPEN_DIALOG, async (_evt, data) => {
    const error: IError = {
      code: 0,
      message: "Error during opening message open dialog electron API",
      type: "electron",
      channel: CH.ELECTRON.SHOW_OPEN_DIALOG,
    };
    return await errorHandle(async () => await dialog.showOpenDialog(win, data), error);
  });
}

/*************************************************************************************/
/* Arduino API */
/*************************************************************************************/
export function handleArduino() {
  ipcMain.handle(CH.ARDUINO.GET_BOARDS, async (_evt) => {
    const error: IError = {
      code: 0,
      message: "Error during get arduino boards",
      type: "arduino",
      channel: CH.ARDUINO.GET_BOARDS,
    };
    return await errorHandle(async () => await getBoards(), error);
  });
}
/*************************************************************************************/
/* Firmata API */
/*************************************************************************************/
export function handleFirmata() {
  ipcMain.handle(CH.FIRMATA.CONNECT, async (_evt, payload) => {
    const error: IError = {
      code: 0,
      message: "Error during connect to firmata",
      type: "firmata",
      channel: CH.FIRMATA.CONNECT,
    };
    return await errorHandle(async () => await connect(payload), error);
  });
  ipcMain.handle(CH.FIRMATA.DISCONNECT, async () => {
    const error: IError = {
      code: 0,
      message: "Error during disconnect to firmata",
      type: "firmata",
      channel: CH.FIRMATA.DISCONNECT,
    };
    return await errorHandle(async () => await disconnect(), error);
  });
  ipcMain.handle(CH.FIRMATA.PIN_MODE, async (_evt, data) => {
    const error: IError = {
      code: 0,
      message: "Error during executing pinMode firmata function",
      type: "firmata",
      channel: CH.FIRMATA.PIN_MODE,
    };
    return await errorHandle(async () => pinMode(data), error);
  });
  ipcMain.handle(CH.FIRMATA.DIGITAL_WRITE, async (_evt, data) => {
    const error: IError = {
      code: 0,
      message: "Error during executing digitalWrite firmata function",
      type: "firmata",
      channel: CH.FIRMATA.DIGITAL_WRITE,
    };
    return await errorHandle(async () => digitalWrite(data), error);
  });
  ipcMain.handle(CH.FIRMATA.GET_PINS, async () => {
    const error: IError = {
      code: 0,
      message: "Error during executing getPins firmata function",
      type: "firmata",
      channel: CH.FIRMATA.GET_PINS,
    };
    return await errorHandle(async () => getPins(), error);
  });
}

/*************************************************************************************/
/* USB detection API */
/*************************************************************************************/
export function handleUsbDetection(win: BrowserWindow) {

  usbDetection.start();
  usbDetection.onChange(() => {
    sendToClient(win, CH.USB_DETECTION.ON_CHANGE, true)
  })

  ipcMain.handle(CH.USB_DETECTION.START, async (_evt) => {
    const error: IError = {
      code: 0,
      message: "Error during start usb detection",
      type: "serialport",
      channel: CH.USB_DETECTION.START,
    };
    return await errorHandle(async () => usbDetection.start(), error);
  });
  ipcMain.handle(CH.USB_DETECTION.STOP, async (_evt) => {
    const error: IError = {
      code: 0,
      message: "Error during stop usb detection",
      type: "serialport",
      channel: CH.USB_DETECTION.STOP,
    };
    return await errorHandle(async () => usbDetection.stop(), error);
  });
  ipcMain.handle(CH.USB_DETECTION.ON_CHANGE, async (_evt) => {
    const error: IError = {
      code: 0,
      message: "Error during stop usb detection",
      type: "serialport",
      channel: CH.USB_DETECTION.STOP,
    };
    return await errorHandle(async () => usbDetection.stop(), error);
  });
}