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
      <el-descriptions-item label="短指令" :span="2"
        >{{ atInfo.example }}
        <span style="width: 0; height: 0" id="at_copy_tool"></span>
        <el-button class="desc-btn" type="primary" @click="handleAtShort(atInfo.example)"
          >copy</el-button
        >
      </el-descriptions-item>
      <el-descriptions-item label="通用指令" :span="2"
        >at.ff("{{ atInfo.parent }}/{{ atInfo.name }}",参数)
        <el-button
          class="desc-btn"
          type="primary"
          @click="handleAtCommom(atInfo.parent, atInfo.name)"
          >copy</el-button
        >
      </el-descriptions-item>
      <el-descriptions-item label="长指令" :span="2"
        >prot_$.doSendToServer_$('game.at_admin','on_com_at',['at','{{ atInfo.parent }}/{{
          atInfo.name
        }}','参数'])
        <el-button
          class="desc-btn"
          type="primary"
          @click="handleAtLong(atInfo.parent, atInfo.name)"
          >copy</el-button
        >
      </el-descriptions-item>
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
import { utilsCopy, utilsNotice } from '../../utils/utils.js';
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
    // console.log('PageAt created');
    // this.handleAtInfo(this.atObjGlobal['guild']['detail']['get_list']);
  },
  methods: {
    handleAtInfo(atInfo) {
      this.atInfo = atInfo;
    },
    handleAtShort(at) {
      let flag = this.copyText('at_copy_tool', at);
      if (flag) {
        this.noticeText('success', 'OK', '短指令 复制成功');
      } else {
        this.noticeText('error', 'Fail', '短指令 复制失败');
      }
    },
    handleAtCommom(at1, at2) {
      let atText = `at.ff("${at1}/${at2}",参数)`;
      let flag = this.copyText('at_copy_tool', atText);
      if (flag) {
        this.noticeText('success', 'OK', '通用指令 复制成功');
      } else {
        this.noticeText('error', 'Fail', '通用指令 复制失败');
      }
    },
    handleAtLong(at1, at2) {
      let atText = `prot_$.doSendToServer_$('game.at_admin','on_com_at',['at','${at1}/${at2}','参数'])`;
      let flag = this.copyText('at_copy_tool', atText);
      if (flag) {
        this.noticeText('success', 'OK', '长指令 复制成功');
      } else {
        this.noticeText('error', 'Fail', '长指令 复制失败');
      }
    },

    // 兼容复制
    copyText(dom, text) {
      return utilsCopy(dom, text);
    },
    // 通用提示
    noticeText(type, title, text) {
      utilsNotice(type, title, text);
    },
  },
  mounted() {
    // console.log('PageAt mounted', this.$route.params.atInfo2);
  },
};
</script>
<style scoped>
.at-content {
  width: 70%;
  padding: 60px;
}
.desc-btn {
  float: right;
}
</style>
