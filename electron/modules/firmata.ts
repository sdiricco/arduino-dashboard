const Firmata = require("firmata");

export let board = null;

export function connect(path?: string) {
  console.log('[FIRMATA:CONNECT]', `path ${path}`)
  return new Promise(async (res) => {
    board = new Firmata(path, async() => {
      res(true);
    });
  });
}

export function pinMode({pin = null, mode = null}) {
  console.log('[FIRMATA:PIN_MODE]', `pin ${pin}`, `mode ${mode}`)
  board.pinMode(pin, mode);
}

export function digitalWrite({pin = null, value = null}){
  console.log('[FIRMATA:DIGITAL_WRITE]', `pin ${pin}`, `value ${value}`)

  board.digitalWrite(pin, value);
}

