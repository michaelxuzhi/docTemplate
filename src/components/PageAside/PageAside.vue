<template>
    <div>
        <el-scrollbar>
            <el-menu :default-active="asideAtKey" class="aside-content">
                <el-menu-item
                    :class="isDisabled ? 'aside-item-disabled ' : 'aside-item'"
                    v-for="(val, key) in at"
                    :key="key"
                    :index="key"
                    :disabled="isDisabled"
                    @click="handleAsideClick(key)"
                >
                    <!-- <el-icon><paperclip /></el-icon> -->
                    <el-tag class="AsidetagStyle" effect="dark">{{ val }}</el-tag>
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
            isDisabled: false,
        };
    },
    methods: {
        handleAsideClick(key) {
            // 广播assideClick事件
            // 重复点击同一个subMenuItem时，发送空字符串并取消选中
            this.asideAtKey = key == this.asideAtKey ? '' : key;
            this.$eventBus.emit('asideClick', this.asideAtKey);
        },
    },
    created() {
        // 监听header广播的reset事件
        this.$eventBus.on('resetPage', () => {
            this.handleAsideClick(this.asideAtKey);
        });
    },
    computed: {},
    watch: {
        $route() {
            // 非home页面时，禁用aside
            this.isDisabled = this.$route.name !== 'home';
            //   this.asideAtKey = '';
        },
    },
};
</script>

<style scoped>
.aside-content {
    background-color: var(--current-background-color);
    color: var(--current-aside-font-color);
}
.aside-item {
    color: var(--current-aside-font-color);
}
.aside-item:hover {
    color: var(--current-aside-item-hover-font-color);
}
.aside-item-disabled {
    color: var(--current-aside-font-color);
}
.is-active {
    color: var(--current-aside-active-font-color);
    background-color: #ecf5ff;
    border-right: 10px solid #7252e7;
}
.AsidetagStyle {
    margin-right: 10px;
}
</style>
