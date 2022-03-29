<template>
  <div class="at-content">
    <el-descriptions
      :title="atInfo.name"
      :column="1"
      :size="size"
      direction="horizontal"
      border
    >
      >
      <el-descriptions-item v-for="(val, key) in atInfo" :key="key" :label="key">{{
        val
      }}</el-descriptions-item>
      <el-descriptions-item label="短指令" :span="2">{{
        atInfo.example
      }}</el-descriptions-item>
      <el-descriptions-item label="通用指令" :span="2"
        >at.ff("{{ atInfo.parent }}/{{ atInfo.name }}",参数)</el-descriptions-item
      >
      <el-descriptions-item label="长指令" :span="2"
        >prot_$.doSendToServer_$('game.at_admin','on_com_at',['at','{{ atInfo.parent }}/{{
          atInfo.name
        }}','参数'])</el-descriptions-item
      >
      <!-- <el-descriptions-item label="Remarks"> -->
      <!-- <el-tag size="default">School</el-tag> -->
      <!-- </el-descriptions-item> -->
      <!-- <el-descriptions-item label="Address" -->
      <!-- >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province -->
      <!-- </el-descriptions-item> -->
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'PageAt',
  data() {
    return {
      // 定义一个全局变量来存请求到的指令数据
      atObjGlobal: null,
      size: 'large',
      atInfo: {
        desc: '获取同盟列表',
        example: 'at.guild.get_list()',
        name: 'get_list',
        params: '参数1 当前页数 参数2 每页数量',
        parent: 'guild',
      },
    };
  },
  created() {
    console.log('PageAt created');
    // this.handleAtInfo(this.atObjGlobal['guild']['detail']['get_list']);
  },
  methods: {
    handleAtInfo(atInfo) {
      this.atInfo = atInfo;
    },
    // getattr的自实现
    getattr(obj, attr, defalut) {
      if (Object.hasOwnProperty.call(obj, attr)) {
        return obj[attr];
      }
      return defalut;
    },
  },
  mounted() {
    console.log('PageAt mounted', this.$route.params);
  },
};
</script>
<style scoped>
.at-content {
  width: 70%;
  padding: 60px;
}
</style>
