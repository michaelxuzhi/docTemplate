<template>
  <div id="child" class="iframe-content">
    <!-- <iframe class="iframe-web" src="https://www.bilibili.com/" frameborder="0"></iframe> -->
    <el-button @click="openSonPage">open</el-button>
    <el-button @click="sendToSonPage">send</el-button>
  </div>
</template>
<script>
export default {
  name: 'iframeView',
  data() {
    return {
      msg: 'iframeView',
      newPage: null,
    };
  },
  methods: {
    openSonPage() {
      // let newPage = window.open('../../static/staticHtml/sonPage.html', 'newSonPage');
      let newPage = window.open('https://w6.game.163.com/game/', 'newSonPage');
      console.log(newPage);
      newPage.onload = function () {
        // newPage.postMessage(`发给子页面的数据`, '*');
        this.newPage = newPage;
        console.log('newPage', this.newPage);
      };
      this.newPage = newPage;
    },
    sendToSonPage() {
      // window.postMessage('iframePage', '*');
      // let msg = { func: 'doThings', args: ['iframe页面-from'] };
      // this.newPage.postMessage(JSON.stringify(msg), '*');
      this.newPage.at.get();
      // console.log('newPage', this.newPage);
    },
  },
  mouted() {},
  created() {
    // 父级页面接收消息
    // window.addEventListener('message', e => {
    //   console.log('收到消息', e.data);
    // });
  },
};
</script>

<style scoped>
.iframe-content {
  width: 60%;
  padding: 60px 60px 60px 80px;
  height: 80%;
  /* background-color: #000; */
  /* overflow-x: hidden; */
}
.iframe-web {
  width: 100%;
  height: 100%;
}
</style>
