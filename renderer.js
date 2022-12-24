const information = document.querySelector('#info');
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

const setButton = document.querySelector('#setTitle');
const titleInput = document.querySelector('#title');
// 设置标题
setButton.addEventListener('click', () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
});

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  fun();
});

// 文件对话框
const btnFile = document.querySelector('#btnFile');
const filePathElement = document.querySelector('#filePath');
btnFile.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});

// 从渲染器发送至主进程当中
const func = async () => {
  const response = await even.ping();
  console.log(response); // 打印
};

func();

const getInfo = async () => {
  const response = await even.name();
  console.log(response);
};
getInfo();

const fun = async () => {
  const response = await even.hello(666);
  console.log(response); // 打印
};

console.log(window.myAPI.doAThing());

const counter = document.getElementById('counter');

window.electronAPI.handleCounter((event, value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue;
  event.sender.send('counter-value', newValue);
});
