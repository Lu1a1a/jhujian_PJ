import { createRouter, createWebHashHistory } from "vue-router";
import home from "../pages/home.vue";
import booking from "../pages/booking.vue";
import position from "../pages/position.vue";
import allNews from "../pages/news/allNews.vue";
import activity from "../pages/news/activity.vue";
import company from "../pages/news/company.vue";
import media from "../pages/news/media.vue";
import work from "../pages/news/work.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/home/allNews" },
    {
      name: "home",
      path: "/home",
      component: home,
      children: [
        {
          name: "allNews",
          path: "allNews",
          component: allNews,
        },
        {
          name: "activity",
          path: "activity",
          component: activity,
        },
        {
          name: "company",
          path: "company",
          component: company,
        },
        {
          name: "media",
          path: "media",
          component: media,
        },
        {
          name: "work",
          path: "work",
          component: work,
        },
      ],
    },
    {
      name: "booking",
      path: "/booking",
      component: booking,
    },
    {
      name: "position",
      path: "/position",
      component: position,
    },
  ],
});
export default router;
