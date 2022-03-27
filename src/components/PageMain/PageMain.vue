<template>
  <div>
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'PageMain',
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
</style>
