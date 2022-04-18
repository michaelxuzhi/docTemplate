import io from "socket.io-client";
const socket = io("http://localhost:3000", {
  query: {},
  // transports: ["websocket", "polling"],
  transports: ["websocket"],
  // timeout: 5000,
  autoConnect: false, //关闭自动连接，在用户登录后在连接。
});
//添加socket事件监听
// socket.on("welcome", (data) => {
//   console.log(data);
// });
export default socket;
