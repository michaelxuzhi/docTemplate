import { createRouter, createWebHashHistory } from "vue-router";
import PageArticle from "../components/PageArticle/PageArticle.vue";
import PageEditor from "../components/PageEditor/PageEditor.vue";
const routes = [
  {
    path: "/",
    component: PageArticle,
  },
  {
    path: "/editor",
    component: PageEditor,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
