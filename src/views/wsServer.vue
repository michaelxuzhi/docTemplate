<template>
	<div class="wsServer-content">
		<div class="son-title">websocket</div>
		<!-- <div class="son-content">子内容</div> -->
		<el-button @click="login">登录</el-button>
		<el-button @click="createRoom('299-443210')">创建房间</el-button>
		<el-button @click="joinRoom('299-443210')">加入房间</el-button>
		<el-button @click="sendMsg('按钮send')">发送房间消息</el-button>
		<el-button @click="logout">退出</el-button>
		<el-button @click="hijackConsole">劫持</el-button>
		<el-button @click="dotest">dotest</el-button>
	</div>
</template>

<script>
import socket from '@utils/io.js';
import app from '@/main.js';
export default {
	name: 'wsServer',
	data() {
		return {
			wsServer: null,
			roomList: [],
		};
	},
	methods: {
		buildWs(args) {
			console.log('buildWs', args);
		},
		createRoom(roomID) {
			console.log('创建room', roomID);
			this.roomList.push(roomID);
			this.$socket.emit('createRoom', roomID);
		},
		joinRoom(roomID) {
			console.log('加入room', roomID);
			this.roomList.push(roomID);
			this.$socket.emit('joinRoom', roomID);
		},
		sendMsg(msg) {
			console.log('发送消息', msg);
			this.$socket.emit('sendMsg', {
				roomID: this.roomList[0],
				msg,
			});
		},
		recvMsg(data) {
			console.log('接收到消息', data);
			let func = data.func;
			let args = data.args;
			// console.log('this', data);
			this[func](args);
		},
		login() {
			// this.logout();
			this.$socket.connect();
			this.$socket.emit('login', 'login-objectView');
			console.log('login');
		},
		logout() {
			if (this.$socket) {
				this.$socket.disconnect();
				console.log('logout');
				return;
			}
			console.log('暂无连接');
		},
		dotest() {
			console.log('nihao,这里是dotest');
		},
		hijackConsole() {
			let _con = console.log;
			let self = this;
			// let _send = this.sendMsg;
			function dosth(msg = 'good', ...args) {
				self.$socket.emit('sendMsg', {
					roomID: self.roomList[0],
					msg,
					otherArgs: args,
				});
				// console.warn(msg);
				_con(msg);
			}
			console.log = dosth;
		},
	},
	created() {
		app.config.globalProperties.$socket = socket;
	},
	mounted() {
		// 配套写法，先移除监听，再添加监听，是兼容vue的刷新仍走该界面生命周期逻辑（可能是keep-alive的问题）
		this.$socket.removeListener('welcome');
		this.$socket.on('welcome', data => {
			console.log('welcome', data);
		});
		this.$socket.removeListener('recvMsg');
		this.$socket.on('recvMsg', data => {
			this.recvMsg(data);
		});
	},
};
</script>

<style scoped>
.wsServer-content {
	width: 60%;
	padding: 60px 60px 60px 80px;
	height: 80%;
	overflow-x: hidden;
}
.son-title {
	font-size: 20px;
	font-weight: bold;
	color: #333;
	margin-bottom: 20px;
}
.son-content {
	font-size: 16px;
	color: #666;
	line-height: 30px;
}
</style>
