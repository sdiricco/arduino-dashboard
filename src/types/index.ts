import * as electron from "electron";

export interface IElectronError {
  code?: null | number;
  message?: null | string;
  details?: null | string;
  type?: null | string;
  channel?: null | string;
}

export interface IElectronIPC {
    error: IElectronError;
    data: any
}

export interface IShowMessageBoxReturnValue {
  data: electron.MessageBoxReturnValue,
  error: IElectronError
}

export enum ElectronChannel {
  ShowMessageBox = "electron/show-message-box",
}
