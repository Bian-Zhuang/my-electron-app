const information = document.getElementById('info');
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

// 从渲染器发送至主进程当中
const func = async () => {
  const response = await versions.ping();
  console.log(response); // 打印
};

func();

const fun = async () => {
  const response = await versions.hello();
  console.log(response); // 打印
};

fun();
