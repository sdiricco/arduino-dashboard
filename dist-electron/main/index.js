"use strict";
const electron = require("electron");
const os = require("os");
const path$1 = require("path");
const CH = {
  ELECTRON: {
    SHOW_MESSAGE_BOX: "electron/show-message-box",
    SHOW_SAVE_DIALOG: "electron/show-save-dialog",
    SHOW_OPEN_DIALOG: "electron/show-open-dialog",
    ON_MENU_ACTION: "electron/on-menu-action"
  },
  ARDUINO: {
    GET_BOARDS: "arduino/get-boards"
  },
  FIRMATA: {
    CONNECT: "firmata/connect",
    DISCONNECT: "firmata/disconnect",
    PIN_MODE: "firmata/pin-mode",
    DIGITAL_WRITE: "firmata/digital-write",
    GET_PINS: "firmata/get-pins"
  },
  SERIAL_PORT: {
    GET_PORTS: "serialport/get-ports"
  },
  USB_DETECTION: {
    ON_CHANGE: "usb-detection/on-change"
  }
};
const { spawn } = require("child_process");
function execute(command, args) {
  return new Promise((res) => {
    const child = spawn(command, args);
    child.stdout.on("data", (buffer) => {
      res(buffer.toString());
    });
  });
}
const path = require("path");
const APP_DIRECTORY_PATH = path.dirname(electron.app.getPath("exe"));
const arduinoCli = process.env.VITE_DEV_SERVER_URL ? path.resolve("./extra-resources/arduino-cli") : path.join(APP_DIRECTORY_PATH, "resources/extra-resources/arduino-cli");
console.log("arduino-cli", arduinoCli);
async function getBoards() {
  const stdout = await execute(arduinoCli, ["board", "list", "--format", "json"]);
  return JSON.parse(stdout);
}
const Firmata = require("firmata");
let firmata = null;
function connect(params) {
  return new Promise(async (res, rej) => {
    const onFirmata = (e) => {
      e && rej(e);
      res(getState());
    };
    try {
      firmata = new Firmata(params, onFirmata);
    } catch (e) {
      rej(e);
    }
  });
}
async function disconnect() {
  return new Promise(async (res, rej) => {
    const result = {
      reason: null,
      success: false
    };
    try {
      if (!firmata || !firmata.transport || !(firmata == null ? void 0 : firmata.versionReceived) || !(firmata == null ? void 0 : firmata.isReady) || !firmata.transport) {
        result.reason = "Not disconnected beacuse already disconnected.. Firmata instance does not exsist";
        result.success = true;
        firmata = null;
        res(result);
        return;
      }
      firmata.transport.close((e) => {
        result.reason = e || "Disconnection succesfully";
        result.success = true;
        firmata = null;
        res(result);
        return;
      });
    } catch (e) {
      result.reason = e;
      result.success = false;
      rej(result);
      return;
    }
  });
}
function getState() {
  var _a;
  try {
    const state = {
      versionReceived: (firmata == null ? void 0 : firmata.versionReceived) || null,
      isReady: (firmata == null ? void 0 : firmata.isReady) || null,
      path: ((_a = firmata == null ? void 0 : firmata.transport) == null ? void 0 : _a.path) || null,
      pins: (firmata == null ? void 0 : firmata.pins) || []
    };
    return state;
  } catch (e) {
    throw e;
  }
}
function getPins() {
  try {
    return firmata.pins;
  } catch (e) {
    throw e;
  }
}
function pinMode({ pin = null, mode = null }) {
  try {
    firmata.pinMode(pin, mode);
    return firmata.pins[pin];
  } catch (e) {
    throw e;
  }
}
function digitalWrite({ pin = null, value = null }) {
  try {
    firmata.digitalWrite(pin, value);
    return firmata.pins[pin];
  } catch (e) {
    throw e;
  }
}
var usbDetect = require("usb-detection");
function start() {
  usbDetect.startMonitoring();
}
function onChange(callback) {
  usbDetect.on("change", callback);
}
function sendToClient(win2, channel = "", data) {
  win2.webContents.send(channel, data);
}
const ELECTRON_TYPE = "electron";
function handleDialogs(win2) {
  electron.ipcMain.handle(CH.ELECTRON.SHOW_MESSAGE_BOX, async (_evt, data) => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during opening message box dialog electron API",
      type: ELECTRON_TYPE,
      channel: CH.ELECTRON.SHOW_MESSAGE_BOX
    };
    try {
      result.data = await electron.dialog.showMessageBox(win2, data);
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
  electron.ipcMain.handle(CH.ELECTRON.SHOW_SAVE_DIALOG, async (_evt, data) => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during opening saving dialog electron API",
      type: ELECTRON_TYPE,
      channel: CH.ELECTRON.SHOW_SAVE_DIALOG
    };
    try {
      result.data = await electron.dialog.showSaveDialog(win2, data);
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
  electron.ipcMain.handle(CH.ELECTRON.SHOW_OPEN_DIALOG, async (_evt, data) => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during opening message open dialog electron API",
      type: ELECTRON_TYPE,
      channel: CH.ELECTRON.SHOW_OPEN_DIALOG
    };
    try {
      result.data = await electron.dialog.showOpenDialog(win2, data);
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
}
const ARDUINO_TYPE = "arduino";
function handleArduino() {
  electron.ipcMain.handle(CH.ARDUINO.GET_BOARDS, async (_evt) => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during get arduino boards",
      type: ARDUINO_TYPE,
      channel: CH.ARDUINO.GET_BOARDS
    };
    try {
      result.data = await getBoards();
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
}
const FIRMATA_TYPE = "firmata";
function handleFirmata() {
  electron.ipcMain.handle(CH.FIRMATA.CONNECT, async (_evt, payload) => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during connect to firmata",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.CONNECT
    };
    try {
      result.data = await connect(payload);
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
  electron.ipcMain.handle(CH.FIRMATA.DISCONNECT, async () => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during disconnect to firmata",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.DISCONNECT
    };
    try {
      result.data = await disconnect();
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
  electron.ipcMain.handle(CH.FIRMATA.GET_PINS, async () => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during executing getPins firmata function",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.GET_PINS
    };
    try {
      result.data = getPins();
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
  electron.ipcMain.handle(CH.FIRMATA.PIN_MODE, async (_evt, data) => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during executing pinMode firmata function",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.PIN_MODE
    };
    try {
      result.data = pinMode(data);
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
  electron.ipcMain.handle(CH.FIRMATA.DIGITAL_WRITE, async (_evt, data) => {
    const result = {};
    const error = {
      code: 0,
      message: "Error during executing digitalWrite firmata function",
      type: FIRMATA_TYPE,
      channel: CH.FIRMATA.DIGITAL_WRITE
    };
    try {
      result.data = digitalWrite(data);
    } catch (e) {
      result.error = { ...{ details: e.message }, ...error };
    }
    return result;
  });
}
function handleUsbDetection(win2) {
  start();
  onChange(() => {
    sendToClient(win2, CH.USB_DETECTION.ON_CHANGE, true);
  });
}
function onWindowCreated(window) {
  handleDialogs(window);
  handleArduino();
  handleFirmata();
  handleUsbDetection(window);
}
process.env.DIST_ELECTRON = path$1.join(__dirname, "..");
process.env.DIST = path$1.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? path$1.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
if (os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win = null;
const preload = path$1.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = path$1.join(process.env.DIST, "index.html");
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Main window",
    icon: path$1.join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", new Date().toLocaleString());
  });
  win.webContents.setWindowOpenHandler(({ url: url2 }) => {
    if (url2.startsWith("https:"))
      electron.shell.openExternal(url2);
    return { action: "deny" };
  });
  onWindowCreated(win);
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new electron.BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
