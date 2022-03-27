<template>
  <el-row class="header-content">
    <!-- header左区域 -->
    <el-col :span="2"
      ><div class="header-left">
        <el-row>
          <el-col :span="8">
            <div class="header-left-img" />
          </el-col>
          <el-col :span="16">
            <div class="header-left-text">
              <text>Vue.js</text>
            </div>
          </el-col>
        </el-row>
      </div></el-col
    >
    <!-- header中区域 -->
    <el-col :span="10"><div class="header-mid" /></el-col>
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
          <el-col :span="3">
            <div>API参考</div>
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
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'PageHeader',
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
  background: url('../../assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
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
