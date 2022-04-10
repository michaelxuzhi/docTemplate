<template>
  <div class="page-container">
    <el-container>
      <el-header class="page-header">
        <PageHeader @reloadPage="reloadPage" />
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
import { requestData } from '../../public/static/data/requestData.js';
export default {
  inject: ['reload'],
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
    requestJSON(url) {
      // console.log('requestJSON');
      let that = this;
      this.axios.get(url).then(response => {
        that.atObjGlobal = response.data;
        // console.log(response);
      });
    },
    reloadPage() {
      // console.log('reloadPage');
      this.reload();
    },
  },
  created() {
    // console.log('PageContainer created');
    // 初始化时，获取请求的url
    let requestURL = requestData().url;
    this.requestJSON(requestURL);
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
:deep(.page-aside .el-menu) {
  border-right: none;
}
/* 去除ele自带边距 */
.el-header {
  padding: 0;
}
.page-container {
  width: 100vw;
  height: 100vh;
  /* background-color: rgb(0, 0, 0); */
  background-color: var(--current-background-color);
  color: var(--current-font-color);
}
.page-header {
  width: 100%;
  /* 固定el-header */
  height: 3.6rem;
  position: fixed;
  top: 0;
  border-bottom: solid 1px #dcdfe6;
  z-index: 999;
}
.page-aside {
  width: 250px;
  height: calc(100vh - 3.6rem);
  /* 空出el-header的高度 */
  margin-top: 3.6rem;
  position: fixed;
  left: 0;
  background-color: var(--current-background-color);
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
  /* background-color: rgb(99, 96, 96); */
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
