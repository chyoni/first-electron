// window.addEventListener("DOMContentLoaded", () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector);
//     if (element) element.innerText = text;
//   };

//   for (const dependency of ["chrome", "node", "electron"]) {
//     replaceText(`${dependency}-version`, process.versions[dependency]);
//   }
// });

const { contextBridge, ipcRenderer } = require("electron");

// ! 이 아래는 아래와 같은 api들을 api key(versions, darkMode...) 를 선언하여 내가 이런 api를 사용하겠다라고 define하는 부분

// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   ping: () => ipcRenderer.invoke("ping"),
// });

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
});

contextBridge.exposeInMainWorld("drag", {
  startDrag: (fileName) => {
    ipcRenderer.send("ondragstart", fileName);
  },
});
