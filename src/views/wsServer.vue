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
            Game: {},
            wsServer: null,
            roomList: [],
        };
    },
    methods: {
        buildWs(args) {
            console.log('buildWs', args);
            // 尝试修改Game的属性，检测是否能够被监听
            // this.gameProxy['id'] = '修改后的id';
            // this.Game['id'] = '修改后的id';
            this.$gameTestObj['id'] = '修改后的id';
            console.log(this.$gameTestObj);
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
            let func = data.msg.func;
            let args = data.msg.args;
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

        // 代理data.Game实现属性监听
        // function gameHandler(target , property){
        //     return function(){
        //         console.log("gameHandler--",property, [...arguments]);
        //         return target[property].call(target, ...arguments);
        //     }
        // };
        let gameTestObj = {
            id: '',
            money: '',
        };
        let gameHandler = {
            get: function (target, property) {
                console.log('gameHandler-get', target, property);
                return target[property];
            },
            set: function (target, property, val) {
                console.log('gameHandler-set', target, property, val);
                target[property] = val;
                return target[property];
            },
        };
        // let gameProxy = new Proxy(this.Game, gameHandler);
        // this.Game = new Proxy(this.Game, gameHandler);
        gameTestObj = new Proxy(gameTestObj, gameHandler);
        // this.Game = gameProxy;
        // this.gameProxy['id'] = 'xu-0130';
        // this.gameProxy['money'] = '99999999';
        gameTestObj['id'] = 'gameTestId';
        gameTestObj['money'] = '88888888';
        this.$gameTestObj = gameTestObj;
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
