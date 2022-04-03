<template>
  <div class="page-container">
    <el-container>
      <el-header class="page-header">
        <PageHeader />
      </el-header>
      <el-container>
        <el-aside class="page-aside">
          <PageAside :at="atObjGlobal" v-if="atObjGlobal" />
        </el-aside>
        <el-container>
          <el-main class="page-main">
            <PageMain :at="atObjGlobal" v-if="atObjGlobal" />
          </el-main>
          <!-- <el-footer class="page-footer">Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PageHeader from './PageHeader/PageHeader.vue';
import PageAside from './PageAside/PageAside.vue';
import PageMain from './PageMain/PageMain.vue';
export default {
  name: 'PageContainer',
  components: {
    PageHeader,
    PageAside,
    PageMain,
  },
  data() {
    return {
      atObjGlobal: null,
      atAsideData: {},
      atMainData: {},
    };
  },
  methods: {
    requestJSON() {
      console.log('requestJSON');
      let that = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && this.status === 200) {
          that.atObjGlobal = JSON.parse(xhr.responseText);
          // console.log('requestJSON success', that.atObjGlobal);
          // return JSON.parse(xhr.responseText);
        } else if (xhr.readyState === 4 && this.status !== 200) {
          console.log('请求失败');
        }
      };
      // 请求本地json只允许请求public下的json文件
      xhr.open('GET', '/static/data/data.json', true);
      // xhr.open('GET', 'http://127.0.0.1:8888', true);
      xhr.send();
    },
  },
  created() {
    // console.log('PageContainer created');
    this.requestJSON();
  },
  mounted() {
    // this.handleAsideAtData(this.atObjGlobal);
    // console.log('PageContainer mounted', this.atObjGlobal);
  },
  // watch:{
  //   atObjGlobal(){
  //     this.atObjGlobal = atObjGlobal;
  //   },
  // }
};
</script>

<style scoped>
/* 清除原有样式 */
.el-main {
  height: 100%;
  padding: 0;
}
.page-aside >>> .el-menu {
  border-right: none;
}
.page-container {
  width: 100vw;
  height: 100vh;
  /* background-color: rgb(0, 0, 0); */
}
.page-header {
  width: 100%;
  /* 固定el-header */
  height: 60px;
  position: fixed;
  top: 0;
  border-bottom: solid 1px #dcdfe6;
  z-index: 999;
}
.page-aside {
  width: 250px;
  height: calc(100vh - 60px);
  /* 空出el-header的高度 */
  margin-top: 60px;
  position: fixed;
  left: 0;
  background-color: #fff;
  border-right: solid 1px #dcdfe6;
}
.page-main {
  /* width: 80%; */
  height: 100%;
  /* height: 1000px; */
  /* background-color: rgb(121, 118, 118); */
  /* 空出el-header的高度-由main-router补充设置，这里不设置 */
  position: absolute;
  left: 250px;
}
.page-footer {
  width: 100%;
  /* height: 50px; */
  background-color: rgb(99, 96, 96);
  position: fixed;
  bottom: 0;
  right: 0;
}
/* 去除ele自带边距 */
.el-header {
  padding: 0;
}
</style>
