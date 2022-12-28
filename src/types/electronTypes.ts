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
    DISCONNECT: "firmata/disconnect",
    PIN_MODE: "firmata/pin-mode",
    DIGITAL_WRITE: "firmata/digital-write",
    GET_PINS: "firmata/get-pins"
  },
  SERIAL_PORT: {
    GET_PORTS: "serialport/get-ports"
  },
  USB_DETECTION: {
    START: "usb-detection/start",
    STOP: "usb-detection/stop",
    ON_CHANGE: "usb-detection/on-change",
  }
}
