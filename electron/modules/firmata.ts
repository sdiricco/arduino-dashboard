const Firmata = require("firmata");
import {IBoard, IPin, IDisconnectReturnValue, IPinModeParams, IDigitalWriteParams} from "../types/firmataTypes"

export let firmata = null;

export function connect(params: string | undefined): Promise<IBoard> {
  return new Promise(async (res, rej) => {
    const onFirmata = (e: any) => {
      e && rej(e);
      res(getState())
    };
    try {
      firmata = new Firmata(params, onFirmata);
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

export function getState(): IBoard {
  try {
    const state:IBoard = {
      versionReceived: firmata?.versionReceived || null,
      isReady: firmata?.isReady || null,
      path: firmata?.transport?.path || null,
      pins: firmata?.pins || [],
    }
    return state;
  } catch (e) {
    throw(e)
  }
}

export function getPins(): Array<IPin> {
  try {
    return firmata.pins;
  } catch (e) {
    throw e;
  }
}

export function pinMode({ pin = null, mode = null }: IPinModeParams): IPin {
  try {
    firmata.pinMode(pin, mode);
    return firmata.pins[pin];
  } catch (e) {
    throw e;
  }
}

export function digitalWrite({ pin = null, value = null }: IDigitalWriteParams): IPin {
  try {
    firmata.digitalWrite(pin, value);
    return firmata.pins[pin];
  } catch (e) {
    throw e;
  }
}
