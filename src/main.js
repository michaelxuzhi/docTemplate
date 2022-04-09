import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as EleIcons from "@element-plus/icons-vue";
import mitt from "mitt";
import router from "./router";
import axios from "axios";
import App from "./App.vue";

let app = createApp(App);
for (const name in EleIcons) {
  app.component(name, EleIcons[name]);
}
app.use(ElementPlus);
app.use(router);
app.config.globalProperties.axios = axios;
// 创建事件总线
app.config.globalProperties.$eventBus = new mitt();
app.mount("#app");

export default app;
