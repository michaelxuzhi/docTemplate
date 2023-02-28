<template>
    <div class="show-content">
        <div class="searchHistory" v-show="searchHistoryCnt">
            <el-button
                :size="size"
                class="at-btn-search"
                round
                v-for="(val, key) in searchInfo"
                v-show="+key < 10"
                :key="key"
                @click="handleClick(val, key, true)"
                :icon="val.count >= 5 ? hotIcon : ''"
                >{{
                    val.atDesc
                        ? val.atDesc.length >= 35
                            ? val.atDesc.slice(0, 35) + '...'
                            : val.atDesc
                        : val.renderName
                }}
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
                    'at-btn-disappear': filterAll(
                        val.ParentName,
                        val.ParentName + val.desc + val.name,
                        val.tag
                    ),
                }"
                @click="handleClick(val, key)"
                v-for="(val, key) in atInfoShow"
                :key="key"
                >{{
                    val.desc
                        ? val.desc.length >= 35
                            ? val.desc.slice(0, 35) + '...'
                            : val.desc
                        : val.renderName
                }}</el-button
            >
            <el-tooltip effect="dark" placement="left" content="返回顶部">
                <el-backtop target=".show-content" :visibility-height="20"></el-backtop>
            </el-tooltip>
        </div>
        <div v-show="!atNum">
            <EmptyView />
        </div>
    </div>
