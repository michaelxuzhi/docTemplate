<template>
  <div>
    <el-scrollbar>
      <el-menu :default-active="asideAtKey" class="aside-content">
        <el-menu-item
          :class="isDisabled ? 'aside-item-disabled ' : 'aside-item'"
          v-for="(val, key) in keyObj"
          :key="key"
          :index="key"
          :disabled="isDisabled"
          @click="handleAsideClick(key)"
        >
          <!-- <el-icon><paperclip /></el-icon> -->
          <el-tag class="AsidetagStyle" effect="dark">{{ val }}</el-tag>
          <span>{{ key }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'PageAside',
  props: {
    at: {
      return: {
        type: Object,
        default: {},
      },
    },
  },
  data() {
    return {
      asideAtKey: '',
      isDisabled: false,
    };
  },
  methods: {
    handleAsideClick(key) {
      // console.log('handleAsideClick', key);

      // 广播assideClick事件
      // 重复点击同一个subMenuItem时，发送空字符串并取消选中
      key == this.asideAtKey ? (this.asideAtKey = '') : (this.asideAtKey = key);
      this.$eventBus.emit('asideClick', this.asideAtKey);
    },
  },
  created() {
    // console.log('PageAside created', this.at);
  },
  computed: {
    keyObj: function () {
      let keyItem = {};
      for (let item of Object.values(this.at)) {
        keyItem[item.ParentName]
          ? keyItem[item.ParentName]++
          : (keyItem[item.ParentName] = 1);
        // console.log(item.ParentName);
      }
      // console.log('keyObj', keyItem);
      return keyItem;
    },
  },
  watch: {
    $route() {
      this.isDisabled = this.$route.name !== 'home';
      //   this.asideAtKey = '';
    },
  },
};
</script>

<style scoped>
/* 清除原有样式 */
/* .el-menu {
  border: 0;
} */
.aside-content {
  background-color: var(--current-background-color);
  color: var(--current-aside-font-color);
}
.aside-item {
  color: var(--current-aside-font-color);
}
.aside-item:hover {
  color: var(--current-aside-item-hover-font-color);
}
.aside-item-disabled {
  color: var(--current-aside-font-color);
}
.is-active {
  color: var(--current-background-color);
  background-color: #ecf5ff;
  border-right: 10px solid #7252e7;
}
.AsidetagStyle {
  margin-right: 10px;
}
</style>
