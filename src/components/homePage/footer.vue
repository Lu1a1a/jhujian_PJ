<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from "vue";
import { useMouseFollow } from "../../composables/useMouseFollow";
import { useFadeIn } from "../../composables/useFadeIn";
const TopShadowDom = ref<HTMLSpanElement | null>(null);
const logoImgDom = ref<HTMLDivElement | null>(null);
const fadeTopState = ref(true);
const pageTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const mouseIn = (e: MouseEvent) => {
  useMouseFollow(e, e.target as HTMLDivElement, TopShadowDom as Ref<HTMLDivElement>);
};
const mouseOut = (e: MouseEvent) => {
  useMouseFollow(e, e.target as HTMLDivElement, TopShadowDom as Ref<HTMLDivElement>);
};
const footerAnimate = () => {
  useFadeIn(logoImgDom as Ref<HTMLDivElement>, fadeTopState as Ref<boolean>);
};
onMounted(() => {
  window.addEventListener("scroll", footerAnimate);
});
onUnmounted(() => {
  window.removeEventListener("scroll", footerAnimate);
});
</script>
<template>
  <div class="w-full mt-60 px-10 xl:px-28">
    <div class="w-1/4 aspect-square m-auto relative text-white cursor-pointer md:w-1/12">
      <div class="arrowTop block w-full aspect-square relative rounded-full bg-black z-20" @click="pageTop" @mousemove="mouseIn" @mouseleave="mouseOut">
        <span class="material-symbols-outlined absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-4xl pointer-events-none lg:text-6xl 2xl:text-8xl"> keyboard_arrow_up </span>
      </div>
      <span ref="TopShadowDom" class="Shadow w-full aspect-square rounded-full absolute top-2 left-2 bg-gray-400 z-10"></span>
    </div>
    <div class="w-full mt-10 mb-7 relative lg:my-20">
      <img class="w-full" src="../../assets/footerImg/menu_jhujian.png" />
      <div ref="logoImgDom" class="logoImg w-1/2 mt-10 mx-auto lg:absolute lg:bottom-0 lg:right-0 lg:w-1/4">
        <img class="w-full h-full" src="../../assets/footerImg/JhuJian__footer_logo.svg" />
      </div>
    </div>
    <div class="w-full text-center md:flex md:items-center md:my-10">
      <div class="text-sm md:text-2xl">&copy; JHUJIAN all right reserved. Design by WDD.</div>
      <div class="hidden md:block md:grow md:w-1 h-px md:bg-black md:mx-5"></div>
      <div class="my-5 md:text-2xl md:my-0">隱私權政策</div>
    </div>
  </div>
</template>
<style scoped>
.arrowTop,
.Shadow {
  transform: translate3d(calc(var(--mouseX) * 1.5), calc(var(--mouseY) * 1.5), 0);
}
.arrowTop {
  transition: transform 0.1s var(--transition, 0) linear;
}
.Shadow {
  transition: transform 0.3s var(--transition, 0) linear;
}
.logoImg {
  opacity: var(--opacity, 0);
  transform: translateY(var(--translateY, 20px));
  transition: opacity 0.5s, transform 0.5s;
}
</style>
