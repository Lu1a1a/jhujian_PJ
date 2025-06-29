import { createRouter, createWebHashHistory } from "vue-router";
import { useCheckNavBgStore } from "../store/useCheckNavBg";
import { useScrollSave } from "../store/useScrollSave.ts";
import routes from "./routes";
export const setRouter = () => {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      const scrollSave = useScrollSave();
      const { setPrePosition } = scrollSave;
      if (to.hash) return { el: to.hash, behavior: "smooth" };
      if (to.name === from.name) return;
      setPrePosition(savedPosition!);
      return { top: 0, behavior: "smooth" };
    },
  });
  router.beforeEach((to) => {
    const checkNavBgStore = useCheckNavBgStore();
    const { setNavBgState, checkOpacityNavPage } = checkNavBgStore;
    if (
      to.name === "newsCarouselType" ||
      to.name === "newsDetail" ||
      to.name === "newsType" ||
      to.name === "recruiting" ||
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
