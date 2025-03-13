import { createRouter, createWebHashHistory } from "vue-router";
import allNews from "../pages/news/allNews.vue";
import activity from "../pages/news/activity.vue";
import company from "../pages/news/company.vue";
import media from "../pages/news/media.vue";
import work from "../pages/news/work.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "allNews",
      path: "/",
      component: allNews,
    },
    {
      name: "activity",
      path: "/activity",
      component: activity,
    },
    {
      name: "company",
      path: "/company",
      component: company,
    },
    {
      name: "media",
      path: "/media",
      component: media,
    },
    {
      name: "work",
      path: "/work",
      component: work,
    },
  ],
});
export default router;
