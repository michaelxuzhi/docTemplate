export function headerData() {
  /*
   * headerData格式
   * key: 字段名
   * text: 展示文本
   * route: 路由名称，需要在router/index.js中配置
   * span: 占用的列数
   * class：样式，需要在PageHeader.vue中配置
   * icon：是否有图标
   * * icon_name: elementUI图标
   * * icon_size: 图标大小，字符串
   * dropdown: 是否有下拉菜单，@command是点击子菜单的事件，参数是子菜单的command
   * * action1: 下拉菜单的子菜单1
   * * text: 下拉菜单的子菜单1的文本
   * * command: 下拉菜单的子菜单1对应的点击参数
   */
  return {
    api: {
      text: "道具展示",
      route: "object",
      span: 3,
      class: "right-col",
      icon: undefined,
    },
    system: {
      text: "功能1",
      route: "system",
      span: 3,
      class: "right-col",
      icon: undefined,
    },
    multilang: {
      text: "测试网址",
      route: "multilang",
      span: 4,
      class: "right-col",
      icon: undefined,
      dropdown: {
        action1: {
          text: "trunk",
          command: "点击了trunk",
        },
        action2: {
          text: "事业部内测服",
          // command: 'https://www.baidu.com',
          command: "https://w6.game.163.com/game/",
        },
        action3: {
          text: "新手编辑器",
          command: "点击了事业部外测服",
        },
        action4: {
          text: "LQA测试服",
          command: "点击了LQA测试服",
        },
        action5: {
          text: "banshu测试服",
          command: "点击了banshu测试服",
        },
      },
    },
    // document: {
    //   text: "Document",
    //   route: "document",
    //   span: 4,
    //   class: "right-col",
    //   icon: {
    //     icon_name: "edit",
    //     icon_size: "16",
    //   },
    // },
  };
}
