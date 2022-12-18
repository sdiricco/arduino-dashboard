import { BrowserWindow } from "electron";
import * as mainHandle from "./mainHandle";
import * as mainMenu from "./mainMenu";
import {Channel} from "../types"

export function onWindowCreated(window: BrowserWindow) {
  mainHandle.handleDialogs(window)
  mainMenu.create(window, (data:any) => {
    mainHandle.sendToClient(window ,Channel.Menu, data);
  });
}
