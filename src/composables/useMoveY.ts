import { ref, Ref } from "vue";
export const useMoveY = (item: Ref<HTMLElement>) => {
  const windowHeight = window.innerHeight;
  const lastScrollY = ref(0);
  const totalScrollY = ref(0);
  const itemTop = item.value.getBoundingClientRect().top;
  const itemBot = item.value.getBoundingClientRect().bottom;
  if (itemTop <= windowHeight && itemBot >= 0) {
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollY.value;
    totalScrollY.value += deltaY / 50;
    item.value.style.setProperty("--moveY", `${totalScrollY.value}px`);
    lastScrollY.value = currentScrollY;
  }
};
