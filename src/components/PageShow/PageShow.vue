<template>
  <div class="show-content">
    <div class="searchHistory" v-show="searchHistoryCnt">
      <el-button
        :size="size"
        class="at-btn-search"
        round
        v-for="item in searchHistoryInfo"
        :key="item"
        @click="handleClick(item, item.name)"
        >{{ item.desc }}
      </el-button>
    </div>
    <el-affix class="showAffix" target=".show-content">
      <el-tag type="success">cnt : {{ atNum }}</el-tag>
    </el-affix>
    <div v-show="atNum">
      <el-button
        :color="globalTheme ? '#686877' : '#4149e0'"
        :size="size"
        :type="type"
        round
        :plain="!globalTheme"
        class="at-btn"
        :class="{
          'at-btn-disappear':
            (val.ParentName !== asideSearchText && asideSearchText.length) ||
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
import {
  utilsGetLocalStorage,
  utilsSetLocalStorage,
  utilsSearchInfoSort,
} from '../../utils/utils.js';
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
      globalTheme: false,
      searchHistoryCnt: 0,
      searchHistoryInfo: {},
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
      // 记录历史搜索次数
      this.handleSearchRecord(key, val);
    },
    // 统计一下界面上的指令数量
    handleCountAtNum() {
      let showNum = document.getElementsByClassName('at-btn').length;
      let unshowNum = document.getElementsByClassName('at-btn-disappear').length;
      this.atNum = showNum - unshowNum;
    },
    // 存储搜索历史到localStorage
    handleSearchRecord(key, val) {
      let searchInfo = utilsGetLocalStorage('searchInfo');
      searchInfo[key]
        ? searchInfo[key]['cnt']++
        : ((searchInfo[key] = {}), (searchInfo[key] = val), (searchInfo[key]['cnt'] = 1));
      utilsSetLocalStorage('searchInfo', JSON.stringify(searchInfo));
    },
    initSearchRecord() {
      let searchInfo = utilsGetLocalStorage('searchInfo');
      this.searchHistoryCnt = Object.keys(searchInfo).length;
      // 如果有搜索记录，则进行排序
      this.searchHistoryCnt && (this.searchHistoryInfo = utilsSearchInfoSort(searchInfo));
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
      // 重置show-content的位置
      document.getElementsByClassName('show-content')[0].scrollTop = 0;
      this.handleCountAtNum();
    });
    // 监听PageHeader的themeChange事件，改变全局主题
    this.$eventBus.on('themeChange', val => {
      this.globalTheme = val;
    });
    // 初始化的时候，获取历史搜索记录
    this.initSearchRecord();
  },
  mounted() {
    this.handleCountAtNum();
  },
  updated() {
    this.handleCountAtNum();
  },
  activated() {
    this.initSearchRecord();
    // 重置showw-content的位置，但是不起效果
    document.getElementsByClassName('show-content')[0].scrollTop = 0;
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
  /* color: var(--current-btn-font-color); */
}
.at-btn-disappear {
  display: none;
}
.showAffix {
  position: absolute;
  left: 0px;
  font-weight: bold;
}
.searchHistory {
  /* position: absolute; */
  /* height: 60px; */
  width: 100%;
  /* background-color: #8d2323; */
}
.at-btn-search {
  padding: 15px;
  margin: 10px;
  font-size: 16px;
  /* color: var(--current-btn-font-color); */
}
</style>
