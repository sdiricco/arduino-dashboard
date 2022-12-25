import { execute } from "./spawn";
import {app} from "electron"
const path = require('path');

const APP_DIRECTORY_PATH = path.dirname(app.getPath("exe"));
const arduinoCli = process.env.VITE_DEV_SERVER_URL ? path.resolve('./extra-resources/arduino-cli') : path.join(APP_DIRECTORY_PATH, 'resources/extra-resources/arduino-cli')

console.log('arduino-cli', arduinoCli)

export async function getBoards(){
    const stdout = await execute(arduinoCli, ['board', 'list', '--format', 'json']);
    return JSON.parse(stdout)
}
