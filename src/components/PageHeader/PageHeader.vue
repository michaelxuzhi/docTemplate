<template>
  <el-row class="header-content">
    <!-- header左区域 -->
    <el-col :span="3"
      ><div class="header-left">
        <el-row>
          <el-col :span="8">
            <div class="header-left-img" />
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
    <el-col :span="8"><div class="header-mid" /></el-col>
    <!-- header右区域 -->
    <el-col :span="12">
      <div class="header-right">
        <el-row>
          <el-col :span="8">
            <div>
              <el-input
                class="header-right-input"
                placeholder="Please Input"
                suffix-icon="Search"
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
          <!-- <el-col :span="3">
            <div>{{ Api }}</div>
          </el-col>
          <el-col :span="3">
            <div>生态系统</div>
          </el-col>
          <el-col :span="3">
            <el-dropdown>
              多语言
              <el-icon><caret-bottom /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item disabled>Action 4</el-dropdown-item>
                  <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
          <el-col :span="3">
            <div>Github</div>
          </el-col>
          <el-col :span="4">
            <div class="right-col">
              Document <el-icon :size="16"> <edit /></el-icon>
            </div>
          </el-col> -->
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'PageHeader',
  data() {
    return {
      navigate_options: {
        api: {
          text: 'API参考',
          route: '/api',
          span: 3,
          class: '',
          icon: undefined,
        },
        system: {
          text: '生态系统',
          route: '/system',
          span: 3,
          class: '',
          icon: undefined,
        },
        multilang: {
          text: '多语言',
          route: '/multilang',
          span: 3,
          class: '',
          icon: undefined,
          dropdown: {
            action1: 'Action 1',
            action2: 'Action 2',
            action3: 'Action 3',
            action4: 'Action 4',
          },
        },
        github: {
          text: 'Github',
          route: '/github',
          span: 3,
          class: '',
          icon: undefined,
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
.header-left-img {
  height: 100%;
  background: url('../../assets/flower_std_128.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 15px; /* logo向右移动，微调 */
}
.header-left-text {
  color: rgb(0, 0, 0);
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}
/* 高度用的是默认的 */
.header-right-input {
  width: 230px;
}
</style>
