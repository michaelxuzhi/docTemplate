<template>
  <div class="page-container">
    <el-container>
      <el-header class="page-header">
        <PageHeader />
      </el-header>
      <el-container>
        <el-aside class="page-aside">
          <PageAside />
        </el-aside>
        <el-container>
          <el-main class="page-main">
            <PageMain />
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
// import PageEditor from './PageEditor/PageEditor.vue';
export default {
  name: 'PageContainer',
  components: {
    PageHeader,
    PageAside,
    PageMain,
    // PageEditor,
  },
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
  /* width: 200px; */
  height: calc(100vh - 60px);
  /* 空出el-header的高度 */
  margin-top: 60px;
  position: fixed;
  left: 0;
  background-color: #fff;
  border-right: solid 1px #dcdfe6;
}
.page-main {
  width: 80%;
  height: 100%;
  /* height: 1000px; */
  /* background-color: rgb(121, 118, 118); */
  /* 空出el-header的高度 */
  margin-top: 60px;
  padding-bottom: 100px;
  position: absolute;
  right: 0;
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
