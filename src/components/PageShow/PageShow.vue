<template>
  <div class="show-content">
    <div v-show="atNum">
      <el-affix class="showAffix" target=".show-content">
        <el-tag type="success">cnt : {{ atNum }}</el-tag>
      </el-affix>
      <el-button
        color="#4149e0"
        :size="size"
        :type="type"
        round
        plain
        class="at-btn"
        :class="{
          'at-btn-disappear':
            val.ParentName.indexOf(asideSearchText) == -1 ||
            (val.desc + val.name + val.ParentName).indexOf(headerSearchText) == -1,
        }"
        @click="handleClick(val, key)"
        v-for="(val, key) in atInfoShow"
        :key="key"
        >{{ val.desc ? val.desc : key }}</el-button
      >
      <el-backtop target=".show-content" :visibility-height="20"></el-backtop>
    </div>
    <div v-show="!atNum">
      <EmptyView />
    </div>
  </div>
</template>
<script>
import EmptyView from '../../views/emptyView.vue';
export default {
  name: 'PageShow',
  components: {
    EmptyView,
  },
  data() {
    return {
      size: 'default',
      type: 'primary',
      asideSearchText: '',
      headerSearchText: '',
      atNum: 0,
    };
  },
  props: {
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
    // 统计一下界面上的指令数量
    handleCountAtNum() {
      let showNum = document.getElementsByClassName('at-btn').length;
      let unshowNum = document.getElementsByClassName('at-btn-disappear').length;
      this.atNum = showNum - unshowNum;
    },
  },

  created() {
    // 监听来自PageHeader的搜索框handleInput事件
    this.$eventBus.on('headerInputEvent', val => {
      if (val.trim().length === 0) {
        this.headerSearchText = '';
        return;
      }
      this.headerSearchText = val.trim();
      document.getElementsByClassName('show-content')[0].scrollTop = 0;
      this.handleCountAtNum();
    });
    // 监听来自PageAside的assideClick事件
    this.$eventBus.on('asideClick', key => {
      this.asideSearchText = key;
      // 重置showw-content的位置
      document.getElementsByClassName('show-content')[0].scrollTop = 0;
      this.handleCountAtNum();
    });
  },
  mounted() {
    this.handleCountAtNum();
  },
  updated() {
    this.handleCountAtNum();
  },
  computed: {
    atInfoShow() {
      let keyItem = {};
      for (let val of Object.values(this.atInfo)) {
        keyItem[val.name]
          ? (keyItem[val.ParentName + val.name] = val)
          : (keyItem[val.name] = val);
      }
      return keyItem;
    },
  },
};
</script>

<style scoped>
.show-content {
  width: 60%;
  padding: 60px 60px 60px 80px;
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
.showAffix {
  position: absolute;
  left: 0px;
  font-weight: bold;
}
</style>
