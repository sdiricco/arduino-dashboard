const Firmata = require("firmata");

export let firmata = null;

/**
 * 
 *    {
      "supportedModes":[
         
      ],
      "value":0,
      "report":1,
      "analogChannel":127
   },
 */

export function connect(path?: string) {
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

export async function disconnect() {
  return new Promise(async (res, rej) => {
    try {
      if (!firmata || !firmata.transport || !firmata?.versionReceived || !firmata?.isReady || !firmata.transport) {
        console.log(`[FIRMATA:DISCONNECTED] > Not disconnected beacuse already disconnected.. Firmata instance does not exsist`);
        firmata = null;
        res(true);
        return
      }
      firmata.transport.close((e: any) => {
        res(true);
        return;
      });
    } catch (e:any) {
      console.log(`[FIRMATA:WARN_DISCONNECTING] > Error disconnecting ${e}`);
    }
  });
}

export function getState(){
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

export function getPins() {
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
