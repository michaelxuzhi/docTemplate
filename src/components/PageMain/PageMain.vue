<template>
  <div>
    <div class="main-bread">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 路由占位符 -->
    <router-view class="main-router" :data1="myname" :at-info="at"></router-view>
  </div>
</template>

<script>
export default {
  name: 'PageMain',
  data() {
    return {
      myname: 'michael',
      ArrowRight: 'ArrowRight',
    };
  },
  props: {
    at: {
      return: {
        type: Object,
        default: {},
      },
    },
  },
  method: {},
  created() {
    console.log('PageMain created');
  },
  mounted() {
    //   let that = this;
    //   console.log('PageMain mounted');
    //   this.axios.get('/static/data/data_.json').then(response => {
    //     that.atObjGlobal = response.data;
    //     console.log('PageMain mounted success', that.atObjGlobal);
    //   });
    // },
  },
};
</script>

<style scoped>
.main-content {
  width: 70%;
  padding-left: 120px;
  padding-right: 120px;
  overflow: hidden;
  /* background-color: rgb(121, 118, 118); */
}
.main-bread {
  width: 60%;
  height: 20px;
  padding: 20px;
  margin-left: 15px;
  position: fixed;
  background-color: #fff;
  /* background-color: rgb(121, 118, 118); */
}
.el-breadcrumb {
  font-size: 16px;
  line-height: 20px;
}
.main-router {
  margin-top: 30px;
}
</style>
