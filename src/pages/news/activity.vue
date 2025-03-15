<script setup lang="ts">
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import { ref } from "vue";
const modules = ref([Navigation, Autoplay]);
const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});
const swiperBreakPoint = {
  640: { slidesPerView: 3, spaceBetween: 10, centeredSlides: true },
  768: { slidesPerView: 3, spaceBetween: 50, centeredSlides: true },
  1280: { slidesPerView: 3, spaceBetween: 50, centeredSlides: true },
  1536: { slidesPerView: 3, spaceBetween: 100, centeredSlides: true },
};
const data = ref([
  {
    img: "../../assets/newsImg/3_20241003091851pbchobLxf0.jpg",
    title: "工商時報 | 北中南倉儲明年Q3陸續啟用",
    date: "2024/08/08",
  },
  {
    img: "../../assets/newsImg/3_20241003091851pbchobLxf0.jpg",
    title: "三立新聞網 | 直擊菇菇農場！供應商、食安實驗室揭露",
    date: "2024/08/09",
  },
  {
    img: "../../assets/newsImg/3_20241003091851pbchobLxf0.jpg",
    title: "工商時報 | 北中南倉儲明年Q3陸續啟用",
    date: "2024/08/10",
  },
  {
    img: "../../assets/newsImg/3_20241003091851pbchobLxf0.jpg",
    title: "ETtoday財經雲 | 築間5月營收月增1成 雙品牌插旗香港",
    date: "2024/08/13",
  },
]);
</script>
<template>
  <div>
    <swiper
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :modules="modules"
      :loop="true"
      :navigation="navigation"
      :slides-per-view="2"
      :space-between="30"
      :breakpoints="swiperBreakPoint"
    >
      <swiper-slide v-for="item in data" :key="item.img">
        <div class="w-full h-full flex flex-col">
          <div class="w-full">
            <img class="w-full" :src="item.img" />
          </div>
          <div class="grow flex flex-col md:text-2xl">
            <span class="w-full grow">{{ item.title }}</span>
            <span class="w-full">{{ item.date }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>
<style scoped>
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: gray;
}
.swiper-button-prev {
  left: 5%;
}
.swiper-button-next {
  right: 5%;
}
.swiper {
  width: 80%;
}
.swiper-slide {
  height: auto !important;
}
@media screen and (max-width: 768px) {
  .swiper-button-prev {
    left: 2%;
  }
  .swiper-button-next {
    right: 2%;
  }
}
</style>
