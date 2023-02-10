<template>
    <div class="page-container">
        <el-container>
            <el-header class="page-header">
                <PageHeader @reloadPage="reloadPage" />
            </el-header>
            <el-container>
                <el-aside class="page-aside">
                    <PageAside :at="atDataForAside" v-if="atDataForAside" />
                </el-aside>
                <el-container>
                    <el-main class="page-main">
                        <PageMain :at="atObjGlobal" v-if="atObjGlobal" />
                    </el-main>
                    <!-- <el-footer class="page-footer">Footer</el-footer> -->
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import PageHeader from '@components/PageHeader/PageHeader.vue';
import PageAside from '@components/PageAside/PageAside.vue';
import PageMain from '@components/PageMain/PageMain.vue';
// import { requestURL, reqUrl } from '@static/data/requestData.js';
import { mongoDB_config } from '@static/data/requestData.js';
export default {
    inject: ['reload'],
    name: 'PageContainer',
    components: {
        PageHeader,
        PageAside,
        PageMain,
    },
    data() {
        return {
            atObjGlobal: null,
            atDataForAside: null,
        };
    },
    methods: {
        requestJSON(url) {
            let that = this;
            this.axios.get(url).then(response => {
                // console.log(response.data);
                that.atObjGlobal = response.data;
                that.atDataForAside = that.fmtDataForAside(that.atObjGlobal);
            });
            // this.axios.get(url).then(response => {
            //   that.atObjGlobal = response.data;
            // });
        },
        reloadPage() {
            this.reload();
        },
        // 处理好数据再传给PageAside,不用传整个数据
        fmtDataForAside(atObjGlobal) {
            let tempObj = {};
            for (let item of Object.values(atObjGlobal)) {
                tempObj[item.ParentName]
                    ? tempObj[item.ParentName]++
                    : (tempObj[item.ParentName] = 1);
            }
            // console.log('keyObj', tempObj);
            return tempObj;
        },
    },
    created() {
        // 初始化时，获取请求的url
        // let url = requestURL().atURL;
        let url = mongoDB_config.reqUrl;
        // console.log(url);
        this.requestJSON(url);
    },
    mounted() {},
};
</script>

<style scoped>
/* 清除原有样式 */
.el-main {
    height: 100%;
    padding: 0;
}
:deep(.page-aside .el-menu) {
    border-right: none;
}
/* 去除ele自带边距 */
.el-header {
    padding: 0;
}
.page-container {
    width: 100vw;
    height: 100vh;
    background-color: var(--current-background-color);
    color: var(--current-font-color);
}
.page-header {
    width: 100%;
    /* 固定el-header */
    height: 3.6rem;
    position: fixed;
    top: 0;
    border-bottom: solid 1px #dcdfe6;
    z-index: 999;
}
.page-aside {
    width: 250px;
    height: calc(100vh - 3.6rem);
    /* 空出el-header的高度 */
    margin-top: 3.6rem;
    position: fixed;
    left: 0;
    background-color: var(--current-background-color);
    border-right: solid 1px #dcdfe6;
}
.page-main {
    height: 100%;
    /* 空出el-header的高度-由main-router补充设置，这里不设置 */
    position: absolute;
    left: 250px;
}
.page-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
}
</style>
