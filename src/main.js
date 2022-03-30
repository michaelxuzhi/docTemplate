import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as EleIcons from "@element-plus/icons-vue";
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
app.mount("#app");

export default app;
