import { createRouter, createWebHistory } from "vue-router";
import PageArticle from "../components/PageArticle/PageArticle.vue";
import PageEditor from "../components/PageEditor/PageEditor.vue";
import PageAt from "../components/PageAt/PageAt.vue";
import PageShow from "../components/PageShow/PageShow.vue";
const routes = [
  {
    path: "/",
    name: "首页",
    component: PageShow,
    meta: ["首页"],
  },
  {
    path: "/article",
    name: "展示页",
    component: PageArticle,
    meta: ["展示页"],
  },
  {
    path: "/editor",
    name: "编辑器",
    component: PageEditor,
    meta: ["编辑器"],
  },
  {
    path: "/at",
    name: "指令详情",
    component: PageAt,
    meta: ["指令详情"],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
