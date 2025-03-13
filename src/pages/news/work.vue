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
    img: "../../assets/newsImg/3_20241204111217ic7yt0qbp1.jpg",
    title: "月神的烤驗",
    date: "2024/08/25",
  },
  {
    img: "../../assets/newsImg/3_20241204111217ic7yt0qbp1.jpg",
    title: "會吃仲夏GOLD月神的烤驗",
    date: "2024/08/26",
  },
  {
    img: "../../assets/newsImg/3_20241204111217ic7yt0qbp1.jpg",
    title: "仲夏GOLD會吃",
    date: "2024/08/27",
  },
  {
    img: "../../assets/newsImg/3_20241204111217ic7yt0qbp1.jpg",
    title: "百萬會員祭 大口吃金幣",
    date: "2024/08/28",
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
      :loop="true"
      :navigation="navigation"
      :modules="modules"
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
  width: 30% !important;
}
@media screen and (max-width: 768px) {
  .swiper-slide {
    width: 45% !important;
  }
  .swiper-button-prev {
    left: 2%;
  }
  .swiper-button-next {
    right: 2%;
  }
}
</style>
