<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted, computed } from "vue";
import { useFadeIn } from "../../composables/useFadeIn";
import "swiper/css/grid";
import type { Swiper as SwiperType } from "swiper";
import { Swiper as SwiperClass } from "swiper";
import { Grid, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useWindowSize } from "@vueuse/core";
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
    icon: new URL("../../assets/companyImg/3_20231219150840oktl6ywAh0.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_202312141600232q11ec8kJ0.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_20231219151249qwfwqwpUE0.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_2023121416101264v7o8xR94.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_20231219151525koe6jjJOG1.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_20231214161548k7bc80KkT6.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_202312191517122jqvu4g2z2.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_20231214162200gsmaukIZr8.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_20231219193822c5gamcWnZ0.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_202312141631255wvo85cqV11.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_202312191950595n7k6aYwP2.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_202312141631255wvo85cqV11.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_202312191950595n7k6aYwP2.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_202312141600232q11ec8kJ0.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_20240105111611zf6g89WEp0.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_20231219194216cbjy3khMQ1.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_202404161644191qucssBGv0.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_202312141631255wvo85cqV11.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_20240726110350fxx27qKAX2.png", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_20231219195528hmcttpg8g3.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_202407261128174vj74vY2y7.png", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_202312141631255wvo85cqV11.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_20240918134734ygfkvqgqH0.png", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_202407051325403mvk03FH40.png", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_20240918134845oruiuh8UV1.png", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/3_20240913115334bs5ac4soC4.jpg", import.meta.url).href,
  },
  {
    icon: new URL("../../assets/companyImg/3_20250310174341u8andhVOt0.jpg", import.meta.url).href,
    img: new URL("../../assets/companyImg/hoverImg/JhuJian__index_brand_01_750x850.jpg", import.meta.url).href,
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
  swiperRef.value.autoplay.pause();
};
const leaveIcon = () => {
  swiperRef.value.autoplay.start();
};
const isMobile = computed(() => width.value < 768);
const companyAnimate = () => {
  useFadeIn(titleDom as Ref<HTMLDivElement>, titlefadeTopState as Ref<boolean>);
  useFadeIn(companyImgDom as Ref<HTMLDivElement>, companyfadeTopState as Ref<boolean>);
};
onMounted(() => {
  window.addEventListener("scroll", companyAnimate);
});
onUnmounted(() => {
  window.removeEventListener("scroll", companyAnimate);
});
</script>
<template>
  <div class="w-full relative h-screen mt-10 mb-48 px-5 md:grid md:grid-rows-5 md:grid-cols-2 gap-10 xl:px-28">
    <div ref="titleDom" class="title w-fit aspect-square flex flex-col gap-5 md:w-full md:h-full md:row-start-1 md:row-end-3 md:col-start-1 md:col-end-2 md:justify-evenly">
      <span class="font-bold text-lg md:text-3xl lg:text-5xl">BRAND 集團十三大品牌</span>
      <span class="text-2xl font-light tracking-widest md:text-5xl md:tracking-normal">
        <span class="relative z-10 after:w-full after:h-1/2 after:bg-yellow-300 after:absolute after:top-1/2 after:left-0 after:-z-10 after:opacity-50">探索</span>
        各式美食
      </span>
      <span class="mt-auto md:mt-0 text-xl lg:text-2xl">築間致力帶給味蕾無盡的樂趣</span>
      <span class="text-xl lg:text-2x">我們從未停止前進</span>
    </div>
    <div ref="companyImgDom" class="companyImg w-full aspect-square my-10 relative overflow-hidden md:my-0 md:row-start-2 md:row-end-6 md:col-start-2 md:col-end-3 md:aspect-auto">
      <TransitionGroup name="fade">
        <div v-for="(item, idx) in data" v-show="currentIdx === idx ? true : false" :key="item.img" class="w-full h-full absolute top-0 left-0">
          <img class="w-full h-full object-cover" :src="item.img" alt="idx" />
        </div>
      </TransitionGroup>
    </div>
    <div class="md:row-start-3 md:row-end-6 overflow-hidden">
      <Swiper :loop="true" :modules="modules" :grid="gridOptions" :slides-per-view="3" :space-between="30" :breakpoints="swiperBreakPoint" :centered-slides="true" :autoplay="{ delay: 5000, disableOnInteraction: false }" @swiper="swiperInit" @slide-change="slideChange">
        <SwiperSlide v-for="(item, idx) in data" :key="item.icon" class="w-full" @click="slideClick(idx)" @mouseover="hoverIcon(idx)" @mouseleave="leaveIcon">
          <img
            class="contrast-50 lg:transition-all lg:hover:contrast-100"
            :class="{
              'contrast-100': currentIdx === idx && isMobile,
            }"
            :src="item.icon"
            alt="idx"
          />
        </SwiperSlide>
      </Swiper>
    </div>
    <span class="flex items-center my-10 grow md:absolute md:bottom-[-10%] md:left-0 md:right-0 md:px-10 md:my-0 xl:px-28">
      <span class="flex items-center group font-bold md:text-2xl">
        MORE 閱讀更多
        <span class="material-symbols-outlined align-middle md:text-4xl transition group-hover:rotate-180">add</span>
      </span>
      <span class="grow h-px bg-black ml-3"></span>
    </span>
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
