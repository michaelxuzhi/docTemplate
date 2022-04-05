<template>
  <div class="main-content">
    <div class="main-bread">
      <el-tooltip
        effect="dark"
        content="点击此处返回"
        placement="left-start"
        :visible="this.$route.path !== '/'"
      >
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
            v-for="item in bread_list"
            :key="item"
            :to="{ path: item.path }"
            >{{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-tooltip>
    </div>
    <!-- 路由占位符 -->
    <router-view
      class="main-router"
      :at-info="this.$route.name == 'home' ? at : ''"
      v-slot="{ Component }"
    >
      <keep-alive :include="aliveCompsList">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'PageMain',
  data() {
    return {
      ArrowRight: 'ArrowRight',
      bread_list: [],
      aliveCompsList: ['PageShow'],
    };
  },
  props: {
    at: {
      return: {
        type: Object,
        default: {},
      },
    },
  },
  methods: {},
  created() {
    this.$router.push({ name: 'home' });
  },
  mounted() {
    // 容错：在其他界面刷新，强制回退到home界面
    this.bread_list = [];
    this.bread_list.push({ name: '首页', path: '/' });
  },
  watch: {
    $route() {
      if (this.$route.meta[0] == this.bread_list[this.bread_list.length - 1].name) {
        return;
      }
      let index = this.bread_list.indexOf(
        this.bread_list.filter(item => item.name == this.$route.meta[0])[0]
      );
      if (index != -1) {
        this.bread_list.splice(index);
        if (this.bread_list.length == 0) {
          this.bread_list.push({ name: '首页', path: '/' });
        } else {
          this.bread_list.push({
            name: this.$route.meta[0],
            path: this.$route.path,
          });
        }
      } else {
        this.bread_list.push({
          name: this.$route.meta[0],
          path: this.$route.path,
        });
      }
      // 将当前页面的组件名加入kee-alive动态缓存列表，无限地加，然后根据面包屑导航长度来决定最终缓存
      let compsName = this.$route.matched.map(item => item.components.default.name);
      this.aliveCompsList.push(...compsName);
      this.aliveCompsList.splice(this.bread_list.length);
    },
  },
};
</script>

<style scoped>
.main-content {
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  /* background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%); */
}
.main-bread {
  width: 100%;
  height: 20px;
  padding: 20px;
  position: fixed;
  top: 3.6rem;
  background-color: #fff;
  /* 层级提高避免被遮挡 */
  z-index: 999;
  /* background-color: rgb(121, 118, 118); */
}
.el-breadcrumb {
  font-size: 16px;
  line-height: 20px;
}
.main-router {
  margin-top: 3.6rem;
}
</style>
