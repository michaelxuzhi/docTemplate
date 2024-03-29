import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as EleIcons from "@element-plus/icons-vue";
import mitt from "mitt";
import router from "./router";
import axios from "axios";
import { store } from "./store";
import App from "./App.vue";

import LRUCache from './utils/LRU.js'

let app = createApp(App);
for (const name in EleIcons) {
  app.component(name, EleIcons[name]);
}
app.use(ElementPlus);
app.use(router);
app.config.globalProperties.axios = axios;
// 创建事件总线
app.config.globalProperties.$eventBus = new mitt();
app.config.globalProperties.$LRU = new LRUCache(5);
app.use(store);
app.mount("#app");

export default app;
