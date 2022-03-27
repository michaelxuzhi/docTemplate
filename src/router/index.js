import { createRouter, createWebHashHistory } from "vue-router";
import PageArticle from "../components/PageArticle/PageArticle.vue";
import PageEditor from "../components/PageEditor/PageEditor.vue";
import PageAt from "../components/PageAt/PageAt.vue";
const routes = [
  {
    path: "/",
    component: PageArticle,
  },
  {
    path: "/home",
    component: PageArticle,
  },
  {
    path: "/editor",
    component: PageEditor,
  },
  {
    path: "/at",
    component: PageAt,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
