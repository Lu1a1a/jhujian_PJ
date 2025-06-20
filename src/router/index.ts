import { createRouter, createWebHashHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useCheckNavBgStore } from "../store/useCheckNavBg";
import { useAuthMemberStore } from "../store/useAuthMember";
import home from "../pages/home/home.vue";
import newsCarouselType from "../pages/newsCarousel/newsCarouselType.vue";
import booking from "../pages/booking/booking.vue";
import position from "../pages/position/position.vue";
import group from "../pages/group/group.vue";
import memberCenter from "../pages/member/memberCenter.vue";
import memberAuth from "../pages/member/memberAuth.vue";
import register from "../pages/member/register.vue";
import login from "../pages/member/login.vue";
import news from "../pages/news/news.vue";
import newsType from "../pages/news/newsType.vue";
import recruiting from "../pages/news/recruiting.vue";
import notFoundPage from "../pages/notFoundPage.vue";

export const setRouter = () => {
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
            name: "newsCarouselType",
            path: ":type",
            component: newsCarouselType,
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
          { path: ":type", name: "newsType", component: newsType },
          { path: "recruiting", name: "recruiting", component: recruiting },
        ],
      },
      {
        name: "member",
        path: "/member",
        component: memberCenter,
        beforeEnter: (to, from, next) => {
          const authMemberStore = useAuthMemberStore();
          const { isLogin } = storeToRefs(authMemberStore);
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
      to.name === "newsCarouselType" ||
      to.name === "newsType" ||
      to.name === "booking" ||
      to.name === "position" ||
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
