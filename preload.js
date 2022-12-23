const { contextBridge, ipcRenderer } = require('electron');
// 通过 contextBridge 接口定义 全局对象
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 能暴露的不仅仅是函数，我们还可以暴露变量
});

contextBridge.exposeInMainWorld('even', {
  // 触发主进程的程序
  ping: () => ipcRenderer.invoke('ping'),
  hello: (num) => ipcRenderer.invoke('hello', num),
  name: () => ipcRenderer.invoke('name'),
});

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => ({}),
});

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
});

// 双向通信
ipcRenderer.on('asynchronous-reply', (_event, arg) => {
  console.log(arg); // 在 DevTools 控制台中打印“pong”
});
ipcRenderer.send('asynchronous-message', 'ping');
