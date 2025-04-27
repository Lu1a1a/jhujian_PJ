<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from "vue";
import { useFadeIn } from "../../composables/useFadeIn";
import { RouterLink, RouterView } from "vue-router";
const carouselDom = ref<HTMLDivElement | null>(null);
const fadeTopState = ref<boolean>(true);
const newsAnimate = () => {
  useFadeIn(carouselDom as Ref<HTMLDivElement>, fadeTopState as Ref<boolean>);
};
onMounted(() => {
  window.addEventListener("scroll", newsAnimate);
});
onUnmounted(() => {
  window.removeEventListener("scroll", newsAnimate);
});
</script>
<template>
  <div class="w-full my-40">
    <div class="w-full text-center mb-10 xl:mb-20">
      <span class="text-2xl md:text-3xl 2xl:text-5xl">NEW 集團新訊</span>
    </div>
    <div class="w-full mx-auto px-2 flex mb-10 md:w-2/3 xl:my-40 lg:w-4/5">
      <div class="w-full flex sm:justify-center overflow-x-scroll md:flex md:w-fit 2xl:mr-auto 2xl:justify-normal">
        <RouterLink class="navLink w-fit shrink-0 px-5 relative text-gray-400 md:text-xl 2xl:text-2xl 2xl:px-10" :to="{ path: '/home/allNews' }">所有訊息</RouterLink>
        <RouterLink class="navLink w-fit shrink-0 px-5 relative text-gray-400 md:text-xl lg:text-lg 2xl:text-2xl 2xl:px-10" :to="{ path: '/home/activity' }">活動資訊</RouterLink>
        <RouterLink class="navLink w-fit shrink-0 px-5 relative text-gray-400 md:text-xl lg:text-lg 2xl:text-2xl 2xl:px-10" :to="{ path: '/home/company' }">集團公告</RouterLink>
        <RouterLink class="navLink w-fit shrink-0 px-5 relative text-gray-400 md:text-xl lg:text-lg 2xl:text-2xl 2xl:px-10" :to="{ path: '/home/media' }">媒體報導</RouterLink>
        <RouterLink class="navLink w-fit shrink-0 px-5 relative text-gray-400 md:text-xl md:pr-[0px] lg:text-lg 2xl:text-2xl 2xl:px-10 2xl:pr-[0px]" :to="{ path: '/home/work' }">人才招募</RouterLink>
      </div>
      <span class="hidden relative items-center grow md:flex xl:grow-1">
        <span class="grow h-px bg-black mx-3"></span>
        <span class="flex items-center group font-bold lg:text-lg 2xl:text-2xl">
          MORE 閱讀更多
          <span class="material-symbols-outlined align-middle transition group-hover:rotate-180">add</span>
        </span>
      </span>
    </div>
    <div ref="carouselDom" class="carousel w-full relative ">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>
<style scoped>
.navLink::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(50%, -50%);
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: rgb(156 163 175);
}
.navLink:last-child:after {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar {
  display: none;
}
.router-link-active {
  color: black;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.carousel {
  opacity: var(--opacity, 0);
  transform: translateY(var(--translateY, 20px));
  transition: opacity 0.5s, transform 0.5s;
}
</style>
