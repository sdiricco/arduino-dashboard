const Firmata = require("firmata");

export let firmata = null;

export function connect(path?: string) {
  console.log('[FIRMATA:CONNECT]', `path ${path}`)
  return new Promise(async (res, rej) => {
    firmata = new Firmata(path, async(e) => {
      e ? rej(e) :res(true)
    });
  });
}

export function getPins(){
  return firmata.pins;
}

export function pinMode({pin = null, mode = null}) {
  try {
    console.log('[FIRMATA:PIN_MODE]', `pin ${pin}`, `mode ${mode}`)
    firmata.pinMode(pin, mode);
  } catch (e) {
    console.error('[FIRMATA:PIN_MODE]', `pin ${pin}`, `mode ${mode}`)
  }

}

export function digitalWrite({pin = null, value = null}){

  try {
    console.log('[FIRMATA:DIGITAL_WRITE]', `pin ${pin}`, `value ${value}`)
    firmata.digitalWrite(pin, value);
  } catch (e) {
    console.error('[FIRMATA:DIGITAL_WRITE]', `pin ${pin}`, `value ${value}`)
  }

}