</template>
<script>
import EmptyView from '@views/emptyView.vue';
// import { utilsGetLocalStorage, utilsSetLocalStorage } from '@utils/utils.js';
import { mongoDB_config } from '@static/data/requestData.js';
export default {
    name: 'PageShow',
    components: {
        EmptyView,
    },
    data() {
        return {
            url: '',
            size: 'default',
            type: 'primary',
            asideSearchText: '',
            headerSearchText: '',
            atNum: 0,
            globalTheme: false,
            hotIcon: 'flag',
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
        handleClick(val, key, isHistory = false) {
            // console.log(val.atId, key, isHistory);
            // 路由跳转函数
            let that = this;
            function jumpToAtInfo(k, v) {
                that.$router.push({
                    name: 'at',
                    params: { key: k, val: JSON.stringify(val) },
                });
            }
            // 历史记录的点击，请求数据库获取最新值
            if (isHistory) {
                let tempRenderName = val.renderName;
                this.axios.get(`${this.url}/one/${val.atId}`).then(response => {
                    val = response.data[0];
                    val.renderName = tempRenderName;
                    jumpToAtInfo(val);
                    // 新版：处理后传给数据库
                    that.handleSaveSearchRecord(val);
                });
            } else {
                that.handleSaveSearchRecord(val);
                // 拿最新的at数据
                this.axios.get(`${this.url}/one/${val._id}`).then(response => {
                    val = response.data[0];
                    jumpToAtInfo(key, val);
                });
            }

            // console.log(JSON.stringify(val));
            // 旧版：记录历史搜索次数-本地
            // this.handleSearchRecord(key, JSON.stringify(val)); // 这个格式给LRU用
            // this.handleSearchRecord('searchInfo', val);
        },
        // 统计一下界面上的指令数量
        handleCountAtNum() {
            let showNum = document.getElementsByClassName('at-btn').length;
            let unshowNum = document.getElementsByClassName('at-btn-disappear').length;
            this.atNum = showNum - unshowNum;
        },
        // 存储搜索历史到localStorage
        handleSearchRecord(LSkey, LSval) {
            // this.$LRU.set(LSkey, LSval);
            let clickTime = new Date().getTime();
            // console.log(clickTime);
            // utilsSetLocalStorage(LSkey, LSval, clickTime);
        },
        initSearchRecord() {
            // 旧版：从本地读取搜索记录
            // let searchInfo = utilsGetLocalStorage('searchInfo') || {};
            // this.searchHistoryCnt = Object.keys(searchInfo).length;
            // this.searchHistoryInfo = searchInfo;

            this.searchHistoryCnt = this.searchHistoryInfo.length;
            // console.log(this.searchHistoryCnt, this.searchHistoryInfo);
        },

        // 数据库记录指令的点击
        handleSaveSearchRecord(val) {
            // 数据处理
            let finalRecord = {};
            let { _id, renderName, desc } = val;
            let clickTime = new Date().getTime();
            finalRecord = { renderName, clickTime };
            finalRecord.atId = _id;
            finalRecord.atDesc = desc;
            // 请求存入数据库
            this.axios.put(`${this.url}/search/${_id}/in`, finalRecord);
        },

        // 搜索过滤条件-汇总处理
        // filterAll(parentName) {
        //     // (val.ParentName !== asideSearchText && asideSearchText.length) ||
        //     //             ((val.desc + val.name + val.ParentName).indexOf(
        //     //                 headerSearchText
        //     //             ) == -1 &&
        //     //                 headerSearchText.length) ||
        //     //             (val.tag.indexOf(headerSearchText) == -1 &&
        //     //                 headerSearchText.length),
        //     let doFilter = false;
        //     // aside过滤
        //     if (this.asideSearchText.length) {
        //         doFilter = parentName !== this.asideSearchText;
        //     }
        //     return doFilter;
        // },
        filterAll(parentName, mixStr, tags) {
            if (!this.asideSearchText.length && !this.headerSearchText.length) {
                // 提前断路
                return false;
            }
            // let asideFilter = false;
            // let headerFilter = false;
            // let tagFilter = false;
            // // aside过滤
            // if (this.asideSearchText.length) {
            //     asideFilter = parentName !== this.asideSearchText;
            // }
            // // header-搜索过滤
            // if (this.headerSearchText.length) {
            //     // 基础过滤
            //     headerFilter = mixStr.indexOf(this.headerSearchText) == -1;
            // }
            // // tags元素过滤
            // if (this.headerSearchText.length && tags.length) {
            //     // 数组元素拼接成字符串后再进行匹配
            //     let tempStr = tags.join('');
            //     tagFilter = tempStr.indexOf(this.headerSearchText) == -1;
            //     if (!tagFilter && headerFilter) {
            //         headerFilter = false;
            //     } else if (tagFilter && !headerFilter) {
            //         tagFilter = false;
            //     }
            // }
            // return asideFilter || headerFilter || tagFilter;

            // 位运算判断输入匹配状态
            let asideStatus = 0;
            let headerStatus = 0;
            let tagStatus = 0;
            if (this.asideSearchText.length) {
                asideStatus = parentName == this.asideSearchText ? 1 << 0 : 0;
            }
            if (this.headerSearchText.length) {
                headerStatus = mixStr.indexOf(this.headerSearchText) !== -1 ? 1 << 1 : 0;
            }
            if (this.headerSearchText.length && tags.length) {
                // 数组元素拼接成字符串后再进行匹配
                let tempStr = tags.join('');
                tagStatus = tempStr.indexOf(this.headerSearchText) !== -1 ? 1 << 2 : 0;
            }
            if (this.headerSearchText.length) {
                return (
                    (headerStatus | tagStatus) == 0 ||
                    (asideStatus == 0 && this.asideSearchText.length)
                );
            } else {
                return asideStatus == 0;
            }
            // 普通位运算写法：3种情况
            // if (this.headerSearchText.length && !this.asideSearchText.length) {
            //     return (headerStatus | tagStatus) == 0;
            // } else if (this.headerSearchText.length && this.asideSearchText.length) {
            //     return (headerStatus | tagStatus) == 0 || (asideStatus == 0 && this.asideSearchText.length);
            // } else {
            //     return asideStatus == 0;
            // }
        },
    },

    created() {
        // 初始化数据库url
        this.url = mongoDB_config.reqUrl;
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
    },
    mounted() {
        this.handleCountAtNum();
    },
    updated() {
        this.handleCountAtNum();
    },
    activated() {
        // 每次激活show界面，即请求获取最新历史搜索记录
        this.axios.get(`${this.url}/search/`).then(res => {
            this.searchHistoryInfo = res.data;
            // console.log(this.searchHistoryInfo);
            this.initSearchRecord();
        });
        // console.log('PageShow activated');
        // 重置show-content的位置，但是不起效果
        document.getElementsByClassName('show-content')[0].scrollTop = 0;
    },
    computed: {
        atInfoShow() {
            // 增加renderName,保证渲染出来的key的唯一性
            let keyItem = {};
            for (let val of Object.values(this.atInfo)) {
                keyItem[val.name]
                    ? ((keyItem[val.ParentName + val.name] = val),
                      (val.renderName = `${val.ParentName}${val.name}`))
                    : ((keyItem[val.name] = val), (val.renderName = `${val.name}`));
            }
            // console.log(keyItem);
            return keyItem;
        },
        // 从数据库异步获取，用计算属性更新最新值
        searchInfo: {
            get: function () {
                // console.log(this.searchHistoryInfo);
                // todo: 从atInfoShow中获取详情数据
                return this.searchHistoryInfo;
            },
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
