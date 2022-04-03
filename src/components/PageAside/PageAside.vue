<template>
  <div>
    <el-scrollbar>
      <el-menu>
        <el-menu-item
          v-for="(val, key, idx) in keyObj"
          :key="key"
          :index="idx.toString()"
          @click="handleAsideClick(key)"
        >
          <el-icon><paperclip /></el-icon>
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
    };
  },
  methods: {
    handleAsideClick(key) {
      // console.log('handleAsideClick', key);
      // this.asideAtKey = key;

      // 广播assideClick事件
      // console.log('handleAsideClick', key);
      this.$eventBus.emit('asideClick', key);
    },
  },
  created() {
    // console.log('PageAside created', this.at);
  },
  computed: {
    keyObj: function () {
      let keyItem = {};
      for (let item of Object.values(this.at)) {
        if (keyItem[item.ParentName]) {
          keyItem[item.ParentName]++;
        } else {
          keyItem[item.ParentName] = 1;
        }
        // console.log(item.ParentName);
      }
      // console.log('keyObj', keyItem);
      return keyItem;
    },
  },
  watch: {
    asideAtKey(newVal, oldVal) {
      console.log('asideAtKey', newVal, oldVal);
    },
  },
};
</script>

<style scoped>
/* 清除原有样式 */
/* .el-menu {
  border: 0;
} */
/* .aside-content {
} */
</style>
