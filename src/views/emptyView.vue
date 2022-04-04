<template>
  <div>
    <el-empty class="emptyPage" :description="emptyDesc">
      <!-- <el-button type="primary">Button</el-button> -->
    </el-empty>
  </div>
</template>

<script>
export default {
  name: 'emptyView',
  data() {
    return {
      emptyDesc: '搜索不到符合条件的 at指令',
    };
  },
};
</script>

<style scoped>
.emptyPage {
  margin-top: 10%;
}
</style>
