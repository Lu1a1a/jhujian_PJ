import { defineStore } from "pinia";
import { ref } from "vue";
export const useCheckNavBgStore = defineStore("checkNavBg", () => {
  const isNavBgTransparent = ref(true);
  const isTransparentPage = ref(false);

  const checkOpacityNavPage = (state: boolean) => {
    isTransparentPage.value = state;
  };

  const setNavBgState = (state: boolean) => {
    isNavBgTransparent.value = state;
  };

  return { isTransparentPage, isNavBgTransparent, setNavBgState, checkOpacityNavPage };
});
