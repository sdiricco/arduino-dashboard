import * as electron from "electron";

export interface IError {
  code?: null | number;
  message?: null | string;
  details?: null | string;
  type?: null | string;
  channel?: null | string;
}

export interface IIPC {
    error: IError;
    data: any
}

export interface IShowMessageBoxReturnValue {
  data: electron.MessageBoxReturnValue,
  error: IError
}

export interface ISaveDialogReturnValue {
  data: electron.SaveDialogReturnValue,
  error: IError
}

export const CH = {
  ELECTRON: {
    SHOW_MESSAGE_BOX: 'electron/show-message-box',
    SHOW_SAVE_DIALOG: 'electron/show-save-dialog',
    SHOW_OPEN_DIALOG: 'electron/show-open-dialog',
    ON_MENU_ACTION: 'electron/on-menu-action'
  },
  ARDUINO: {
    GET_BOARDS: "arduino/get-boards"
  },
  FIRMATA: {
    CONNECT: "firmata/connect",
    PIN_MODE: "firmata/pin-mode",
    DIGITAL_WRITE: "firmata/digital-write",
    GET_PINS: "firmata/get-pins"
  }
}
