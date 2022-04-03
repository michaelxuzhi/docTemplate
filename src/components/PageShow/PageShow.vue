<template>
  <div class="show-content">
    <!-- {{ atInfo1 }} -->
    <el-button
      color="#4149e0"
      :size="size"
      :type="type"
      round
      plain
      class="at-btn"
      :class="{
        'at-btn-disappear':
          (val.desc + val.name + val.ParentName).indexOf(asideSearchText) == -1 ||
          (val.desc + val.name + val.ParentName).indexOf(headerSearchText) == -1,
      }"
      @click="handleClick(val, key)"
      v-for="(val, key) in atInfoShow"
      :key="key"
      >{{ val.desc ? val.desc : key }}</el-button
    >
    <el-backtop target=".show-content" :visibility-height="20"></el-backtop>
  </div>
</template>
<script>
export default {
  name: 'PageShow',
  data() {
    return {
      size: 'default',
      type: 'primary',
      asideSearchText: '',
      headerSearchText: '',
    };
  },
  props: {
    data1: {
      return: {
        type: String,
        default: '',
      },
    },
    atInfo: {
      return: {
        type: Object,
        default: {},
      },
    },
  },
  methods: {
    handleClick(val, key) {
      this.$router.push({
        name: 'at',
        params: { key: key, val: JSON.stringify(val) },
      });
    },
  },

  created() {
    // 监听来自PageHeader的搜索框handleInput事件
    this.$eventBus.on('headerInputEvent', val => {
      this.headerSearchText = val;
    });
    // 监听来自PageAside的assideClick事件
    this.$eventBus.on('asideClick', key => {
      this.asideSearchText = key;
      // 重置showw-content的位置
      document.getElementsByClassName('show-content')[0].scrollTop = 0;
    });
  },
  mounted() {},
  computed: {
    atInfoShow() {
      let keyItem = {};
      for (let val of Object.values(this.atInfo)) {
        keyItem[val.name] = val;
      }
      return keyItem;
    },
  },
};
</script>

<style scoped>
.show-content {
  width: 60%;
  padding: 60px;
  height: 80%;
  overflow-x: hidden;
}
.at-btn {
  padding: 15px;
  margin: 10px;
  font-size: 16px;
}
.at-btn-disappear {
  display: none;
}
</style>
