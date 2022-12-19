"use strict";
const electron = require("electron");
const os = require("os");
const path = require("path");
const R = require("ramda");
require("lodash");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const R__namespace = /* @__PURE__ */ _interopNamespaceDefault(R);
var Channel = /* @__PURE__ */ ((Channel2) => {
  Channel2["ShowMessageBox"] = "electron/show-message-box";
  Channel2["ShowSaveDialog"] = "electron/show-save-dialog";
  Channel2["ShowOpenDialog"] = "electron/show-open-dialog";
  Channel2["Menu"] = "electron/menu";
  return Channel2;
})(Channel || {});
async function errorHandle(fn, error) {
  const result = {};
  try {
    result.data = await fn();
  } catch (e) {
    result.error = { ...{ details: e.message }, ...error };
  }
  return result;
}
function sendToClient(win2, channel = "", data) {
  win2.webContents.send(channel, data);
}
function handleDialogs(win2) {
  electron.ipcMain.handle(Channel.ShowMessageBox, async (_evt, data) => {
    const error = {
      code: 0,
      message: "Error during opening message box dialog electron API",
      type: "electron",
      channel: Channel.ShowMessageBox
    };
    return await errorHandle(async () => {
      await electron.dialog.showMessageBox(win2, data);
    }, error);
  });
  electron.ipcMain.handle(Channel.ShowSaveDialog, async (_evt, data) => {
    const error = {
      code: 0,
      message: "Error during opening saving dialog electron API",
      type: "electron",
      channel: Channel.ShowSaveDialog
    };
    return await errorHandle(async () => await electron.dialog.showSaveDialog(win2, data), error);
  });
  electron.ipcMain.handle(Channel.ShowOpenDialog, async (_evt, data) => {
    const error = {
      code: 0,
      message: "Error during opening message open dialog electron API",
      type: "electron",
      channel: Channel.ShowOpenDialog
    };
    return await errorHandle(async () => await electron.dialog.showOpenDialog(win2, data), error);
  });
}
process.platform === "darwin";
let defaultTemplate = [];
let template = [];
let window = null;
let clickCallback = null;
function buildMenuFromTemplate(window2, template2) {
  const menu = electron.Menu.buildFromTemplate(template2);
  window2.setMenu(menu);
}
function create(win2, onClickItem) {
  window = win2;
  clickCallback = onClickItem;
  let __template = [
    {
      id: "file",
      parentId: null,
      label: "File",
      submenu: [
        {
          id: "file/new",
          parentId: "file",
          label: "New",
          accelerator: "Ctrl + N",
          click: (menuItem) => clickCallback({ ...optionsFiltered(menuItem) })
        },
        {
          id: "file/open",
          parentId: "file",
          label: "Open",
          accelerator: "Ctrl + O",
          click: (menuItem) => clickCallback({ ...optionsFiltered(menuItem) })
        },
        {
          id: "file/separator-1",
          parentId: "file",
          type: "separator"
        },
        {
          id: "file/save",
          parentId: "file",
          label: "Save",
          accelerator: "Ctrl + S",
          click: (menuItem) => clickCallback({ ...optionsFiltered(menuItem) })
        },
        {
          id: "file/saveas",
          parentId: "file",
          label: "Save as..",
          accelerator: "Ctrl + Shift + S",
          click: (menuItem) => clickCallback({ ...optionsFiltered(menuItem) })
        },
        {
          id: "file/separator-2",
          parentId: "file",
          type: "separator"
        },
        {
          id: "file/preferences",
          parentId: "file",
          label: "Preferences",
          click: (menuItem) => onClickItem({ ...optionsFiltered(menuItem) })
        },
        {
          id: "file/separator-3",
          parentId: "file",
          type: "separator"
        },
        {
          id: "file/quit",
          parentId: "file",
          role: "quit"
        }
      ]
    },
    {
      id: "device",
      parentId: null,
      label: "Device",
      submenu: [
        {
          id: "device/port",
          parentId: "device",
          label: "Port",
          submenu: [
            {
              id: "device/port/COM6",
              parentId: "device/port",
              label: "COM6",
              click: (menuItem) => onClickItem({ ...optionsFiltered(menuItem) })
            }
          ]
        }
      ]
    }
  ];
  template = R__namespace.clone(__template);
  defaultTemplate = R__namespace.clone(__template);
  console.table(defaultTemplate);
  buildMenuFromTemplate(window, template);
}
function optionsFiltered(menuItem) {
  return {
    id: menuItem.id || null,
    label: menuItem.label || null,
    type: menuItem.type || null,
    checked: menuItem.checked || null,
    role: menuItem.role || null,
    accelerator: menuItem.accelerator || null,
    sublabel: menuItem.sublabel || null,
    toolTip: menuItem.toolTip || null,
    enabled: menuItem.enabled || null,
    visible: menuItem.visible || null,
    acceleratorWorksWhenHidden: menuItem.acceleratorWorksWhenHidden || null,
    registerAccelerator: menuItem.registerAccelerator || null,
    commandId: menuItem.commandId || null
  };
}
function onWindowCreated(window2) {
  handleDialogs(window2);
  create(window2, (data) => {
    sendToClient(window2, Channel.Menu, data);
  });
}
process.env.DIST_ELECTRON = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
if (os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win = null;
const preload = path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = path.join(process.env.DIST, "index.html");
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Main window",
    icon: path.join(process.env.PUBLIC, "favicon.ico"),
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
