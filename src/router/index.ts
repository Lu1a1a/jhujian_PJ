import { createRouter, createWebHashHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useCheckNavBgStore } from "../store/useCheckNavBg";
import { useAuthMemberStore } from "../store/useAuthMember";
import home from "../pages/home/home.vue";
import booking from "../pages/booking/booking.vue";
import position from "../pages/position/position.vue";
import group from "../pages/group/group.vue";
import memberCenter from "../pages/member/memberCenter.vue";
import memberAuth from "../pages/member/memberAuth.vue";
import register from "../pages/member/register.vue";
import login from "../pages/member/login.vue";
import news from "../pages/newsCarousel/news.vue";
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
import notFoundPage from "../pages/notFoundPage.vue";

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
        component: memberCenter,
        beforeEnter: (to, from, next) => {
          const AuthMemberStore = useAuthMemberStore();
          const { isLogin } = storeToRefs(AuthMemberStore);
          if (isLogin.value === false) {
            next({ path: "/member/auth/login" });
            return;
          }
          next();
        },
      },
      {
        name: "memberAuth",
        path: "/member/auth",
        component: memberAuth,
        children: [
          {
            name: "register",
            path: "register",
            component: register,
          },
          {
            name: "login",
            path: "login",
            component: login,
          },
        ],
      },
      {
        name: "notFound",
        path: "/:pathMatch(.*)*",
        component: notFoundPage,
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
      to.name === "recruiting" ||
      to.name === "login" ||
      to.name === "register"
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
