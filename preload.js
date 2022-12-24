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
  // 设置标题
  setTitle: (title) => ipcRenderer.send('set-title', title),
  // 文件对话框
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  // 主进程到渲染器进程
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
});

// 双向通信
ipcRenderer.on('asynchronous-reply', (_event, arg) => {
  console.log(arg); // 在 DevTools 控制台中打印“pong”
});
ipcRenderer.send('asynchronous-message', 'ping');

//  向主进程发送消息，并 同步 等待响应。
const result = ipcRenderer.sendSync('synchronous-message', 'ping');
console.log(result); // 在 DevTools 控制台中打印“pong”
