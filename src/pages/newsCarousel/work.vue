<script setup lang="ts">
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCarouselImg } from "../../store/useCarouselImg.ts";
const carouselImg = useCarouselImg();
const modules = ref([Navigation, Autoplay]);
const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});
const swiperBreakPoint = {
  768: { slidesPerView: 3, spaceBetween: 0, centeredSlides: true },
};
const { carouselImgArr } = storeToRefs(carouselImg);

const newCarouselImg = carouselImgArr.value.filter((item: any) => {
  const { 2: type } = item.path.split("/");
  return type === "newsCarousel";
});

const data = ref([
  {
    img: `../../assets/img${newCarouselImg[0].path}`,
    title: "月神的烤驗",
    date: "2024/08/25",
  },
  {
    img: `../../assets/img${newCarouselImg[3].path}`,
    title: "會吃仲夏GOLD月神的烤驗",
    date: "2024/08/26",
  },
  {
    img: `../../assets/img${newCarouselImg[0].path}`,
    title: "仲夏GOLD會吃",
    date: "2024/08/27",
  },
  {
    img: `../../assets/img${newCarouselImg[7].path}`,
    title: "百萬會員祭 大口吃金幣",
    date: "2024/08/28",
  },
]);
</script>
<template>
  <div class="w-full relative">
    <swiper
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :modules="modules"
      :loop="true"
      :speed="2000"
      :navigation="navigation"
      :slides-per-view="2"
      :breakpoints="swiperBreakPoint"
    >
      <swiper-slide v-for="item in data" :key="item.img">
        <div class="w-full h-full flex flex-col">
          <div class="w-full aspect-square">
            <img class="w-full h-full object-cover" :src="item.img" alt="allNewsImg" />
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
  margin: 0 2%;
}
@media screen and (max-width: 768px) {
  .swiper-slide {
    width: 45% !important;
    margin: 0 2.5%;
  }
  .swiper-button-prev {
    left: 2%;
  }
  .swiper-button-next {
    right: 2%;
  }
}
</style>
