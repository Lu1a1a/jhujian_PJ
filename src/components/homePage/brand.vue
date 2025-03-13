<script setup lang="ts">
import { onMounted, onUnmounted, ref, Ref } from "vue";
import { useMoveY } from "../../composables/useMoveY";
import { useFadeIn } from "../../composables/useFadeIn";
import { useMouseFollow } from "../../composables/useMouseFollow";
const titleDom = ref<HTMLDivElement | null>(null);
const picDom = ref<HTMLImageElement | null>(null);
const LinkShadowDom = ref<HTMLDivElement | null>(null);
const fadeTopState = ref(true);
const mouseIn = (e: MouseEvent) => {
  useMouseFollow(e, e.target as HTMLAnchorElement, LinkShadowDom as Ref<HTMLDivElement>);
};
const mouseOut = (e: MouseEvent) => {
  useMouseFollow(e, e.target as HTMLAnchorElement, LinkShadowDom as Ref<HTMLDivElement>);
};
const brandAnimate = () => {
  useMoveY(picDom as Ref<HTMLImageElement>);
  useFadeIn(titleDom as Ref<HTMLDivElement>, fadeTopState as Ref<boolean>);
};
onMounted(() => {
  window.addEventListener("scroll", brandAnimate);
});
onUnmounted(() => {
  window.removeEventListener("scroll", brandAnimate);
});
</script>
<template>
  <div class="w-full mt-40">
    <div ref="titleDom" class="title w-full px-5 md:px-0">
      <span class="block my-10 text-center text-2xl md:text-3xl">築間餐飲集團</span>
      <span class="block my-10 font-extralight text-3xl text-center md:text-5xl">讓我們一起變熟吧！</span>
      <span class="block my-14 font-light text-lg text-center md:text-xl">築間以漁獲起家，堅持用拉近你我之間的距離，打造一頓頓溫暖的用餐體驗。</span>
    </div>
    <div class="w-full relative mt-60">
      <div class="w-full h-screen relative overflow-hidden">
        <img ref="picDom" class="pic w-full h-[120%] object-cover absolute top-0 bottom-0 my-auto bg-red-900" src="../../assets/img/brandImg/JhuJian__index_about_1920x1080.jpg" alt="meat" />
      </div>
      <div class="w-full absolute top-0 -translate-y-1/2">
        <div class="w-full">
          <img class="w-full" src="../../assets/img/brandImg/JhuJian__index_jhujian.svg" />
        </div>
        <div class="w-20 aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-36">
          <a class="moreLink w-full h-full rounded-full bg-black flex flex-col justify-center items-center relative z-10" href="#" @mousemove="mouseIn" @mouseleave="mouseOut">
            <span class="text-sm text-center pointer-events-none text-white md:text-xl">MORE</span>
            <span class="text-sm text-center pointer-events-none text-white md:text-xl">品牌故事</span>
          </a>
          <div ref="LinkShadowDom" class="Shadow w-full h-full rounded-full absolute top-[10%] left-[10%] pointer-events-none bg-yellow-200 opacity-50"></div>
        </div>
      </div>
      <div class="w-11/12 flex flex-col items-center absolute left-0 right-0 bottom-10 mx-auto border-b-[1px] md:flex-row md:justify-evenly pointer-events-none">
        <div class="w-fit py-5 font-black text-center text-yellow-200">
          <span class="block text-5xl">13</span>
          <span class="block text-1xl mt-5">大品牌</span>
        </div>
        <div class="w-fit py-5 font-black text-center text-yellow-200">
          <span class="block text-5xl">188</span>
          <span class="block text-1xl mt-5">全台總店數</span>
        </div>
        <div class="w-fit py-5 font-black text-center text-yellow-200">
          <span class="block text-5xl">11</span>
          <span class="block text-1xl mt-5">今年預期展店</span>
        </div>
        <div class="w-fit py-5 font-black text-center text-yellow-200">
          <span class="block text-5xl">2,248,301</span>
          <span class="block text-1xl mt-5">累積會員數量</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.moreLink,
.Shadow {
  transform: translate3d(calc(var(--mouseX) * 1.5), calc(var(--mouseY) * 1.5), 0);
}
.moreLink {
  transition: transform 0.1s var(--transition, 0) linear;
}
.Shadow {
  transition: transform 0.3s var(--transition, 0) linear;
}
.title {
  opacity: var(--opacity, 0);
  transform: translateY(var(--translateY, 20px));
  transition: opacity 0.5s, transform 0.5s;
}
.pic {
  transform: translateY(var(--moveY, 0));
  transition: transform 0.3s linear;
}
</style>
