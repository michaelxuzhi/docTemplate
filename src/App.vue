<template>
  <div>
    <PageContainer v-if="isRouterAlive" />
  </div>
</template>

<script>
import PageContainer from '@components/PageContainer.vue';
import { watermark } from '@utils/watermark.js';

export default {
  name: 'App',
  components: {
    PageContainer,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
  mounted() {
    // 测试水印
    // watermark(CON,H,W,R,C,S,O); // 值一一对应
    watermark('测试水印', '100', '200', '-25', '#DCDCDC', '12', '0.1');
  },
  created() {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* background-color: rgb(145, 145, 145); 背景色，开发的时候不那么刺眼 */
}
::-webkit-scrollbar {
  display: none;
}
/* 全局主题样式常量 */
:root[data-theme='dark'] {
  /* 模式切换变量，默认light模式 */
  --current-background-color: var(--dark-background-color);
  --current-font-color: var(--dark-font-color);
  --current-aside-font-color: var(--dark-aside-font-color);
  --current-aside-background-color: var(--dark-aside-background-color);
  --current-aside-item-hover-font-color: var(--dark-aside-item-hover-font-color);
  --current-header-dropdown-font-color: var(--dark-header-dropdown-font-color);
  --current-aside-active-font-color: var(--dark-aside-active-font-color);
  --current-object-bg-color: var(--dark-object-bg-color);
  --current-at-bg-color: var(--dark-at-bg-color);
  --current-at-font-color: var(--dark-at-font-color);
  --current-at-content-bg-color: var(--dark-at-content-bg-color);
  --current-btn-font-color: var(--dark-btn-font-color);

  /* 深色主题 */
  /* --dark-background-color: #282c34; */
  --dark-background-color: #1a1a1a;
  --dark-font-color: #d3d3d3;
  --dark-btn-bg: #409eff;
  --dark-tag-bg: #409eff;

  --dark-btn-font-color: #d3d3d3;

  --dark-aside-font-color: #d3d3d3;
  --dark-aside-background-color: #1a1a1a;
  --dark-aside-item-hover-font-color: #1a1a1a;
  --dark-aside-active-font-color: #1a1a1a;
  --dark-header-dropdown-font-color: #d3d3d3;

  --dark-object-bg-color: #3e3e48;

  --dark-at-bg-color: #3e3e48;
  --dark-at-font-color: #d3d3d3;
  --dark-at-content-bg-color: #949494;
}

:root[data-theme='light'] {
  /* 模式切换变量，默认light模式 */
  --current-background-color: var(--light-background-color);
  --current-at-bg-color: var(--light-at-bg-color);
  --current-btn-font-color: var(--light-btn-font-color);
  --current-aside-font-color: var(--light-aside-font-color);
  --current-aside-item-hover-font-color: var(--light-aside-item-hover-font-color);
  --current-aside-active-font-color: var(--light-aside-active-font-color);
  /* 浅色主题 */
  --light-background-color: #fff;
  --light-at-bg-color: #f5f7fa;
  --light-btn-font-color: #4149e0;

  --light-aside-font-color: #1a1a1a;
  --light-aside-item-hover-font-color: #1a1a1a;
  --light-aside-active-font-color: #1a1a1a;
}
</style>
