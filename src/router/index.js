import { createRouter, createWebHistory } from "vue-router";
// import PageArticle from "@components/PageArticle/PageArticle.vue";
import PageEditor from "@components/PageEditor/PageEditor.vue";
import PageAt from "@components/PageAt/PageAt.vue";
import PageShow from "@components/PageShow/PageShow.vue";
import PageRecruit from "@components/PageRecruit/PageRecruit.vue";
import objectView from "@views/objectView.vue";
// import iframeView from "../views/iframeView.vue";
import wsServer from "@views/wsServer.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: PageShow,
    // component: iframeView,
    meta: ["首页"],
  },
  {
    path: "/article",
    name: "article",
    component: wsServer,
    meta: ["文章展示"],
  },
  {
    path: "/editor",
    name: "editor",
    component: PageEditor,
    meta: ["编辑器"],
  },
  {
    path: "/recruit",
    name: "recruit",
    component: PageRecruit,
    meta: ["抽卡展示"],
  },
  {
    path: "/at",
    name: "at",
    component: PageAt,
    meta: ["指令详情"],
  },
  {
    path: "/object",
    name: "object",
    component: objectView,
    meta: ["道具展示"],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
