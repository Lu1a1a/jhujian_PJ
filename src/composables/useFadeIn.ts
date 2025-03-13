import { Ref } from "vue";
export const useFadeIn = (item: Ref<HTMLElement>, state: Ref<boolean>) => {
  const windowHeight = window.innerHeight * 0.9;
  const itemTop = item.value.getBoundingClientRect().top;
  if (itemTop <= windowHeight && state.value) {
    const opacity = 1;
    const moveY = 0;
    state.value = false;
    item.value.style.setProperty("--opacity", `${opacity}`);
    item.value.style.setProperty("--translateY", `${moveY}px`);
  }
};
