<template>
    <div class="main-content">
        <div class="main-bread">
            <el-icon v-show="this.$route.path !== '/'" @click="handleGoBack"
                ><arrow-left-bold
            /></el-icon>
            <el-breadcrumb>
                <el-breadcrumb-item
                    class="breadcrumb-item"
                    v-for="item in bread_list"
                    :key="item"
                    :to="{ path: item.path }"
                    >{{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
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
            icon: 'ArrowLeft',
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
    methods: {
        handleGoBack() {
            this.$router.back();
        },
    },
    created() {
        // 容错：在其他界面刷新，强制回退到home界面
        this.$router.push({ name: 'home' });
    },
    mounted() {
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
    background-color: var(--current-background-color);
    /* background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%); */
}
.main-bread {
    display: flex;
    width: 100%;
    height: 20px;
    padding: 20px;
    position: fixed;
    top: 3.6rem;
    /* 层级提高避免被遮挡 */
    z-index: 999;
    align-items: center;
    background-color: var(--current-background-color);
}
.el-breadcrumb {
    font-size: 16px;
    line-height: 20px;
    color: var(--current-font-color);
}
:deep(.breadcrumb-item .el-breadcrumb__inner) {
    color: var(--current-font-color);
}
:deep(.breadcrumb-item .el-breadcrumb__inner:hover) {
    color: var(--current-font-color);
}

.main-router {
    margin-top: 3.6rem;
}
</style>
