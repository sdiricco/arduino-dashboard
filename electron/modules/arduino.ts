import { execute } from "./spawn";
// var usbDetect = require('usb-detection');
const path = require('path');
const arduinoCli = path.resolve('./extra-resources/arduino-cli')


export async function getBoards(){
    const stdout = await execute(arduinoCli, ['board', 'list', '--format', 'json']);
    return JSON.parse(stdout)
}
