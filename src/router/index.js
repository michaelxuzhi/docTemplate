import { createRouter, createWebHashHistory } from "vue-router";
import PageArticle from "../components/PageArticle/PageArticle.vue";
import PageEditor from "../components/PageEditor/PageEditor.vue";
import PageAt from "../components/PageAt/PageAt.vue";
import PageShow from "../components/PageShow/PageShow.vue";
const routes = [
  {
    path: "/",
    component: PageShow,
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
