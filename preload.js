const { contextBridge, ipcRenderer } = require('electron');
// 通过 contextBridge 接口定义 全局对象
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 触发主进程的程序
  ping: () => ipcRenderer.invoke('ping'),
  hello: () => ipcRenderer.invoke('hello')
  // 能暴露的不仅仅是函数，我们还可以暴露变量
});
