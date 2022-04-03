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
    <el-col :span="7"><div class="header-mid" /></el-col>
    <!-- header右区域 -->
    <el-col :span="14">
      <div class="header-right">
        <el-row>
          <el-col :span="10">
            <div>
              <el-input
                v-model="headerInputText"
                class="header-right-input"
                placeholder="Please Input"
                suffix-icon="Search"
                clearable
                :disabled="isDisabled"
                @input="handleInput"
                @change="handleChange"
              />
            </div>
          </el-col>
          <el-col :span="item.span" v-for="item in navigate_options" :key="item.text">
            <div :class="item.class" v-if="!item.dropdown">
              {{ item.text }}
              <el-icon v-if="item.icon" :size="item.icon.icon_size"> <edit /></el-icon>
            </div>
            <template v-if="item.dropdown">
              <el-dropdown>
                {{ item.text }}
                <el-icon><caret-bottom /></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-for="opt in item.dropdown" :key="opt">{{
                      opt
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import { utilsSearchAt } from '../../utils/utils.js';
export default {
  name: 'PageHeader',
  data() {
    return {
      headerInputText: '',
      isDisabled: false,
      navigate_options: {
        api: {
          text: '物品查询',
          route: '/api',
          span: 3,
          class: '',
          icon: undefined,
        },
        system: {
          text: '测试技巧',
          route: '/system',
          span: 3,
          class: '',
          icon: undefined,
        },
        multilang: {
          text: '多语言切换',
          route: '/multilang',
          span: 4,
          class: '',
          icon: undefined,
          dropdown: {
            action1: 'Action 1',
            action2: 'Action 2',
            action3: 'Action 3',
            action4: 'Action 4',
          },
        },
        document: {
          text: 'Document',
          route: '/document',
          span: 4,
          class: 'right-col',
          icon: {
            icon_name: 'edit',
            icon_size: '16',
          },
        },
      },
    };
  },
  methods: {
    handleInput() {
      // console.log('触发input事件', this.headerInputText);
      // utilsSearchAt(this.headerInputText);
      this.$eventBus.emit('headerInputEvent', this.headerInputText);
    },
    handleChange() {
      // console.log('触发change事件', this.headerInputText);
      // utilsSearchAt(this.headerInputText);
    },
  },
  watch: {
    $route() {
      this.isDisabled = this.$route.name !== 'home';
      this.headerInputText = '';
    },
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
  color: #000;
  font-size: 16px;
  line-height: 2.1rem; /* 稍微提高一下位置 */
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
  background-color: #fff;
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
}
.bg-purple {
  background: #1659a5;
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
  color: rgb(0, 0, 0);
  font-size: 1.2rem;
  font-weight: bold;
}
.header-right-text {
  color: rgb(0, 0, 0);
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}
/* 高度用的是默认的 */
.header-right-input {
  width: 320px;
}
</style>
