const Firmata = require("firmata");
import {IBoard,IDigitalWrite, IPin, IPinMode, IDisconnectReturnValue} from "../types/firmataTypes"

export let firmata = null;

export function connect(path?: string): Promise<IBoard> {
  return new Promise(async (res, rej) => {
    const onFirmata = (e: any) => {
      e && rej(e);
      res(getState())
    };
    try {
      firmata = new Firmata(path, onFirmata);
    } catch (e) {
      rej(e);
    }
  });
}

export async function disconnect(): Promise<IDisconnectReturnValue> {
  return new Promise(async (res, rej) => {
    const result: IDisconnectReturnValue = {
      reason: null,
      success: false,
    }
    try {
      if (!firmata || !firmata.transport || !firmata?.versionReceived || !firmata?.isReady || !firmata.transport) {
        result.reason = 'Not disconnected beacuse already disconnected.. Firmata instance does not exsist'
        result.success = true;
        firmata = null;
        res(result);
        return;
      }
      firmata.transport.close((e: any) => {
        result.reason = e || 'Disconnection succesfully'  
        result.success = true;
        firmata = null;
        res(result);
        return;
      });
    } catch (e:any) {
      result.reason = e
      result.success = false;
      rej(result);
      return;
    }
  });
}

export function getState():IBoard {
  try {
    const state = {
      versionReceived: firmata?.versionReceived,
      isReady: firmata?.isReady,
      path: firmata?.transport?.path,
      pins: firmata?.pins,
    }
    console.log('PINS', JSON.stringify(state.pins))
    return state;
  } catch (e) {
    throw(e)
  }
}

export function getPins(): Array<IPin> {
  let pins = [];
  try {
    console.log(`[FIRMATA:GET_PINS]`);
    pins = firmata.pins;
  } catch (e) {
    console.error(`[FIRMATA:ERROR_GET_PINS] > Error during get pins ${e}`);
    throw e;
  }
  return pins;
}

export function pinMode({ pin = null, mode = null }) {
  try {
    console.log("[FIRMATA:PIN_MODE]", `pin ${pin}`, `mode ${mode}`);
    firmata.pinMode(pin, mode);
  } catch (e) {
    console.error("[FIRMATA:ERROR_PIN_MODE]", `pin ${pin}`, `mode ${mode}`);
    throw e;
  }
  return true;
}

export function digitalWrite({ pin = null, value = null }) {
  try {
    console.log("[FIRMATA:DIGITAL_WRITE]", `pin ${pin}`, `value ${value}`);
    firmata.digitalWrite(pin, value);
  } catch (e) {
    console.error("[FIRMATA:DIGITAL_WRITE]", `pin ${pin}`, `value ${value}`);
    throw e;
  }
}
