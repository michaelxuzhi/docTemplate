<template>
  <el-row class="header-content">
    <!-- header左区域 -->
    <el-col :span="3"
      ><div class="header-left">
        <el-row>
          <el-col :span="6">
            <div class="header-left-img-zone">
              <img
                class="header-left-img"
                src="../../assets/flower_std_128.png"
                alt="logo"
              />
            </div>
          </el-col>
          <el-col :span="16">
            <div class="header-left-text">
              <text>W6 指令平台</text>
            </div>
          </el-col>
        </el-row>
      </div></el-col
    >
    <!-- header中区域 -->
    <el-col :span="6"
      ><div class="header-mid">
        <el-button @click="reloadPage" :icon="RefreshRight">reload</el-button>
        <el-button @click="resetPage" :icon="Refresh" :disabled="this.$route.path !== '/'"
          >reset</el-button
        >
      </div></el-col
    >
    <!-- header右区域 -->
    <el-col :span="15">
      <div class="header-right">
        <el-row>
          <el-col :span="9">
            <div>
              <el-tooltip
                effect="dark"
                :content="inputTips"
                placement="bottom"
                :visible="inputTipsVisible"
              >
                <el-input
                  v-model="headerInputText"
                  class="header-right-input"
                  :placeholder="inputHolder"
                  suffix-icon="Search"
                  clearable
                  :disabled="isDisabled"
                  @input="handleInput"
                  @focus="handleFocus"
                  @blur="handleBlur"
                >
                </el-input>
              </el-tooltip>
            </div>
          </el-col>
          <!-- header选项区域 -->
          <el-col :span="item.span" v-for="item in navigate_options" :key="item.text">
            <div
              :class="item.class"
              v-if="!item.dropdown"
              @click="headerOptClick(item.route)"
            >
              {{ item.text }}
              <el-icon v-if="item.icon" :size="item.icon.icon_size">
                <component :is="item.icon.icon_name"
              /></el-icon>
            </div>
            <template v-if="item.dropdown">
              <el-dropdown class="header-dropdown" @command="handleDropdownItemClick">
                {{ item.text }}
                <el-icon><caret-bottom /></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="opt in item.dropdown"
                      :key="opt"
                      :command="opt.command"
                      >{{ opt.text }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-col>
          <!-- 模式选择开关 -->
          <el-col :span="2">
            <el-tooltip effect="dark" content="Beta功能" placement="right">
              <el-switch
                v-model="switchVal"
                inline-prompt
                style="float: right"
                active-color="#d77658"
                inactive-color="#8cd383"
                :active-icon="Check"
                :inactive-icon="Close"
                @change="handleSwitchChange"
              />
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { headerData } from '@static/data/headerData.js';
import { utilsNotice } from '@utils/utils.js';
export default {
  name: 'PageHeader',
  data() {
    return {
      inputHolder: '请输入关键字',
      headerInputText: '',
      isDisabled: false,
      inputTipsVisible: false,
      inputTips: '匹配: 指令名 | 描述 | 指令父文件夹',
      switchVal: false,
      Check: 'sunny',
      Close: 'moon',
      RefreshRight: 'refresh-right',
      Refresh: 'refresh',
      navigate_options: {},
    };
  },
  methods: {
    handleInput() {
      this.$eventBus.emit('headerInputEvent', this.headerInputText);
    },
    handleFocus() {
      this.inputTipsVisible = true;
    },
    handleBlur() {
      this.inputTipsVisible = false;
    },
    headerOptClick(route) {
      this.$router.push({ name: route });
    },
    handleSwitchChange() {
      if (this.switchVal == true) {
        window.document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        window.document.documentElement.setAttribute('data-theme', 'light');
      }
      this.broadcastTheme();
    },
    handleDropdownItemClick(command) {
      // this.$router.push({ name: command });
      console.log('command:', command);
      // let newPage = window.open(command, 'newBaidu');
      let newPage = window.open('../../static/staticHtml/sonPage.html', 'newSonPage');
      newPage.onload = function () {
        newPage.postMessage('发给子页面的数据', '*');
      };
    },
    reloadPage() {
      this.switchVal = false;
      this.handleSwitchChange();
      this.$emit('reloadPage');
    },
    resetPage() {
      this.headerInputText = '';
      this.handleInput();
      this.$eventBus.emit('resetPage', true);
      utilsNotice('success', '页面重置', '筛选条件已清除');
    },
    broadcastTheme() {
      this.$eventBus.emit('themeChange', this.switchVal);
    },
  },
  mouted() {},
  watch: {
    $route() {
      this.isDisabled = this.$route.name !== 'home';
      // this.headerInputText = '';
    },
  },
  created() {
    // 加载headerData
    this.navigate_options = headerData();
    // 初始化时设置主题
    this.handleSwitchChange();
  },
};
</script>

<style scoped>
/* 原样式修改 */
.el-row,
.el-col {
  height: 100%;
}
.el-icon {
  padding: 0;
  margin: 0;
  padding-bottom: 2px;
  vertical-align: middle;
}
.el-dropdown {
  font-size: 16px;
  line-height: 2.1rem; /* 稍微提高一下位置 */
  color: var(--current-header-dropdown-font-color);
}

/* 右区域通用icon调整样式 */
.right-icon-margin {
  margin-left: 0.5rem;
}
/* 自定样式区域 */
.header-content {
  width: 100%;
  height: 100%;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
  background-color: var(--current-background-color);
  color: var(--current-font-color);
}
.header-left {
  height: 100%;
}
.header-mid {
  height: 100%;
}
.header-right {
  /* height: 100%; */
  text-align: center;
  font-size: 16px;
}
.header-left-img-zone {
  height: 100%;
  width: 100%;
  /* background: url('../../assets/flower_std_128.png'); */
  /* margin-left: 15px; logo向右移动，微调 */
  /* margin-left: 15px; */
  /* float: right; */
}
.header-left-img {
  height: 100%;
  display: inline;
  float: right;
  margin-right: 10px;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.header-left-text {
  font-size: 16px;
  font-weight: bold;
}
.header-right .right-col:hover {
  cursor: pointer;
}
.header-right-text {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
/* 高度用的是默认的 */
.header-right-input {
  width: 320px;
}
</style>
