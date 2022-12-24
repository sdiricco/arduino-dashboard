import { BrowserWindow } from "electron";
import * as mainHandle from "./mainHandle";
import * as mainMenu from "./mainMenu";
import {CH} from "../types"

export function onWindowCreated(window: BrowserWindow) {
  mainHandle.handleDialogs(window)
  mainHandle.handleArduino();
  mainHandle.handleFirmata();
  mainHandle.handleUsbDetection(window);
  // mainMenu.create(window, (data:any) => {
  //   mainHandle.sendToClient(window ,CH.ELECTRON.ON_MENU_ACTION, data);
  // });
}
