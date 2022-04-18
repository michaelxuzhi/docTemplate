<template>
  <div class="wsServer-content">
    <div class="son-title">websocket</div>
    <!-- <div class="son-content">子内容</div> -->
    <el-button @click="login">登录</el-button>
    <el-button @click="sendWsMsg">sendMsg</el-button>
    <el-button @click="logout">退出</el-button>
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
    };
  },
  methods: {
    buildWs() {
      console.log('ws');
    },
    sendWsMsg() {
      console.log('send');
    },
    login() {
      // this.logout();
      this.$socket.connect();
      console.log('login');
      this.$socket.emit('login', 'login-objectView');
    },
    logout() {
      if (this.$socket) {
        this.$socket.disconnect();
        console.log('logout');
        return;
      }
      console.log('暂无连接');
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
