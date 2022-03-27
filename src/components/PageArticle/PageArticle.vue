<template>
  <div class="main-content">
    <h1>年度总结：我在W6做了什么</h1>
    <h2>测试任务</h2>
    <h3>独立测试的系统/模块</h3>
    <p>
      ·
      任务系统；抽卡(召唤)系统；贸易模块；兑换模块；税赋模块；签到模块；政令模块；天下大势系统；个人信息模块；新手指引系统；收菜系统；英雄列传；系统解锁;
    </p>
    <h3>协助测试与跟进的系统/模块</h3>
    <p>
      ·
      同盟日志；幕僚战法；技能战法系统；US日志系统补充内容；Drpf客户端日志补充内容；城建系统(等级、界面、动画、数值、功能)迭代；部分音频挂接；政厅界面迭代；英雄列表界面迭代；英雄详情界面迭代；技能界面迭代；其他负责界面的迭代跟进；
    </p>
    <h3>合作测试的系统/模块</h3>
    <p>· 图鉴模块、战斗力系统</p>
    <h2>工具开发</h2>
    <div class="h5-contain">
      <h5>· 游戏内QA指令面板的开发制作</h5>
      <h5>· QA指令查询平台的前端开发、插件开发</h5>
      <h5>· 测试指令编写</h5>
      <h5>
        · 测试过程中用的简单工具脚本(筛选英雄信息转excel、城池坐标转json、bat脚本等)
      </h5>
    </div>

    <h2>组内wiki与分享</h2>
    <h4>- 签到系统双端流程解析</h4>
    <h4>- 客户端登录方式切换与端口修改技巧</h4>
    <h4>- 指令面板的开发流程</h4>
    <h4>
      - 测试方法的探索：游戏内创建集合指令的按钮控件、通过修改地图颜色筛选符合条件地块等
    </h4>
    <h4>- 编写客户端接口修改网页title以清晰区分不同客户端</h4>
    <h4>- 通过弹窗方式拦截修改收发协议的数据</h4>
    <h4>- 服务端引擎事件监听触发顺序机制的踩坑分享</h4>
    <h4>- 收菜模块用例走读分享</h4>
    <h4>- 输出多份测试用例、文档分析</h4>
  </div>
</template>

<script>
export default {
  name: 'PageArticle',
};
</script>

<style scoped>
.main-content {
  width: 70%;
  padding-left: 120px;
  padding-right: 120px;
  overflow: hidden;
  /* background-color: rgb(121, 118, 118); */
}
h1 {
  font-size: 2.2rem;
  font-weight: 600;
  margin: 30px 0;
}
h2 {
  font-size: 1.8rem;
  font-weight: 550;
  margin-bottom: 20px;
}
h3 {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 20px;
}
h4 {
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 20px;
}
h5 {
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 20px;
}
h6 {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 20px;
}
p {
  font-size: 1.2rem;
  line-height: 30px;
  margin-bottom: 20px;
  padding: 20px;
  word-wrap: break-word;
  background-color: rgb(231, 236, 243);
}
.h5-contain {
  padding: 20px;
  margin-bottom: 20px;
  background-color: rgb(246, 246, 246);
}
</style>
