import { ipcMain, BrowserWindow, dialog } from "electron";
import { IError, CH } from "../types";
import { getBoards } from "../../electron/modules/arduino";
import { connect, disconnect, pinMode, digitalWrite, getPins } from "../../electron/modules/firmata";
import * as usbDetection from "../../electron/modules/usb-detection"
import { IIPC } from "../types"

export function sendToClient(win: BrowserWindow, channel = "", data) {
  win.webContents.send(channel, data);
}

/*************************************************************************************/
/* DIALOGs API */
/*************************************************************************************/
const ELECTRON_TYPE = "electron";

export function handleDialogs(win: BrowserWindow) {

  /* SHOW MESSAGE BOX */
  ipcMain.handle(CH.ELECTRON.SHOW_MESSAGE_BOX, async (_evt, data) => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during opening message box dialog electron API",
      type: ELECTRON_TYPE,
      channel: CH.ELECTRON.SHOW_MESSAGE_BOX,
    };
    try {
      result.data = await dialog.showMessageBox(win, data);
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result;
  });

  /* SHOW SAVE DIALOG */
  ipcMain.handle(CH.ELECTRON.SHOW_SAVE_DIALOG, async (_evt, data) => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during opening saving dialog electron API",
      type: ELECTRON_TYPE,
      channel: CH.ELECTRON.SHOW_SAVE_DIALOG,
    };
    try {
      result.data = await dialog.showSaveDialog(win, data)
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result;
  });

  /* SHOW OPEN DIALOG */
  ipcMain.handle(CH.ELECTRON.SHOW_OPEN_DIALOG, async (_evt, data) => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during opening message open dialog electron API",
      type: ELECTRON_TYPE,
      channel: CH.ELECTRON.SHOW_OPEN_DIALOG,
    };
    try {
      result.data = await dialog.showOpenDialog(win, data)
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result
  });
}

/*************************************************************************************/
/* Arduino API */
/*************************************************************************************/
const ARDUINO_TYPE = "arduino";

export function handleArduino() {

  /* ARDUINO - GET BOARDS */
  ipcMain.handle(CH.ARDUINO.GET_BOARDS, async (_evt) => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during get arduino boards",
      type: ARDUINO_TYPE,
      channel: CH.ARDUINO.GET_BOARDS,
    };
    try {
      result.data = await getBoards()
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result
  });
}
/*************************************************************************************/
/* Firmata API */
/*************************************************************************************/
const FIRMATA_TYPE = 'firmata';

export function handleFirmata() {

  /* FIRMATA - CONNECT */
  ipcMain.handle(CH.FIRMATA.CONNECT, async (_evt, payload) => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during connect to firmata",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.CONNECT,
    };
    try {                                                                                                                                                                                                                          
      result.data = await connect(payload);
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result
  });

  /* FIRMATA - DISCONNECT */
  ipcMain.handle(CH.FIRMATA.DISCONNECT, async () => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during disconnect to firmata",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.DISCONNECT,
    };
    try {
      result.data = await disconnect()
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result;
  });

  /* FIRMATA - GET PINS */
  ipcMain.handle(CH.FIRMATA.GET_PINS, async () => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during executing getPins firmata function",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.GET_PINS,
    };
    try {
      result.data = getPins()
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result;
  });

  /* FIRMATA - PIN MODE */
  ipcMain.handle(CH.FIRMATA.PIN_MODE, async (_evt, data) => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during executing pinMode firmata function",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.PIN_MODE,
    };
    try {
      result.data = pinMode(data)
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result
  });

  /* FIRMATA - DIGITAL WRITE */
  ipcMain.handle(CH.FIRMATA.DIGITAL_WRITE, async (_evt, data) => {
    const result: IIPC = {}
    const error: IError = {
      code: 0,
      message: "Error during executing digitalWrite firmata function",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.DIGITAL_WRITE,
    };
    try {
      result.data = digitalWrite(data)
    } catch (e) {
      result.error = { ...{details: e.message}, ...error };
    }
    return result
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

}