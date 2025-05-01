import { createRouter, createWebHashHistory } from "vue-router";
import { useCheckNavBgStore } from "../store/useCheckNavBg";
import home from "../pages/home.vue";
import booking from "../pages/booking.vue";
import position from "../pages/position.vue";
import group from "../pages/group.vue";
import news from "../pages/news.vue";
import member from "../pages/member.vue";
import allNewsCarousel from "../pages/newsCarousel/allNews.vue";
import activityCarousel from "../pages/newsCarousel/activity.vue";
import companyCarousel from "../pages/newsCarousel/company.vue";
import mediaCarousel from "../pages/newsCarousel/media.vue";
import workCarousel from "../pages/newsCarousel/work.vue";
import allNews from "../pages/news/allNews.vue";
import event from "../pages/news//event.vue";
import media from "../pages/news/media.vue";
import announcement from "../pages/news/announcement.vue";
import recruiting from "../pages/news/recruiting.vue";

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
            name: "allNewsC",
            path: "",
            component: allNewsCarousel,
          },
          {
            name: "activity",
            path: "activity",
            component: activityCarousel,
          },
          {
            name: "company",
            path: "company",
            component: companyCarousel,
          },
          {
            name: "mediaNews",
            path: "mediaNews",
            component: mediaCarousel,
          },
          {
            name: "work",
            path: "work",
            component: workCarousel,
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
        children: [
          {
            name: "allNews",
            path: "",
            component: allNews,
          },
          {
            name: "event",
            path: "event",
            component: event,
          },
          {
            name: "media",
            path: "media",
            component: media,
          },
          {
            name: "announcement",
            path: "announcement",
            component: announcement,
          },
          {
            name: "recruiting",
            path: "recruiting",
            component: recruiting,
          },
        ],
      },
      {
        name: "member",
        path: "/member",
        component: member,
      },
    ],
    scrollBehavior(to) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: "smooth",
        };
      }
    },
  });
  router.beforeEach((to) => {
    const checkNavBgStore = useCheckNavBgStore();
    const { setNavBgState, checkOpacityNavPage } = checkNavBgStore;
    console.log(to);

    if (
      to.name === "allNewsC" ||
      to.name === "allNews" ||
      to.name === "activity" ||
      to.name === "company" ||
      to.name === "media" ||
      to.name === "work" ||
      to.name === "booking" ||
      to.name === "position" ||
      to.name === "event" ||
      to.name === "announcement" ||
      to.name === "recruiting"
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
