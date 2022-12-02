const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Menu,
  MenuItem,
} = require("electron");

const path = require("path");
const fs = require("fs");
const https = require("https");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });

  win.loadFile("index.html");
};

const iconName = path.join(__dirname, "iconForDragAndDrop.png");
const icon = fs.createWriteStream(iconName);
// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(
  path.join(__dirname, "drag-and-drop-1.md"),
  "# First file to test drag and drop"
);
fs.writeFileSync(
  path.join(__dirname, "drag-and-drop-2.md"),
  "# Second file to test drag and drop"
);

https.get("https://img.icons8.com/ios/452/drag-and-drop.png", (response) => {
  response.pipe(icon);
});
ipcMain.on("ondragstart", (event, filePath) => {
  event.sender.startDrag({
    file: path.join(__dirname, filePath),
    icon: iconName,
  });
});
// const menu = new Menu();
// menu.append(
//   new MenuItem({
//     label: "Electron",
//     submenu: [
//       {
//         role: "help",
//         accelerator:
//           process.platform === "darwin" ? "Alt+Cmd+A" : "Alt+Shift+I",
//         click: () => {
//           console.log("Electron rocks!");
//         },
//       },
//     ],
//   })
// );
// Menu.setApplicationMenu(menu);

const dockMenu = Menu.buildFromTemplate([
  {
    label: "New Window",
    click() {
      console.log("New Window");
    },
  },
  {
    label: " New Window with Settings",
    submenu: [{ label: "Basic" }, { label: "Pro" }],
  },
  { label: "New Command..." },
]);

app
  .whenReady()
  .then(() => {
    if (process.platform === "darwin") {
      app.dock.setMenu(dockMenu);
    }
  })
  .then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
