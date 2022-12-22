const information = document.getElementById('info');
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

const setButton = document.querySelector('#setTitle');
const titleInput = document.querySelector('#title');
setButton.addEventListener('click', () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
});

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  fun();
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
  const response = await even.hello();
  console.log(response); // 打印
};

console.log(window.myAPI.doAThing());
