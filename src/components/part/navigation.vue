<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { usePageCheckStore } from "../../store/usePageCheck";
const brandList = ["品牌總覽", "築間幸福鍋物", "燒肉smile", "有之和牛", "本格和牛", "絵馬別邸", "築間酸菜魚", "紫木槿韓國烤肉", "築間麻辣火鍋"];
const brandShow = ref<boolean>(true);
const scrollY = ref(0);
const showNav = ref(false);
const focusIdx = ref("");
const menuClose = ref(true);
const pageCheckStore = usePageCheckStore();
const { isBooking, routePath } = storeToRefs(pageCheckStore);
const brandSelect = () => {
  brandShow.value = !brandShow.value;
};
const focusSelect = (item: string) => {
  focusIdx.value = item;
};
const defocusSelect = () => {
  focusIdx.value = "";
};
const menuSwitch = () => {
  menuClose.value = !menuClose.value;
};
const NavFixed = () => {
  scrollY.value = window.scrollY;
};
const watchStop = watch(scrollY, (newY, oldY) => {
  if (newY > oldY) {
    showNav.value = false;
    return;
  }
  showNav.value = true;
});
onMounted(() => {
  showNav.value = true;
  window.addEventListener("scroll", NavFixed);
});
onUnmounted(() => {
  window.removeEventListener("scroll", NavFixed);
  watchStop();
});
</script>
<template>
  <nav ref="mainNav" class="w-full py-5 fixed z-10 transition-all duration-300 bg-[url('./assets/img/JhuJian__background.jpg')]" :class="{ 'translate-y-[-100%]': !showNav }">
    <ul class="w-full list-none flex items-center justify-evenly font-bold">
      <li class="w-1/4 flex justify-around items-center lg:text-3xl">
        <span class="w-fit material-symbols-outlined cursor-pointer lg:text-4xl">search</span>
        <RouterLink :to="{ path: routePath }" class="w-fit flex items-center cursor-pointer lg:gap-4">
          <Transition name="fade" mode="out-in">
            <div v-if="isBooking" class="flex items-center gap-2">
              <span class="material-symbols-outlined lg:text-4xl"> local_dining </span>
              <span class="hidden md:block lg:text-xl">立即訂位</span>
            </div>
            <div v-else class="flex items-center gap-2">
              <span class="material-symbols-outlined lg:text-4xl"> home </span>
              <span class="hidden md:block lg:text-xl">返回首頁</span>
            </div>
          </Transition>
        </RouterLink>
      </li>
      <li class="w-1/4">
        <a href="#">
          <img class="m-auto" src="../../assets/img/JhuJian__logo.svg" alt="logo" />
        </a>
      </li>
      <ul class="w-1/4 flex text-center lg:justify-around">
        <li class="w-1/2 relative">
          <span class="hidden cursor-pointer md:flex lg:text-xl lg:block lg:mx-auto" @click="brandSelect">
            BRAND 品牌
            <span class="material-symbols-outlined transition-transform duration-500" :class="{ ratateFlip: !brandShow }">arrow_drop_down </span>
          </span>
          <ul
            class="hidden absolute w-full top-[110%] left-1/2 px-2 translate-x-[-50%] bg-white overflow-x-hidden scrollNone transition-[height] duration-500 rounded-xl md:block lg:text-xl"
            :class="{
              'h-0': brandShow,
              'h-80': !brandShow,
            }"
          >
            <li
              v-for="item in brandList"
              :key="item"
              class="py-2 relative transition-[color] duration-300 cursor-pointer lg:py-5 lg:w-full"
              :class="{
                'text-black': focusIdx === item || focusIdx === '',
                'text-gray-300': focusIdx !== item && focusIdx !== '',
              }"
              @mouseenter="focusSelect(item)"
              @mouseout="defocusSelect"
            >
              {{ item }}
              <span
                class="material-symbols-outlined absolute top-1/2 right-0 translate-y-[-50%] text-lg transition-[opacity] duration-300"
                :class="{
                  'opacity-0': focusIdx !== item,
                }"
              >
                add
              </span>
            </li>
          </ul>
        </li>
        <li class="flex flex-col justify-around cursor-pointer group" @click="menuSwitch">
          <span class="w-12 h-0.5 bg-black origin-right group-hover:-rotate-12 transition-transform my-1"></span>
          <span class="w-12 h-0.5 bg-black origin-right group-hover:rotate-12 transition-transform my-1"></span>
        </li>
      </ul>
    </ul>
  </nav>
  <div
    class="w-full h-full py-5 fixed top-0 md:flex bg-[url('../../assets/img/JhuJian__background.jpg')] transition overflow-y-auto z-10"
    :class="{
      'opacity-0': menuClose,
      'pointer-events-none': menuClose,
    }"
  >
    <div class="md:w-1/2 md:flex md:flex-col md:justify-center md:gap-16 md:border-r md:border-dashed md:border-slate-400 z-10 md:border-b-0 border-b border-dashed border-slate-400 mx-5">
      <ul class="md:w-full md:px-10 md:flex md:flex-wrap">
        <li class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer">關於<span class="pl-5 group-hover:text-black text-gray-400 transition-all">ABOUT</span></li>
        <li class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer">會員<span class="pl-5 group-hover:text-black text-gray-400 transition-all">MEMBER</span></li>
        <li class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer">新訊<span class="pl-5 group-hover:text-black text-gray-400 transition-all">NEWS</span></li>
        <li class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer">聯繫<span class="pl-5 group-hover:text-black text-gray-400 transition-all">CONTACT</span></li>
      </ul>
      <ul class="md:w-full md:px-10 md:flex md:flex-wrap">
        <li class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer">創業<span class="pl-5 group-hover:text-black text-gray-400 transition-all">PARTNER</span></li>
        <li class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer">企業永續<span class="pl-5 group-hover:text-black text-gray-400 transition-all">ESG</span></li>
        <li class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer">人才<span class="pl-5 group-hover:text-black text-gray-400 transition-all">RECRUITING</span></li>
        <li class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer">投資人<span class="pl-5 group-hover:text-black text-gray-400 transition-all">INVESTOR</span></li>
      </ul>
    </div>
    <div class="md:w-1/2 flex flex-col z-10 mx-5 lg:justify-center lg:gap-7">
      <span class="w-full py-2 md:w-5/6 lg:text-xl">EXPLORE 築間旗下品牌</span>
      <div class="w-full flex flex-wrap md:px-10 md:overflow-y-scroll lg:px-0">
        <div v-for="n in 10" :key="n" class="w-1/2 md:w-1/3 relative">
          <a href="#" class="block relative pointer lg:w-fit lg:aspect-square lg:rounded-full lg:hover:bg-white lg:transition-all">
            <img src="../../assets/img/3_20240105131443z4mas1n1R8.png" alt="hotpot" />
          </a>
        </div>
      </div>
      <span class="group w-full flex items-center lg:text-xl">
        MORE 品牌總覽
        <span class="material-symbols-outlined align-middle transition group-hover:rotate-180">add</span>
        <span class="grow ml-5 h-px bg-black"></span>
      </span>
    </div>
    <div class="fixed bottom-0 -z-10">
      <img src="../../assets/img/menu_jhujian.png" alt="menu_logo" />
    </div>
    <span class="material-symbols-outlined block fixed top-5 right-5 md:absolute md:right-10 scale-125 cursor-pointer z-20 lg:text-4xl" @click="menuSwitch"> close </span>
  </div>
</template>
<style scoped>
.scrollNone > li + li {
  border-top: 1px solid grey;
}
.ratateFlip {
  transform: rotate3d(1, 0, 0, 180deg);
}
::-webkit-scrollbar {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
