console.log(process.platform);

// app模块 控制应用程序的事件生命周期
// BrowserWindow模块 创建和管理应用程序 窗口
const { app, BrowserWindow } = require('electron');
const path = require('path');

// 将index.html加载进一个新的BrowserWindow实例
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // 将脚本附加到渲染器
    webPreferences: {
      // __dirname 指向当前正在执行脚本的路径
      // path.join 将多个路径联结在一起，创建一个跨平台的路径字符串
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // 打开调试工具
  win.webContents.openDevTools();
  win.loadFile('index.html');
};

// 调用createWindow()函数来打开您的窗口
// 只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.whenReady().then(() => {
  createWindow();

  // 如果没有任何浏览器窗口是打开的
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口时退出应用
app.on('window-all-closed', () => {
  // 除了 macOS 外，当所有窗口都被关闭的时候退出程序
  if (process.platform !== 'darwin') app.quit();
});
