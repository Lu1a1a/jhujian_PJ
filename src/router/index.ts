import { createRouter, createWebHashHistory } from "vue-router";
import { useCheckNavBgStore } from "../store/useCheckNavBg";
import home from "../pages/home.vue";
import booking from "../pages/booking.vue";
import position from "../pages/position.vue";
import group from "../pages/group.vue";
import news from "../pages/news.vue";
import member from "../pages/member.vue";
import allNews from "../pages/newsCarousel/allNews.vue";
import activity from "../pages/newsCarousel/activity.vue";
import company from "../pages/newsCarousel/company.vue";
import media from "../pages/newsCarousel/media.vue";
import work from "../pages/newsCarousel/work.vue";

export const setRouter = () => {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: "/", redirect: "/home" },
      {
        name: "home",
        path: "/home",
        component: home,
        children: [
          {
            name: "allNews",
            path: "",
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
      {
        name: "group",
        path: "/group",
        component: group,
      },
      {
        name: "news",
        path: "/news",
        component: news,
      },
      {
        name: "member",
        path: "/member",
        component: member,
      },
    ],
  });
  router.beforeEach((to) => {
    const checkNavBgStore = useCheckNavBgStore();
    const { setNavBgState, checkOpacityNavPage } = checkNavBgStore;
    console.log(to);

    if (
      to.name === "allNews" ||
      to.name === "news" ||
      to.name === "activity" ||
      to.name === "company" ||
      to.name === "media" ||
      to.name === "work" ||
      to.name === "booking" ||
      to.name === "position"
    ) {
      checkOpacityNavPage(false);
      setNavBgState(false);
      return;
    }
    checkOpacityNavPage(true);
    setNavBgState(true);
  });
  return router;
};
