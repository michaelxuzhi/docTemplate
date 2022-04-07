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
      <el-descriptions-item v-for="(val, key) in atInfo" :key="key" :label="key">
        <div v-if="key === 'tag'">
          <el-tag
            class="tagItemStyle"
            v-for="tagItem in val"
            :key="tagItem"
            type="danger"
            effect="light"
          >
            <div>{{ tagItem }}</div>
          </el-tag>
        </div>
        <el-tooltip v-if="val.length > 30" effect="dark" :content="val" placement="top">
          {{ val.substr(0, 30) + '...' }}
        </el-tooltip>
        <div v-if="val.length <= 30 && key !== 'tag'">{{ val }}</div>
      </el-descriptions-item>
      <el-descriptions-item label="短指令" :span="2">
        {{ handleAtShort(atInfo.ParentName, atInfo.name) }}
        <span style="width: 0; height: 0" id="at_copy_tool"></span>
        <el-button
          class="desc-btn"
          ol="12"
          :type="copyBtnStatus1 || 'primary'"
          :icon="copyBtnStatus1 ? iconList[copyBtnStatus1] : ''"
          @click="handleCopy(1)"
          >copy</el-button
        >
      </el-descriptions-item>
      <el-descriptions-item label="通用指令" :span="2"
        >{{ handleAtCommom(atInfo.ParentName, atInfo.name) }}
        <el-button
          class="desc-btn"
          :type="copyBtnStatus2 || 'primary'"
          :icon="copyBtnStatus2 ? iconList[copyBtnStatus2] : ''"
          @click="handleCopy(2)"
          >copy</el-button
        >
      </el-descriptions-item>
      <el-descriptions-item label="长指令" :span="2">
        <el-icon><info-filled /></el-icon>
        <el-tooltip
          effect="dark"
          :content="handleAtLong(atInfo.ParentName, atInfo.name)"
          placement="top"
        >
          移动鼠标至此处查看长指令详情
        </el-tooltip>
        <el-button
          class="desc-btn"
          :type="copyBtnStatus3 || 'primary'"
          :icon="copyBtnStatus3 ? iconList[copyBtnStatus3] : ''"
          @click="handleCopy(3)"
          >copy</el-button
        >
      </el-descriptions-item>
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
      copyBtnStatus1: '',
      copyBtnStatus2: '',
      copyBtnStatus3: '',
      iconList: {
        success: 'CircleCheckFilled',
        danger: 'CircleCloseFilled',
      },
      noticeObj: {
        1: '短指令',
        2: '通用指令',
        3: '长指令',
      },
    };
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
        this[`copyBtnStatus${idx}`] = 'success';
      } else {
        utilsNotice('error', 'Fail', this.noticeObj[idx] + ' 复制失败');
        this[`copyBtnStatus${idx}`] = 'danger';
      }
    },
  },
  mounted() {
    // 格式化由PageShow传入的参数
    if (this.$route.params.key) {
      this.atName = this.$route.params.key;
      this.atInfo = JSON.parse(this.$route.params.val);
      this.atInfo.tag = [this.atInfo.ParentName, this.atInfo.name];
    } else {
      this.$router.push({ name: 'home' });
    }
  },
  computed: {},
};
</script>
<style scoped>
.at-content {
  /* width: inherit; */
  padding: 60px;
  color: var(--current-font-color);
}
.desc-btn {
  margin-left: 30px;
  float: right;
}
.el-descriptions {
  width: 50vw;
}
.tagItemStyle {
  margin-right: 5px;
}
.el-descriptions >>> .el-descriptions__title {
  color: var(--current-at-font-color);
}
.el-descriptions >>> .el-descriptions__label {
  background-color: var(--current-at-bg-color);
  color: var(--current-at-font-color);
}
/* .el-descriptions >>> .el-descriptions__content {
  background-color: var(--current-at-content-bg-color);
} */
</style>
