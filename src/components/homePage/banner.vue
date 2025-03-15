<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { useFadeIn } from "../../composables/useFadeIn";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
const titleDom = ref<HTMLDivElement | null>(null);
const carouselDom = ref<HTMLDivElement | null>(null);
const fadeTopState = ref(true);
const fadeBottomState = ref(true);
const modules = ref([Pagination, Autoplay]);
const swiperBreakPoint = {
  768: {
    slidesPerView: 1.5,
    spaceBetween: 50,
    centeredSlides: true,
  },
};
const paginationOptions = {
  el: ".swiper-option-point",
  clickable: true,
};
const bannerAnimate = () => {
  useFadeIn(titleDom as Ref<HTMLDivElement>, fadeTopState as Ref<boolean>);
  useFadeIn(carouselDom as Ref<HTMLDivElement>, fadeBottomState as Ref<boolean>);
};
onMounted(() => {
  bannerAnimate();
});
</script>
<template>
  <div class="w-full mt-40">
    <div ref="titleDom" class="title w-full">
      <div class="w-full">
        <span class="block text-center text-3xl md:text-6xl">築起你我的幸福空間</span>
        <span class="block my-10 text-center text-2xl md:text-4xl">Build Our Happiness Space</span>
      </div>
      <div class="w-full my-10">
        <ul class="w-full flex justify-center breadCrumbs">
          <li class="w-fit px-5 relative">
            <a class="block relative after:w-full after:h-1/2 after:bg-yellow-300 after:opacity-50 after:absolute after:bottom-0 after:left-0 after:-z-10 after:scale-x-0 after:transition after:origin-right hover:after:scale-x-100 hover:after:origin-left text-sm font-medium md:text-2xl" href="#">Group 集團</a>
          </li>
          <li class="w-fit px-5 relative">
            <a class="block relative after:w-full after:h-1/2 after:bg-yellow-300 after:opacity-50 after:absolute after:bottom-0 after:left-0 after:-z-10 after:scale-x-0 after:transition after:origin-right hover:after:scale-x-100 hover:after:origin-left text-sm font-medium md:text-2xl" href="#">NEWS 新訊</a>
          </li>
          <li class="w-fit px-5 relative">
            <a class="block relative after:w-full after:h-1/2 after:bg-yellow-300 after:opacity-50 after:absolute after:bottom-0 after:left-0 after:-z-10 after:scale-x-0 after:transition after:origin-right hover:after:scale-x-100 hover:after:origin-left text-sm font-medium md:text-2xl" href="#">MEMBER 會員</a>
          </li>
        </ul>
      </div>
    </div>
    <div ref="carouselDom" class="carousel w-full">
      <swiper
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :modules="modules"
        :loop="true"
        :slides-per-view="1"
        :space-between="0"
        :pagination="paginationOptions"
        :breakpoints="swiperBreakPoint"
      >
        <swiper-slide class="transition">
          <div class="m-auto">
            <img class="w-full object-cover" src="../../assets/img/banerImg/3_202405101410374pw0avSTl1.jpg" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide class="transition">
          <div class="m-auto">
            <img class="w-full object-cover" src="../../assets/img/banerImg/3_20231229181631r3zihnNUv0.jpg" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide class="transition">
          <div class="m-auto">
            <img class="w-full object-cover" src="../../assets/img/banerImg/3_202405101405116sf4josbY0.jpg" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide class="transition">
          <div class="m-auto">
            <img class="w-full object-cover" src="../../assets/img/banerImg/3_202405101410374pw0avSTl1.jpg" alt="" />
          </div>
        </swiper-slide>
        <swiper-slide class="transition">
          <div class="m-auto">
            <img class="w-full object-cover" src="../../assets/img/banerImg/3_20231229181631r3zihnNUv0.jpg" alt="" />
          </div>
        </swiper-slide>
        <div class="swiper-option-point w-full mt-5 flex justify-center gap-5 md:hidden"></div>
      </swiper>
    </div>
  </div>
</template>
<style scoped>
.breadCrumbs > li + li:after {
  content: "";
  width: 5px;
  height: 5px;
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translate(50%, -50%);
  border-radius: 100px;
  background-color: grey;
}
.title {
  opacity: var(--opacity, 0);
  transform: translateY(var(--translateY, -20px));
  transition: opacity 0.5s, transform 0.5s;
}
.carousel {
  opacity: var(--opacity, 0);
  transform: translateY(var(--translateY, 20px));
  transition: opacity 0.5s, transform 0.5s;
}
.swiper {
  overflow: visible;
}
.swiper-slide-active {
  transform: translateY(0);
}
@media screen and (min-width: 768px) {
  .swiper-slide-active {
    transform: translateY(30px);
  }
}
</style>
