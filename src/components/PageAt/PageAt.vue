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
      <el-descriptions-item label="短指令" :span="2">
        {{ handleAtShort(atInfo.ParentName, atInfo.name) }}
        <span style="width: 0; height: 0" id="at_copy_tool"></span>
        <el-button class="desc-btn" ol="12" type="primary" @click="handleCopy(1)"
          >copy</el-button
        >
      </el-descriptions-item>
      <el-descriptions-item label="通用指令" :span="2"
        >{{ handleAtCommom(atInfo.ParentName, atInfo.name) }}
        <el-button class="desc-btn" type="primary" @click="handleCopy(2)">copy</el-button>
      </el-descriptions-item>
      <el-descriptions-item label="长指令" :span="2"
        >{{ handleAtLong(atInfo.ParentName, atInfo.name) }}
        <el-button class="desc-btn" type="primary" @click="handleCopy(3)">copy</el-button>
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
      size: 'large',
      atName: '',
      atInfo: {},
      shortAtCmd: '',
      commonShortAtCmd: '',
      longAtCmd: '',
      noticeObj: {
        1: '短指令',
        2: '通用指令',
        3: '长指令',
      },
    };
  },
  created() {
    // console.log('PageAt created');
  },
  methods: {
    handleAtShort(atParent, atName) {
      // 处理短指令
      if (atParent == 'at') {
        this.shortAtCmd = `at.${atName}()`;
        return this.shortAtCmd;
      }
      this.shortAtCmd = `at.${atParent}.${atName}()`;
      return this.shortAtCmd;
    },
    handleAtCommom(atParent, atName) {
      // 处理通用短指令
      if (atParent == 'at') {
        this.commonShortAtCmd = `at.ff('${atName}','参数')`;
        return this.commonShortAtCmd;
      }
      this.commonShortAtCmd = `at.ff('${atParent}/${atName}','参数')`;
      return this.commonShortAtCmd;
    },
    handleAtLong(atParent, atName) {
      // 处理长指令
      let cmd = `prot_$.doSendToServer_$('game.at_admin','on_com_at',['at',`;
      if (atParent == 'at') {
        this.longAtCmd = `${cmd}'${atName}','参数'])`;
        return this.longAtCmd;
      }
      this.longAtCmd = `${cmd}'${atParent}/${atName}','参数'])`;
      return this.longAtCmd;
    },
    // 通用处理复制
    handleCopy(idx) {
      switch (idx) {
        case 1:
          this.copyText('at_copy_tool', this.shortAtCmd, idx);
          break;
        case 2:
          this.copyText('at_copy_tool', this.commonShortAtCmd, idx);
          break;
        case 3:
          this.copyText('at_copy_tool', this.longAtCmd, idx);
          break;
        default:
          break;
      }
    },

    // 兼容复制
    copyText(dom, text, idx) {
      let res = utilsCopy(dom, text);
      if (res) {
        utilsNotice('success', 'Ok', this.noticeObj[idx] + ' 复制成功');
      } else {
        utilsNotice('error', 'Fail', this.noticeObj[idx] + ' 复制失败');
      }
    },
  },
  mounted() {
    // 格式化由PageShow传入的参数
    this.atName = this.$route.params.key;
    this.atInfo = JSON.parse(this.$route.params.val);
  },
  computed: {},
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
