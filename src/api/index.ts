import { ipcRenderer } from "electron";
import { CH} from "../types";

export async function onListeningUsbDevicesChanges(callback: (evt:any, data:any)=>void){
  ipcRenderer.on(CH.USB_DETECTION.ON_CHANGE, callback)
}

export async function offListeningUsbDevicesChanges(callback: (evt:any, data:any)=>void){
  ipcRenderer.off(CH.USB_DETECTION.ON_CHANGE, callback)
}

