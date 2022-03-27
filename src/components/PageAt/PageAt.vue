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
      <!-- <el-descriptions-item label="Username">kooriookami</el-descriptions-item> -->
      <!-- <el-descriptions-item label="Telephone">18100000000</el-descriptions-item> -->
      <!-- <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item> -->
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
    this.requestJSON();
    // this.handleAtInfo(this.atObjGlobal['guild']['detail']['get_list']);
  },
  methods: {
    // 发送请求，获取json格式数据
    async requestJSON() {
      console.log('requestJSON');
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && this.status === 200) {
          this.atObjGlobal = JSON.parse(xhr.responseText);
          //   getAtNum(atObjGlobal);
          //   renderAtList(atObjGlobal);
          console.log(this.atObjGlobal);
        } else if (xhr.readyState === 4 && this.status !== 200) {
          console.log('请求失败');
        }
      };
      // 请求本地json只允许请求public下的json文件
      xhr.open('GET', '/static/data/data_.json', true);
      // xhr.open('GET', 'http://127.0.0.1:8888', true);
      xhr.send();
    },
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
    // 获取指令数量
    getAtNum(atObj) {
      // console.log(atObj);
      let atNum = 0;
      for (const key in atObj) {
        if (Object.hasOwnProperty.call(atObj, key)) {
          // let detail = atObj[key]['detail'];
          // atNum += Object.keys(detail).length;
          // 缺少指令detail的情况下的健壮性
          let detail = this.getattr(atObj[key], 'detail', null);
          detail && (atNum += Object.keys(detail).length);
        }
      }
      // return atNum;
      this.renderAtNum(atNum);
    },
    // 指令数量渲染
    renderAtNum(num) {
      console.log('renderAt', num);
      return;
    },
  },
};
</script>
<style scoped>
.at-content {
  width: 70%;
  padding: 60px;
}
</style>
