const Firmata = require("firmata");

export let firmata = null;

export function connect(path?: string) {
  console.log('[FIRMATA:CONNECT]', `path ${path}`)
  return new Promise(async (res) => {
    firmata = new Firmata(path, async() => {
      res(true);
    });
  });
}

export function getPins(){
  return firmata.pins;
}

export function pinMode({pin = null, mode = null}) {
  console.log('[FIRMATA:PIN_MODE]', `pin ${pin}`, `mode ${mode}`)
  firmata.pinMode(pin, mode);
}

export function digitalWrite({pin = null, value = null}){
  console.log('[FIRMATA:DIGITAL_WRITE]', `pin ${pin}`, `value ${value}`)

  firmata.digitalWrite(pin, value);
}

