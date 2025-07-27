<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useFadeIn } from "../../composables/useFadeIn";
import "swiper/css/grid";
import type { Swiper as SwiperType } from "swiper";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Grid, Autoplay } from "swiper/modules";
import { useWindowSize } from "@vueuse/core";
const router = useRouter();
const { width } = useWindowSize();
const titleDom = ref<HTMLDivElement | null>(null);
const companyImgDom = ref<HTMLDivElement | null>(null);
const titlefadeTopState = ref<boolean>(true);
const companyfadeTopState = ref<boolean>(true);
const swiperRef = ref();
const currentIdx = ref(0);
const modules = ref([Grid, Autoplay]);
const gridOptions = ref<{ [key: string]: string | number }>({
  rows: 0,
  fill: "row",
});
const swiperBreakPoint = {
  768: {
    centeredSlides: false,
    slidesPerView: 3,
    loop: false,
    grid: {
      rows: 3,
    },
  },
  1080: {
    centeredSlides: false,
    spaceBetween: 10,
    slidesPerView: 3,
    loop: false,
    grid: {
      rows: 3,
    },
  },
  1560: {
    centeredSlides: false,
    spaceBetween: 10,
    slidesPerView: 4,
    loop: false,
    grid: {
      rows: 2,
    },
  },
};
const data = ref([
  {
    icon: `http://104.199.165.235/assets/CanFondHotPot-C1Xy5rpn.jpg`,
    img: `http://104.199.165.235/assets/CanFondHotPot-1twqldCQ.jpg`,
    name: "芡芳石頭火鍋",
  },
  {
    icon: `http://104.199.165.235/assets/emabettei_yakiniku-CTOvE_3E.jpg`,
    img: `http://104.199.165.235/assets/emabettei_yakiniku-BkZO-VM6.jpg`,
    name: "絵馬別邸",
  },
  {
    icon: `http://104.199.165.235/assets/honkakuwagyu-CnM4OpBW.jpg`,
    img: `http://104.199.165.235/assets/honkakuwagyu-BQLwUxY2.jpg`,
    name: "本格燒肉",
  },
  {
    icon: `http://104.199.165.235/assets/honmei_yakiniku-Cz6llYVB.png`,
    img: `http://104.199.165.235/assets/honmei_yakiniku-DYRvFJdi.png`,
    name: "燒肉本命",
  },
  {
    icon: `http://104.199.165.235/assets/Jhujian_Fried_Chicken-D6CW18Xl.png`,
    img: `http://104.199.165.235/assets/Jhujian_Fried_Chicken-CvYOHInw.jpg`,
    name: "築間台灣鹽酥雞",
  },
  {
    icon: `http://104.199.165.235/assets/jhujianshabu-Cx97PfMv.jpg`,
    img: `http://104.199.165.235/assets/jhujianshabu-D-kstD9J.jpg`,
    name: "築間幸福鍋物",
  },
  {
    icon: `http://104.199.165.235/assets/jhujiansuancaiyu-DjC1bxwP.jpg`,
    img: `http://104.199.165.235/assets/jhujiansuancaiyu-CYRu-WOM.jpg`,
    name: "築間酸菜魚",
  },
  {
    icon: `http://104.199.165.235/assets/parkshukoreanbbq-Cpta-OTk.png`,
    img: `http://104.199.165.235/assets/parkshukoreanbbq-C64nfQCD.jpg`,
    name: "朴庶韓國烤肉公社",
  },
  {
    icon: `http://104.199.165.235/assets/parkshukoreanbulgogi-BWDn5FL5.png`,
    img: `http://104.199.165.235/assets/parkshukoreanbulgogi-CvFHz5Fv.jpg`,
    name: "朴庶韓國銅盤烤肉",
  },
  {
    icon: `http://104.199.165.235/assets/yakiniku_smile-RZowgdK9.jpg`,
    img: `http://104.199.165.235/assets/yakiniku_smile-CTRBGW8G.jpg`,
    name: "燒肉smile",
  },
  {
    icon: `http://104.199.165.235/assets/yuituwagyu-BIJmXtiD.jpg`,
    img: `http://104.199.165.235/assets/yuituwagyu-ndyf65Qa.jpg`,
    name: "有之和牛",
  },
  {
    icon: `http://104.199.165.235/assets/zihmujin_koreabbq-CBKyklLH.jpg`,
    img: `http://104.199.165.235/assets/zihmujin_koreabbq-C4Zda0ap.jpg`,
    name: "紫木槿韓國烤肉",
  },
  {
    icon: `http://104.199.165.235/assets/zihmujin_koreabistro-8OMzHAy5.jpg`,
    img: `http://104.199.165.235/assets/zihmujin_koreabistro-WFwWS4mQ.jpg`,
    name: "紫木槿韓餐酒館",
  },
]);
const swiperInit = (val: SwiperClass) => {
  swiperRef.value = val;
};
const slideChange = (val: SwiperType) => {
  currentIdx.value = val.realIndex;
};
const slideClick = (idx: number) => {
  swiperRef.value.slideToLoop(idx);
};
const hoverIcon = (idx: number) => {
  currentIdx.value = idx;
  if (swiperRef.value.autoplay === undefined) return;
  swiperRef.value.autoplay.pause();
};
const leaveIcon = () => {
  if (swiperRef.value.autoplay === undefined) return;
  swiperRef.value.autoplay.start();
};
const isMobile = computed(() => width.value < 768);
const companyAnimate = () => {
  useFadeIn(titleDom as Ref<HTMLDivElement>, titlefadeTopState as Ref<boolean>);
  useFadeIn(companyImgDom as Ref<HTMLDivElement>, companyfadeTopState as Ref<boolean>);
};
const goPositionBrand = (e: Event) => {
  router.push({ path: "/position", query: { name: (e.target as HTMLImageElement).alt } });
};
onMounted(() => {
  window.addEventListener("scroll", companyAnimate);
});
onUnmounted(() => {
  window.removeEventListener("scroll", companyAnimate);
});
</script>
<template>
  <div
    id="companyBrand"
    class="w-full relative h-screen mt-10 mb-48 px-5 md:grid md:grid-rows-5 md:grid-cols-2 gap-10 xl:px-28"
  >
    <div
      ref="titleDom"
      class="title w-fit aspect-square flex flex-col gap-5 md:w-full md:h-full md:row-start-1 md:row-end-3 md:col-start-1 md:col-end-2 md:justify-evenly"
    >
      <span class="font-bold text-lg md:text-3xl lg:text-4xl xl:text-5xl">BRAND 集團十三大品牌</span>
      <span class="text-2xl font-light tracking-widest md:text-5xl md:tracking-normal">
        <span
          class="relative z-10 after:w-full after:h-1/2 after:bg-yellow-300 after:absolute after:top-1/2 after:left-0 after:-z-10 after:opacity-50"
        >
          探索
        </span>
        各式美食
      </span>
      <span class="mt-auto md:mt-0 text-xl lg:text-2xl">築間致力帶給味蕾無盡的樂趣</span>
      <span class="text-xl lg:text-2x">我們從未停止前進</span>
    </div>
    <div
      ref="companyImgDom"
      class="companyImg w-full aspect-square my-10 relative overflow-hidden md:my-0 md:row-start-2 md:row-end-6 md:col-start-2 md:col-end-3 md:aspect-auto"
    >
      <TransitionGroup name="fade">
        <div
          v-for="(item, idx) in data"
          v-show="currentIdx === idx ? true : false"
          :key="item.img"
          class="w-full h-full absolute top-0 left-0"
        >
          <img class="w-full h-full object-cover" :src="item.img" alt="idx" />
        </div>
      </TransitionGroup>
    </div>
    <div class="md:row-start-3 md:row-end-6 overflow-hidden">
      <Swiper
        :loop="true"
        :modules="modules"
        :grid="gridOptions"
        :slides-per-view="3"
        :space-between="30"
        :breakpoints="swiperBreakPoint"
        :centered-slides="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        @swiper="swiperInit"
        @slide-change="slideChange"
      >
        <SwiperSlide
          v-for="(item, idx) in data"
          :key="item.icon"
          class="w-full"
          @click="slideClick(idx)"
          @mouseover="hoverIcon(idx)"
          @mouseleave="leaveIcon"
        >
          <img
            class="lg:transition-all lg:hover:contrast-100"
            :class="{
              'contrast-50': !(currentIdx === idx && isMobile),
              'contrast-100': currentIdx === idx && isMobile,
            }"
            :src="item.icon"
            :alt="item.name"
            @click="goPositionBrand"
          />
        </SwiperSlide>
      </Swiper>
    </div>
    <RouterLink
      :to="{ path: '/news/allNews' }"
      class="flex items-center my-10 grow md:absolute md:bottom-[-10%] md:left-0 md:right-0 md:px-10 md:my-0 xl:px-28"
    >
      <span class="flex items-center group font-bold md:text-2xl">
        MORE 閱讀更多
        <span class="material-symbols-outlined align-middle md:text-4xl transition group-hover:rotate-180">add</span>
      </span>
      <span class="grow h-px bg-black ml-3"></span>
    </RouterLink>
  </div>
</template>
<style scoped>
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
.title,
.companyImg {
  opacity: var(--opacity, 0);
  transform: translateY(var(--translateY, 20px));
  transition: opacity 0.5s, transform 0.5s;
}
</style>
